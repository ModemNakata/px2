use actix_web::{web, HttpResponse, get, post};
use serde::{Deserialize, Serialize};

#[derive(Deserialize)]
pub struct RegisterRequest {
    pub username: String,
    pub password: String,
    pub password_confirm: String,
}

#[derive(Deserialize)]
pub struct LoginRequest {
    pub username: String,
    pub password: String,
}

#[derive(Serialize)]
pub struct AuthCheckResponse {
    pub authenticated: bool,
}

#[derive(Serialize)]
pub struct AuthResponse {
    pub success: bool,
    pub message: Option<String>,
    pub error: Option<String>,
}

/// GET /check - Check if user is authenticated
#[get("/check")]
pub async fn check_auth() -> HttpResponse {
    // Mock: User is not authenticated
    HttpResponse::Ok().json(AuthCheckResponse {
        authenticated: false,
    })
}

/// POST /register - Register a new user
#[post("/register")]
pub async fn register(req: web::Json<RegisterRequest>) -> HttpResponse {
    // Mock implementation
    if req.username.is_empty() || req.password.is_empty() {
        return HttpResponse::BadRequest().json(AuthResponse {
            success: false,
            message: None,
            error: Some("Username and password are required".to_string()),
        });
    }

    if req.password != req.password_confirm {
        return HttpResponse::BadRequest().json(AuthResponse {
            success: false,
            message: None,
            error: Some("Passwords do not match".to_string()),
        });
    }

    if req.password.len() < 8 {
        return HttpResponse::BadRequest().json(AuthResponse {
            success: false,
            message: None,
            error: Some("Password must be at least 8 characters".to_string()),
        });
    }

    // Mock: Simulate successful registration
    HttpResponse::Ok().json(AuthResponse {
        success: true,
        message: Some("User registered successfully".to_string()),
        error: None,
    })
}

/// POST /login - Login user
#[post("/login")]
pub async fn login(req: web::Json<LoginRequest>) -> HttpResponse {
    // Mock implementation
    if req.username.is_empty() || req.password.is_empty() {
        return HttpResponse::BadRequest().json(AuthResponse {
            success: false,
            message: None,
            error: Some("Username and password are required".to_string()),
        });
    }

    // Mock: Simulate successful login
    HttpResponse::Ok().json(AuthResponse {
        success: true,
        message: Some("Logged in successfully".to_string()),
        error: None,
    })
}

/// POST /logout - Logout user
#[post("/logout")]
pub async fn logout() -> HttpResponse {
    HttpResponse::Ok().json(AuthResponse {
        success: true,
        message: Some("Logged out successfully".to_string()),
        error: None,
    })
}

/// Configure auth routes under /auth scope
pub fn configure_auth_routes(cfg: &mut web::ServiceConfig) {
    cfg.service(
        web::scope("/auth")
            .service(check_auth)
            .service(register)
            .service(login)
            .service(logout)
    );
}

