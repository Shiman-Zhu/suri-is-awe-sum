import re

# Input URLs
urls = [
    input(),
    input()
]

# Regex to extract lat/lng
pattern = re.compile(r"lat=([-\d.]+)&lng=([-\d.]+)")

# Store extracted values
coords = []

for url in urls:
    match = pattern.search(url)
    if match:
        lat = float(match.group(1))
        lng = float(match.group(2))
        coords.append((lat, lng))

if coords:
    # Separate into lats and lngs
    lats = [lat for lat, lng in coords]
    lngs = [lng for lat, lng in coords]

    maxLat = max(lats)
    minLat = min(lats)
    maxLon = max(lngs)
    minLon = min(lngs)

    # Format: maxLon maxLat minLon minLat
    output_line = f"{maxLon} {maxLat} {minLon} {minLat}"

    # Write to a file
    with open("coordinates.txt", "w") as f:
        f.write(output_line + "\n")

    print("Extraction complete! Saved to output.txt")
else:
    print("No coordinates found in the input URLs.")
