# Posapps_backend
POS-Apps-Backend_using-NodeJsandExpressJs
![](https://img.shields.io/badge/Code%20Style-Standard-yellow.svg)
![](https://img.shields.io/badge/Dependencies-Express-green.svg)
![](https://img.shields.io/badge/License-Beerware-yellowgreen.svg)

<h1 align="center">Point of Sales</h1>
<hr id='#'>
<h2>Table of Contents</h2>
<ul>
  <li><a href='#intro'>Introduction</a></li>
  <li><a href='#prerequiste'>Prerequiste</a></li>
  <li><a href='#install'>Installation</a>
    <ul type='circle'>
      <li><a href='#clone'>Clone</a></li>
      <li><a href='#env'>Environment</a></li>
      <li><a href='#start'>Start</a></li>
    </ul>
  </li>
  <li><a href='#def'>Defendencies</a></li>
  <li><a href='#license'>License</a></li>
</ul>
<hr>

<h2 id='intro'>Introduction</h2>
<p>Point of Sales APP API is an API that allow the users to read product and category information data from database. Point of Sales APP API also allow users to read, create, update and delete a product and its category information into/from database.</P>
<hr>

<h2 id='prerequiste'>Prerequiste</h2>
<ul>
  <li>Node.js - Download and Install <a href='https://nodejs.org/en/'>Node.js</a> - Simple bash script to manage multiple active node.js versions.</li>
  <li>Nodemon - Download and Install <a href='https://nodemon.io/'>Nodemon</a> - nodemon is a tool that automatically restarting the node application when file changes in the directory are detected.</li>
  <li>Express JS - Download and Install <a href='https://expressjs.com/'>Express JS</a> - web framework for Node.js</li>
</ul>
<hr>

<h2 id='install'>Installation</h2>
<h3 id='clone'>Clone</h3>

```bash
$ git clone https://github.com/ardabudi/Posapps_backend
$ cd Posapps_backend
$ npm install
```

## Set up .env file
Open .env file on your favorite code editor, and copy paste this code below :
```
PORT = 8001

DB_HOST = 'localhost'
DB_USER = 'root'
DB_PASSWORD = ''
DB_NAME = 'note'
JWT_KEY = 'note'
```

<hr>
<h3 id='start'>Start Development Server</h3>

```bash
$ npm start
```

<hr>

<h2 id='def'>Other Defendencies</h2>

- [body-parser](#)
- [crypto](#)
- [cors](#)
- [express-fileupload](#)
- [jsonwebtoken](#)
- [morgan](#)
- [mysql](#)
- [uniqid](#)

### HTTP Requests
All API requests are made by sending a secure HTTPS request using one of the following methods, depending on the action being taken:

- `GET` Get a resource or list of resources
- `POST` Create a resource
- `PATCH` Update a resource
- `DELETE` Delete a resource

## Endpoints
**IMPORTANT!** All endpoint except **Login** and **Register** must have **header** :

- **user-id** : **`id user`**
- **token**: **`token`**

#### **User**
* **Register user**
  - **Request** : **`POST localhost:8001/user/register`**
    ```
    {
        "name": "arda",
        "password": "123",
        "email": "arda@gmail.com"
    }
    ```
  - **Response** : 
    ```
    {
    "status": 200,
    "result": {
        "fieldCount": 0,
        "affectedRows": 1,
        "insertId": 14,
        "serverStatus": 2,
        "warningCount": 0,
        "message": "",
        "protocol41": true,
        "changedRows": 0
    }
}
    ```
* **Login User**
  - **Request** : **`POST localhost:8001/user/login`**
    ```
    {
        "email": "arda@gmail.com",
        "password": "123"
    }
    ```
  - **Response** : 
    ```
    {
    "id": 14,
    "name": "arda",
    "email": "arda@gmail.com",
    "created_at": "2020-02-29T03:56:45.000Z",
    "updated_at": "2020-02-29T03:56:45.000Z",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFyZGFAZ21haWwuY29tIiwiaWQiOjE0LCJpYXQiOjE1ODI5NDg3MDcsImV4cCI6MTU4Mjk1NTkwN30.Eh-0UzRaDUdfQLrp4Xl9ZkGl9UPG7Q9zpSJ8R7vUDVw"
}
    ```

### A. CRUD Category Endpoint
**1. Read All Category**
 -   **Request**  :  **`GET localhost:8001/category`**
 -   **Response**  :
```
{
    "status": 200,
    "result": [
        {
            "id": 1,
            "name": "Food",
            "created_at": "2020-02-16T10:53:39.000Z",
            "updated_at": "2020-02-16T10:53:39.000Z"
        },
        {
            "id": 2,
            "name": "Drink",
            "created_at": "2020-02-16T10:53:39.000Z",
            "updated_at": "2020-02-16T10:53:39.000Z"
        }
    ]
}
```
**2. Read a category**
 -   **Request**  :  **`GET localhost:8001/category/1`**
 -   **Response**  :
```
{
    "status": 200,
    "result": [
        {
            "id": 1,
            "name": "Food",
            "created_at": "2020-02-16T10:53:39.000Z",
            "updated_at": "2020-02-16T10:53:39.000Z"
        }
    ]
}
```
**3. Create a category**
 -   **Request**  :  **`POST localhost:8001/category`**
 -   **Response**  :
```
{
    "status": 200,
    "result": {
        "fieldCount": 0,
        "affectedRows": 1,
        "insertId": 2,
        "serverStatus": 2,
        "warningCount": 0,
        "message": "",
        "protocol41": true,
        "changedRows": 0
    }
}
```
**4. Update a category** <br> (Need Verification by ID Category)

 -   **Request**  :  **`PATCH localhost:8001/category/2`**
 -   **Response**  :
```
{
    "status": 200,
    "result": {
        "fieldCount": 0,
        "affectedRows": 1,
        "insertId": 0,
        "serverStatus": 2,
        "warningCount": 0,
        "message": "(Rows matched: 1  Changed: 1  Warnings: 0",
        "protocol41": true,
        "changedRows": 1
    }
}
```
**5. Delete a category**
 -   **Request**  :  **`DELETE localhost:8001/category/2`**
 -   **Response**  :
```
{
    "status": 200,
    "result": {
        "fieldCount": 0,
        "affectedRows": 1,
        "insertId": 0,
        "serverStatus": 2,
        "warningCount": 0,
        "message": "",
        "protocol41": true,
        "changedRows": 0
    }
}
```
### B. CRUD Product Endpoint
**1. Read all product**
 -   **Request**  :  **`GET localhost:8001/product`**
 -   **Response**  :
```
{
    "status": 200,
    "result": [
        {
            "id": 53,
            "name": "Cappucino",
            "description": "Coffe",
            "image": "http://localhost:8001/uploads/cappucino.jpg",
            "price": 14000,
            "stock": 40,
            "category": "Drink",
            "created_at": "2020-02-26T07:30:55.000Z",
            "updated_at": "2020-02-26T07:30:55.000Z"
        },
        {
            "id": 55,
            "name": "Coffe Latte",
            "description": "coffe",
            "image": "http://localhost:8001/uploads/Coffe Latte.png",
            "price": 15000,
            "stock": 30,
            "category": "Drink",
            "created_at": "2020-02-26T09:06:50.000Z",
            "updated_at": "2020-02-26T09:06:50.000Z"
        },
        {
            "id": 61,
            "name": "Steak Sapi",
            "description": "Steak",
            "image": "http://localhost:8001/uploads/steaksapi.jpg",
            "price": 24000,
            "stock": 30,
            "category": "Food",
            "created_at": "2020-02-26T16:03:59.000Z",
            "updated_at": "2020-02-26T16:03:59.000Z"
        }
    ]
}
```
**2. Read a product**
 -   **Request**  :  **`GET localhost:8001/product/97`**
 -   **Response**  :
```
{
    "status": 200,
    "result": [
        {
            "id": 97,
            "name": "Steak Ayam",
            "description": "Steak Ayam",
            "image": "http://localhost:8001/uploads/image-6.jpg",
            "price": 21000,
            "stock": 30,
            "category": "Food",
            "created_at": "2020-02-28T14:08:38.000Z",
            "updated_at": "2020-02-29T01:42:18.000Z"
        }
    ]
}
```
**3. Create a product**
 -   **Request**  :  **`POST localhost:8001/product`**
 -   **Response**  :
```
{
    "status": 200,
    "result": {
        "fieldCount": 0,
        "affectedRows": 1,
        "insertId": 98,
        "serverStatus": 2,
        "warningCount": 0,
        "message": "",
        "protocol41": true,
        "changedRows": 0
    }
}
```
**4. Update product**
 -   **Request**  :  **`PATCH localhost:8001/product/97`**
 -   **Response**  :
```
{
    "status": 200,
    "result": {
        "fieldCount": 0,
        "affectedRows": 1,
        "insertId": 0,
        "serverStatus": 2,
        "warningCount": 0,
        "message": "(Rows matched: 1  Changed: 1  Warnings: 0",
        "protocol41": true,
        "changedRows": 1
    }
}
```
**5. Delete product**
 -   **Request**  :  **`DELETE localhost:8001/product/97`**
 -   **Response**  :
```
{
    "status": 200,
    "result": {
        "fieldCount": 0,
        "affectedRows": 1,
        "insertId": 0,
        "serverStatus": 2,
        "warningCount": 0,
        "message": "",
        "protocol41": true,
        "changedRows": 0
    }
}
```
###  C. Search, Pagination, Sort in Product

| Feature                        | Request                                                       |
| :-----------------             | :------------------------------------------------------------ |
| `Search by name`               |  `` Request : GET /product/?search=nasi ``                    |
| `Pagination in product`        |  `` Request : GET product/?page=1&limit=4 ``                |
| `Sort product by name`         |  `` Request : GET product/?by=name&sort=DESC ``            |
| `Sort product by category`     |  `` Request : GET product/?by=category&sort=ASC ``         |
| `Sort product by date update`  |  `` Request : GET product/?by=date_update&sort=DESC ``     |


<h2 id='license'>License</h2>

&copy; <a href='https://github.com/ardabudi/'>Arda Budi</a>

