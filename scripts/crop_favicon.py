from PIL import Image, ImageOps, ImageDraw
import os

def create_circular_favicon(input_path, output_path):
    try:
        # Open image
        print(f"Opening image: {input_path}")
        img = Image.open(input_path).convert("RGBA")
        
        # Calculate cropping box to scale in (Zoom)
        # User wants "face and little bit chest", not whole pic.
        # Assuming face is roughly centered horizontally and slightly above center vertically.
        
        width, height = img.size
        min_dim = min(width, height)
        
        # Zoom factor: 0.7 (70% of the smallest dimension)
        # This zooms in significantly compared to the full height crop
        crop_size = int(min_dim * 0.7)
        
        # Center coordinates
        center_x = width // 2
        center_y = height // 2
        
        # Shift Y up by 10% of height to capture face better (faces are usually higher)
        y_offset = int(height * 0.1)
        center_y = center_y - y_offset
        
        left = center_x - (crop_size // 2)
        top = center_y - (crop_size // 2)
        right = center_x + (crop_size // 2)
        bottom = center_y + (crop_size // 2)
        
        # Ensure bounds
        if left < 0: left = 0
        if top < 0: top = 0
        if right > width: right = width
        if bottom > height: bottom = height
        
        print(f"Original size: {width}x{height}")
        print(f"Cropping to: {crop_size}x{crop_size} at ({left}, {top})")
        
        img = img.crop((left, top, right, bottom))
        
        # Resize to standard icon size (optional, but good for favicon)
        # keeping it high res is fine too, Next.js handles it. 
        # But let's keep it reasonable, say 512x512
        if new_size > 512:
            print("Resizing to 512x512")
            img = img.resize((512, 512), Image.Resampling.LANCZOS)
        
        # Create circular mask
        mask = Image.new('L', img.size, 0)
        draw = ImageDraw.Draw(mask) 
        draw.ellipse((0, 0) + img.size, fill=255)
        
        # Apply mask
        output = ImageOps.fit(img, mask.size, centering=(0.5, 0.5))
        output.putalpha(mask)
        
        # Save
        print(f"Saving to {output_path}")
        output.save(output_path, 'PNG')
        print(f"Successfully created circular icon at {output_path}")
        
    except Exception as e:
        print(f"Error: {e}")
        exit(1)

if __name__ == "__main__":
    input_img = "public/akparidadp.jpeg"
    output_img = "src/app/icon.png"
    
    if not os.path.exists(input_img):
        print(f"Input file not found: {input_img}")
        exit(1)
        
    create_circular_favicon(input_img, output_img)
