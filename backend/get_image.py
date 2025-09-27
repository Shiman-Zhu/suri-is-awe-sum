import googlemaps
from PIL import Image  # For saving images
import requests
import io

# Initialize the client with your API key
gmaps = googlemaps.Client(key='YOUR_GOOGLE_MAPS_API_KEouce')

# Step 1: Get directions from A to B (e.g., New York to Boston)
origin = '40.7128,-74.0060'  # Lat,Lon for A (NYC)
destination = '42.3601,-71.0589'  # Lat,Lon for B (Boston)
directions = gmaps.directions(origin, destination, mode='driving')

# Extract the route polyline (encoded path)
route = directions[0]['overview_polyline']['points']

# Decode polyline to get list of lat/lon points along the route
# (Use a polyline decoder; here's a simple one using the 'polyline' library: pip install polyline)
import polyline
waypoints = polyline.decode(route)  # List of (lat, lon) tuples

# Step 2: Sample points along the route (e.g., every 10th point for ~200 images)
sampled_points = waypoints[::10]  # Adjust slicing for density

# Fetch and save Street View images
for i, (lat, lon) in enumerate(sampled_points):
    # Static Street View API URL (size=600x300, heading=0 for north-facing)
    url = f"https://maps.googleapis.com/maps/api/streetview?size=600x300&location={lat},{lon}&heading=0&key=YOUR_GOOGLE_MAPS_API_KEY"
    
    response = requests.get(url)
    if response.status_code == 200:
        img = Image.open(io.BytesIO(response.content))
        img.save(f'streetview_{i}.jpg')
        print(f"Saved image {i} at {lat}, {lon}")
    else:
        print(f"Failed to fetch image {i}")