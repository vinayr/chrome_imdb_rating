#!/bin/bash
rm -f imdb.zip
cd src
zip -r ../imdb.zip * -x "*.DS_Store"
cd ..
