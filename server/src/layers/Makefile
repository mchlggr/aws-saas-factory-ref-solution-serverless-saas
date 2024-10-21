
build-ServerLayers:
	mkdir -p "$(ARTIFACTS_DIR)/python"
	rsync -av --include='*/' --include='*.py' --exclude='*' ./ "$(ARTIFACTS_DIR)/python"
	python -m pip install -r requirements.txt -t "$(ARTIFACTS_DIR)/python"