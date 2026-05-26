use actix_web::{App, HttpServer, middleware};

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    env_logger::init_from_env(env_logger::Env::new().default_filter_or("info"));

    log::info!("starting HTTP server");

    HttpServer::new(move || App::new().wrap(middleware::Logger::default()))
        .bind(("0.0.0.0", 9291))? // public facing
        .run()
        .await
}
