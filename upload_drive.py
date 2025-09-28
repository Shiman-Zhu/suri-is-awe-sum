from googleapiclient.discovery import build
from googleapiclient.http import MediaFileUpload
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request
import os
import pickle
import requests

# ====== Google Maps Street View ======
API_KEY = input("Enter your Google Maps API key: ")
location = input("Enter location for Street View (e.g., Toronto): ")
url = f"https://maps.googleapis.com/maps/api/streetview?size=600x300&location={location}&key={API_KEY}"

response = requests.get(url)
streetview_file = "streetview.jpg"
with open(streetview_file, "wb") as f:
    f.write(response.content)
print(f"Downloaded Street View image: {streetview_file}")

# ====== Google Drive OAuth Settings ======
SCOPES = ['https://www.googleapis.com/auth/drive.file']  # File-level access

def authenticate():
    creds = None
    # Check if token.pickle exists
    if os.path.exists('token.pickle'):
        with open('token.pickle', 'rb') as token_file:
            creds = pickle.load(token_file)

    # If no valid credentials, go through OAuth flow
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            client_id = input("Enter your OAuth client ID: ")
            client_secret = input("Enter your OAuth client secret: ")
            # Save client info temporarily to a JSON for InstalledAppFlow
            client_config = {
                "installed": {
                    "client_id": client_id,
                    "client_secret": client_secret,
                    "redirect_uris": ["http://localhost"],
                    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
                    "token_uri": "https://oauth2.googleapis.com/token"
                }
            }

            import json, tempfile
            with tempfile.NamedTemporaryFile(mode="w+", delete=False, suffix=".json") as tmp:
                json.dump(client_config, tmp)
                tmp_path = tmp.name

            flow = InstalledAppFlow.from_client_secrets_file(tmp_path, SCOPES)
            # Offline access + include granted scopes
            creds = flow.run_local_server(port=8080, prompt='consent')
            os.unlink(tmp_path)  # remove temp file

        # Save the credentials for next run
        with open('token.pickle', 'wb') as token_file:
            pickle.dump(creds, token_file)

    return creds

def upload_to_drive(file_path, file_name):
    creds = authenticate()
    service = build('drive', 'v3', credentials=creds)

    file_metadata = {'name': file_name}
    media = MediaFileUpload(file_path, resumable=True)
    uploaded_file = service.files().create(
        body=file_metadata, media_body=media, fields='id'
    ).execute()

    print(f"Uploaded file '{file_name}' with ID: {uploaded_file.get('id')}")

if __name__ == '__main__':
    upload_to_drive(streetview_file, "streetview_upload.jpg")
