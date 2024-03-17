<!-- # Social Networking API Documentation

This documentation provides detailed information about the RESTful API endpoints for the social networking application.

## Authentication

### POST /api/login

**Description:** Endpoint to authenticate users and generate a JWT token for accessing protected routes.

**Request Body:**
```json
{
  "email": "example@example.com",
  "password": "password123"
}
```
**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "userId": "6c84fb90-12c4-11ec-82a8-0242ac130003"
}
```
 ### POST /api/signup
**Description:**  Endpoint to create a new user account.

**Request Body:**
```json
{
  "fullName": "John Doe",
  "email": "example@example.com",
  "password": "password123"
} 
```
**Response:**

```json
{
  "message": "User created successfully"
}
```
User Profiles
### GET /api/profile/:email
**Description:**  Retrieve user profile information by email.

**Response:**
```json

{
  "fullName": "John Doe",
  "email": "example@example.com",
  "bio": "Software Engineer",
  "profilePicture": "https://example.com/profile.jpg"
}
```
 ### PUT /api/profile/:email
**Description:**  Update user profile information.

**Request Body:**
```json
{
  "fullName": "John Doe",
  "bio": "Senior Software Engineer"
}
```
**Response:**
```json

{
  "message": "User profile updated successfully"
}
```
DELETE /api/profile/delete/:id
**Description:**  Delete user profile by ID.

**Response:**
```json

{
  "message": "User profile deleted successfully"
}
```
Posts
### POST /api/posts/new
**Description:**  Create a new post.

**Request Body:**
```json
{
  "content": "Hello, world!"
}
```
**Response:**
```json
{
  "postId": "6c84fb90-12c4-11ec-82a8-0242ac130003",
  "message": "Post created successfully"
}
```
### GET /api/posts/:postId
**Description:**  Retrieve post by ID.

**Response:**
```json

{
  "postId": "6c84fb90-12c4-11ec-82a8-0242ac130003",
  "content": "Hello, world!",
  "createdAt": "2024-03-18T12:00:00.000Z",
  "userId": "6c84fb90-12c4-11ec-82a8-0242ac130003"
}
```
### PUT /api/posts/:postId
**Description:**  Update post by ID.

**Request Body:**
```json

{
  "content": "Updated content"
}
```
**Response:**

```json
{
  "message": "Post updated successfully"
}
```
### DELETE /api/posts/delete/:postId
**Description:**  Delete post by ID.

**Response:**
```json

{
  "message": "Post deleted successfully"
}
```
Following Mechanism
### PUT /api/users/follow
**Description:**  Follow or unfollow a user.

**Request Body:**
```json
{
  "followId": "6c84fb90-12c4-11ec-82a8-0242ac130003"
}
```
**Response:**

```json
{
  "message": "User followed successfully"
}
```
### GET /api/users/get/followers/:userId
**Description:**  Retrieve followers of a user by ID.

**Response:**
```json

{
  "followers": [
    {
      "userId": "6c84fb90-12c4-11ec-82a8-0242ac130003",
      "fullName": "Jane Doe",
      "email": "jane@example.com"
    }
  ]
}
```
### GET /api/users/get/followings/:userId
**Description:**  Retrieve users followed by a user by ID.

**Response:**
```json
{
  "followings": [
    {
      "userId": "6c84fb90-12c4-11ec-82a8-0242ac130003",
      "fullName": "Jane Doe",
      "email": "jane@example.com"
    }
  ]
}
```

# Post Routes

### Create a new post
#### POST /post/new
Creates a new post.

- Requires authentication.

#### Request Body

| Parameter | Type   | Description        |
| --------- | ------ | ------------------ |
| title     | string | Title of the post  |
| body      | string | Body of the post   |
| image     | string | Image URL (optional)|

#### Response

- `200 OK` on success, returns the created post.
- `500 Internal Server Error` on failure.

---
### Get user profile posts
#### GET /posts/profileposts/:userId


Retrieves posts of a specific user's profile.

- Requires authentication.

#### Parameters

| Parameter | Type   | Description                   |
| --------- | ------ | ----------------------------- |
| userId    | string | ID of the user whose posts are to be fetched |

#### Response

- `200 OK` on success, returns an array of user's posts.
- `404 Not Found` if no posts are found for the user.
- `500 Internal Server Error` on failure.

---

### Get all posts of followings
#### GET /posts/all


Retrieves all posts of the users whom the authenticated user is following.

- Requires authentication.

#### Response

- `200 OK` on success, returns an array of posts.
- `404 Not Found` if no posts are found for the users followed by the authenticated user.
- `500 Internal Server Error` on failure.

---

### Get a post
#### GET /post/get/:postId

Retrieves a specific post by its ID.

- Requires authentication.

#### Parameters

| Parameter | Type   | Description        |
| --------- | ------ | ------------------ |
| postId    | string | ID of the post to retrieve |

#### Response

- `200 OK` on success, returns the requested post.
- `500 Internal Server Error` on failure.

---

### Update a post

#### PUT /post/update/:postId


Updates a specific post by its ID.

- Requires authentication.

#### Parameters

| Parameter | Type   | Description        |
| --------- | ------ | ------------------ |
| postId    | string | ID of the post to update |

#### Request Body

| Parameter | Type   | Description        |
| --------- | ------ | ------------------ |
| title     | string | Title of the post (optional) |
| body      | string | Body of the post (optional)  |
| image     | string | Image URL of the post (optional) |

#### Response

- `200 OK` on success, returns the updated post.
- `500 Internal Server Error` on failure.

---

### Delete a post

#### DELETE /post/delete/:postId


Deletes a specific post by its ID.

- Requires authentication.

#### Parameters

| Parameter | Type   | Description        |
| --------- | ------ | ------------------ |
| postId    | string | ID of the post to delete |

#### Response

- `200 OK` on success, returns the deleted post.
- `500 Internal Server Error` on failure.

---

This documentation assumes you have properly authenticated your requests with appropriate tokens.





 -->


## Features 📋

1. This is a social network API that uses MongoDB, a NoSQL database, which allows the website to handle large amounts of unstructured data.

2. When the command to invoke the application is entered, the Mongoose models are synced to the MongoDB database.

<img src="/public/Assets/mongodb_database.png">


## Users signup/login

- Signup user with name , email and password
<img src="/public/Assets/signup_user.png">

-Login user with email and password
<img src="/public/Assets/login_user.png">

## CRUD Operations with posts (Create , Read , Update , Delete)

-Create post
<img src="/public/Assets/create_post.png">

-View post
<img src="/public/Assets/view_posts.png">

-Update post
<img src="/public/Assets/update_post.png">

-Delete post
<img src="/public/Assets/delete_posts.png">


## CRUD Operations with user profile (Create , Read , Update , Delete)

-Create profile
<img src="/public/Assets/add_profile.png">

-View profile
<img src="/public/Assets/view_profile.png">

-Update profile
<img src="/public/Assets/update_profile.png">

-Delete profile
<img src="/public/Assets/delete_profile.png">

## Follow/Unfollow Profile

- Follow a user with his id --> followId
<img src="/public/Assets/delete_profile.png">
