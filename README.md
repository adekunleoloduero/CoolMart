# CoolMart API Documentation


<br><br>
## Content

[Introduction](#introduction)

[Setup](#setup)

[Models](#models)

[API](#api)

&nbsp;&nbsp;&nbsp;[1. Auth](#1-auth)

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[Signup](#signup)

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[Signin](#signin)

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[Logout](#logout)

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[Reset pasword](#reset-password)

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[Extract userId & resetToken from password reset link](#extract-userid-and-resettoken-from-password-reset-link)

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[Change password](#change-password)

&nbsp;&nbsp;&nbsp;[2. User managment](#2-user-management)

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[Get all users](#get-all-users)

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[Get user by ID](#get-user-by-id)

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[Update user profile](#update-user-profile)

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[Delete user account](#delete-user-account)

&nbsp;&nbsp;&nbsp;[3. Product](#product)

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[Add a prouduct](#add-a-product)

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[Get all products](#get-all-products)

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[Get a product by ID](#get-a-product-by-id)

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[Update a product](#update-a-product)

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[Delete a product](#delete-a-product)

&nbsp;&nbsp;&nbsp;[4. Cart](#cart)

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[Create a cart](#add-a-product)

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[Get all carts](#get-all-carts)

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[View cart](#view-cart)

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[Update cart](#update-cart)

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[Clear cart](#clear-cart)

&nbsp;&nbsp;&nbsp;[5. Order](#order)

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[Create an order](#create-an-order)

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[Get all orders](#get-all-orders)

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[Get all orders by a specific customer](#get-all-orders-by-a-specific-customer)

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[View details of an order](#view-details-of-an-order)

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[Update of an order](#update-an-order)

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[Delete an order](#delete-an-order)

&nbsp;&nbsp;&nbsp;[6. Paystack checkout](#paystack-checkout)

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[Initialize payment](#initialize-payment)

<br><br>
## Introduction
CoolMart is an ecommerce API system.

This documentation describes the usage of CoolMart API collection and structure of defined entities (Models). 

There are two (2) types of users in the system, namely admin and customer. The user type is specified as a value of the `role` property in the [user model](#1-user). Following from this, three (3) levels of authorization are defined. These are encapsulated in the following middlewares, `authorizeAdminOnly`, `authorizeUser` and `authorizeUserOrAdmin`.

Furthermore, with the exception of routes that are prefixed with`/auth`, the user is required to be logged in or authenticated to access a given route. Authentication is done with the access token extracted from cookies.


#### [Go to Content](#content)

<br><br>




## Setup
- Clone the repository

- Run `nmp install` to get dependecies

- Create and update `.env` with `example.env`

- Run `npm start` to start the server

<br><br>


## Models

### **1. User**

| Field | Data Type | Contraints |
| ----------- | ----------- | ----------- |
| _id | ObjectId | |
| firstname | String | |
| lastname | String | |
| email | String | required |
| password | String | required |
| role | String | enum["customer", "user"], default:"customer |
| phoneNumber | String | |
| address | String | |
| reseToken | String | |
| resetTokenExpiration | Date | |
| createdAt | Date | |
| updateAt | Date | |

---

### **2. Product**
| Field | Data Type | Contraints |
| ----------- | ----------- | ----------- |
| _id | ObjectId | |
| title | String | required, unique|
| desc| String | required |
| img | String | required |
| category | Array | |
| size | String | |
| color | String | |
| price | Number | required |
| createdAt | Date | |
| updatedAt | Date | |

---
### **3. Cart**
| Field | Data Type | Contraints |
| ----------- | ----------- | ----------- |
| _id | ObjectId | |
| user | ObjectId | ref:"users" |
| products | [ { } ] | |
| createdAt | Date | |
| updatedAt | Date | |


_Products_

| Field | Data Type | Contraints |
| ----------- | ----------- | ----------- |
| product | ObjectId | ref:"product" |
| quantity | Number | default: 1 |

---
### **4. Order**
| Field | Data Type | Contraints |
| ----------- | ----------- | ----------- |
| _id | ObjectId | |
| user | ObjectId | ref:"users" |
| products | [ { } ] | |
| amount | Number | required |
| createdAt | Date | |
| updatedAt | Date | |


_Products_

| Field | Data Type | Contraints |
| ----------- | ----------- | ----------- |
| product | ObjectId | ref:"product" |
| quantity | Number | default: 1 |

---
### **5. Payment**
| Field | Data Type | Contraints |
| ----------- | ----------- | ----------- |
| _id | ObjectId | |
| reference | String | required |
| amount | Number | required |
| email | String | |
| fullname | String | |
| address | String | |
| createdAt | Date | |
| updatedAt | Date | |

#### [Go to Content](#content)

<br><br>

## API
<br>

## 1. Auth
<br>

### **Signup**

Method - `POST`

Route - `http://baseurl:port/auth/signup`

**Example Request:**

`http://localhost:3050/auth/signup`


Body (JSON):
```json
{
    "email": "testcustomer@gmail.com",
    "password": "testcustomer123"
}
```

SUCCESS

Response:
```json
{
    "status": true,
    "user": {
        "firstname": "",
        "lastname": "",
        "email": "testcustome@gmail.com",
        "role": "customer",
        "phoneNumber": "",
        "address": "",
        "_id": "63e42232476db053ad31dcc6",
        "createdAt": "2023-02-08T22:29:06.746Z",
        "updatedAt": "2023-02-08T22:29:06.746Z",
        "__v": 0
    },
    "message": "Thanks for registering."
}
```
POSSIBLE ERRORS

_Email already registered_

Response:

```json
{
    "status": false,
    "message": "This email is already registered. Please, provide a different email."
}
```

---
### **Signin**

Method - `POST`

Route - `http://baseurl:port/auth/signin`

**Example Request:**

`http://localhost:3050/auth/signin`


Body:
```json
{
    "email": "testcustomer@gmail.com",
    "password": "testcustomer123"
}
```

SUCCESS

Response:
```json
{
    "message": "Logged in successfully."
}
```
POSSIBLE ERRORS

_Invalid email_

Response:

```json
{
    "status": false,
    "message": "Invalid email"
}
```

_Invalid password_
```json
{
    "status": false,
    "message": "Invalid password"
}
```

---
### **Logout**

Method - `POST`

Route - `http://baseurl:port/auth/logout`

**Example Request:**

`http://localhost:3050/auth/logout`

SUCCESS

Response:
```json
{
    "message": "Successfully logged out."
}
```

---

### **Reset password**

Method - `POST`

Route - `http://baseurl:port/auth/reset-password`

**Example Request:**

`http://localhost:3050/auth/reset-password`


Body (JSON):
```json
{
    "email": "testcustomer@gmail.com"
}
```

SUCCESS

Response:
```json
{
    "status": true,
    "message": "Check your email for the password reset link."
}
```

POSSIBLE ERRORS

_Invalid email_

Response:

```json
{
    "status": false,
    "message": "Invalid email"
}
```

---

### **Extract userId and resetToken from password reset link**

Method - `POST`

Params - `userId`, `resetToken`

Route - `http://baseurl:port/auth/:userId/:resetToken`

**Example Request:** 

`http://localhost:3050/auth/63e3afd3d36a4b06ccd9f7e6/70e77af23d717833ab272d1bcab72dff64e8fa52b2ed63729e74dc1f9aea5ddc`

SUCCESS

Response:
```json
{
    "userId": "63e3afd3d36a4b06ccd9f7e6",
    "resetToken": "70e77af23d717833ab272d1bcab72dff64e8fa52b2ed63729e74dc1f9aea5ddc"
}
```
POSSIBLE ERRORS

_Invalid or expired password reset link_

Response:

```json
{
    "message": "Invalid or expired token"
}
```

---
### **Change password**

Method - `POST`

Route - `http://baseurl:port/auth/change-password`

**Example Request:** 

`http://localhost:3050/change-password`

body (JSON):

```json
{
    "password": "testcustomer123",
    "confirmPassword": "testcustomer123",
    "userId": "63e3afd3d36a4b06ccd9f7e6",
    "resetToken": "21b8ff5fba8a969b5735444fed0d457856e25f5b09028c4792e4011d0247be26"
}
```

SUCCESS

Response:
```json
{
    "message": "Your password was changed successfully."
}
```
POSSIBLE ERRORS

_Sever error or any other error_

Response:

```json
{
    "message": "Pasword change failed"
}

```

#### [Go to Content](#content)
---
## 2. User Management
<br>

### **Get all users**

Method - `GET`

Route - `http://baseurl:port/api/users`

Query - `newest=true`

Authentication - `cookies.access_token`

Authorization - Admin

**Example Request:**

`http://localhost:3050/api/users`


SUCCESS

Response:
```json
[
    {
        "role": "customer",
        "phoneNumber": "",
        "address": "",
        "_id": "63cd17970645eb42b3173ea5",
        "firstname": "",
        "lastname": "",
        "email": "jamesbond@gmail.com",
        "createdAt": "2023-03-22T11:01:43.526Z",
        "updatedAt": "2023-01-22T11:01:43.526Z",
        "__v": 0
    },
    {
        "role": "customer",
        "phoneNumber": "",
        "address": "",
        "_id": "63cd17c20645eb42b3173ea8",
        "firstname": "",
        "lastname": "",
        "email": "spaceracedev@gmail.com",
        "createdAt": "2023-02-22T11:02:26.234Z",
        "updatedAt": "2023-01-22T11:02:26.234Z",
        "__v": 0
    },
    {
        "_id": "63e4094a5c85c02aba445987",
        "firstname": "",
        "lastname": "",
        "email": "testcustomer@gmail.com",
        "role": "customer",
        "phoneNumber": "",
        "address": "",
        "createdAt": "2023-02-08T20:42:50.062Z",
        "updatedAt": "2023-02-08T20:42:50.062Z",
        "__v": 0
    },
    {
        "_id": "63e406915c85c02aba445974",
        "firstname": "",
        "lastname": "",
        "email": "admin@gmail.com",
        "role": "admin",
        "phoneNumber": "",
        "address": "",
        "createdAt": "2023-02-08T20:31:13.844Z",
        "updatedAt": "2023-02-08T20:31:13.844Z",
        "__v": 0
    }
]
```
POSSIBLE ERRORS

_User is not logged in_

Response:

```json
{
    "message": "User must be logged in."
}
```

_User is not an admin_

Response:

```json
{
    "message": "Unauthorized"
}
```

---
### **Get a user by ID**

Method - `GET`

Param - `id`

Route - `http://baseurl:port/api/users/find/:id`

Authentication - `cookies.access_token`

Authorization - authorizeAdmin

**Example Request:**

`http://localhost:3050/api/users/find/63e4094a5c85c02aba445987`


SUCCESS

Response:
```json
{
    "_id": "63e4094a5c85c02aba445987",
    "firstname": "",
    "lastname": "",
    "email": "testcustomer@gmail.com",
    "role": "customer",
    "phoneNumber": "",
    "address": "",
    "createdAt": "2023-02-08T20:42:50.062Z",
    "updatedAt": "2023-02-08T20:42:50.062Z",
    "__v": 0
}
```
POSSIBLE ERRORS

_User is not logged in_

Response:

```json
{
    "message": "User must be logged in."
}
```

_User is not an admin_

Response:

```json
{
    "message": "Unauthorized"
}
```

---
### **Update user profile**

Method - `PATCH`

Param - `id`

Route - `http://baseurl:port/api/users/update/:id`

Authentication - `cookies.access_token`

Authorization - authorizeAdminOrUser

**Example Request:**

`http://localhost:3050/api/users/update/63e4094a5c85c02aba445987`

Body (JSON)

```json
{
    "firstname": "Test",
    "lastname": "Customer"
}
```

SUCCESS

Response:
```json
{
    "_id": "63e4094a5c85c02aba445987",
    "firstname": "Test",
    "lastname": "Customer",
    "email": "testcustomer@gmail.com",
    "role": "customer",
    "phoneNumber": "",
    "address": "",
    "createdAt": "2023-02-08T20:42:50.062Z",
    "updatedAt": "2023-02-09T11:23:35.580Z",
    "__v": 0
}
```
POSSIBLE ERRORS

_User is not logged in_

Response:

```json
{
    "message": "User must be logged in."
}
```

_User is not an admin or owner of the account_

Response:

```json
{
    "message": "Unauthorized"
}
```

---
### **Delete user account**

Method - `DELETE`

Param - `id`

Route - `http://baseurl:port/api/users/delete/:id`

Authentication - `cookies.access_token`

Authorization - authorizeAdminOrUser

**Example Request:**

`http://localhost:3050/api/users/delete/63e4da31dfa3a9389f757c83`


SUCCESS

Response:
```json
{
    "message": "Account deleted successfully."
}
```
POSSIBLE ERRORS

_User is not logged in_

Response:

```json
{
    "message": "User must be logged in."
}
```

_User is not an admin or owner of the account_

Response:

```json
{
    "message": "Unauthorized"
}
```

_Account is already deleted_

Response:

```json
{
    "message": "Account already deleted"
}
```

#### [Go to Content](#content)

---
## 3. Product
<br>

### **Add a product**

- Method - `POST`

- Route - `http://baseurl:port/api/products/add`

- Authentication - `cookies.access_token`

- Authorization - authorizeAdmin

**Example Request:**

`http://localhost:3050/api/products/add`


Body (JSON)

```json
{
    "title": "t-shirt",
    "desc": "Men t-shirt",
    "img": "image1",
    "category": [
        "t-shirt",
        "man"
    ],
    "color": "black",
    "size": "L",
    "price": 60
}
```

SUCCESS

Response:
```json
{
    "title": "t-shirt",
    "desc": "Men t-shirt",
    "img": "image1",
    "category": [
        "t-shirt",
        "man"
    ],
    "size": "L",
    "color": "black",
    "price": 60,
    "_id": "63e4df514867fefe3cede5bf",
    "createdAt": "2023-02-09T11:56:01.505Z",
    "updatedAt": "2023-02-09T11:56:01.505Z",
    "__v": 0
}
```
POSSIBLE ERRORS

_User is not logged in_

Response:

```json
{
    "message": "User must be logged in."
}
```

_User is not an admin_

Response:

```json
{
    "message": "Unauthorized"
}
```

---

### **Get all products**

- Method - `GET`

- Route - `http://baseurl:port/api/products`

- Query - category: String, newest: boolean

- Authentication - `cookies.access_token`

- Authorization - authorizeAdmin

**Example Request:**

`http://localhost:3050/api/products/add?category="man"&newest=true`


SUCCESS

Response:
```json
[
    {
        "_id": "63e4df514867fefe3cede5bf",
        "title": "t-shirt",
        "desc": "Men t-shirt",
        "img": "image1",
        "category": [
            "t-shirt",
            "man"
        ],
        "size": "L",
        "color": "black",
        "price": 60,
        "createdAt": "2023-02-09T11:56:01.505Z",
        "updatedAt": "2023-02-09T11:56:01.505Z",
        "__v": 0
    },
    {
        "_id": "63d8977fa870dbe095aca3cd",
        "title": "Pencil Chinos",
        "desc": "Penciled shaped chinos for men",
        "img": "image",
        "category": [
            "trouser",
            "man",
            "chinos"
        ],
        "size": "L",
        "color": "grey",
        "price": 48,
        "createdAt": "2023-01-31T04:22:23.598Z",
        "updatedAt": "2023-01-31T04:22:23.598Z",
        "__v": 0
    },
    {
        "_id": "63d896faa870dbe095aca3c9",
        "title": "Round neck t-shirt",
        "desc": "Round neck t-shirt for men",
        "img": "image",
        "category": [
            "t-shirt",
            "man"
        ],
        "size": "L",
        "color": "blue",
        "price": 55,
        "createdAt": "2023-01-31T04:20:10.648Z",
        "updatedAt": "2023-01-31T04:20:10.648Z",
        "__v": 0
    }
]
```
POSSIBLE ERRORS

_User is not logged in_

Response:

```json
{
    "message": "User must be logged in."
}
```

_User is not an admin_

Response:

```json
{
    "message": "Unauthorized"
}
```

---

### **Get a product by ID**

- Method - `GET`

- Param - `productId`

- Route - `http://baseurl:port/api/products/:productId`

- Authentication - `cookies.access_token`

- Authorization - authorizeAdmin

**Example Request:**

`http://localhost:3050/api/products/63e4df514867fefe3cede5bf`


SUCCESS

Response:
```json
{
    "_id": "63e4df514867fefe3cede5bf",
    "title": "t-shirt",
    "desc": "Men t-shirt",
    "img": "image1",
    "category": [
        "t-shirt",
        "man"
    ],
    "size": "L",
    "color": "black",
    "price": 60,
    "createdAt": "2023-02-09T11:56:01.505Z",
    "updatedAt": "2023-02-09T11:56:01.505Z",
    "__v": 0
}
```
POSSIBLE ERRORS

_User is not logged in_

Response:

```json
{
    "message": "User must be logged in."
}
```

_User is not an admin_

Response:

```json
{
    "message": "Unauthorized"
}
```

---
### **Update a product**

- Method - `PATCH`

- Param - `productId`

- Route - `http://baseurl:port/api/products/update/:productId`

- Authentication - `cookies.access_token`

- Authorization - authorizeAdmin

**Example Request:**

`http://localhost:3050/api/products/update/63e4df514867fefe3cede5bf`

Body (JSON)

```json
{
    "color": "white",
    "price": 55
}
```

SUCCESS

Response:
```json
{
    "_id": "63e4df514867fefe3cede5bf",
    "title": "t-shirt",
    "desc": "Men t-shirt",
    "img": "image1",
    "category": [
        "t-shirt",
        "man"
    ],
    "size": "L",
    "color": "white",
    "price": 55,
    "createdAt": "2023-02-09T11:56:01.505Z",
    "updatedAt": "2023-02-09T12:20:07.624Z",
    "__v": 0
}
```
POSSIBLE ERRORS

_User is not logged in_

Response:

```json
{
    "message": "User must be logged in."
}
```

_User is not an admin_

Response:

```json
{
    "message": "Unauthorized"
}
```

---

### **Delete a product**

- Method - `DELETE`

- Param - `productId`

- Route - `http://baseurl:port/api/products/delete/:productId`

- Authentication - `cookies.access_token`

- Authorization - authorizeAdmin

**Example Request:**

`http://localhost:3050/api/products/delete/63e4df514867fefe3cede5bf`

SUCCESS

Response:
```json
{
    "message": "Item deleted successfully."
}
```
POSSIBLE ERRORS

_User is not logged in_

Response:

```json
{
    "message": "User must be logged in."
}
```

_User is not an admin_

Response:

```json
{
    "message": "Unauthorized"
}
```
_Item already deleted_

Response:
```json
{
    "message": "Item already deleted"
}
```

#### [Go to Content](#content)

---
## 4. Cart
<br>

### **Create a cart**

- Method - `POST`

- Route - `http://baseurl:port/api/carts/create`

- Authentication - `cookies.access_token`


**Example Request:**

`http://localhost:3050/api/carts/create`


Body (JSON)

```json
{
    "user": "63e42232476db053ad31dcc6",
    "products": [
        {
            "product": "63d8961aa870dbe095aca3c6",
            "quantity": 2
        },
        {
            "product": "63d8977fa870dbe095aca3cd"
        }
    ]
}
```

SUCCESS

Response:
```json
{
    "user": "63e42232476db053ad31dcc6",
    "products": [
        {
            "product": "63d8961aa870dbe095aca3c6",
            "quantity": 2,
            "_id": "63e4e8ab4867fefe3cede5ca"
        },
        {
            "product": "63d8977fa870dbe095aca3cd",
            "quantity": 1,
            "_id": "63e4e8ab4867fefe3cede5cb"
        }
    ],
    "_id": "63e4e8ab4867fefe3cede5c9",
    "createdAt": "2023-02-09T12:35:55.348Z",
    "updatedAt": "2023-02-09T12:35:55.348Z",
    "__v": 0
}
```
POSSIBLE ERRORS

_User is not logged in_

Response:

```json
{
    "message": "User must be logged in."
}
```

---

### **Get all carts**

- Method - `GET`

- Route - `http://baseurl:port/api/carts`

- Authentication - `cookies.access_token`

- Authorization - authorizeAdmin

**Example Request:**

`http://localhost:3050/api/carts`


SUCCESS

Response:
```json
[
    {
        "_id": "63dcd4c7261e80047b34d17e",
        "user": {
            "role": "customer",
            "phoneNumber": "",
            "address": "",
            "_id": "63cab4196c4eaaa3e7d3fbdc",
            "firstname": "Jon",
            "lastname": "Doe",
            "email": "jondoe@gmail.com",
            "isAdmin": false,
            "createdAt": "2023-01-20T15:32:41.418Z",
            "updatedAt": "2023-02-08T20:35:26.247Z",
            "__v": 0
        },
        "products": [
            {
                "product": {
                    "_id": "63d896faa870dbe095aca3c9",
                    "title": "Round neck t-shirt",
                    "desc": "Round neck t-shirt for men",
                    "img": "image",
                    "category": [
                        "t-shirt",
                        "man"
                    ],
                    "size": "L",
                    "color": "blue",
                    "price": 55,
                    "createdAt": "2023-01-31T04:20:10.648Z",
                    "updatedAt": "2023-01-31T04:20:10.648Z",
                    "__v": 0
                },
                "quantity": 1,
                "_id": "63dcd4c7261e80047b34d17f"
            },
            {
                "product": {
                    "_id": "63d8977fa870dbe095aca3cd",
                    "title": "Pencil Chinos",
                    "desc": "Penciled shaped chinos for men",
                    "img": "image",
                    "category": [
                        "trouser",
                        "man",
                        "chinos"
                    ],
                    "size": "L",
                    "color": "grey",
                    "price": 48,
                    "createdAt": "2023-01-31T04:22:23.598Z",
                    "updatedAt": "2023-01-31T04:22:23.598Z",
                    "__v": 0
                },
                "quantity": 2,
                "_id": "63dcd4c7261e80047b34d180"
            }
        ],
        "createdAt": "2023-02-03T09:32:55.534Z",
        "updatedAt": "2023-02-03T09:32:55.534Z",
        "__v": 0
    },
    {
        "_id": "63df7763fa9a4f00c4400541",
        "user": {
            "phoneNumber": "",
            "address": "",
            "_id": "63df76b5fa9a4f00c440053d",
            "firstname": "",
            "lastname": "",
            "email": "jonsnow@gmail.com",
            "role": "customer",
            "createdAt": "2023-02-05T09:28:21.026Z",
            "updatedAt": "2023-02-05T09:28:21.026Z",
            "__v": 0
        },
        "products": [
            {
                "product": {
                    "_id": "63d8961aa870dbe095aca3c6",
                    "title": "Off-shoulder top",
                    "desc": "Off shoulder party top for women",
                    "img": "offshoulderpic1",
                    "category": [
                        "top",
                        "woman"
                    ],
                    "size": "M",
                    "color": "White",
                    "price": 65,
                    "createdAt": "2023-01-31T04:16:26.837Z",
                    "updatedAt": "2023-02-08T21:03:22.707Z",
                    "__v": 0
                },
                "quantity": 2,
                "_id": "63df7763fa9a4f00c4400542"
            },
            {
                "product": {
                    "_id": "63d8977fa870dbe095aca3cd",
                    "title": "Pencil Chinos",
                    "desc": "Penciled shaped chinos for men",
                    "img": "image",
                    "category": [
                        "trouser",
                        "man",
                        "chinos"
                    ],
                    "size": "L",
                    "color": "grey",
                    "price": 48,
                    "createdAt": "2023-01-31T04:22:23.598Z",
                    "updatedAt": "2023-01-31T04:22:23.598Z",
                    "__v": 0
                },
                "quantity": 1,
                "_id": "63df7763fa9a4f00c4400543"
            }
        ],
        "createdAt": "2023-02-05T09:31:15.064Z",
        "updatedAt": "2023-02-05T09:31:15.064Z",
        "__v": 0
    },
    {
        "_id": "63e409825c85c02aba44598a",
        "user": {
            "phoneNumber": "",
            "address": "",
            "_id": "63df76b5fa9a4f00c440053d",
            "firstname": "",
            "lastname": "",
            "email": "jonsnow@gmail.com",
            "role": "customer",
            "createdAt": "2023-02-05T09:28:21.026Z",
            "updatedAt": "2023-02-05T09:28:21.026Z",
            "__v": 0
        },
        "products": [
            {
                "product": {
                    "_id": "63d8961aa870dbe095aca3c6",
                    "title": "Off-shoulder top",
                    "desc": "Off shoulder party top for women",
                    "img": "offshoulderpic1",
                    "category": [
                        "top",
                        "woman"
                    ],
                    "size": "M",
                    "color": "White",
                    "price": 65,
                    "createdAt": "2023-01-31T04:16:26.837Z",
                    "updatedAt": "2023-02-08T21:03:22.707Z",
                    "__v": 0
                },
                "quantity": 2,
                "_id": "63e409825c85c02aba44598b"
            },
            {
                "product": {
                    "_id": "63d8977fa870dbe095aca3cd",
                    "title": "Pencil Chinos",
                    "desc": "Penciled shaped chinos for men",
                    "img": "image",
                    "category": [
                        "trouser",
                        "man",
                        "chinos"
                    ],
                    "size": "L",
                    "color": "grey",
                    "price": 48,
                    "createdAt": "2023-01-31T04:22:23.598Z",
                    "updatedAt": "2023-01-31T04:22:23.598Z",
                    "__v": 0
                },
                "quantity": 1,
                "_id": "63e409825c85c02aba44598c"
            }
        ],
        "createdAt": "2023-02-08T20:43:46.390Z",
        "updatedAt": "2023-02-08T20:43:46.390Z",
        "__v": 0
    }
]
```
POSSIBLE ERRORS

_User is not logged in_

Response:

```json
{
    "message": "User must be logged in."
}
```

_User is not an admin_

Response:

```json
{
    "message": "Unauthorized"
}
```

---

### **View cart**

- Method - `GET`

- Param - `userId`

- Route - `http://baseurl:port/api/carts/view-cart`

- Authentication - `cookies.access_token`


**Example Request:**

`http://localhost:3050/api/carts/view-cart`


SUCCESS

Response:
```json
[
    {
        "_id": "63e50457abd0737e18df90cc",
        "user": {
            "_id": "63e4094a5c85c02aba445987",
            "firstname": "Test",
            "lastname": "Customer",
            "email": "testcustomer@gmail.com",
            "role": "customer",
            "phoneNumber": "",
            "address": "",
            "createdAt": "2023-02-08T20:42:50.062Z",
            "updatedAt": "2023-02-09T11:23:35.580Z",
            "__v": 0
        },
        "products": [
            {
                "product": {
                    "_id": "63d8961aa870dbe095aca3c6",
                    "title": "Off-shoulder top",
                    "desc": "Off shoulder party top for women",
                    "img": "offshoulderpic1",
                    "category": [
                        "top",
                        "woman"
                    ],
                    "size": "M",
                    "color": "White",
                    "price": 65,
                    "createdAt": "2023-01-31T04:16:26.837Z",
                    "updatedAt": "2023-02-08T21:03:22.707Z",
                    "__v": 0
                },
                "quantity": 2,
                "_id": "63e50457abd0737e18df90cd"
            },
            {
                "product": {
                    "_id": "63d8977fa870dbe095aca3cd",
                    "title": "Pencil Chinos",
                    "desc": "Penciled shaped chinos for men",
                    "img": "image",
                    "category": [
                        "trouser",
                        "man",
                        "chinos"
                    ],
                    "size": "L",
                    "color": "grey",
                    "price": 48,
                    "createdAt": "2023-01-31T04:22:23.598Z",
                    "updatedAt": "2023-01-31T04:22:23.598Z",
                    "__v": 0
                },
                "quantity": 1,
                "_id": "63e50457abd0737e18df90ce"
            }
        ],
        "createdAt": "2023-02-09T14:33:59.944Z",
        "updatedAt": "2023-02-09T14:33:59.944Z",
        "__v": 0
    }
]
```
POSSIBLE ERRORS

_User is not logged in_

Response:

```json
{
    "message": "User must be logged in."
}
```

---
### **Update cart**

- Method - `PATCH`

- Param - `cartId`

- Route - `http://baseurl:port/api/carts/update/:cartId`

- Authentication - `cookies.access_token`


**Example Request:**

`http://localhost:3050/api/carts/update/63e50457abd0737e18df90cc`

Body (JSON)

```json
{
    "products": [
        {
            "product": "63d8977fa870dbe095aca3cd",
            "quantity": 3,
            "_id": "63e50457abd0737e18df90ce"
        }
    ]
}
```

SUCCESS

Response:
```json
{
    "_id": "63e50457abd0737e18df90cc",
    "user": "63e4094a5c85c02aba445987",
    "products": [
        {
            "product": "63d8977fa870dbe095aca3cd",
            "quantity": 3,
            "_id": "63e50457abd0737e18df90ce"
        }
    ],
    "createdAt": "2023-02-09T14:33:59.944Z",
    "updatedAt": "2023-02-09T14:47:46.388Z",
    "__v": 0
}
```
POSSIBLE ERRORS

_User is not logged in_

Response:

```json
{
    "message": "User must be logged in."
}
```

---

### **Clear cart**

- Method - `DELETE`

- Param - `cartId`

- Route - `http://baseurl:port/api/carts/clear/:cartId`

- Authentication - `cookies.access_token`

**Example Request:**

`http://localhost:3050/api/products/clear/63e50457abd0737e18df90cc`

SUCCESS

Response:
```json
{
    "message": "Your cart is now empty."
}
```
POSSIBLE ERRORS

_User is not logged in_

Response:

```json
{
    "message": "User must be logged in."
}
```

_Cart already cleared_

Response:
```json
{
    "message": "Cart is empty."
}
```

#### [Go to Content](#content)

---
## 5. Order
<br>

### **Create an order**

- Method - `POST`

- Route - `http://baseurl:port/api/orders/create`

- Authentication - `cookies.access_token`

**Example Request:**

`http://localhost:3050/api/orders/create`


Body (JSON)

```json
{
    "user": "63e4094a5c85c02aba445987",
    "products": [
        {
            "product": "63d8961aa870dbe095aca3c6",
            "quantity": 2
        },
        {
            "product": "63d8977fa870dbe095aca3cd"
        }
    ],
    "amount": 120,
    "contact": {
        "phoneNumber": "08702372575",
        "address": "20 Broad Str, Lagos, Nigeria"
    }
}
```

SUCCESS

Response:
```json
{
    "user": "63e4094a5c85c02aba445987",
    "products": [
        {
            "product": "63d8961aa870dbe095aca3c6",
            "quantity": 2,
            "_id": "63e50f5385c3ddf95faa6154"
        },
        {
            "product": "63d8977fa870dbe095aca3cd",
            "quantity": 1,
            "_id": "63e50f5385c3ddf95faa6155"
        }
    ],
    "amount": 120,
    "_id": "63e50f5385c3ddf95faa6153",
    "createdAt": "2023-02-09T15:20:51.123Z",
    "updatedAt": "2023-02-09T15:20:51.123Z",
    "__v": 0
}
```
POSSIBLE ERRORS

_User is not logged in_

Response:

```json
{
    "message": "User must be logged in."
}
```

---

### **Get all orders**

- Method - `GET`

- Route - `http://baseurl:port/api/orders`

- Authentication - `cookies.access_token`

- Authorization - authorizeAdmin

**Example Request:**

`http://localhost:3050/api/orders`


SUCCESS

Response:
```json
[
    {
        "_id": "63dcef832c3067a1c8d7bd2c",
        "user": "63cab6fba8b6a76f645b1967",
        "products": [
            {
                "product": "63d8961aa870dbe095aca3c6",
                "quantity": 2,
                "_id": "63dcef832c3067a1c8d7bd2d"
            },
            {
                "product": "63d8977fa870dbe095aca3cd",
                "quantity": 1,
                "_id": "63dcef832c3067a1c8d7bd2e"
            }
        ],
        "amount": 220,
        "createdAt": "2023-02-03T11:26:59.452Z",
        "updatedAt": "2023-02-03T11:26:59.452Z",
        "__v": 0
    },
    {
        "_id": "63dcf60f8b00d023b1fea7b9",
        "user": "63cd17c20645eb42b3173ea8",
        "products": [
            {
                "product": "63d8961aa870dbe095aca3c6",
                "quantity": 2,
                "_id": "63dcf60f8b00d023b1fea7ba"
            },
            {
                "product": "63d8977fa870dbe095aca3cd",
                "quantity": 1,
                "_id": "63dcf60f8b00d023b1fea7bb"
            }
        ],
        "amount": 135,
        "createdAt": "2023-02-03T11:54:55.314Z",
        "updatedAt": "2023-02-03T11:54:55.314Z",
        "__v": 0
    },
    {
        "_id": "63df7830fa9a4f00c4400545",
        "user": "63df76b5fa9a4f00c440053d",
        "products": [
            {
                "product": "63d8961aa870dbe095aca3c6",
                "quantity": 2,
                "_id": "63df7830fa9a4f00c4400546"
            },
            {
                "product": "63d8977fa870dbe095aca3cd",
                "quantity": 1,
                "_id": "63df7830fa9a4f00c4400547"
            }
        ],
        "amount": 56,
        "createdAt": "2023-02-05T09:34:40.439Z",
        "updatedAt": "2023-02-05T09:34:40.439Z",
        "__v": 0
    }
]
```
POSSIBLE ERRORS

_User is not logged in_

Response:

```json
{
    "message": "User must be logged in."
}
```

_User is not an admin_

Response:

```json
{
    "message": "Unauthorized"
}
```

---
### **Get all orders by a specific customer**

- Method - `GET`

- Route - `http://baseurl:port/api/orders/:customerId`

- Authentication - `cookies.access_token`

- Authorization - authorizeUserOrAdmin

**Example Request:**

`http://localhost:3050/api/orders/63e4094a5c85c02aba445987`


SUCCESS

Response:
```json
[
    {
        "_id": "63e40e895c85c02aba4459b4",
        "user": "63e4094a5c85c02aba445987",
        "products": [
            {
                "product": "63d8961aa870dbe095aca3c6",
                "quantity": 2,
                "_id": "63e40e895c85c02aba4459b5"
            },
            {
                "product": "63d8977fa870dbe095aca3cd",
                "quantity": 1,
                "_id": "63e40e895c85c02aba4459b6"
            }
        ],
        "amount": 200,
        "createdAt": "2023-02-08T21:05:13.986Z",
        "updatedAt": "2023-02-08T21:08:50.800Z",
        "__v": 0
    },
    {
        "_id": "63e50f5385c3ddf95faa6153",
        "user": "63e4094a5c85c02aba445987",
        "products": [
            {
                "product": "63d8961aa870dbe095aca3c6",
                "quantity": 2,
                "_id": "63e50f5385c3ddf95faa6154"
            },
            {
                "product": "63d8977fa870dbe095aca3cd",
                "quantity": 1,
                "_id": "63e50f5385c3ddf95faa6155"
            }
        ],
        "amount": 120,
        "createdAt": "2023-02-09T15:20:51.123Z",
        "updatedAt": "2023-02-09T15:20:51.123Z",
        "__v": 0
    }
]
```
POSSIBLE ERRORS

_User is not logged in_

Response:

```json
{
    "message": "User must be logged in."
}
```

_User is not an admin or creator or the order_

Response:

```json
{
    "message": "Unauthorized"
}
```

---

### **View details of an order**

- Method - `GET`

- Param - `orderId`, `userId`

- Route - `http://baseurl:port/api/orders/:orderId/:userId`

- Authentication - `cookies.access_token`

- Authorization - authorizeUserOrAdmin

**Example Request:**

`http://localhost:3050/api/orders/view-details/63e5197217cc683ac9064165/63e4094a5c85c02aba445987`


SUCCESS

Response:
```json
{
    "_id": "63e5197217cc683ac9064165",
    "user": {
        "_id": "63e4094a5c85c02aba445987",
        "firstname": "Test",
        "lastname": "Customer",
        "email": "testcustomer@gmail.com",
        "role": "customer",
        "phoneNumber": "",
        "address": "",
        "createdAt": "2023-02-08T20:42:50.062Z",
        "updatedAt": "2023-02-09T11:23:35.580Z",
        "__v": 0
    },
    "products": [
        {
            "product": {
                "_id": "63d8961aa870dbe095aca3c6",
                "title": "Off-shoulder top",
                "desc": "Off shoulder party top for women",
                "img": "offshoulderpic1",
                "category": [
                    "top",
                    "woman"
                ],
                "size": "M",
                "color": "White",
                "price": 65,
                "createdAt": "2023-01-31T04:16:26.837Z",
                "updatedAt": "2023-02-08T21:03:22.707Z",
                "__v": 0
            },
            "quantity": 2,
            "_id": "63e5197217cc683ac9064166"
        },
        {
            "product": {
                "_id": "63d8977fa870dbe095aca3cd",
                "title": "Pencil Chinos",
                "desc": "Penciled shaped chinos for men",
                "img": "image",
                "category": [
                    "trouser",
                    "man",
                    "chinos"
                ],
                "size": "L",
                "color": "grey",
                "price": 48,
                "createdAt": "2023-01-31T04:22:23.598Z",
                "updatedAt": "2023-01-31T04:22:23.598Z",
                "__v": 0
            },
            "quantity": 1,
            "_id": "63e5197217cc683ac9064167"
        }
    ],
    "amount": 120,
    "createdAt": "2023-02-09T16:04:02.182Z",
    "updatedAt": "2023-02-09T16:04:02.182Z",
    "__v": 0
}
```
POSSIBLE ERRORS

_User is not logged in_

Response:

```json
{
    "message": "User must be logged in."
}
```

_User is not an admin or creator of the order_

Response:

```json
{
    "message": "Unauthorized"
}
```

---
### **Update an order**

- Method - `PATCH`

- Param - `orderId`

- Route - `http://baseurl:port/api/orders/update/:orderId`

- Authentication - `cookies.access_token`

- Authorization - authorizeAdmin

**Example Request:**

`http://localhost:3050/api/orders/update/63e5197217cc683ac9064165`

Body (JSON)

```json
{
    "amount": 212
}
```

SUCCESS

Response:
```json
{
    "_id": "63e5197217cc683ac9064165",
    "user": "63e4094a5c85c02aba445987",
    "products": [
        {
            "product": "63d8961aa870dbe095aca3c6",
            "quantity": 2,
            "_id": "63e5197217cc683ac9064166"
        },
        {
            "product": "63d8977fa870dbe095aca3cd",
            "quantity": 1,
            "_id": "63e5197217cc683ac9064167"
        }
    ],
    "amount": 212,
    "createdAt": "2023-02-09T16:04:02.182Z",
    "updatedAt": "2023-02-09T19:03:08.445Z",
    "__v": 0
}
```
POSSIBLE ERRORS

_User is not logged in_

Response:

```json
{
    "message": "User must be logged in."
}
```

_User is not an admin_

Response:

```json
{
    "message": "Unauthorized"
}
```

---

### **Delete an order**

- Method - `DELETE`

- Param - `orderId`

- Route - `http://baseurl:port/api/orders/delete/:orderId`

- Authentication - `cookies.access_token`

- Authorization - authorizeAdmin

**Example Request:**

`http://localhost:3050/api/orders/delete/63e4df514867fefe3cede5bf`

SUCCESS

Response:
```json
{
    "message": "The order has been deleted."
}
```
POSSIBLE ERRORS

_User is not logged in_

Response:

```json
{
    "message": "User must be logged in."
}
```

_User is not an admin_

Response:

```json
{
    "message": "Unauthorized"
}
```
_Order already deleted_

Response:
```json
{
    "message": "Order already deleted."
}
```
#### [Go to Content](#content)

---
## 6. Paystack Checkout

<br>

### **Initialize payment**

- Method - `POST`

- Param - `orderId`

- Route - `http://baseurl:port/paystack/pay/:orderId`

- Authentication - `cookies.access_token`

- Authorization - authorizeUser

**Example Request:**

`http://localhost:3050/paystack/pay/63e5483a669d011a2cab6b0a`

SUCCESS

Response:
`https://checkout.paystack.com/45wn37kwjj8knyv`

POSSIBLE ERRORS

_User is not logged in_

Response:

```json
{
    "message": "User must be logged in."
}
```
#### [Go to Content](#content)

<br><br>

## Contributor (s)
Sheriff Adekunle Tajudeen
