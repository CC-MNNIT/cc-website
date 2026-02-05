
import os
import sys
from pathlib import Path
from PIL import Image

# Config
ROOT_DIR = Path(__file__).parent.parent.parent
STATIC_IMAGES_DIR = ROOT_DIR / "static" / "images"
CONTENT_DIR = ROOT_DIR / "content"
DATA_DIR = ROOT_DIR / "data"
CONFIG_FILE = ROOT_DIR / "config.toml"

# Skip these folders
IGNORE_DIRS = {STATIC_IMAGES_DIR / "teams"}
# Extensions to process
TARGET_EXTS = {".jpg", ".jpeg", ".png", ".JPG", ".JPEG", ".PNG"}

def optimize_image(image_path):
    """
    Converts image to WebP (quality 85) and returns new path.
    """
    try:
        new_path = image_path.with_suffix(".webp")
        
        # Open and Convert
        with Image.open(image_path) as img:
            # Handle RGBA for PNGs
            if img.mode not in ('RGB', 'RGBA'):
                img = img.convert('RGBA')
            
            img.save(new_path, "WEBP", quality=85, method=6)
            
        return new_path
    except Exception as e:
        print(f"❌ Failed to convert {image_path}: {e}")
        return None

def update_references(old_rel_path, new_rel_path):
    """
    Scans content, data, and config files to replace the old relative path with the new one.
    old_rel_path: e.g., "events/2025/hack36/1.jpg"
    new_rel_path: e.g., "events/2025/hack36/1.webp"
    """
    files_updated = 0
    
    # 1. Scan Content Directory (.md, .html)
    for path in CONTENT_DIR.rglob("*"):
        if path.is_file() and path.suffix in {".md", ".html", ".toml"}:
            if replace_in_file(path, old_rel_path, new_rel_path):
                files_updated += 1

    # 2. Scan Data Directory (.toml, .yaml, .json)
    for path in DATA_DIR.rglob("*"):
        if path.is_file() and path.suffix in {".toml", ".yaml", ".json"}:
            if replace_in_file(path, old_rel_path, new_rel_path):
                files_updated += 1
                
    # 3. Scan Config File
    if CONFIG_FILE.exists():
        if replace_in_file(CONFIG_FILE, old_rel_path, new_rel_path):
            files_updated += 1
            
    return files_updated

def replace_in_file(file_path, old_str, new_str):
    try:
        # Read as text
        try:
            content = file_path.read_text(encoding="utf-8")
        except UnicodeDecodeError:
            return False # binary file? skip
            
        if old_str in content:
            new_content = content.replace(old_str, new_str)
            file_path.write_text(new_content, encoding="utf-8")
            print(f"    📝 Updated reference in: {file_path.relative_to(ROOT_DIR)}")
            return True
    except Exception as e:
        print(f"    ⚠️ Error reading {file_path}: {e}")
    return False

def main():
    print("🚀 Starting Asset Optimization & Reference Fixer...")
    
    if not STATIC_IMAGES_DIR.exists():
        print("Static images dir not found.")
        return

    processed_count = 0
    
    # Walk through all files in static/images
    for file_path in STATIC_IMAGES_DIR.rglob("*"):
        # Checks
        if not file_path.is_file():
            continue
        if file_path.suffix not in TARGET_EXTS:
            continue
            
        # Check exclusion
        # If file is inside an ignored directory
        is_ignored = False
        for ignored in IGNORE_DIRS:
            if ignored in file_path.parents or ignored == file_path.parent:
                is_ignored = True
                break
        if is_ignored:
            continue

        print(f"\nProcessing: {file_path.relative_to(STATIC_IMAGES_DIR)}")
        
        # 1. Optimize
        new_path = optimize_image(file_path)
        if not new_path:
            continue
            
        # 2. Update References
        # Paths relative to static/images/ (e.g. "events/hack36/1.jpg")
        # This is the standard way Zola/Hugo content references images in our setup
        old_rel_str = str(file_path.relative_to(STATIC_IMAGES_DIR))
        new_rel_str = str(new_path.relative_to(STATIC_IMAGES_DIR))
        
        # Safety: Ensure we aren't replacing a very short common string (unlikely given full path)
        refs_fixed = update_references(old_rel_str, new_rel_str)
        
        # 3. Cleanup
        try:
            file_path.unlink()
            print(f"    ✅ Converted & Deleted Original ({refs_fixed} refs updated)")
            processed_count += 1
        except Exception as e:
            print(f"    ❌ Failed to delete original: {e}")

    print(f"\n✨ Done! Processed {processed_count} images.")

if __name__ == "__main__":
    main()
