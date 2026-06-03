use actix_web::{App, HttpServer, middleware, web};
use sea_orm::{Database, DatabaseConnection};
use std::env;

mod auth;

pub mod entity;

#[derive(Debug, Clone)]
struct AppState {
    conn: DatabaseConnection,
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    env_logger::init_from_env(env_logger::Env::new().default_filter_or("info"));
    // tracing_subcriber-

    dotenvy::dotenv().ok();
    let db_url = env::var("DATABASE_URL").expect("DATABASE_URL is not set in .env file"); // must be set

    // ... must be set

    let conn = Database::connect(&db_url).await.unwrap();
    // Migrator::up(&conn, None).await.unwrap() /// Migrator (?) (???) ?

    let state = AppState { conn };

    log::info!("starting HTTP server");

    HttpServer::new(move || {
        App::new()
            .app_data(web::Data::new(state.clone()))
            .wrap(middleware::Logger::default())
            // .service()
            // .default_service(web::route().to(not_found))
            .configure(auth::configure_auth_routes)
    })
    .bind(("0.0.0.0", 9291))? // public facing
    .run()
    .await
}

//
// all routes start with /API at nginx
//
