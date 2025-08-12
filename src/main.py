from fastapi import FastAPI
from asyncpg import create_pool
from .config import settings
from .routers import auth, email_verification
import asyncpg

app = FastAPI()

@app.on_event("startup")
async def startup():
    app.state.db = await create_pool(settings.db_url)
    async with app.state.db.acquire() as conn:
        await asyncpg.connect(conn).create_tables()

app.include_router(auth.router, prefix="/auth")
app.include_router(email_verification.router, prefix="/verify")
