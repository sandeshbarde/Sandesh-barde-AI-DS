def test_health_check(client):
    response = client.get("/api/v1/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "healthy"
    assert "version" in data

def test_get_public_profile(client):
    response = client.get("/api/v1/public/profile")
    assert response.status_code == 200
    data = response.json()
    assert data["full_name"] == "Sandesh Barde"
    assert data["email"] == "sandeshbarde2214@gmail.com"
    assert data["phone"] == "+91 9850751835"
    assert data["projects_count"] == 6
    assert data["skills_count"] == 27

def test_get_public_projects(client):
    response = client.get("/api/v1/public/projects")
    assert response.status_code == 200
    projects = response.json()
    assert len(projects) == 6
    slugs = [p["slug"] for p in projects]
    assert "joblens-ai" in slugs
    assert "sentinelscan" in slugs
    assert "avexni" in slugs

def test_get_public_case_study(client):
    response = client.get("/api/v1/public/projects/joblens-ai/case-study")
    assert response.status_code == 200
    cs = response.json()
    assert "Job Data" in str(cs["architecture_flow"])

def test_get_public_skills(client):
    response = client.get("/api/v1/public/skills")
    assert response.status_code == 200
    categories = response.json()
    assert len(categories) == 5
    cat_names = [c["name"] for c in categories]
    assert "Frontend" in cat_names
    assert "Backend" in cat_names
    assert "AI / ML" in cat_names

def test_get_public_services(client):
    response = client.get("/api/v1/public/services")
    assert response.status_code == 200
    services = response.json()
    assert len(services) == 4

def test_submit_valid_inquiry(client):
    payload = {
        "name": "Priya Sharma",
        "email": "priya.sharma@example.com",
        "project_type": "AI Integration & Automation",
        "budget": "$1,000 - $3,000",
        "message": "Hi Sandesh, we need an NLP semantic search system for our docs.",
        "hp": ""
    }
    response = client.post("/api/v1/public/inquiries", json=payload)
    assert response.status_code == 201
    data = response.json()
    assert data["success"] is True

def test_submit_inquiry_with_honeypot(client):
    payload = {
        "name": "Bot Spammer",
        "email": "bot@spam.com",
        "project_type": "Full Stack",
        "message": "Spam promotional text",
        "hp": "I am a malicious bot filling all fields"
    }
    # Honeypot should return success silently without adding spam
    response = client.post("/api/v1/public/inquiries", json=payload)
    assert response.status_code == 201

def test_submit_invalid_inquiry_rejected(client):
    payload = {
        "name": "A", # Too short
        "email": "invalid-email-format",
        "project_type": "X",
        "message": "Too short" # < 10 chars
    }
    response = client.post("/api/v1/public/inquiries", json=payload)
    assert response.status_code == 422 # Pydantic validation error

def test_protected_admin_routes_reject_unauthenticated(client):
    response = client.get("/api/v1/admin/stats")
    assert response.status_code == 401

    response = client.get("/api/v1/admin/inquiries")
    assert response.status_code == 401
