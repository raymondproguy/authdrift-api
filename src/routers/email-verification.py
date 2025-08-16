from fastapi import APIRouter, BackgroundTasks
from ..utils.email import send_verification_email
import secrets
from datetime import datetime, timedelta

router = APIRouter()

@router.post("/send-verification")
async def send_verification(
    developer_id: int,
    email: str,
    background_tasks: BackgroundTasks,
    db: Pool = Depends(get_db)
):
    token = secrets.token_urlsafe(32)
    expires = datetime.utcnow() + timedelta(hours=24)
    
    await db.execute(
        "INSERT INTO email_verification_tokens (developer_id, token, expires_at) VALUES ($1, $2, $3)",
        developer_id, token, expires
    )
    
    background_tasks.add_task(
        send_verification_email,
        email=email,
        token=token
    )
    
    return {"status": "email_sent"}
