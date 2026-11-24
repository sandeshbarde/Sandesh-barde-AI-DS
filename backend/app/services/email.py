import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import logging
from app.core.config import settings

logger = logging.getLogger("email_service")

def send_inquiry_notification(name: str, email: str, project_type: str, budget: str, message: str) -> bool:
    """Send an email notification to the owner about a new inquiry if SMTP is configured."""
    if not settings.MAIL_HOST or not settings.MAIL_USERNAME or not settings.MAIL_PASSWORD:
        logger.info("SMTP not configured. Skipping email dispatch (inquiry is safely saved in DB).")
        return False

    try:
        msg = MIMEMultipart("alternative")
        msg["Subject"] = f"New Project Inquiry: {project_type} from {name}"
        msg["From"] = settings.MAIL_FROM or settings.MAIL_USERNAME
        msg["To"] = settings.CONTACT_RECEIVER_EMAIL

        text_content = f"""
New Inquiry Received on Sandesh Barde Portfolio:
------------------------------------------------
Name: {name}
Email: {email}
Project Type: {project_type}
Budget: {budget or 'Not specified'}

Message:
{message}
"""
        msg.attach(MIMEText(text_content, "plain"))

        server = smtplib.SMTP(settings.MAIL_HOST, settings.MAIL_PORT, timeout=10)
        server.starttls()
        server.login(settings.MAIL_USERNAME, settings.MAIL_PASSWORD)
        server.send_message(msg)
        server.quit()
        logger.info(f"Inquiry notification email sent to {settings.CONTACT_RECEIVER_EMAIL}")
        return True
    except Exception as e:
        logger.warning(f"Failed to send inquiry email notification: {e}")
        return False
