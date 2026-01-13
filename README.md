Base-url: https://unity-bills-backend.onrender.com

AUTH

POST /auth/register
{
"name": "Vitalii",
"email": "vitalii4@i.ua",
"password": "12345678"
}

POST /auth/login
{
"email": "vitalii4@i.ua",
"password": "12345678"
}

POST /auth/logout

POST /auth/allow/add/listId
{
"email": "vitalii@i.ua"
}

POST /auth/allow/delete/listId
{
"email": "vitalii@i.ua"
}

FIXED COSTS

POST /fixed-costs
{
"title": "Вивіз сміття",
"sum": 50.3
}

PUT. /fixed-costs/id
{
"title": "Вивіз сміття",
"sum": 50.3
}

DELETE /fixed-costs/id

GET /fixed-costs

PRICE

GET /price

POST /price
{
"title": "jhkjhkjh",
"price": 4.33
}

PUT /price/id
{
"title": "Світло",
"price": 4.33
}

DELETE /price/id

COST LIST

GET /costs-list

POST /costs-list

DELETE /costs-list/id

POST. /costs-list/costs/listId
{
"title": "Споживання газу",
"price": 7.95689,
"number": 45
}

PATCH /costs-list/costs/listId/costId
{
"title": "Споживання газу",
"price": 7.95689,
"number": 55
}

DELETE /costs-list/costs/listId/costId
