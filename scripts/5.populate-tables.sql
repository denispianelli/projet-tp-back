BEGIN;

INSERT INTO
	public.weapon (
		"name",
		"description",
		"evolved",
		"max_level",
		"rarity",
		"unlock_requirement",
		"base_damage",
		"cooldown",
		"knockback"
	)
VALUES
	(
		'Épée de Foudre',
		'Une puissante épée imprégnée de magie éclair. Frappe les ennemis avec une force tonitruante.',
		false,
		8,
		100,
		'Débloqué par defaut',
		10,
		1.35,
		1
	),
	(
		'Arc du Gel',
		'A bow crafted from ice crystals. Freezes enemies upon impact, slowing them down.',
		false,
		8,
		100,
		'Débloqué par defaut',
		10,
		1.2,
		1
	),
	(
		'Bâton de l''Inferno',
		'Un bâton enchanté avec des sorts de feu. Libère des flammes qui engloutissent les ennemis dans un brasier de destruction.',
		false,
		8,
		100,
		'Débloqué par defaut',
		6.5,
		1,
		0.5
	);

INSERT INTO
	public."character" (
		name,
		fullname,
		description,
		cost,
		unlock_requirement,
		weapon_id
	)
VALUES
	(
		'Gandalfinius',
		'Gandalfinius Le Grand',
		'Un sorcier puissant capable de manipuler les forces de givre.',
		0,
		'Débloqué par defaut',
		1
	),
	(
		'Jettelot',
		'Jettelot Du Lac',
		'Un puissant chevalier, fier et féroce, capable d''asséner des coups d''épée redoutables.',
		200,
		'Accomplir la quête "Le Tombeau des Anciens"',
		2
	),
	(
		'Fourbass',
		'Fourbass Le Fourbe',
		'Un combattant agile et furtif, spécialisé dans les attaques surprises. Il vous videra les poches',
		500,
		'Terminer le niveau 5 de l''arène de combat',
		3
	);

INSERT INTO public.enemy (name, health, power, speed, knockback, xp)
VALUES
    ('Orc', 110, 12, 6, 2, 55),
    ('Orc-rogue', 100, 40, 6, 4, 65),
    ('Orc-shaman', 160, 25, 5, 5, 85),
    ('Orc-warior', 170, 25, 5, 5, 95),
    ('Skeleton', 130, 18, 8, 4, 65),
    ('Skeleton-rogue', 130, 18, 8, 4, 65),
    ('Skeleton-shaman', 130, 18, 8, 4, 65),
    ('Skeleton-warior', 160, 18, 7, 4, 65);



INSERT INTO
	public.item (
		name,
		description,
		passive,
		max_level,
		rarity,
		effects,
		unlock_requirement
	)
VALUES
	(
		'Pendentif de Sagesse',
		'Un pendentif qui améliore la sagesse de son porteur.',
		true,
		3,
		20,
		'{"sagesse": 5}',
		'Trouvé dans la Bibliothèque Ancienne'
	),
	(
		'Anneau de Vitesse',
		'Un anneau qui augmente la vitesse de déplacement de son porteur.',
		true,
		5,
		100,
		'{"vitesse": 10}',
		'Vaincre le Maître des Vents'
	),
	(
		'Talisman de Chance',
		'Un talisman qui apporte de la chance à son porteur.',
		true,
		3,
		50,
		'{"chance": 5}',
		'Résoudre l''Énigme du Labyrinthe'
	);

INSERT INTO
	public.powerup (name, description, max_rank, initial_cost)
VALUES
	(
		'Amélioration de Santé',
		'Un pouvoir qui augmente la santé maximale du joueur.',
		3,
		100
	),
	(
		'Bouclier Énergétique',
		'Un pouvoir qui crée un bouclier énergétique pour absorber les dégâts.',
		5,
		150
	),
	(
		'Accélération Temporelle',
		'Un pouvoir qui ralentit le temps, permettant au joueur de se déplacer plus rapidement.',
		3,
		200
	);

INSERT INTO
	public.achievement (achievement_requirement, unlocked_item)
VALUES
	('Atteindre le niveau 50', 'Armure de l''Immortel'),
	('Vaincre le Dragon de Feu', 'Épée des Flammes'),
	(
		'Résoudre l''Énigme du Labyrinthe',
		'Talisman de Chance'
	);

INSERT INTO
	public.stage (name, description, unlock_requirement)
VALUES
	(
		'Forêt Enchantée',
		'Explorez la forêt enchantée et affrontez ses gardiens mystiques.',
		'Atteindre le niveau 10'
	),
	(
		'Montagnes Gelées',
		'Parcourez les sommets enneigés et affrontez les créatures glacées.',
		'Vaincre le Dragon de Glace'
	),
	(
		'Citadelle Sombre',
		'Pénétrez dans la citadelle sombre et détruisez les forces du mal.',
		'Résoudre l''Énigme du Portail'
	);

COMMIT;