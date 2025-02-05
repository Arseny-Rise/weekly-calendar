set -e

npm run build-only

cd dist

git init
git add -A
git commit -m 'deploy'

git push -f git@github.com:arseny-rise/weekly-calendar.git main:gh-pages

cd -