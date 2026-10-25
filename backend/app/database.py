import os
from dotenv import load_dotenv
from libsql_client import create_client_sync

load_dotenv()

TURSO_DATABASE_URL = os.getenv("TURSO_DATABASE_URL")
TURSO_AUTH_TOKEN = os.getenv("TURSO_AUTH_TOKEN")

client = create_client_sync(
    url=TURSO_DATABASE_URL,
    auth_token=TURSO_AUTH_TOKEN,
)

def init_db():
    client.execute("""
        CREATE TABLE IF NOT EXISTS salary (
            id INTEGER PRIMARY KEY,
            source TEXT,
            amount REAL,
            description TEXT,
            updatedAt TEXT
        )
    """)
    client.execute("""
        CREATE TABLE IF NOT EXISTS transactions (
            id TEXT PRIMARY KEY,
            type TEXT,
            title TEXT,
            category TEXT,
            amount REAL,
            date TEXT,
            time TEXT,
            createdAt TEXT
        )
    """)

def get_salary():
    result = client.execute("SELECT * FROM salary WHERE id = 1")
    if not result.rows:
        return None
    row = result.rows[0]
    return {
        "source": row[1],
        "amount": row[2],
        "description": row[3],
        "updatedAt": row[4],
    }

def save_salary(salary):
    client.execute(
        "INSERT OR REPLACE INTO salary (id, source, amount, description, updatedAt) VALUES (1, ?, ?, ?, ?)",
        [salary["source"], salary["amount"], salary["description"], salary["updatedAt"]],
    )

def get_transactions():
    result = client.execute("SELECT * FROM transactions ORDER BY createdAt DESC")
    return [
        {
            "id": r[0], "type": r[1], "title": r[2], "category": r[3],
            "amount": r[4], "date": r[5], "time": r[6], "createdAt": r[7],
        }
        for r in result.rows
    ]

def add_transaction(tx):
    client.execute(
        "INSERT INTO transactions (id, type, title, category, amount, date, time, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
        [tx["id"], tx["type"], tx["title"], tx["category"], tx["amount"], tx["date"], tx["time"], tx["createdAt"]],
    )