import os
from dotenv import load_dotenv
import mysql.connector

# load .env file
load_dotenv()

DB_HOST = os.getenv("DB_HOST")
DB_PORT = os.getenv("DB_PORT")
DB_NAME = os.getenv("DB_NAME")
DB_USER = os.getenv("DB_USER")
DB_PASSWORD = os.getenv("DB_PASSWORD")

try:
    conn = mysql.connector.connect(
        host=DB_HOST, port=DB_PORT, user=DB_USER, password=DB_PASSWORD, database=DB_NAME
    )

    if conn.is_connected():
        print("✅ Database connected successfully!")

except Exception as e:
    print("❌ Database connection failed")
    print(e)

finally:
    if "conn" in locals() and conn.is_connected():
        conn.close()
