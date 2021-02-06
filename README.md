# Boot up
To boot up the project you need to install docker compose binaries.
Please refer to https://docs.docker.com/compose/install/

To check that docker-compose binaries are fully installed and the environment is properly set run:
```docker-compose -v````

To boot up the:
- backend
- frontend
- database
- volume for data storage

simply run:
```docker-compose up --build```

# Create user
To access the application you need to create an user, or two if you wish to check the proper RBAC mechanism.
The RBAC mechanism allow an admin to see all other user documents, and allow to perform a delete on their files.
An user cannot (via POSTMAN for example) acccess other user files, or delete them.

To create the users:

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