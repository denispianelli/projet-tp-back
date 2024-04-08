-- Supprimer la base de données 'osruvivors' si elle existe déjà
DROP DATABASE IF EXISTS osurvivors;

-- Supprimer le rôle 'admin_osurvivors' s'il existe déjà
DROP ROLE IF EXISTS admin_osurvivors;

-- Créer un nouvel utilisateur 'admin_osurvivors' avec le mot de passe 'admin_osurvivors'
CREATE USER admin_osurvivors
WITH
	PASSWORD 'admin_osurvivors';

-- Créer une nouvelle base de données 'osurvivors' avec 'admin_osurvivors' comme propriétaire
CREATE DATABASE osurvivors WITH ENCODING 'UTF8' LC_COLLATE='fr_FR.UTF-8' LC_CTYPE='fr_FR.UTF-8' TEMPLATE=template0 OWNER admin_osurvivors ;