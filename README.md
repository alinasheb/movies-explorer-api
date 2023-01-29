# Дипломный проект Movies-explorer (Бэкенд-часть)

## Проект в рамках обучения на курсе Яндекс.Практикум "Веб-разработчик"

Сервис, включающий  бэкенд часть приложения [Movies](https://explor.movies.nomoredomains.icu/), в котором пользователи могут осуществлять поиск фильмов по ключевым словам и сохранять понравившиеся себе на страницу. Реализована регистрация и авторизация пользователей. 
IP: 51.250.4.143

API реализован с валидацией запросов, логированием запросов и ошибок, централизованной обработкой ошибок и доступен по [ссылке ]( https://api.explorer.movies.nomoredomains.sbs/).

## Цель проекта:
закрепить полученные на курсе "Веб-разработчик" знания. 

## Технологии:
- менеджер процессов на сервере pm2
- база данных на MongoDB + Mongoose
- API-сервер на Node.js + express.js
- сервер на Ubuntu в Яндекс.Облаке
- раздача фронтенда через nginx
- хранение переменных окружения в .env-файле

## Инструкция по установке:

* клонирование репозитория: 
`git clone https://github.com/alinasheb/movies-explorer-api.git`

* установка зависимостей
`npm install`

* Запуск develop-сборки бэкенда
`npm run dev`


