import mysql.connector
from dotenv import load_dotenv
import os

# Load database credentials from the root .env file
root_env_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), '.env')
load_dotenv(root_env_path)

def clear_database():
    try:
        # Connect to MySQL database
        conn = mysql.connector.connect(
            host=os.getenv('DB_HOST', 'localhost'),
            port=int(os.getenv('DB_PORT', 3306)),
            database=os.getenv('DB_NAME', 'ecommerce_db'),
            user=os.getenv('DB_USER', 'root'),
            password=os.getenv('DB_PASSWORD', '')
        )
        cursor = conn.cursor()

        # Disable foreign key checks so we don't get relationship constraint errors while wiping
        cursor.execute("SET FOREIGN_KEY_CHECKS = 0;")

        # Fetch all tables in the database dynamically
        cursor.execute("SHOW TABLES;")
        tables = [table[0] for table in cursor.fetchall()]

        print(f"Found {len(tables)} tables. Clearing database...")
        
        # Tables we do not want to wipe
        tables_to_skip = ['django_migrations', 'categories', 'products', 'product_images']

        for table in tables:
            if table not in tables_to_skip:
                cursor.execute(f"TRUNCATE TABLE `{table}`;")
                print(f"✅ Cleared table: {table}")

        # Re-enable foreign key checks to restore database safety
        cursor.execute("SET FOREIGN_KEY_CHECKS = 1;")
        
        conn.commit()
        print("\n🎉 Database successfully reset! All tables now have 0 entries.")

    except mysql.connector.Error as err:
        print(f"Error connecting to MySQL: {err}")
    finally:
        if 'conn' in locals() and conn.is_connected():
            cursor.close()
            conn.close()

if __name__ == "__main__":
    print("⚠️  WARNING: This will wipe ALL DATA from your database (Users, Orders, Carts, etc.)")
    confirm = input("Are you absolutely sure you want to proceed? (y/n): ")
    if confirm.lower() == 'y':
        clear_database()
    else:
        print("Operation cancelled. Your database is safe!")
