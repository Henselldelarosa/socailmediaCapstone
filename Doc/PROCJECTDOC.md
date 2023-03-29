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




