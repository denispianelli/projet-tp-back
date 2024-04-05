export PGUSER=postgres
export PGCLIENTENCODING=UTF8
export PGPASSWORD=postgres

# Exécution du script d'initialisation de la BDD
psql -f 1.init-db.sql 

# Prise de l'identité de admin_opinion pour exécuter le script (il sera ainsi OWNER des tables)
export PGUSER=admin_osurvivors
export PGPASSWORD=admin_osurvivors

export PGDATABASE=osurvivors

# Exécution du script de création des domaines
psql -f 2.create-domains.sql 

# Exécution du script de création des tables
psql -f 3.create-tables.sql 

# Exécution du script de population des tables
psql -f 4.populate-tables.sql