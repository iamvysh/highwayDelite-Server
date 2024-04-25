
# Mechine task BackEnd  for Highway Delite

A brief description of what this project does and who it's for







## Run Locally

Clone the project

```bash
  git clone https://github.com/iamvysh/highwayDelite-Server.git
```

Go to the project directory

```bash
  cd highwayDelite-Serve
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```


## API Reference

#### Signup User

```http
  POST   https://highwaydelite-server.onrender.com/api/register
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `firstName` | `string` | **Required**. |
| `lastName` | `string` | **Required**. |
| `password` | `string` | **Required**. |
| `contactMode` | `string` | **Required**. |
| `email` | `string` | **Required**. |

#### Verify User

```http
  POST  https://highwaydelite-server.onrender.com/api/verify
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `email`      | `string` | **Required**.  |
| `otpCode`      | `string` | **Required**.  |



#### SignIn User

```http
  POST  https://highwaydelite-server.onrender.com/api/login
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `email`      | `string` | **Required**.  |
| `password`      | `string` | **Required**.  |



