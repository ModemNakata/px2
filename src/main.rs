use actix_web::{App, HttpResponse, HttpServer, get, middleware};
use chrono::Utc;
use serde_json;

mod auth;

#[get("/datetime")]
async fn datetime() -> HttpResponse {
    HttpResponse::Ok().json(serde_json::json!({
        "now": Utc::now().to_rfc3339()
    }))
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    env_logger::init_from_env(env_logger::Env::new().default_filter_or("info"));

    log::info!("starting HTTP server");

    HttpServer::new(move || {
        App::new()
            .wrap(middleware::Logger::default())
            .service(datetime)
            .configure(auth::configure_auth_routes)
    })
    .bind(("0.0.0.0", 9291))? // public facing
    .run()
    .await
}

//
// all routes start with /API at nginx
//
