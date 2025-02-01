#!/usr/bin/env sh

# остановить публикацию при ошибках
set -e

# сборка
npm run build

# переход в каталог сборки
cd dist

git init
git add -A
git commit -m 'deploy'

# если вы публикуете по адресу https://<USERNAME>.github.io
# git@github.com:Arseny-Rise/weekly-calendar.git
git push -f git@github.com:arseny-rise/weekly-calendar.git main:gh-pages

cd -