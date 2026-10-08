from PIL import Image

def remove_black_bg(input_path, output_path):
    # Open the image and convert to RGBA
    img = Image.open(input_path).convert("RGBA")
    data = img.getdata()
    
    new_data = []
    for item in data:
        # Get RGB values
        r, g, b, a = item
        
        # Calculate perceived brightness (luminance)
        luminance = (0.299*r + 0.587*g + 0.114*b)
        
        # We want to keep the gold and make the black transparent.
        # If it's pure black, alpha is 0. If it's bright gold, alpha is 255.
        # We can map luminance directly to alpha, or use a threshold/curve.
        
        # The gold is around #C9B27C -> rgb(201, 178, 124) -> luminance ~ 176
        # Black is 0.
        # Let's map alpha smoothly based on the max of RGB values to preserve the color but drop the black.
        
        # A simple method: alpha = max(r,g,b). 
        # But wait, if alpha is max(r,g,b), a pixel that is 100, 100, 100 becomes 100 alpha.
        # We must also 'un-premultiply' the RGB so that it retains its original hue when drawn with that alpha.
        # However, for a black background, the RGB is ALREADY premultiplied by black!
        # So we actually just need to use the luminance or max(rgb) as alpha, 
        # and set the RGB to the "un-premultiplied" color. Or since it's gold, we can just force the hue.
        
        # Actually, let's just make the alpha depend on luminance.
        # alpha = luminance * 255 / 176 (capped at 255)
        # But an easier way that works perfectly for 'screen' blending equivalent:
        # Just use the original RGB, and set alpha to the max of RGB.
        
        max_val = max(r, g, b)
        
        # To avoid dark halos, we can artificially boost the RGB to be the 'bright' version,
        # but since we want the EXACT artwork, setting alpha=max_val and leaving RGB as is 
        # works perfectly on white backgrounds IF we un-premultiply:
        if max_val > 0:
            new_r = int(min(255, r * 255 / max_val))
            new_g = int(min(255, g * 255 / max_val))
            new_b = int(min(255, b * 255 / max_val))
            
            # Since the logo is gold, let's ensure it doesn't get too white.
            # We'll just use alpha based on max_val, but applying a small curve to keep it crisp.
            # Let's just use alpha = max_val.
            new_data.append((new_r, new_g, new_b, max_val))
        else:
            new_data.append((0, 0, 0, 0))

    img.putdata(new_data)
    img.save(output_path, "PNG")

remove_black_bg("public/logo-original.jpg", "public/logo.png")
