## How to run this

1) For this assignement I am using sqlite database, already present in th repository with name `db.sqlite`.

2) `npm install` to install all the dependency of the package json file.

3) Start the server by running `npm start`

4) Check the swagger-ui on `http://localhost:3000/docs`

5) POST `http://localhost:3000/api/login/{role}` role can be "admin/user" with the following body
``
{
"username": "username",
"password": "password"
}
``
and take the token that you get in the response

6) GET `http://localhost:3000/api/post?page=1&size=10` to access all the post paginated 

7) POST `http://localhost:3000/api/post` to create a new post only allowed to the 'admin' role
``
{
  "post": "i am sample post"
}
``

8) PATCH `http://localhost:3000/api/post/{postId}` postId is the id of post, basically update a post only allowed to the 'admin' role
``
{
  "post": "i am sample post 2"
}
``

9) DELETE `http://localhost:3000/api/post/{postId}` postId is the id of post, basically delete a post only allowed to the 'admin' role
``
{
  "post": "i am sample post 2"
}
`
   
Then you can try logging in as an admin and accessing the admin-only route.
