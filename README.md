 ### Product API
How to run the project:
First you will need to set your environment variables creating an `.env` file using the `.env.example` that is provided

This project was developed using `yarn`

 - To install all dependencies run `yarn add` using the command line in the root of the  `package.json` file
 - Then run `yarn build` this will build the project.
 - Then run `yarn start` this will start the development server using the port 5000 or the one you declared in the environment variables.

### Technological Decisions and Architecture

List of technologies:

 1. NodeJs
 2. Sequelize
 3. Express
 4. PostgresSQL

NodeJs and Express makes it easy to setup and quickly build an API with REST standards with easy to read code and very maintainable is also a plus to be able to be able to grow the application gradually.<br>
The use of an ORM like sequelize follows the same point made before, their API is very easy to read and their naming conventions to do SQL operations is very straightforward, their constraints validations are very useful as well.<br>
Overall i would say thats with these set of technologies you can deliver a MVP of an app very quickly and be able to build up on it without worrying about scalability.<br>

This app was built using a MVC Pattern like architecture. 
