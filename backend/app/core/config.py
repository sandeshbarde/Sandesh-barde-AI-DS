import os
from typing import List, Optional
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    APP_NAME: str = "Sandesh Barde Portfolio API"
    APP_ENV: str = "development"
    API_V1_STR: str = "/api/v1"
    
    # Server & CORS
    FRONTEND_ORIGIN: str = "http://localhost:5173"
    PUBLIC_SITE_URL: Optional[str] = None
    
    # Database
    DATABASE_URL: str = "sqlite:///./portfolio.db"
    
    # Security
    SESSION_SECRET: str = "c9b2f4a18e03d7c5819034e62a1b75df98412e604719283f5c71b0293847561a"
    COOKIE_NAME: str = "admin_session"
    COOKIE_SECURE: bool = False
    SESSION_MAX_AGE_HOURS: int = 12
    
    # Admin Bootstrap
    ADMIN_BOOTSTRAP_EMAIL: Optional[str] = "sandeshbarde2214@gmail.com"
    ADMIN_BOOTSTRAP_PASSWORD: Optional[str] = None
    
    # Email Settings
    MAIL_HOST: Optional[str] = None
    MAIL_PORT: int = 587
    MAIL_USERNAME: Optional[str] = None
    MAIL_PASSWORD: Optional[str] = None
    MAIL_FROM: Optional[str] = None
    CONTACT_RECEIVER_EMAIL: str = "sandeshbarde2214@gmail.com"
    
    # Uploads
    UPLOAD_DIR: str = "./uploads"
    MAX_UPLOAD_MB: int = 5

    @property
    def cors_origins(self) -> List[str]:
        origins = [self.FRONTEND_ORIGIN.rstrip("/"), "http://localhost:5173", "http://127.0.0.1:5173"]
        if self.PUBLIC_SITE_URL:
            origins.append(self.PUBLIC_SITE_URL.rstrip("/"))
        return list(set(origins))

    class Config:
        env_file = ".env"
        extra = "ignore"

settings = Settings()
