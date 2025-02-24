import os
import mysql.connector
from flask import jsonify
from dotenv import load_dotenv
from cryptography.fernet import Fernet

load_dotenv()
conn = mysql.connector.connect(
    host='localhost',
    user='root',
    password=os.getenv("MYSQL_PASSWORD"),
    database='snuchacks'
)

def get_encryption_key():
    """Retrieve encryption key from .env"""
    key = os.getenv("ENCRYPTION_KEY")
    if key is None:
        raise ValueError("Encryption key not found in .env")
    return key.encode()

key = get_encryption_key()
cipher = Fernet(key)

def encrypt(data:str):
    return cipher.encrypt(data.encode())

def decrypt(data):
    return cipher.decrypt(data).decode()

cursor = conn.cursor()

def add_user(user_id:str, password:str) -> bool:

    encrypted_user_id = encrypt(user_id)
    encrypted_password = encrypt(password)

    query = "INSERT INTO users (user_id, password) VALUES (%s, %s)"

    try:
        cursor.execute(query, (user_id, encrypted_password))
        conn.commit()
        return {"status": "success", "message": "User added successfully"}
    except mysql.connector.IntegrityError:
        return {"status": "error", "message": "User already exists"}
    except Exception as e:
        conn.rollback()
        return {"status": "error", "message": str(e)}

def validate(user_id: str, password: str):
    """Validates user login credentials."""
    if not user_id or not password:
        return jsonify({"status": "error", "message": "Missing userid or password"}), 400

    query = "SELECT password FROM users WHERE user_id = %s"
    cursor.execute(query, (user_id,))
    result = cursor.fetchone()

    if not result:
        return {"status": "error", "message": "User not found"}

    stored_password = decrypt(result[0])

    if stored_password != password:
        return {"status": "error", "message": "Invalid credentials"}

    return {"status": "success", "message": "User validated"}
