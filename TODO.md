# hugs.xin — Registration & PGP Key Feature

## Original description (copied verbatim)

> migration file for users table has `pgp` field — it's users pgp key that is generated randomly on registration and saved there in plain text and shown to user to save as .asc, it can also be saved as .webp in qr code. you can generate a random gpg private key with tool at `./utils/tool-gpg "uid@hugs.xin"` <- in this case `uid` will represent uuid4 of the user in our database. so this binary just spits out pgp private key that we need, we will save it in our database. we will also show it to user as plain test and as file `hugsx_<registration_timestamp>.asc` (asc is just like .txt, but for gpg armored key (as we have)), this is like master key for user to recover account later, it can be rotated in settings with some grace period and other protecting features, this key is addition to users password, because we don't use email, this is a little privacy enhancing feature. so we also need to create qr code out of this pgp private key, using qrcode crate (already added) we need to generate `hugsx_<registration_timestamp>.webp` and show it to user, user should have ability to download it, both .asc and .webp, and also it should be shown plain text with button to copy. that's it for this feature. here is code to generate qrcode that we need:

```rust
async fn generate_qr(Query(params): Query<QrParams>) -> impl IntoResponse {
    let (width, height) = params
        .size
        .as_ref()
        .map(|s| parse_size(s))
        .unwrap_or((200, 200));

    let code = QrCode::new(params.data.as_bytes()).unwrap();
    let image = code
        .render::<image::Luma<u8>>()
        .quiet_zone(false)
        .min_dimensions(width, height)
        .build();

    let mut buffer = Vec::new();
    let mut cursor = std::io::Cursor::new(&mut buffer);
    image::DynamicImage::ImageLuma8(image)
        .write_to(&mut cursor, image::ImageFormat::WebP)
        .unwrap();

    ([("content-type", "image/webp")], Bytes::from(buffer))
}
```

> going forward with the migration scheme, it also shows username and display_name, here is what special about it: user enters username and it is converted to RFC 1035 (subdomain compatible), and checked if it's unique, because every user will have it's own subdomain, but display name can be anything (though copied from username on registration, can be changed to anything later in settings), for password hash let's use argon2.

## Done ✅

- [x] Subdomain preview under username field (always visible in registration mode, right-aligned, `.hugs.xin` suffix)
- [x] Subdomain availability check (debounced 500ms, calls `GET /api/auth/check-username`)
- [x] Button state reflects subdomain status (Enter a username → Checking... → Username not available / Create Account)
- [x] Alerts moved below submit button, space reserved with `min-h-[4rem]` (no layout shift)
- [x] Confirm password + subdomain preview always in DOM, `invisible` during login (no height shift switching modes)
- [x] Backend `GET /check-username` endpoint:
  - Sanitizes input (RFC 1035)
  - Checks hardcoded taken list
  - Queries DB via SeaORM for existing username
- [x] Layout shift fixes for loading → form transition

## TODO — Remaining features

- [ ] `POST /register` — real implementation:
  - Validate username (RFC 1035, uniqueness)
  - Validate password (length, match)
  - Generate uuid4 for user
  - Hash password with argon2
  - Run `./utils/tool-gpg "<uuid>@hugs.xin"` to generate PGP private key
  - Save user to DB (`id`, `pgp`, `username`, `display_name`, `password_hash`, `created_at`)
  - Return PGP key in response for frontend to display
- [ ] Registration success page / flow — show user their PGP key:
  - Plain text display with copy button
  - Download as `hugsx_<registration_timestamp>.asc`
  - Generate QR code from PGP key ↔ `hugsx_<registration_timestamp>.webp` download
  - Use `generate_qr` endpoint with `qrcode` crate
- [ ] Login with password (argon2 verify)
- [ ] Profile/settings page — PGP key rotation with grace period
- [ ] Logout (clear session)
