from google import genai
from google.genai import types
from PIL import Image
import io


# The client gets the API key from the environment variable `GEMINI_API_KEY`.
"""
client = genai.Client()

response = client.models.generate_content(
    model="gemini-2.5-flash", contents="What is HSR?"
)
print(response.text)
"""

client = genai.Client()

response = client.models.generate_content(
    model="gemini-2.5-flash",
    contents="Explain how AI works in a few words",
    config=types.GenerateContentConfig(
        thinking_config=types.ThinkingConfig(thinking_budget=0) # Disables thinking
    ),
)

image = Image.open("Waterloo_sign_1000x700.jpg")   

response = client.models.generate_content(
    model="gemini-2.5-flash",
    contents=[image, "Write a description for this location so users know how to navigate it."]
)

print(response.text)
