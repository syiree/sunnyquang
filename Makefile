.PHONY: build

PYTHON ?= python
HOST    = 0.0.0.0
PORT    = 3001

install:
	cat requirements/*.txt > requirements.txt

	pip install -r requirements.txt

	bundler install

build:
	$(PYTHON) -B -m build

serve:
	jekyll serve --host=$(HOST) --port=$(PORT)

clean-py:
	find . | grep -E "__pycache__" | xargs rm -rf

clean:
	make clean-py

	rm -rf _site .sass-cache _config.yml

	clear

prepush:
	make build clean-py

all:
	make clean install build serve
