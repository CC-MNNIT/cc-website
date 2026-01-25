import os
import sys
import datetime
import google.generativeai as genai
from github import Github

# --- Configuration ---
# These are pulled from the environment variables set in the YAML file
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
GITHUB_TOKEN = os.getenv("GITHUB_TOKEN")
REPO_NAME = os.getenv("GITHUB_REPOSITORY") # This automatically gets "owner/repo-name"
PR_NUMBER_STR = os.getenv("PR_NUMBER")

# Basic check to ensure we have what we need
if not all([GEMINI_API_KEY, GITHUB_TOKEN, REPO_NAME, PR_NUMBER_STR]):
    print("Error: Missing required environment variables. Cannot proceed.")
    sys.exit(1)

PR_NUMBER = int(PR_NUMBER_STR)
CURRENT_YEAR = datetime.date.today().year

# Initialize clients
genai.configure(api_key=GEMINI_API_KEY)
model = genai.GenerativeModel('gemini-2.5-flash')
gh = Github(GITHUB_TOKEN)

# --- Helper Functions ---

def get_ai_analysis(content):
    """Sends content to Gemini and handles errors like rate limits."""
    prompt = f"""
    You are an editorial assistant for a technical blog. 
    Analyze the following markdown article and provide:
    1. A concise 3-bullet point summary.
    2. The tone of the piece (e.g., Technical, Beginner-friendly, Opinionated).
    3. A 'Readability Score' from 1-10.
    4. A 'Security Warning' if you detect any suspicious hidden links, phishing attempts, or spam-like behavior.

    ARTICLE CONTENT:
    {content}
    """
    try:
        response = model.generate_content(prompt)
        return response.text
    except Exception as e:
        # Gracefully handle API limits or outages
        if "429" in str(e) or "resource_exhausted" in str(e).lower():
            return "⚠️ **Review Bot Note:** The Gemini Free Tier limit has been reached for today. Please review this PR manually."
        return f"⚠️ **Review Bot Note:** I encountered an error while analyzing the blog. (Error: {str(e)})"

def get_folder_warning(file_path, current_year):
    """Checks if the blog post is in the correct year's folder."""
    # Path is like: content/blog/YYYY/filename.md
    parts = file_path.split('/')
    # Check if it's deeper than content/blog/ and try to parse the year
    if len(parts) >= 3 and parts[0] == 'content' and parts[1] == 'blog':
        try:
            blog_year = int(parts[2])
            if blog_year != current_year:
                # Add a polite note if the year doesn't match
                return f"💡 **Note to Contributor:** You're adding this post to the `{blog_year}` folder. Ideally, new posts should be placed in the `{current_year}` folder."
        except ValueError:
            # This catches files like content/blog/_index.md which don't have a year
            pass
    return ""


def main():
    try:
        # Connect to the repository and PR
        repo = gh.get_repo(REPO_NAME)
        pr = repo.get_pull(PR_NUMBER)
        print(f"Starting analysis for PR #{PR_NUMBER} in repo {REPO_NAME}...")

        # 1. Find changed markdown files specifically in the 'content/blog/' directory
        files = pr.get_files()
        blog_files = [f for f in files if f.filename.startswith('content/blog/') and f.filename.endswith('.md') and f.status != 'removed']

        if not blog_files:
            print("No relevant blog markdown files found to analyze.")
            return

        # 2. Process the first relevant file found
        target_file = blog_files[0]
        print(f"Found target file for analysis: {target_file.filename}")
        
        # Get the raw content of the file from the PR's branch
        file_content = repo.get_contents(target_file.filename, ref=pr.head.sha).decoded_content.decode()
        
        # 3. Generate the analysis and the folder warning
        analysis = get_ai_analysis(file_content)
        folder_warning = get_folder_warning(target_file.filename, CURRENT_YEAR)

        # 4. Construct and post the comment
        comment_body = f"## 🤖 Blog Review Assistant\n\n"
        
        if folder_warning:
            comment_body += f"{folder_warning}\n\n"
            
        comment_body += (
            f"I've scanned `{target_file.filename}` to save the team some time:\n\n"
            f"{analysis}\n\n"
            f"---\n"
        )
        
        pr.create_issue_comment(comment_body)
        print("Successfully posted the review comment to the PR.")

    except Exception as e:
        print(f"An unexpected error occurred: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()
