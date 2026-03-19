import os
import mysql.connector
from dotenv import load_dotenv

# Load environment variables
dotenv_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), '.env')
load_dotenv(dotenv_path)

DB_HOST = os.getenv("DB_HOST", "localhost")
DB_PORT = os.getenv("DB_PORT", "3306")
DB_NAME = os.getenv("DB_NAME", "ecommerce_db")
DB_USER = os.getenv("DB_USER", "root")
DB_PASSWORD = os.getenv("DB_PASSWORD", "")

def display_tables():
    conn = mysql.connector.connect(
        host=DB_HOST,
        port=DB_PORT,
        user=DB_USER,
        password=DB_PASSWORD,
        database=DB_NAME
    )
    cursor = conn.cursor()

    def print_table(table_name):
        print(f"\n--- {table_name.upper()} ---")
        cursor.execute(f"SELECT * FROM {table_name}")
        rows = cursor.fetchall()
        columns = [desc[0] for desc in cursor.description]
        print(" | ".join(columns))
        print("-" * 50)
        for row in rows:
            print(" | ".join(str(val) for val in row))
        print(f"Total rows: {len(rows)}\n")

    print_table("categories")
    print_table("products")
    print_table("product_images")

    cursor.close()
    conn.close()

if __name__ == "__main__":
    display_tables()
