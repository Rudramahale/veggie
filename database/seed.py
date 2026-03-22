import os
from dotenv import load_dotenv
import mysql.connector

# Load environment variables
dotenv_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), '.env')
load_dotenv(dotenv_path)

DB_HOST = os.getenv("DB_HOST", "localhost")
DB_PORT = os.getenv("DB_PORT", "3306")
DB_NAME = os.getenv("DB_NAME", "ecommerce_db")
DB_USER = os.getenv("DB_USER", "root")
DB_PASSWORD = os.getenv("DB_PASSWORD", "")

def seed_database():
    conn = mysql.connector.connect(
        host=DB_HOST,
        port=DB_PORT,
        user=DB_USER,
        password=DB_PASSWORD,
        database=DB_NAME
    )
    cursor = conn.cursor()

    # 1. Create tables
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS categories (
        id INT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    """)

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS products (
        id INT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        price DECIMAL(10,2) NOT NULL,
        stock_quantity INT NOT NULL DEFAULT 100,
        category_id INT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (category_id) REFERENCES categories(id)
    )
    """)

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS product_images (
        id INT AUTO_INCREMENT PRIMARY KEY,
        product_id INT,
        image_url VARCHAR(255) NOT NULL,
        is_primary BOOLEAN DEFAULT 1,
        FOREIGN KEY (product_id) REFERENCES products(id)
    )
    """)

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255),
        phone VARCHAR(20) UNIQUE,
        role VARCHAR(50) DEFAULT 'customer',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
    """)

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS addresses (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT,
        full_name VARCHAR(255) NOT NULL,
        phone VARCHAR(20) NOT NULL,
        address_line1 VARCHAR(255) NOT NULL,
        address_line2 VARCHAR(255),
        city VARCHAR(100) NOT NULL,
        state VARCHAR(100) NOT NULL,
        pincode VARCHAR(20) NOT NULL,
        country VARCHAR(100) NOT NULL,
        is_default BOOLEAN DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id)
    )
    """)

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS orders (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT,
        address_id INT,
        total_amount DECIMAL(10,2) NOT NULL,
        status VARCHAR(50) DEFAULT 'pending',
        payment_status VARCHAR(50) DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (address_id) REFERENCES addresses(id)
    )
    """)

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS order_items (
        id INT AUTO_INCREMENT PRIMARY KEY,
        order_id INT,
        product_id INT,
        quantity INT DEFAULT 1,
        price DECIMAL(10,2) NOT NULL,
        FOREIGN KEY (order_id) REFERENCES orders(id),
        FOREIGN KEY (product_id) REFERENCES products(id)
    )
    """)

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS payments (
        id INT AUTO_INCREMENT PRIMARY KEY,
        order_id INT,
        payment_method VARCHAR(50) NOT NULL,
        transaction_id VARCHAR(255),
        amount DECIMAL(10,2) NOT NULL,
        status VARCHAR(50) DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (order_id) REFERENCES orders(id)
    )
    """)

    # 2. Insert Categories
    categories = [
        (1, 'VEGETABLES', 'Fresh vegetables'),
        (2, 'EXOTIC VEGETABLES', 'Premium and exotic vegetables'),
        (3, 'FRUITS', 'Fresh seasonal fruits')
    ]
    cursor.executemany(
        "INSERT IGNORE INTO categories (id, name, description) VALUES (%s, %s, %s)",
        categories
    )

    # 3. Product Data
    vegetables = [
        (1, 'Beetroot', 'Weight: 500 g', 30, 1, '/src/assets/images/Beetroot.jpg'),
        (2, 'Brinjal', 'Weight: 500 g', 20, 1, '/src/assets/images/Brinjal.jpg'),
        (3, 'Chilli', 'Weight: 100 g', 15, 1, '/src/assets/images/CHILLI.jpg'),
        (4, 'Cabbage', 'Weight: 1 pc', 40, 1, '/src/assets/images/Cabbage.jpg'),
        (5, 'Cucumber', 'Weight: 500 g', 25, 1, '/src/assets/images/Cucumber.jpg'),
        (6, 'Okra', 'Weight: 500 g', 40, 1, '/src/assets/images/Okra.jpg'),
        (7, 'Potato', 'Weight: 1 kg', 30, 1, '/src/assets/images/Potato.jpg'),
        (8, 'Tomato', 'Weight: 1 kg', 40, 1, '/src/assets/images/Tomato.jpg'),
        (9, 'Bhopla', 'Weight: 1 kg', 60, 1, '/src/assets/images/bhopla.jpg'),
        (10, 'Capsicum', 'Weight: 500 g', 45, 1, '/src/assets/images/capsicum.jpg'),
        (11, 'Carrot', 'Weight: 500 g', 35, 1, '/src/assets/images/carrot.jpg'),
        (12, 'Cauliflower', 'Weight: 1 pc', 50, 1, '/src/assets/images/cauliflower.jpg'),
        (13, 'Ginger', 'Weight: 100 g', 20, 1, '/src/assets/images/ginger.jpg'),
        (14, 'Onion', 'Weight: 1 kg', 30, 1, '/src/assets/images/onion.jpg'),
        (15, 'Tondali', 'Weight: 250 g', 25, 1, '/src/assets/images/tondali.jpg'),
    ]

    exotic = [
        (16, 'Broccoli', 'Weight: 1 pc', 120, 2, '/src/assets/images/broccoli.jpg'),
        (17, 'English Cucumber', 'Weight: 1 pc', 50, 2, '/src/assets/images/englishcucumber.jpg'),
        (18, 'Iceburg Lettuce', 'Weight: 1 pc', 80, 2, '/src/assets/images/iceburg.jpg'),
        (19, 'Red Cabbage', 'Weight: 1 pc', 100, 2, '/src/assets/images/redcabbage.jpg'),
        (20, 'Red & Yellow Capsicum', 'Weight: 500 g', 150, 2, '/src/assets/images/rednyellowcapsicum.jpg'),
        (21, 'Zucchini', 'Weight: 500 g', 90, 2, '/src/assets/images/zucchini.jpg'),
    ]

    fruits = [
        (22, 'Banana', 'Weight: 1 dozen', 60, 3, '/src/assets/images/banana.jpg'),
        (23, 'Guava', 'Weight: 500 g', 50, 3, '/src/assets/images/guava.jpg'),
        (24, 'Lemon', 'Weight: 250 g', 30, 3, '/src/assets/images/lemon.jpg'),
        (25, 'Mosambi', 'Weight: 1 kg', 80, 3, '/src/assets/images/Mosambi.png'),
        (26, 'Muskmelon', 'Weight: 1 pc', 70, 3, '/src/assets/images/Muskmelon.jpg'),
        (27, 'Papaya', 'Weight: 1 pc', 60, 3, '/src/assets/images/papaya.jpg'),
        (28, 'Pomegranate', 'Weight: 500 g', 120, 3, '/src/assets/images/pomegrante.jpg'),
        (29, 'Watermelon', 'Weight: 1 pc', 90, 3, '/src/assets/images/Watermelon.jpg'),
    ]

    all_items = vegetables + exotic + fruits

    product_records = [(item[0], item[1], item[2], item[3], 100, item[4]) for item in all_items]
    cursor.executemany(
        """
        INSERT IGNORE INTO products (id, name, description, price, stock_quantity, category_id)
        VALUES (%s, %s, %s, %s, %s, %s)
        """,
        product_records
    )

    image_records = [(item[0], item[5], 1) for item in all_items]
    cursor.executemany(
        """
        INSERT IGNORE INTO product_images (product_id, image_url, is_primary)
        VALUES (%s, %s, %s)
        """,
        image_records
    )

    conn.commit()
    cursor.close()
    conn.close()
    print("✅ Seeded categories, products, and product_images successfully.")

if __name__ == "__main__":
    seed_database()
