#!/bin/bash
# bump semantic version in project package.json files

sed -i "s/\"version\": *\"[^\"]*\"/\"version\": \"$1\"/g" package.json