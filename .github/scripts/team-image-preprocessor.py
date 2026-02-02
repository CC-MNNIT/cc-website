import cv2
import os
from pathlib import Path

# Configs
SCRIPT_DIR = Path(__file__).parent
BASE_DIR = SCRIPT_DIR.parent.parent
IMAGE_ROOT = BASE_DIR / "static" / "images" / "teams"
TARGET_SIZE = 500 
CASCADE_PATH = SCRIPT_DIR / "haarcascade_frontalface_default.xml"

# Initialize cascade 
face_cascade = cv2.CascadeClassifier(str(CASCADE_PATH))

# Safety Check: Ensure cascade loaded
if face_cascade.empty():
    raise IOError(f"[ERROR] Could not load face cascade from {CASCADE_PATH}. Check if the file is in the scripts folder.")

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

    valid_extensions = {'.jpg', '.jpeg', '.png', '.webp'}

    for full_path in IMAGE_ROOT.iterdir():
        if full_path.suffix.lower() not in valid_extensions:
            continue

        img = cv2.imread(str(full_path))
        if img is None: 
            continue

        # Only skip if shape IS target size AND it is already a .webp
        if img.shape[:2] == (TARGET_SIZE, TARGET_SIZE) and full_path.suffix.lower() == ".webp":
            continue

        print(f"Processing: {full_path.name}")
        
        # 1. Apply face-centered square crop
        cropped_img = get_face_centered_crop(img)
        current_h = cropped_img.shape[0]

        # 2. Conditional Resize Logic
        if current_h > TARGET_SIZE:
            final_img = cv2.resize(cropped_img, (TARGET_SIZE, TARGET_SIZE), 
                                 interpolation=cv2.INTER_LANCZOS4)
        else:
            final_img = cropped_img

        # 3. Save as WebP and Cleanup
        output_path = full_path.with_suffix(".webp")
        cv2.imwrite(str(output_path), final_img, [cv2.IMWRITE_WEBP_QUALITY, 92])
        
        # Delete original if it was a different format
        if full_path != output_path:
            full_path.unlink()

if __name__ == "__main__":
    main()