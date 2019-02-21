
# Book App

A simple app using node & express for managing books

## Content
- CRUD operation
    - **C**reate new book
    - **R**ead books from [books.json]
    - **U**pdate books
    - **D**elete books
- Search books

## Structure
 - html/css
 - js
 - json

## Live preview
 -

## Setup 
```
git clone https://github.com/nattila12/book-app.git
cd book-app
npm install
```
## Running app
```
npm run devstart
```

open http://localhost:3000/

##Create database and preview
CREATE DATABASE book_library;
USE book_library;
CREATE TABLE books (id INT AUTO_INCREMENT, title TEXT, author TEXT, PRIMARY KEY (ID));
INSERT INTO books (title, author) VALUES("Maitrey", "Mircea Eliade");


