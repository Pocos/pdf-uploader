# Boot up
```docker-compose up --build```

# Create user
POST http://localhost:3000/api/v1/user
```
{
    "name": "admin",
    "password": "admin",
    "role": "ADMIN"
}
```

POST http://localhost:3000/api/v1/user
```
{
    "name": "user",
    "password": "user",
    "role": "USER"
}
```