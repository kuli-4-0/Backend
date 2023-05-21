# Elise-Project

## Elise API

## postman documentation

https://documenter.getpostman.com/view/18941111/2s93m1YPB1

## postman environment

download capstone.postman_envronment.json

# API Spesification Elise

```
https://elise-project.onrender.com
```

sample data admin

```
email : admin@gmail.com
pass : 1234
```

```
email : user@gmail.com
pass : 1234
```

```
email : event_organizer@gmail.com
pass : 1234
```

```
email : musisi@gmail.com
pass : 1234
```

---

## 1. Auth

### `POST` Register as user

```
/auth/register
```

### Body raw (json)

```json
{
  "name": "Muhammad Dewi Susanto",
  "email": "c006dsx0616@bangkit.academy",
  "password": "dwisusanto784@#$#@",
  "confirmPassword": "dwisusanto784@#$#@"
}
```

### `POST` Resend Verify

```
/auth/resendverify
```

### Body raw (json)

```json
{
  "email": "c006dsx0616@bangkit.academy"
}
```

### `POST` Login

```
/auth/login
```

### Body raw (json)

```json
{
  "email": "admin@gmail.com",
  "password": "1234"
}
```

> login dengan email dan password yang telah di daftar mengembalikan mengembalikan token jwt yang berisi id, name, email, role

### `POST` me

```
/auth/me
```

### Body raw (json)

```json
{
  "token": "<token>"
}
```

### `DELETE` Logout

```
/auth/logout
```

---

---

## 2. User

> `fitur crud user harus rolenya admin`

### `GET` Get all Users

```
/user
```

### `GET` Get user by id

```
/users/<userId>
```

### `POST` Create user

```
/users
```

Bodyraw (json)

```json
{
  "name": "admin",
  "email": "admin@gmail.com",
  "password": "admin",
  "role": "admin" // enum (admin / user / event_organizer / musisi)
}
```

### `PATCH` Update user

```
/users/<userId>
```

```json
{
  "name": "dwi",
  "email": "dwi@gmail.com",
  "password": "dwi",
  "role": "user" enum (user / admin)
}
```

> - bisa salah satu yang di update

### `DELETE` delete user

```
/users/<userId>
```

## 3. Event

> > BLOG

### `GET` all Event (admin only)

```
/events
```

### `GET` Event by id

```
/events/:id
```

### `GET` Event by userId (event_organizer only)

```
/events/:id
```

### `POST` Event

```
/events
```

```JSON
body-raw (JSON)
{
"name" : "name event",
"location" : "location event",
"date" : "10-10-1970",
"poster" : "poster.jpg", (type file : jpg, jpeg, png)
"status" : "Live" (enum : Live / Audisi)
}
```

### `PATCH ` Event by id

```
/events/:id
```

```JSON
body-raw (JSON)
{
"name" : "name event",
"location" : "location event",
"date" : "10-10-1970",
"poster" : "poster.jpg", (type file : jpg, jpeg, png)
"status" : "Live" (enum : Live / Audisi)
}
```

bisa edit salah satu

### `DELETE` Event by id

```
/events/:id
```