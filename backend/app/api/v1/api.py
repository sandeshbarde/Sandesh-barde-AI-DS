from fastapi import APIRouter
from app.api.v1.endpoints import public, inquiries, auth, admin

api_router = APIRouter()

# Health check
@api_router.get("/health", tags=["system"])
def health_check():
    return {
        "status": "healthy",
        "service": "Sandesh Barde Portfolio API",
        "version": "1.0.0"
    }

api_router.include_router(public.router, prefix="/public", tags=["public"])
api_router.include_router(inquiries.router, prefix="/public", tags=["inquiries"])
api_router.include_router(auth.router, prefix="/admin/auth", tags=["admin-auth"])
api_router.include_router(admin.router, prefix="/admin", tags=["admin-cms"])
