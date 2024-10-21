
build-ServerLayers:
	mkdir -p "$(ARTIFACTS_DIR)/python"
	cp -r $(find . -type d -o -name '*.py') "$(ARTIFACTS_DIR)/python"
	python -m pip install -r requirements.txt -t "$(ARTIFACTS_DIR)/python"