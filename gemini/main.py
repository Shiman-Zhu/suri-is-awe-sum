from google import genai
from google.genai import types
from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from PIL import Image
import os


# The client gets the API key from the environment variable `GEMINI_API_KEY`.
"""
client = genai.Client()

response = client.models.generate_content(
    model="gemini-2.5-flash", contents="What is HSR?"
)
print(response.text)
"""
app = FastAPI()
app.add_middleware(
    allow_origin=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/gemini")
def get_genimi_response(prompt:str):
    client = genai.Client()

    image = Image.open("Waterloo_sign_1000x700.jpg")   

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=[image, prompt],
    )

    return response

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0",port =5000)
