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

### Login
If no user is signed in you will encounter this page will it will ask you for your user credentials at the /login page.

<img width="447" alt="Screenshot 2023-03-29 175709" src="https://user-images.githubusercontent.com/97318548/228678962-e110f2b7-8792-4d20-b74f-d400339275e3.png">

Once you have enter your credentials you can press the Log in button to sign in.


<img width="293" alt="Screenshot 2023-03-29 181324" src="https://user-images.githubusercontent.com/97318548/228679593-ea020549-7e35-477b-9ba5-058553476da3.png">



