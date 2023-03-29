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

Once you have enter your credentials you can press the 'Log in' button to sign in.

<img width="293" alt="Screenshot 2023-03-29 181324" src="https://user-images.githubusercontent.com/97318548/228682541-baf9444a-1dd9-48c5-9158-55d2d54409f1.png">

### /signup

If you would like to create a new account press the 'Create new account' button this will take you to the /signup route.
<img width="298" alt="Screenshot 2023-03-29 175800" src="https://user-images.githubusercontent.com/97318548/228684032-74e2d071-db75-413a-b7b9-7e08b726c265.png">


Once you at the /signup route it will ask you for your First Name, Last Name, Email, Password and to confirm your password, and if you want to but not mandatory you can add a Profile Image.


<img width="524" alt="Screenshot 2023-03-29 175830" src="https://user-images.githubusercontent.com/97318548/228684407-928fea16-14e0-4b31-bc9b-ed8f9203d90b.png">

Once your info has been entered your specification press the 'Sign Up' button it will create your user account and automaticaly sign you in and take you to the home page.

<img width="298" alt="Screenshot 2023-03-29 184733" src="https://user-images.githubusercontent.com/97318548/228684816-47f4b848-c6b9-4472-9bc4-163b2c3359b6.png">

If have come to this page by accident you can press the 'Cancel' button which will take you back to the /login route.

<img width="297" alt="Screenshot 2023-03-29 175842" src="https://user-images.githubusercontent.com/97318548/228685037-e37a6e64-16d5-44e0-bf82-c888397a8bd5.png">

If you don't have an account and don't want to create an account and just want to test the site you can press the 'Demo Login' button to sign in as a demo user which credentials has been hard coded.

<img width="302" alt="Screenshot 2023-03-29 175901" src="https://user-images.githubusercontent.com/97318548/228685429-55b1f62a-226c-46aa-962f-ef0021c9e473.png">


## Once you have signed in


