FROM mongo:bionic

COPY init-data.json /init-data.json


CMD mongoimport                                 \
    # Host (docker-compose service name)
    --host db                       \
    # user and pass from .env file
    --username root    \
    --password root     \
    --authenticationDatabase admin             \
    # initial db and collection from .env file
    --db users              \
    --collection usersInfo      \
    --type json                                 \
    --mode=merge                             \
    --file /init-data.json                      \
    --jsonArray                                 \
    # WARNING! drop collection before run import
    --drop                                      \
    # verbose
    -v            