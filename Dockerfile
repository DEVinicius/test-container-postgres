FROM postgres:11.5
EXPOSE 5432
COPY migration /docker-entrypoint-initdb.d