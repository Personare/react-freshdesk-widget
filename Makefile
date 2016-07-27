.PHONY: ghp-storybook

ghp-storybook:
	@git checkout -f master && \
		git pull origin master && \
		./node_modules/.bin/build-storybook -o .output && \
		git checkout -f gh-pages && \
		mv ./.output/** ./ && \
		git add .
		git commit -m 'Build new version to gh-pages' && \
		git push origin gh-pages && \
		rm -rf .output/ && \
		git checkout -f master
