all: build stylecow webpack main run

build:
	cd ./public/handlebars; ./precompile.sh

run: 
	cd server; go run server.go

main:
	google-chrome http://127.0.0.1:8080

stylecow:
	stylecow

webpack:
	webpack &

