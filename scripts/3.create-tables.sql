BEGIN;

CREATE TABLE
	IF NOT EXISTS public.user (
		id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
		username username_domain NOT NULL UNIQUE,
		email email_domain NOT NULL UNIQUE,
		password text NOT NULL,
		coins integer NOT NULL DEFAULT 0,
		is_verified boolean NOT NULL DEFAULT 'f',
		role text NOT NULL DEFAULT 'member'
	);

CREATE TABLE
	IF NOT EXISTS public.weapon (
		id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
		name text NOT NULL UNIQUE,
		description text NOT NULL,
		evolved boolean NOT NULL,
		max_level integer NOT NULL,
		rarity integer NOT NULL,
		unlock_requirement text,
		base_damage integer NOT NULL,
		cooldown decimal NOT NULL,
		knockback integer NOT NULL
	);

CREATE TABLE
	IF NOT EXISTS public.character (
		id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
		name text NOT NULL UNIQUE,
		fullname text NOT NULL UNIQUE,
		description text NOT NULL,
		cost integer NOT NULL,
		unlock_requirement text NOT NULL,
		weapon_id int REFERENCES public.weapon (id) NOT NULL
	);

CREATE TABLE
	IF NOT EXISTS public.item (
		id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
		name text NOT NULL UNIQUE,
		description text NOT NULL,
		passive boolean NOT NULL,
		max_level integer,
		rarity integer,
		effects text not null,
		unlock_requirement text
	);

CREATE TABLE
	IF NOT EXISTS public.stage (
		id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
		name text NOT NULL UNIQUE,
		description text NOT NULL,
		unlock_requirement text
	);

CREATE TABLE
	IF NOT EXISTS public.enemy (
		id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
		name text NOT NULL UNIQUE,
		health integer NOT NULL,
		power integer NOT NULL,
		speed integer NOT NULL,
		knockback integer NOT NULL,
		xp integer NOT NULL
	);

CREATE TABLE
	IF NOT EXISTS public.powerup (
		id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
		name text NOT NULL UNIQUE,
		description text NOT NULL,
		max_rank integer NOT NULL,
		initial_cost integer NOT NULL
	);

CREATE TABLE
	IF NOT EXISTS public.achievement (
		id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
		achievement_requirement text NOT NULL,
		unlocked_item text NOT NULL
	);

CREATE TABLE
	IF NOT EXISTS public.option (
		id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
		sounds boolean NOT NULL,
		music boolean NOT NULL,
		user_id int REFERENCES public.user (id) NOT NULL
	);

CREATE TABLE
	IF NOT EXISTS public.unlocked_achievement (
		user_id int REFERENCES public.user (id) NOT NULL,
		achievement_id int REFERENCES public.achievement (id) NOT NULL
	);

CREATE TABLE
	IF NOT EXISTS public.unlocked_item (
		user_id int REFERENCES public.user (id) NOT NULL,
		item_id int REFERENCES public.item (id) NOT NULL
	);

CREATE TABLE
	IF NOT EXISTS public.unlocked_stage (
		user_id int REFERENCES public.user (id) NOT NULL,
		stage_id int REFERENCES public.stage (id) NOT NULL
	);

CREATE TABLE
	IF NOT EXISTS public.unlocked_powerup (
		user_id int REFERENCES public.user (id) NOT NULL,
		powerup_id int REFERENCES public.powerup (id) NOT NULL
	);

CREATE TABLE
	IF NOT EXISTS public.unlocked_character (
		user_id int REFERENCES public.user (id) NOT NULL,
		character_id int REFERENCES public.character (id) NOT NULL
	);

CREATE TABLE
	IF NOT EXISTS public.unlocked_weapon (
		user_id int REFERENCES public.user (id) NOT NULL,
		weapon_id int REFERENCES public.weapon (id) NOT NULL
	);

CREATE TABLE
	IF NOT EXISTS public.stage_has_enemy (
		stage_id int REFERENCES public.stage (id) NOT NULL,
		enemy_id int REFERENCES public.enemy (id) NOT NULL
	);

COMMIT;