.DEFAULT_GOAL := all

.PHONY: all update frontend-update backend-update build frontend-build backend-build publish backend-publish backend-publish-build backend-deploy

all: update build

backend-update:
	@echo "[backend] Updating..."
	cd backend && gm

frontend-update:
	@echo "[frontend] Updating..."
	cd frontend && ncu --upgrade && npm update

update: frontend-update backend-update

backend-build:
	@echo "[backend] Building..."
	cd backend && go generate && GOOS=linux go build -a -ldflags="-s -w -buildid=" -installsuffix cgo -o ../service

frontend-build:
	@echo "[frontend] Building..."
	cd frontend && npm run build

build: frontend-build backend-build

backend-publish-build:
	@echo "[backend] Building for publish..."
	cd backend && podman build . --tag altshift-website

backend-publish: build backend-publish-build
	@echo "[backend] Publishing..."
	podman tag altshift-website europe-north2-docker.pkg.dev/altshift-main/images/altshift-website:latest \
		&& podman push europe-north2-docker.pkg.dev/altshift-main/images/altshift-website:latest

publish: backend-publish

backend-deploy: backend-publish
	@echo "[backend] Deploying to Cloud Run..."
	gcloud run deploy altshift-website \
		--image=europe-north2-docker.pkg.dev/altshift-main/images/altshift-website:latest \
		--region=europe-north2 \
		--project=altshift-main \
		--platform=managed \
		--quiet
