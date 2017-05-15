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

clean:
	rm -rf _site .sass-cache _config.yml

	clear

prepush:
	make build

all:
	make clean install build serve
