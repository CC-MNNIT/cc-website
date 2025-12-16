# Data Files Directory

This directory contains structured YAML data files used by the website templates.

## Directory Structure

```
data/
├── alumni/          # Alumni data organized by graduation year
│   ├── 2025.yaml
│   ├── 2024.yaml
│   ├── 2023.yaml
│   └── 2022.yaml
└── README.md        # This file
```

## Data Sources

This directory contains two main types of data:

### 1. Alumni Data (`alumni.yaml`)

Single file containing all alumni information - simply add new entries to automatically update the website.

### 2. ContriHub Data (`contrihub/`)

ContriHub event data including statistics, featured contributors, and success stories organized by year.

---

## Alumni Data (`alumni.yaml`)

### File Location

- **Single file**: `data/alumni.yaml`
- **No subdirectories needed** - just one file to maintain
- Add new alumni entries directly to this file

### Data Structure

The alumni.yaml file has this structure:

```yaml
alumni:
  - name: "Full Name"
    batch: "2024-2028"           # Batch years (e.g., "2024-2028" or "2025")
    graduation_year: 2028        # Graduation year
    current_role: "Job Title"    # Current position
    company: "Company Name"      # Current employer
    domain: "Domain"             # Area of work (Backend, ML, etc.)
    location: "City, Country"    # Current location
    image: "/images/alumni/photo.jpg"  # Optional: Profile photo
    linkedin: "https://linkedin.com/in/username"  # Optional
    github: "https://github.com/username"         # Optional
    message: "Optional testimonial or advice"     # Optional
```

### Required Fields

- `name`: Full name of the alumni
- `batch`: Batch years (format: "YYYY-YYYY" or "YYYY")
- `graduation_year`: Graduation year (4-digit number)

### Optional Fields

- `current_role`: Current job title
- `company`: Current employer
- `domain`: Area of work (Backend Development, Machine Learning, etc.)
- `location`: Current city and country
- `image`: Path to profile photo (e.g., "/images/alumni/name.jpg")
- `linkedin`: LinkedIn profile URL
- `github`: GitHub profile URL
- `message`: Personal message or advice for juniors

### Adding New Alumni

1. Open `data/alumni.yaml`
2. Add a new entry to the `alumni` list (add at top for latest graduates):

```yaml
alumni:
  # Add new entries here (latest first)
  - name: "New Alumni Name"
    batch: "2024-2028"
    graduation_year: 2028
    current_role: "Software Engineer"
    company: "Company Name"
    domain: "Domain"
    location: "City, Country"
    linkedin: "https://linkedin.com/in/username"
    # ... other optional fields
```

4. Run validation: `python scripts/validate-data.py`
5. Build and test: `zola build && zola serve`

### Creating New Year Files

When adding alumni from a new graduation year:

1. Create file: `data/alumni/YYYY.yaml` (replace YYYY with year)
2. Add the base structure:

```yaml
alumni:
  - name: First Alumni
    batch: YYYY
    degree: B.Tech
    branch: CSE
```

3. Update `templates/alumni.html` to load the new year:

```javascript
const alumniData = {
    // ... existing years ...
    YYYY: {{ load_data(path="alumni/YYYY.yaml") | json_encode() }}
};
```

## Best Practices

1. **Keep files organized by year** - Makes data management easier as alumni count grows
2. **Validate before committing** - Always run `scripts/validate-data.py`
3. **Use consistent formatting** - Follow the examples above
4. **Don't duplicate data** - Each alumni should appear in only one year file
5. **Test after changes** - Run `zola build` to ensure no errors

## Validation

Run the validation script to check data integrity:

```bash
python scripts/validate-data.py
```

This will check:
- Required fields are present
- Batch years are valid 4-digit numbers
- YAML syntax is correct
- No unknown fields are present

## Troubleshooting

**Issue**: Alumni not appearing on website
- **Solution**: Check YAML syntax with `python -c "import yaml; yaml.safe_load(open('data/alumni.yaml'))"`
- **Solution**: Run `zola build` to rebuild the site
- **Solution**: Clear browser cache and refresh

**Issue**: Build fails with data loading error
- **Solution**: Run `scripts/validate-data.py` to identify the problem
- **Solution**: Check for YAML indentation errors (use spaces, not tabs)

**Issue**: Search not working
- **Solution**: Verify `window.allAlumni` is populated (check browser console)
- **Solution**: Ensure JavaScript aggregation includes all year files

## ContriHub Data (`contrihub/`)

ContriHub event data is organized by year with separate files for different data types.

### File Structure

```
contrihub/
└── 2025/
    ├── event.yaml         # Main event data (stats, repos, participants)
    ├── featured.yaml      # Featured contributions
    ├── recognitions.yaml  # Awards and recognitions
    └── stories.yaml       # Success stories and testimonials
```

**Benefits**: 
- Organized by year, matching content structure
- Clean file names without year prefixes
- Easy to add new years - just create a new folder

### Main Event Data (`YYYY/event.yaml`)

```yaml
event:
  name: "ContriHub 2025"
  participants: 45
  merged_prs: 120
  repositories: 8

stats:
  features_added: 15
  bugs_fixed: 30
  docs_improved: 25

repositories:
  - name: "Repository Name"
    tech_stack: ["Tech1", "Tech2"]
    contributions: 35
```

### How It's Used

- **Template**: `templates/contrihub-event.html`
- **Page**: `content/contrihub/YYYY/_index.md` with `contrihub_year = "YYYY"`
- **Loading**: Template automatically loads all files from `data/contrihub/YYYY/` folder

### Adding New ContriHub Year

1. Create year folder and data files:
```bash
mkdir -p data/contrihub/2026
cp -r data/contrihub/2025/* data/contrihub/2026/
# Edit files in 2026/ folder with new data
```

2. Create content page:
```bash
mkdir -p content/contrihub/2026
# Add _index.md with contrihub_year = "2026"
```

3. **No template changes needed** - template uses `contrihub_year` variable to find the right folder!

---

## Migration Notes

- **Previous structure**: Single `alumni.yaml` file with all entries
- **Current structure**: Year-based files (`2022.yaml`, `2023.yaml`, etc.)
- **Template changes**: Alumni page now aggregates data from multiple files
- **Benefits**: Better performance, easier maintenance, clearer organization

## Related Documentation

- **Content Guide**: See `/CONTENT_GUIDE.md` for content organization and how to add alumni
- **Contributing**: See `/CONTRIBUTING.md` for contribution guidelines
- **Validation**: Run `scripts/validate-data.py` to check all data files

**Issue**: Search not working
- **Solution**: Verify `window.allAlumni` is populated (check browser console)
- **Solution**: Ensure JavaScript aggregation includes all year files

## Migration Notes

- **Previous structure**: Single `alumni.yaml` file with all entries
- **Current structure**: Year-based files (`2022.yaml`, `2023.yaml`, etc.)
- **Template changes**: Alumni page now aggregates data from multiple files
- **Benefits**: Better performance, easier maintenance, clearer organization
