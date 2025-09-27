from flask import Flask, request, render_template_string
import googlemaps
import polyline
import os

app = Flask(__name__)

# Replace with your Google Maps API key
API_KEY = 'YOUR_GOOGLE_MAPS_API_KEY'

# Initialize Google Maps client
gmaps = googlemaps.Client(key=API_KEY)

# HTML template for the input form
FORM_TEMPLATE = '''
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Street View Route Images</title>
</head>
<body>
    <h1>Enter Origin and Destination</h1>
    <form method="POST">
        <label for="origin">Origin (address or lat,lon):</label><br>
        <input type="text" id="origin" name="origin" required><br><br>
        <label for="destination">Destination (address or lat,lon):</label><br>
        <input type="text" id="destination" name="destination" required><br><br>
        <input type="submit" value="Get Street View Images">
    </form>
</body>
</html>
'''

# HTML template for displaying images
IMAGES_TEMPLATE = '''
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Street View Images Along Route</title>
</head>
<body>
    <h1>Street View Images from {{ origin }} to {{ destination }}</h1>
    {% for url in image_urls %}
        <img src="{{ url }}" alt="Street View Image" style="width:600px; height:300px; display:block; margin:10px auto;"><br>
    {% endfor %}
    <a href="/">Back to Form</a>
</body>
</html>
'''

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        origin = request.form['origin']
        destination = request.form['destination']
        
        try:
            # Get directions
            directions = gmaps.directions(origin, destination, mode='driving')
            if not directions:
                return "No route found.", 400
            
            # Extract the route polyline
            route = directions[0]['overview_polyline']['points']
            
            # Decode polyline to get list of lat/lon points
            waypoints = polyline.decode(route)
            
            # Sample points along the route (e.g., every 10th point)
            sampled_points = waypoints[::10]  # Adjust for more/less images
            
            # Generate Street View image URLs
            image_urls = []
            for lat, lon in sampled_points:
                url = f"https://maps.googleapis.com/maps/api/streetview?size=600x300&location={lat},{lon}&heading=0&key={API_KEY}"
                image_urls.append(url)
            
            # Render the images page
            return render_template_string(IMAGES_TEMPLATE, origin=origin, destination=destination, image_urls=image_urls)
        
        except Exception as e:
            return f"Error: {str(e)}", 500
    
    # Show form on GET
    return render_template_string(FORM_TEMPLATE)

if __name__ == '__main__':
    app.run(debug=True)