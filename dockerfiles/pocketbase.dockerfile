FROM golang:1.24-alpine AS installer
WORKDIR /app
COPY apps/pocketbase/ .
RUN go clean
RUN go build
RUN ./pocketbase migrate

FROM golang:1.24-alpine AS runner
WORKDIR /app
RUN apk add pngquant
COPY --from=INSTALLER /app/pocketbase .
COPY --from=INSTALLER /app/pb_data ./pb_data
CMD ["./pocketbase", "serve", "--http=0.0.0.0:8080"]
