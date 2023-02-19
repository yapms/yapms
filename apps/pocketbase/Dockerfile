FROM golang:alpine

WORKDIR /app

COPY go.mod go.sum ./

RUN go mod download

COPY main.go ./

COPY migrations/* ./migrations/

RUN go build

RUN ./pocketbase migrate

EXPOSE 8080

CMD ./pocketbase serve --http=0.0.0.0:8080