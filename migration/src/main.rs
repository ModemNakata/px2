use sea_orm_migration::prelude::*;

#[tokio::main]
async fn main() {
    cli::run_cli(migration::Migrator).await;
}

// sea-orm-cli generate entity --output-dir src/entity
