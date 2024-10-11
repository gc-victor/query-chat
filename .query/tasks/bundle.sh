#!/bin/sh

ESBUILD=node_modules/.bin/esbuild

if [ "$PROD" = "true" ]; then
    sourcemap_value=""
else
    sourcemap_value="--sourcemap=inline"
fi

bundle() {
    $ESBUILD src/pages/chat.js \
        --bundle \
        --format=iife \
        --minify=true \
        --legal-comments=none \
        --entry-names=[name] \
        --chunk-names=[name]-[hash] \
        --public-path=/_/asset/dist/ \
        --outdir=dist \
        --log-level=error \
        $sourcemap_value
}

bundle
