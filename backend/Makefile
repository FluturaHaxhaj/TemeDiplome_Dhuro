OS := $(shell uname)

build:
	@echo "Building container"
	docker-compose up --build

build-force:
	@echo "Createded Containers with force"
	docker-compose up --build --force-recreate

start:
	@echo "Starting..."
	docker-compose up

stop:
	@echo "Stop..."
	docker-compose down

restart:
	@echo "Restarting..."
	docker-compose down
	docker-compose up
