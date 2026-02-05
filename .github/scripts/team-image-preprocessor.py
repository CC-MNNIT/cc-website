import cv2
import os
import json
import hashlib
from pathlib import Path

# Configs
SCRIPT_DIR = Path(__file__).parent
BASE_DIR = SCRIPT_DIR.parent.parent
IMAGE_ROOT = BASE_DIR / "static" / "images" / "teams"
MANIFEST_FILE = BASE_DIR / ".github" / "data" / "team_images_manifest.json"
TARGET_SIZE = 500 
CASCADE_PATH = SCRIPT_DIR / "haarcascade_frontalface_default.xml"

# Initialize cascade 
face_cascade = cv2.CascadeClassifier(str(CASCADE_PATH))

# Safety Check
if face_cascade.empty():
    raise IOError(f"[ERROR] Could not load face cascade from {CASCADE_PATH}.")

def load_manifest():
    if MANIFEST_FILE.exists():
        try:
            return json.loads(MANIFEST_FILE.read_text())
        except json.JSONDecodeError:
            return {}
    return {}

def save_manifest(manifest):
    MANIFEST_FILE.parent.mkdir(parents=True, exist_ok=True)
    MANIFEST_FILE.write_text(json.dumps(manifest, indent=2))

def calculate_hash(file_path):
    """Calculates MD5 hash of a file."""
    hash_md5 = hashlib.md5()
    try:
        with open(file_path, "rb") as f:
            for chunk in iter(lambda: f.read(4096), b""):
                hash_md5.update(chunk)
        return hash_md5.hexdigest()
    except FileNotFoundError:
        return None

def get_face_centered_crop(img):
    height, width = img.shape[:2]
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    faces = face_cascade.detectMultiScale(gray, 1.1, 5, minSize=(100, 100))
    
    if len(faces) > 0:
        (x, y, w, h) = max(faces, key=lambda b: b[2] * b[3])
        center_x, center_y = x + w // 2, y + h // 2
    else:
        center_x, center_y = width // 2, height // 2

    side_length = min(width, height)
    left = max(0, center_x - side_length // 2)
    top = max(0, center_y - side_length // 2)
    
    if left + side_length > width: left = width - side_length
    if top + side_length > height: top = height - side_length
        
    return img[top:top+side_length, left:left+side_length]

def main():
    if not IMAGE_ROOT.exists():
        print(f"[ERROR] {IMAGE_ROOT} not found.")
        return

    manifest = load_manifest()
    new_manifest = {}
    valid_extensions = {'.jpg', '.jpeg', '.png', '.webp'}
    processed_count = 0

    print("🔍 Scanning images...")

    for full_path in IMAGE_ROOT.iterdir():
        if full_path.suffix.lower() not in valid_extensions:
            continue

        filename = full_path.name
        current_hash = calculate_hash(full_path)

        # CHECK 1: Is this specific file content already processed?
        if filename in manifest and manifest[filename] == current_hash:
            # Keep record in new manifest
            new_manifest[filename] = current_hash
            continue

        print(f"⚙️  Processing: {filename}")

        img = cv2.imread(str(full_path))
        if img is None: 
            print(f"⚠️  Could not read image: {filename}")
            continue

        # 1. Apply face-centered square crop
        cropped_img = get_face_centered_crop(img)
        current_h = cropped_img.shape[0]

        # 2. Conditional Resize Logic
        if current_h > TARGET_SIZE:
            final_img = cv2.resize(cropped_img, (TARGET_SIZE, TARGET_SIZE), 
                                 interpolation=cv2.INTER_LANCZOS4)
        else:
            final_img = cropped_img

        # 3. Save as WebP
        output_path = full_path.with_suffix(".webp")
        cv2.imwrite(str(output_path), final_img, [cv2.IMWRITE_WEBP_QUALITY, 92])
        
        # 4. Hash the RESULT
        # We must hash the *result* file (output_path) so next run sees it as "done".
        # If we overwrote the file, calculate hash of the new file.
        # If we created a new file (jpg->webp), we calculate hash of the new webp.
        
        final_hash = calculate_hash(output_path)
        new_manifest[output_path.name] = final_hash

        # Cleanup original if different ext
        if full_path != output_path:
            full_path.unlink()
            print(f"   Converted & Deleted Original: {filename} -> {output_path.name}")
        else:
            print(f"   Optimized: {filename}")
            
        processed_count += 1

    # Save updated manifest
    save_manifest(new_manifest)
    print(f"✅ Scanning complete. Processed {processed_count} images.")

if __name__ == "__main__":
    main()