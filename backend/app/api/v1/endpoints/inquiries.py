from fastapi import APIRouter, Depends, Request, BackgroundTasks, status
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.models.models import Inquiry
from app.schemas.schemas import InquiryCreate
from app.services.email import send_inquiry_notification

router = APIRouter()

@router.post("/inquiries", status_code=status.HTTP_201_CREATED)
def submit_inquiry(
    inquiry_in: InquiryCreate,
    request: Request,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db)
):
    # 1. Honeypot check: If the hidden 'hp' field is populated, bot detected.
    # Return 200/201 success silently without storing spam or sending emails.
    if inquiry_in.hp and inquiry_in.hp.strip():
        return {
            "success": True,
            "message": "Thank you! Your message has been received."
        }

    # 2. Extract Client IP
    client_ip = request.client.host if request.client else None

    # 3. Create and commit inquiry to database
    inquiry = Inquiry(
        name=inquiry_in.name.strip(),
        email=inquiry_in.email.strip().lower(),
        project_type=inquiry_in.project_type.strip(),
        budget=inquiry_in.budget.strip() if inquiry_in.budget else None,
        message=inquiry_in.message.strip(),
        status="new",
        ip_address=client_ip
    )
    db.add(inquiry)
    db.commit()
    db.refresh(inquiry)

    # 4. Dispatch email notification in background (failsafe)
    background_tasks.add_task(
        send_inquiry_notification,
        name=inquiry.name,
        email=inquiry.email,
        project_type=inquiry.project_type,
        budget=inquiry.budget or "",
        message=inquiry.message
    )

    return {
        "success": True,
        "message": "Thank you! Your inquiry has been received. Sandesh will get back to you shortly."
    }
