
# Book App

A simple app using node & express for managing books

# Preview
Open [book app](https://nattila12.github.io/book-app/public/index.html)

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
mysql.server start

```
mysql -u root -p

```
npm run devstart

```

open http://localhost:3000/

##Create database and preview
CREATE DATABASE book_library;
USE book_library;
CREATE TABLE books (id INT AUTO_INCREMENT, title TEXT, author TEXT, PRIMARY KEY (ID));
INSERT INTO books (title, author) VALUES("Maitrey", "Mircea Eliade");

##Insert extra column into db
USE databbase_name;
ALTER TABLE table_name;
ADD column_name datatype;
