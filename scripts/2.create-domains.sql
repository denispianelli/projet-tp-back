BEGIN;

CREATE DOMAIN username_domain TEXT;

ALTER DOMAIN username_domain ADD CONSTRAINT valid_username 
CHECK (VALUE ~ '^[a-zA-Z0-9_]{2,50}$');

CREATE DOMAIN email_domain TEXT;

ALTER DOMAIN email_domain ADD CONSTRAINT valid_email
CHECK(
   VALUE ~ '^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$' 
);

COMMIT;