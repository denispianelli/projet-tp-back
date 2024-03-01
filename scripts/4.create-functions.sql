BEGIN;

CREATE OR REPLACE FUNCTION create_user(u json) RETURNS "user" AS $$
	INSERT INTO "user"
	(username, email, password, role, is_verified)
	VALUES 
	(
		u->>'username',
		u->>'email',
		u->>'password',
		COALESCE((u->>'role'), 'member'), -- Utilisation de COALESCE pour fournir une valeur par défaut
        COALESCE((u->>'is_verified')::boolean, false) -- Utilisation de COALESCE pour fournir une valeur par défaut
	)
	RETURNING *;
$$ LANGUAGE sql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION check_user_exists(u json) 
RETURNS json 
AS $$
DECLARE
    user_record json;
BEGIN
		SELECT json_build_object
		(
			'id',id,
			'username',username,
			'email',email,
			'password',password,
			'role',role,
			'coins', coins,
			'is_verified',is_verified
		) 
		INTO user_record
		FROM "user"
		WHERE username = u->>'username';

		IF user_record IS NOT NULL
		THEN
			return user_record;
		ELSE
			return null;
		END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE FUNCTION get_user(int) RETURNS "user" AS $$
	SELECT * FROM "user" WHERE id=$1;
$$ LANGUAGE sql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION check_user_exists_by_email(u json) 
RETURNS json 
AS $$
DECLARE
    user_record json;
BEGIN
		SELECT json_build_object
		(
			'id',id,
			'username',username,
			'email',email,
			'password',password,
			'is_verified',is_verified
		) 
		INTO user_record
		FROM "user"
		WHERE email = u->>'email';

		IF user_record IS NOT NULL
		THEN
			return user_record;
		ELSE
			return null;
		END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION get_all_from_table(table_name text)
RETURNS SETOF json
AS $$
DECLARE
    result json; -- Déclaration de la variable pour stocker le résultat JSON
BEGIN
    EXECUTE format('
        SELECT array_to_json(array_agg(row_to_json(t)))
        FROM %I t', table_name) -- Utilisation de format() avec %I pour interpoler le nom de la table de manière sécurisée
    INTO result; -- Stockage du résultat de la requête dans la variable result

		-- Retourne le résultat JSON comme un jeu de résultats
    RETURN NEXT result;
    RETURN; -- Termine la fonction
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION update_user_infos(u json) RETURNS "user" AS $$
	UPDATE "user" SET 
		"username"=u->>'username',
		"email"=u->>'email',
		"password"=u->>'password',
		"coins"=(u->>'coins')::int,
		"is_verified"=(u->>'is_verified')::boolean
	WHERE "id"=(u->>'id')::int
	RETURNING *;
$$ LANGUAGE sql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION get_characters_with_weapons() RETURNS TABLE (
		id integer,
		name text,
		fullname text,
		description text,
		cost integer,
		unlock_requirement text,
		weapon_name text
) AS $$
BEGIN
    RETURN QUERY
    SELECT c.id AS id, c.name AS name, c.fullname AS fullname, c.description AS description, c.cost, c.unlock_requirement AS unlock_requirement, w.name AS weapon_name
    FROM character c
    JOIN weapon w ON c.weapon_id = w.id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


CREATE OR REPLACE FUNCTION get_user_character(INT)
RETURNS TABLE (
    user_id INT,
    username username_domain,
    coins INT,
    character_name text,
    character_fullname text,
    character_description text,
    weapon_name text,
    weapon_description text,
    weapon_evolved BOOLEAN,
    weapon_base_damage INT,
    weapon_cooldown decimal,
    weapon_knockback INT
)
AS $$
BEGIN
    RETURN QUERY
    SELECT DISTINCT u.id, u.username, u.coins, c.name, c.fullname, c.description, w.name, w.description, w.evolved, w.base_damage, w.cooldown, w.knockback
    FROM public.user u
    JOIN unlocked_character uc ON uc.user_id = u.id
    JOIN character c ON uc.character_id = c.id
    JOIN weapon w ON c.weapon_id = w.id
    WHERE u.id = $1;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION post_unlocked_character(
    user_id INT,
    character_id INT
)
RETURNS VOID
AS $$
BEGIN
    INSERT INTO public.unlocked_character(user_id, character_id)
    VALUES (user_id, character_id);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


COMMIT;