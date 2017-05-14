all: docker_update

docker_update:
	docker-compose up --no-deps -d eole-node

	# Initialize configuration files if not exits
	docker exec -ti eole-node sh -c "cp -n docker/eole-webserver/config/* config/"

	# Install dependencies
	docker exec -ti eole-node sh -c "npm install"
	docker exec -ti eole-node sh -c "./node_modules/.bin/gulp deploy"

	docker-compose up -d

test:
	# Codestyle checking
	docker exec -ti eole-node sh -c "npm test"

bash:
	docker exec -ti eole-node bash
