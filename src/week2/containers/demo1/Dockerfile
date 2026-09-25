FROM ubuntu:26.04 AS build
RUN apt-get update && apt-get install -y build-essential
WORKDIR /app 
COPY src/hello.c /app/
RUN gcc -o hello hello.c

FROM alpine:3.24.2 AS final
WORKDIR /app/
COPY --from=build /app/hello ./
ENTRYPOINT ["/app/hello"]