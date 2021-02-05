##Restful endpoints
<!-- --- -->
# URL
```
Client URL : http://localhost:5500
Server URL : http://localhost:3000
```

### POST/register

>Create User

_Request Header_
```
not needed
```

_Request Body_
```
{
    "name": "<User's Name>",
    "email": "<User's email>",
    "password": "<User's password>"
}
```

_Response (201)_
```


{
    "id": 1,
    "name": "Andi Samsualam",
    "email": "andi@gmail.com",
    "password": "$2a$10$tuYM4ePL/hN3I5XYvwKGR.SfpFY9mHTIZZfURfhN4jBqOUkkBqQ.m"
}
```

_Response(400- INVALID_EMAIL)_
```
{
    "error": "INVALID_EMAIL",
    "message": [
        "email must be unique"
    ]
}
```

_Response(400- VALIDATION_ERROR)_
```
{
    "error": "VALIDATION_ERROR",
    "message": [
        "User.name cannot be null",
        "User.email cannot be null",
        "User.password cannot be null"
    ]
}
```

_Response(400- VALIDATION_ERROR)_
```
{
    "error": "VALIDATION_ERROR",
    "message": [
        "Name cannot be empty",
        "invalid email format",
        "password at least 6 character"
    ]
}
```

_Response (500 - Bad Request)_
```
{
  "Error": UNKNOWN_ERROR,
  "message": "Internal server error"
}
```



### POST/login

>user login

__Request Header_
```
not needed
```
_Request Body_
```
{
  "email": "<email to get insert into>",
  "password": "<password to get insert into>"
}
```
_Response (200 - Success)_
```
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjQsImVtYWlsIjoiYW5kaTEyMzQ1NUBnbWFpbC5jb20iLCJpYXQiOjE2MTI0OTU1MDJ9.GTvkzVF_MDRAtQQLJf-VThsQx9vRMaFdTZBHGxXv0jM"
}
```
_Response(400- bad request)_
```
{
    "error": "INVALID_DATA",
    "message": "invalid email/password"
}
```


_Response (500)_
```
{
   "Error": UNKNOWN_ERROR,
  "message": "Error undescribable"
}
```
### POST/google-sign-in

>Google Sign IN User

_Request Header_
```
not needed
```

_Request Body_
```
{
   
    "id_token": "id_token";
}
```

_Response(200)_
```
Google's Payload
```



_Response (500)_
```
{
  "Error": "UNKNOWN_ERROR",
  "message": "Internal server error"
}
```

### GET/foods/categories

>Restaurant categories list 

_Request Header_
```
{
  access_token: token
}
```


_Response(200)_
```
  {
      "categories": [
          {
              "categories": {
                  "id": 1,
                  "name": "Delivery"
              }
          },
          {
              "categories": {
                  "id": 2,
                  "name": "Dine-out"
              }
          },
          {
              "categories": {
                  "id": 3,
                  "name": "Nightlife"
              }
          },
          {
              "categories": {
                  "id": 4,
                  "name": "Catching-up"
              }
          },
          {
              "categories": {
                  "id": 5,
                  "name": "Takeaway"
              }
          },
          {
              "categories": {
                  "id": 6,
                  "name": "Cafes"
              }
          },
          {
              "categories": {
                  "id": 7,
                  "name": "Daily Menus"
              }
          },
          {
              "categories": {
                  "id": 8,
                  "name": "Breakfast"
              }
          },
          {
              "categories": {
                  "id": 9,
                  "name": "Lunch"
              }
          },
          {
              "categories": {
                  "id": 10,
                  "name": "Dinner"
              }
          },
          {
              "categories": {
                  "id": 11,
                  "name": "Pubs & Bars"
              }
          },
          {
              "categories": {
                  "id": 13,
                  "name": "Pocket Friendly Delivery"
              }
          },
          {
              "categories": {
                  "id": 14,
                  "name": "Clubs & Lounges"
              }
          }
      ]
}
```

_Response(401- Unauthorized)_
```
{
    "error": "USER_NOT_AUTHENTICATED",
    "message": "Invalid User"
}
```

_Response (500)_
```

{
  "Error": "UNKNOWN_ERROR",
  "message": "Error undescribable"
}
```


### GET/foods/cities

>Get cities detail

_Request Header_
```
{
  access_token: token
}
```

_Response(200)_
```
{
    "location_suggestions": [
        {
            "id": 74,
            "name": "Jakarta",
            "country_id": 94,
            "country_name": "Indonesia",
            "country_flag_url": "https://b.zmtcdn.com/images/countries/flags/country_94.png",
            "should_experiment_with": 0,
            "has_go_out_tab": 0,
            "discovery_enabled": 0,
            "has_new_ad_format": 1,
            "is_state": 0,
            "state_id": 0,
            "state_name": "",
            "state_code": ""
        }
    ],
    "status": "success",
    "has_more": 0,
    "has_total": 0,
    "user_has_addresses": true
}
```

_Response(401- Unauthorized)_
```
{
    "error": "USER_NOT_AUTHENTICATED",
    "message": "Invalid User"
}
```

_Response (500)_
```
{
  "Error": "UNKNOWN_ERROR",
  "message": "Internal server error"
}
```

### GET/foods/cuisines

>Get cuisines detail

_Request Header_
```
{
  access_token: token
}
```

_Response(200)_
```
{
    "cuisines": [
        [object],
        [object],
        [object],
        [object],
        [object],
        [object]
    ]
}
```

_Response(401- Unauthorized)_
```
{
    "error": "USER_NOT_AUTHENTICATED",
    "message": "Invalid User"
}
```

_Response (500)_
```
{
  "Error": "UNKNOWN_ERROR",
  "message": "Internal server error"
}
```

### GET/foods/collections

>Get collection detail

_Request Header_
```
{
  access_token: token
}
```

_Response(200)_
```
{
    "collections": [
        [object],
        [object],
        [object],
        [object],
        [object],
        [object]
    ]
}
```

_Response(401- Unauthorized)_
```
{
    "error": "USER_NOT_AUTHENTICATED",
    "message": "Invalid User"
}
```

_Response (500)_
```
{
  "Error": "UNKNOWN_ERROR",
  "message": "Internal server error"
}
```

### GET/foods/search

>Search restourant

_Request Header_
```
{
  access_token: token
}
```

_Response(200)_
```
[
  [Restaurant],
  [Restaurant],
  [Restaurant],
  [Restaurant],
  [Restaurant],
  [Restaurant]
]
```

_Response(401- Unauthorized)_
```
{
    "error": "USER_NOT_AUTHENTICATED",
    "message": "Invalid User"
}
```

_Response (500)_
```
{
  "Error": "UNKNOWN_ERROR",
  "message": "Internal server error"
}
```


### GET/harvard/search

>Search restourant

_Request Header_
```
{
  access_token: token
}
```

_Response(200)_
```
{
  [info],
  record: [
    [object],
    [object],
    [object]
  ]
}
```

_Response(401- Unauthorized)_
```
{
    "error": "USER_NOT_AUTHENTICATED",
    "message": "Invalid User"
}
```

_Response (500)_
```
{
  "Error": "UNKNOWN_ERROR",
  "message": "Internal server error"
}
```

### GET/weather

>weather detail

_Request Header_
```
{
  access_token: token
}
```

_Response(200)_
```
{
  [request],
  [location],
  [current]
}
```

_Response(401- Unauthorized)_
```
{
    "error": "USER_NOT_AUTHENTICATED",
    "message": "Invalid User"
}
```

_Response (500)_
```
{
  "Error": "UNKNOWN_ERROR",
  "message": "Internal server error"
}
```

