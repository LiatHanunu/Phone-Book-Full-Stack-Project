# PhoneBookProject

## In order for this project to save contacts images you need to enter a aws-s3 bucket credentials in the .env file!!

##### this is the docker command to run the postgress dc for the project:
docker run --hostname=453584cff717 --mac-address=02:42:ac:11:00:02 --env=POSTGRES_PASSWORD=mysecretpassword --env=PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/lib/postgresql/15/bin --env=GOSU_VERSION=1.14 --env=LANG=en_US.utf8 --env=PG_MAJOR=15 --env=PG_VERSION=15.1-1.pgdg110+1 --env=PGDATA=/var/lib/postgresql/data --volume=/var/lib/postgresql/data -p 4532:5432 --restart=no --runtime=runc -d postgres

