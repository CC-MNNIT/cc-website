#!/usr/bin/env python3
import os
import sys
from PIL import Image
import argparse

def process_image(input_path, output_path=None, quality=80):
    """
    Converts an image to WebP format with compression.
    """
    try:
        # Open the image
        with Image.open(input_path) as img:
            # Convert to RGB if necessary (e.g. for PNGs with transparency if saving as JPEG, 
            # but WebP supports transparency so RGBA is fine)
            if img.mode not in ('RGB', 'RGBA'):
                img = img.convert('RGBA')

            # Determine output path
            if output_path is None:
                filename = os.path.splitext(os.path.basename(input_path))[0]
                output_path = f"{filename}.webp"

            # Create output directory if it doesn't exist
            output_dir = os.path.dirname(output_path)
            if output_dir and not os.path.exists(output_dir):
                os.makedirs(output_dir)

            # Save as WebP
            img.save(output_path, 'WEBP', quality=quality, method=6)
            
            original_size = os.path.getsize(input_path)
            new_size = os.path.getsize(output_path)
            savings = (original_size - new_size) / original_size * 100
            
            print(f"✅ Converted: {input_path} -> {output_path}")
            print(f"📊 Size: {original_size/1024:.1f}KB -> {new_size/1024:.1f}KB ({savings:.1f}% saved)")

    except Exception as e:
        print(f"❌ Error processing {input_path}: {e}")
        sys.exit(1)

def main():
    parser = argparse.ArgumentParser(description="Convert and compress images to WebP.")
    parser.add_argument("input", help="Path to the input image file")
    parser.add_argument("-o", "--output", help="Path to the output file (optional)")
    parser.add_argument("-q", "--quality", type=int, default=80, help="Compression quality (0-100, default: 80)")
    
    args = parser.parse_args()
    
    if not os.path.exists(args.input):
        print(f"❌ Input file not found: {args.input}")
        sys.exit(1)
        
    process_image(args.input, args.output, args.quality)

if __name__ == "__main__":
    main()
