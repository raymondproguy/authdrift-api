from pydantic_settings import BaseSettings
from pathlib import Path

class Settings(BaseSettings):
    db_url: str
    jwt_secret: str
    smtp_host: str
    smtp_port: int
    smtp_user: str
    smtp_pass: str
    
    class Config:
        env_file = Path(__file__).parent.parent / '.env'

settings = Settings()
