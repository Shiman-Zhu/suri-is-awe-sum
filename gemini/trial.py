from google import genai
from google.genai import types
from PIL import Image
import io

# Initialize client (picks up GEMINI_API_KEY from env)
client = genai.Client()

# --- Example 1: Simple text prompt ---
response = client.models.generate_content(
    model="gemini-2.5-flash",
    contents="Explain how AI works in a few words",
    config=types.GenerateContentConfig(
        thinking_config=types.ThinkingConfig(thinking_budget=0)  # Disables thinking
    ),
)
print("Text-only response:")
print(response.text)
print("-" * 40)

# --- Example 2: Multimodal prompt with image ---
# Load image into bytes
with open("Waterloo_sign_1000x700.jpg", "rb") as f:
    image_bytes = f.read()

response = client.models.generate_content(
    model="gemini-2.5-flash",
    contents=[
        types.Part.from_image_data(image_bytes, mime_type="image/jpeg"),
        "Write a description for this location so users know how to navigate it."
    ]
)

print("Image + text response:")
print(response.text)
