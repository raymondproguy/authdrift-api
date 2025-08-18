from asyncpg import Connection

async def create_tables(conn: Connection):
    await conn.execute('''
    CREATE TABLE IF NOT EXISTS developers (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        verified BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMPTZ DEFAULT NOW()
    );
    
    CREATE TABLE IF NOT EXISTS email_verification_tokens (
        token UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        developer_id INTEGER REFERENCES developers(id),
        expires_at TIMESTAMPTZ NOT NULL
    );
    ''')
