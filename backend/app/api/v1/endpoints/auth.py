import datetime
from fastapi import APIRouter, Depends, HTTPException, Response, Request, status
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.models.models import AdminUser, AdminSession, AdminAuditLog
from app.schemas.schemas import LoginRequest, AdminUserOut
from app.core.security import verify_password, generate_session_token, hash_session_token
from app.core.config import settings

router = APIRouter()

def get_current_admin(request: Request, db: Session = Depends(get_db)) -> AdminUser:
    token = request.cookies.get(settings.COOKIE_NAME)
    if not token:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Not authenticated")
    
    token_hash = hash_session_token(token)
    session_record = db.query(AdminSession).filter_by(token_hash=token_hash).first()
    
    if not session_record:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Session expired or invalid")
    
    # Check expiry
    now_utc = datetime.datetime.now(datetime.timezone.utc)
    # Ensure timezone aware comparison
    expires_at = session_record.expires_at
    if expires_at.tzinfo is None:
        expires_at = expires_at.replace(tzinfo=datetime.timezone.utc)
        
    if expires_at < now_utc:
        db.delete(session_record)
        db.commit()
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Session expired")
    
    user = db.query(AdminUser).filter_by(id=session_record.user_id, is_active=True).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="User account disabled or deleted")
    
    return user

@router.post("/login")
def admin_login(
    login_data: LoginRequest,
    request: Request,
    response: Response,
    db: Session = Depends(get_db)
):
    user = db.query(AdminUser).filter_by(email=login_data.email.strip().lower()).first()
    if not user or not verify_password(login_data.password, user.hashed_password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid email or password")
    
    if not user.is_active:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Account is disabled")

    # Generate secure session token and hash
    raw_token = generate_session_token()
    token_hash = hash_session_token(raw_token)
    expires_at = datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(hours=settings.SESSION_MAX_AGE_HOURS)

    # Save session
    client_ip = request.client.host if request.client else None
    user_agent = request.headers.get("user-agent", "")[:250]
    
    session_record = AdminSession(
        user_id=user.id,
        token_hash=token_hash,
        expires_at=expires_at,
        ip_address=client_ip,
        user_agent=user_agent
    )
    db.add(session_record)

    # Update last login
    user.last_login = datetime.datetime.now(datetime.timezone.utc)
    
    # Audit log
    audit = AdminAuditLog(
        user_id=user.id,
        action="LOGIN",
        entity_type="admin_users",
        entity_id=str(user.id),
        ip_address=client_ip
    )
    db.add(audit)
    db.commit()

    # Set secure HttpOnly cookie
    max_age_seconds = settings.SESSION_MAX_AGE_HOURS * 3600
    response.set_cookie(
        key=settings.COOKIE_NAME,
        value=raw_token,
        max_age=max_age_seconds,
        httponly=True,
        samesite="lax",
        secure=settings.COOKIE_SECURE
    )

    return {
        "success": True,
        "user": AdminUserOut.model_validate(user)
    }

@router.post("/logout")
def admin_logout(
    request: Request,
    response: Response,
    db: Session = Depends(get_db)
):
    token = request.cookies.get(settings.COOKIE_NAME)
    if token:
        token_hash = hash_session_token(token)
        db.query(AdminSession).filter_by(token_hash=token_hash).delete()
        db.commit()

    response.delete_cookie(
        key=settings.COOKIE_NAME,
        httponly=True,
        samesite="lax"
    )
    return {"success": True, "message": "Successfully logged out"}

@router.get("/me", response_model=AdminUserOut)
def get_current_admin_user(current_user: AdminUser = Depends(get_current_admin)):
    return current_user
