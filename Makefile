.PHONY: install run-backend run-frontend deploy-backend test lint

install:
	pip install -e .
	cd frontend && npm install

run-backend:
	python3 -m uvicorn stratx.api.main:app --host 0.0.0.0 --port 8000 --reload

run-frontend:
	cd frontend && npm run dev

test:
	pytest tests/

lint:
	flake8 src/

deploy-backend:
	vercel --prod
