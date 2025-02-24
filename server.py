import os
import json
import verification
from PIL import Image
from flask_cors import CORS
from serpapi import GoogleSearch
import google.generativeai as genai
from flask import Flask, request, jsonify

genai.configure(api_key='AIzaSyC72fWC2qpaib8kRp7Buirk0EbHKW5aBO4')

app = Flask(__name__)
CORS(app)

def generate_project_options(items):
    model = genai.GenerativeModel("gemini-2.0-flash-exp")
    prompt = f"""
    Suggest 3 projects or recipes that can be made using {items}.
    Categorize them into easy, intermediate, and difficult levels.
    For each project, provide:
    1. A short description.
    2. A list of extra items required (if any).
    Return the response in the following JSON format:
    {{
        "easy": {{
            "title": "Project Title",
            "description": "Project Description",
            "extra_items": ["Item 1", "Item 2"]
        }},
        "intermediate": {{
            "title": "Project Title",
            "description": "Project Description",
            "extra_items": ["Item 1", "Item 2"]
        }},
        "difficult": {{
            "title": "Project Title",
            "description": "Project Description",
            "extra_items": ["Item 1", "Item 2"]
        }}
    }}
    """
    response = model.generate_content(prompt)
    return response.text

def generate_project_steps(project):
    model = genai.GenerativeModel("gemini-2.0-flash-exp")
    prompt = f"Provide detailed steps to {project}."
    response = model.generate_content(prompt)
    return response.text

def chat_with_gemini(prompt):
    model = genai.GenerativeModel("gemini-2.0-flash-exp")
    response = model.generate_content(prompt)
    return response.text

def clean_json(json_string):
    # Ensure the string is properly formatted JSON
    json_string = json_string.strip("```json\n").strip("```")

    try:
        data = json.loads(json_string)  # Attempt to parse JSON
    except json.JSONDecodeError:
        print("Error: Invalid JSON format")
        return []

    # Convert to desired format
    cleaned_data = []
    for difficulty, details in data.items():
        if isinstance(details, dict):
            cleaned_data.append({
                "difficulty": difficulty,
                "title": details.get("title", "Unknown Title"),
                "description": details.get("description", "No description available"),
                "extra_items": details.get("extra_items", []),
                "steps": clean_response(generate_project_steps(details.get("title", "Unknown Title")))
            })

    return cleaned_data

def clean_response(data):
    return '\n'.join(data.split('\n')[1:])

@app.route("/validate", methods=["POST"])
def validate_user():
    data = request.get_json()
    userid = data.get("userid")
    password = data.get("password")

    return verification.validate(userid, password)

@app.route("/add", methods=["POST"])
def add_users():
    data = request.get_json()
    userid = data.get("userid")
    password = data.get("password")

    return verification.add_user(userid, password)

# files = {"image": open(r"C:\Visual Studio Code\SNUC Hacks\BackEnd\test_image.jpg", "rb")}
@app.route("/process-image", methods=["POST"])
def process_image():
    if "image" not in request.files:
        return jsonify({"error": "No image file provided"}), 400

    image_file = request.files["image"]  # Get image from FormData
    image = Image.open(image_file)

    model = genai.GenerativeModel("gemini-2.0-flash-exp")

    response = model.generate_content(["Give me ONLY the names of the items present in this image as a list of strings and nothing more", image])

    detected_items = response.text

    project_options = generate_project_options(detected_items)

    return jsonify({
        "detected_items": detected_items.split('```')[0],
        "project_options": clean_json(project_options)
    })

# data = {'selected_project': 'Morse Code Generator (Minimal)'}
@app.route("/get-steps", methods=["POST"])
def get_steps():

    data = request.json
    selected_project = data.get("selected_project")

    if not selected_project:
        return jsonify({"error": "No project selected"}), 400

    steps = generate_project_steps(selected_project)

    return jsonify({
        "selected_project": selected_project,
        "steps": clean_response(steps)
    })

# data = {'prompt': 'Morse Code Generator (Minimal)'}
@app.route("/chat", methods=["POST"])
def chat():

    data = request.json
    user_prompt = data.get("prompt")

    if not user_prompt:
        return jsonify({"error": "No prompt provided"}), 400

    response = chat_with_gemini(user_prompt)

    return jsonify({
        "response": response
    })

@app.route("/", methods=["GET"])
def home():
    return "Flask Server is Running!"

@app.route("/get_link", methods=["POST"])
def get_link():

    data = request.get_json()

    if not data or "query" not in data:
        return jsonify({"status": "error", "message": "Missing query parameter"}), 400

    query = data["query"]

    api_key = os.getenv("SERPAPI")
    if not api_key:
        return jsonify({"status": "error", "message": "Missing API Key"}), 500

    params = {
    "api_key": api_key,
    "engine": "google",
    "q": f"{query} site:amazon.in OR site:flipkart.com",
    "location": "India",
    "google_domain": "google.co.in",
    "gl": "in",
    "hl": "en",
    "safe": "off"
    }

    search = GoogleSearch(params)
    results = search.get_dict()

    if "organic_results" in results and len(results["organic_results"]) > 0:
        return jsonify({"status": "success", "link": results["organic_results"][0]["link"]})
    else:
        return jsonify({"status": "error", "message": "No results found"}), 404

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
