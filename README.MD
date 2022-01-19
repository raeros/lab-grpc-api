## Material
This project is using the code and explanation from this blog post  https://mherman.org/blog/node-grpc-postgres/

## Notes
1 - When you run the migrate command you problably will get a timeout error from knex. The fix: UP the version of `pg` to at least 8.x. As see in https://github.com/knex/knex/issues/3831
2 - Blog post about running microservices with gRPC at scale https://www.bugsnag.com/blog/grpc-and-microservices-architecture

## Running a postgres database using docker
```sh
docker run --name grpcdb -e POSTGRES_PASSWORD=grpc -e POSTGRES_DB=grpc_products -p 5169:5432 postgres
docker ps # to get container id
docker exec -it CONTAINER_ID bash
psql -h localhost -p PORT -U postgres
\l # to list all databases and check if your database was created
```
