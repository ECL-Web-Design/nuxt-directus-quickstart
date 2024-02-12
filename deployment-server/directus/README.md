# Directus CMS Configuration

## docker-compose.yml

Make sure you fill in or remove all the necessary options in this file before composing the instance. All relavant
fields are marked with < angle brackets >

## Set up the Directus db instance

_Replace angle bracket values (brackets too)_

On server CMD line

- **Create User**\
  `CREATE database < dbname >`\
  `CREATE USER < username > with encrypted password < password >`\
  `GRANT ALL PRIVILEGES ON database < dbname > TO < username>`\

- **Restore From Dump File**\
  Copy dump file to server\
  `pg_restore --no-owner --role=< username > -d < dbname > < path to dump file >`

## Start the Directus Instance

Directus can be setup easily with docker, place docker-compose.yml in a server directory along with the three additional
folders then `run docker compose up`, make sure the cmd line is actually in the cms folder beforehand.

Running it this way will allow you to see console output of any errors that occur, to run in background,
run `docker compose up -d`

## Admin App Setup

After setting up the server, you should be able to login to the app by accessing the url you set in nginx.

You need to create a new user in the Web Api Role and create a static access token. Paste this static token in the
client DirectusSdkClient.ts configuration.

If any new collections are created, make sure to give the appropriate permissions to the web api role so that it can
fetch the data correctly.
