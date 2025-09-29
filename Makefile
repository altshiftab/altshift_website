.DEFAULT_GOAL := build

.PHONY: all update frontend-update build frontend-build backend-build publish backend-publish backend-publish-build

all: update build

update: frontend-update

frontend-update:
	@echo "[frontend] Updating..."
	cd frontend && ncu --upgrade && npm update

build: frontend-build backend-build

frontend-build:
	@echo "[frontend] Building..."
	cd frontend && npm run build

backend-build:
	@echo "[backend] Building..."
	cd backend && go generate && GOOS=linux go build -a -ldflags="-s -w -buildid=" -installsuffix cgo -o ../service

publish: backend-publish

backend-publish-build:
	@echo "[backend] Building for publish..."
	cd backend && podman build . --tag altshift-website

backend-publish: backend-publish-build
	@echo "[backend] Publishing..."
	podman tag altshift-website europe-west1-docker.pkg.dev/altshift-main/docker-images/altshift-website:latest \
		&& podman push europe-west1-docker.pkg.dev/altshift-main/docker-images/altshift-website:latest