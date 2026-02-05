
import os
import glob
from PIL import Image

EVENTS_DIR = "static/images/events/2025"

# Config: folder_name -> starting_index
CONFIG = {
    "code-of-the-day": 5,
    "codesangam": 4,
    "hack36": 12,
    "insomnia": 5
}

def process_folder(folder, start_index):
    path = os.path.join(EVENTS_DIR, folder)
    if not os.path.exists(path):
        print(f"Skipping {folder}: not found")
        return []

    # Find common image extensions, excluding webp
    extensions = ['*.jpg', '*.jpeg', '*.png', '*.JPG', '*.JPEG', '*.PNG']
    files = []
    for ext in extensions:
        files.extend(glob.glob(os.path.join(path, ext)))
    
    files.sort() # Sort to keep order
    
    added_files = []
    current_index = start_index
    
    for f in files:
        try:
            output_name = f"{current_index}.webp"
            output_path = os.path.join(path, output_name)
            
            # Open, optimize, save
            with Image.open(f) as img:
                if img.mode not in ('RGB', 'RGBA'):
                    img = img.convert('RGBA')
                img.save(output_path, 'WEBP', quality=80, method=6)
            
            print(f"Processed: {f} -> {output_path}")
            
            # Remove original
            os.remove(f)
            
            # Log relative path for markdown
            rel_path = f"events/2025/{folder}/{output_name}"
            added_files.append(rel_path)
            
            current_index += 1
            
        except Exception as e:
            print(f"Failed to process {f}: {e}")
            
    return added_files

all_added = {}
for folder, start_idx in CONFIG.items():
    print(f"--- Processing {folder} ---")
    added = process_folder(folder, start_idx)
    if added:
        all_added[folder] = added
        print(f"Added {len(added)} images to {folder}")

print("\n--- Summary ---")
for folder, files in all_added.items():
    print(f"\n[{folder}]")
    for f in files:
        print(f'    "{f}",')
