import os
import mysql.connector
from dotenv import load_dotenv

dotenv_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), '.env')
load_dotenv(dotenv_path)

DB_HOST = os.getenv("DB_HOST", "localhost")
DB_PORT = os.getenv("DB_PORT", "3306")
DB_NAME = os.getenv("DB_NAME", "ecommerce_db")
DB_USER = os.getenv("DB_USER", "root")
DB_PASSWORD = os.getenv("DB_PASSWORD", "")

def generate_markdown():
    conn = mysql.connector.connect(
        host=DB_HOST,
        port=DB_PORT,
        user=DB_USER,
        password=DB_PASSWORD,
        database=DB_NAME
    )
    cursor = conn.cursor()

    with open(r"C:\Users\Lenovo\.gemini\antigravity\brain\db9e23d1-16b5-4572-a2d5-32689e5a51d4\database_tables.md", "w", encoding="utf-8") as f:
        f.write("# Database Tables\n\n")

        def write_table(table_name):
            f.write(f"## Table: {table_name}\n\n")
            cursor.execute(f"SELECT * FROM {table_name}")
            rows = cursor.fetchall()
            if not rows:
                f.write("*No rows found.*\n\n")
                return

            columns = [desc[0] for desc in cursor.description]
            f.write("| " + " | ".join(columns) + " |\n")
            f.write("|" + "|".join(["---"] * len(columns)) + "|\n")
            
            for row in rows:
                f.write("| " + " | ".join(str(val) for val in row) + " |\n")
            
            f.write(f"\n*(Total rows: {len(rows)})*\n\n")

        write_table("categories")
        write_table("products")
        write_table("product_images")

    cursor.close()
    conn.close()

if __name__ == "__main__":
    generate_markdown()
