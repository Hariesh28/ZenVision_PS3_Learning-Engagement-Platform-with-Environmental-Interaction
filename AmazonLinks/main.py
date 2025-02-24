from serpapi import GoogleSearch
import os
import dotenv

dotenv.load_dotenv()

def get_link(data):

    params = {
    "api_key": os.getenv("SERPAPI"),
    "engine": "google",
    "q": f"{data} site:amazon.in OR site:flipkart.com",
    "location": "India",
    "google_domain": "google.co.in",
    "gl": "in",
    "hl": "en",
    "safe": "off"
    }

    search = GoogleSearch(params)
    results = search.get_dict()

    if "organic_results" in results and len(results["organic_results"]) > 0:
        return results["organic_results"][0]["link"]
    else:
        print("No organic results found.")
        return None

print(get_link('Audrino'))
