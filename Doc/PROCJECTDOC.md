# Facebook Clone Project

This is how you get the project started.

## Getting started
1. Clone this repository (only this branch)

2. Switch to pyenv shell 3.9.4

     ```bash
     pyenv shell 3.9.4
     ```
3. Install dependencies

      ```bash
      pipenv install -r requirements.txt
      ```

4. Create a **.env** file based on the example with proper settings for your
   development environment

5. Make sure the SQLite3 database connection URL is in the **.env** file

6. This starter organizes all tables inside the `flask_schema` schema, defined
   by the `SCHEMA` environment variable.  Replace the value for
   `SCHEMA` with a unique name, **making sure you use the snake_case
   convention**.

7. Get into your pipenv, migrate your database, seed your database, and run your Flask app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

8. To run the React App in development, checkout the [README](./react-app/README.md) inside the `react-app` directory.


## Navigating site

### /login
If no user is signed in you will encounter this page will it will ask you for your user credentials at the /login page.

<img width="447" alt="Screenshot 2023-03-29 175709" src="https://user-images.githubusercontent.com/97318548/228678962-e110f2b7-8792-4d20-b74f-d400339275e3.png">

Once you have enter your credentials you can press the Log in button to sign in.

<img width="293" alt="Screenshot 2023-03-29 181324" src="https://user-images.githubusercontent.com/97318548/228682541-baf9444a-1dd9-48c5-9158-55d2d54409f1.png">

### /signup

If you would like to create a new account 

<img width="297" alt="Screenshot 2023-03-29 175842" src="https://user-images.githubusercontent.com/97318548/228682383-9e1a9130-0e6a-4287-8a26-4160b38c3ca3.png">



<img width="524" alt="Screenshot 2023-03-29 175830" src="https://user-images.githubusercontent.com/97318548/228682506-926f4f9c-5b2c-4354-8d6f-fe0b8400ca92.png">


<img width="302" alt="Screenshot 2023-03-29 175901" src="https://user-images.githubusercontent.com/97318548/228682518-07274b53-c7a8-48f1-95f3-0d0993903a6b.png">

