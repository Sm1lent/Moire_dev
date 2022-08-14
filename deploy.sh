#!/usr/bin/env sh

#остановить публикацию при ошибках
set -e

#сборка приложения
npm run build

#переход в каталог сборки
cd dist

#инициализация репозитория и загрузка кода в gitHub 
git init 
git add -A
git commit -m 'deploy'
git push -f https://github.com/Sm1lent/Moire.git master:gh-pages

cd -