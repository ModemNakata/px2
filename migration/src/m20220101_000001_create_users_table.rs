use sea_orm_migration::{prelude::*, schema::*};

#[derive(DeriveMigrationName)]
pub struct Migration;

#[async_trait::async_trait]
impl MigrationTrait for Migration {
    async fn up(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .create_table(
                Table::create()
                    .table("users")
                    .if_not_exists()
                    .col(pk_uuid("id"))
                    .col(text("pgp")) // PGP private key | static | stored plain text
                    // check for lower-case, only hyphens allowed and characters (a-z) and digits (0-9)
                    // NOTE: Start and End
                    // A subdomain must start with a letter or a digit, and it must end with a letter or a digit.
                    // This means a hyphen cannot be the first or last character.
                    .col(string_len("username", 60)) // hard limit of subdomain is 64 characters (RFC 1035)
                    .col(string_len("display_name", 60)) // can be upper case - first copied from registration form - then can be changed in settings
                    .col(text("password_hash").not_null())
                    .col(
                        date_time("created_at")
                            .not_null()
                            .default(Expr::current_timestamp()),
                    )
                    .col(date_time("updated_at").null())
                    // (PGP rotated or username changed, display_name can also be changed separately after registration in settings
                    .to_owned(),
            )
            .await
    }

    async fn down(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .drop_table(Table::drop().table("users").to_owned())
            .await
    }
}
