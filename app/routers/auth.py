from fastapi import APIRouter, HTTPException, Depends
from asyncpg.pool import Pool
from ..utils.security import get_password_hash, create_access_token
from ..models.developer import create_tables

router = APIRouter()

async def get_db(request):
    return request.app.state.db

@router.post("/signup")
async def signup(
    email: str, 
    password: str,
    db: Pool = Depends(get_db)
):
    # Check if email exists
    exists = await db.fetchval("SELECT 1 FROM developers WHERE email = $1", email)
    if exists:
        raise HTTPException(400, "Email already registered")
    
    # Hash password
    hashed = get_password_hash(password)
    
    # Create developer
    dev_id = await db.fetchval(
        "INSERT INTO developers (email, password_hash) VALUES ($1, $2) RETURNING id",
        email, hashed
    )
    
    return {"id": dev_id, "email": email}

@router.post("/token")
async def login(email: str, password: str, db: Pool = Depends(get_db)):
    dev = await db.fetchrow(
        "SELECT id, password_hash FROM developers WHERE email = $1", 
        email
    )
    
    if not dev or not verify_password(password, dev["password_hash"]):
        raise HTTPException(401, "Invalid credentials")
    
    token = create_access_token({"sub": str(dev["id"])})
    return {"access_token": token}
