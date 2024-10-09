#!/bin/sh

deploy_tailwind() {
    start=$(date +%s%N)
    node_modules/.bin/query task tailwindcss
    end=$(date +%s%N)
    echo "Styles created: $(((end - start) / 1000000))ms"
}

deploy_asset() {
    start=$(date +%s%N)
    node_modules/.bin/query asset dist
    node_modules/.bin/query asset public
    end=$(date +%s%N)
    echo "Assets updated: $(((end - start) / 1000000))ms"
}

deploy_function() {
    start=$(date +%s%N)
    node_modules/.bin/query function
    end=$(date +%s%N)
    echo "Functions updated: $(((end - start) / 1000000))ms"
}

deploy_tailwind
deploy_asset
deploy_function
