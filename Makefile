all: build stylecow main webpack

build:
	cd ./public/handlebars; ./precompile.sh

runServer:
	cd server; go run server.go &

stopServer:
	pkill server

main:
	google-chrome http://127.0.0.1:8080

stylecow:
	stylecow

webpack:
	webpack
