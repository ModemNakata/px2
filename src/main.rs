use actix_files as fs;
use actix_web::{App, HttpServer, Responder, Result, middleware, web};
use askama::Template;

#[derive(Template)]
#[template(path = "dist/index.html")]
struct Index;

async fn index() -> Result<impl Responder> {
    let html = Index.render().expect("template should be valid");

    Ok(web::Html::new(html))
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    env_logger::init_from_env(env_logger::Env::new().default_filter_or("info"));

    log::info!("starting HTTP server at http://localhost:8080");

    HttpServer::new(move || {
        App::new()
            .wrap(middleware::Logger::default())
            .service(web::resource("/").route(web::get().to(index)))
            .service(fs::Files::new("/", "./sj/dist").index_file("index.html"))
    })
    .bind(("127.0.0.1", 3715))?
    .run()
    .await
}
