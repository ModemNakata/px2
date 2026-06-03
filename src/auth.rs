use crate::entity::prelude::*;
use crate::entity::users;
use crate::AppState;
use actix_web::{HttpResponse, get, post, web};
use sea_orm::{ColumnTrait, EntityTrait, QueryFilter};
use serde::{Deserialize, Serialize};
use tokio::time::{Duration, sleep};

fn sanitize_subdomain(input: &str) -> String {
    input
        .to_lowercase()
        .chars()
        .map(|c| if c.is_ascii_alphanumeric() || c == '-' { c } else { '-' })
        .collect::<String>()
        .chars()
        .fold((String::new(), false), |(mut acc, prev_hyphen), c| {
            if c == '-' {
                if !prev_hyphen {
                    acc.push(c);
                }
                (acc, true)
            } else {
                acc.push(c);
                (acc, false)
            }
        })
        .0
        .trim_matches('-')
        .to_string()
}

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

#[derive(Deserialize)]
pub struct CheckUsernameQuery {
    pub username: String,
}

#[derive(Serialize)]
pub struct CheckUsernameResponse {
    pub available: bool,
}

/// GET /check-username - Check if a username is available
#[get("/check-username")]
pub async fn check_username(
    req: web::Query<CheckUsernameQuery>,
    state: web::Data<AppState>,
) -> HttpResponse {
    let sanitized = sanitize_subdomain(&req.username);

    if sanitized.is_empty() {
        return HttpResponse::Ok().json(CheckUsernameResponse { available: false });
    }

    // Hardcoded taken list
    let taken = ["admin", "root", "test", "demo", "api", "www", "mail", "support"];
    if taken.contains(&sanitized.as_str()) {
        return HttpResponse::Ok().json(CheckUsernameResponse { available: false });
    }

    // Check database for existing username
    let exists = Users::find()
        .filter(users::Column::Username.eq(&sanitized))
        .one(&state.conn)
        .await
        .unwrap()
        .is_some();

    HttpResponse::Ok().json(CheckUsernameResponse { available: !exists })
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
    // Add 1 second delay to simulate network latency
    sleep(Duration::from_secs(1)).await;

    // Mock: User is not authenticated
    HttpResponse::Ok().json(AuthCheckResponse {
        authenticated: false,
    })
}

/// POST /register - Register a new user
#[post("/register")]
pub async fn register(req: web::Json<RegisterRequest>) -> HttpResponse {
    // Add 1 second delay to simulate network latency
    sleep(Duration::from_secs(1)).await;

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
    // Add 1 second delay to simulate network latency
    sleep(Duration::from_secs(1)).await;

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
    // Add 1 second delay to simulate network latency
    sleep(Duration::from_secs(1)).await;

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
            .service(check_username)
            .service(register)
            .service(login)
            .service(logout),
    );
}
