<h1 align="center"> FoodExplorer API</h1>

<p align="center">
This is the backend repository for the Food Explorer project, a fictitious restaurant dish management application.  <br/>
</p>

<p align="center">
  
## Table of Contents

- [ Functionalities](#-functionalities)

  - [User Authentication and Authorization](#user-authentication-and-authorization)
  - [Role-Based Access Control](#role-based-access-control)
  - [Dish Management](#dish-management)
  - [User Interaction](#user-interaction)
  - [Payment Processing](#payment-processing)
  - [Order Management](#order-management)

- [ Folder Structure and Code Organization](#-folder-structure-and-code-organization)

- [ Technologies](#-technologies)
  - [Development Dependencies](#development-dependencies)

- [Running the Project Locally](-#running-the-project-locally)

- [Getting Started](-#getting-started)

- [Deploy](-#deploy)
- [Contribution](-#contribution)
- [Contribution](-#contribution)
- [Contact](#-contact)
- [License](#-license)

</p>

<p align="center">
  <img alt="License" src="https://img.shields.io/static/v1?label=license&message=MIT&color=49AA26&labelColor=000000">
</p>

<br>

## 🔧 Functionalities

Highlighted functionalities encompass:

### User Authentication and Authorization

- **Initial User Creation:** Upon first execution, a 'master' role user is created. This user has the authority to create admin accounts through the `/admin` endpoint.
- **User Account Management:**
  - Creation of user accounts using the `/users` endpoint (POST request).
  - Logging in with user credentials through the `/sessions` endpoint (POST request). Successful login generates a JWT token used for subsequent actions on the routes (handled via middleware).

### Role-Based Access Control

- **Middleware Authorization:**
  - Specific middlewares to validate actions:
    - Middleware to ensure only admins have access to certain routes.
    - Middleware restricting access to the 'master' role user.

### Dish Management

- **Routes for Dish Handling:**
  - `/dishes` endpoint with CRUD operations:
    - `create` (for admins), `update` (admin), `show` (all), `index` (all), `delete` (admin).
  - `/dishes/image` endpoint for image addition and update of dishes (admin access).

### User Interaction

- **Managing Favorites:** Routes under `/favorites`:
  - `create`, `show`, `index`, and `delete` available for all users. Used to save favorites in the database.

### Payment Processing

- **Transaction Handling:**
  - `/transactions` endpoint with a `create` operation available for all. Responsible for payment processing, order creation, status alteration, and utilizes a real payment API (currently set up for test payments with fictitious cards provided by the Mercado Pago API).

### Order Management

- **Order Handling:**
  - Routes under `/orders`:
    - `show` (all), `update` (admin), `index` (admin). Orders are created upon successful payment completion.

## 📂 Folder Structure and Code Organization

The project structure is organized as follows:

- **/src** - Root directory for source code.
  - **/configs** - Configuration files.
    - `auth.js` - Contains JWT secret keys and expiration time.
    - `upload.js` - Handles file uploads using multer and sets storage destination paths.
  - **/controllers** - Contains controllers handling business logic.
  - **/database** - Database related files.
    - **/sqlite** - SQLite database files.
    - **/knex** - Knex configuration files.
    - **/migrations** - Database migration files.
  - **/master** - Contains specific files related to the 'master' role.
    - **/controllers** - Controllers for the 'master' role.
    - **/services** - Services for the 'master' role.
    - **/repositories** - Repositories for the 'master' role.
  - **/middlewares** - Middleware files for request processing.
  - **/providers** - Files for handling storage providers (like disk storage for images).
    - `diskstorage.js` - Manages image deletion and update functionality.
  - **/repositories** - Repository files for database interactions.
  - **/routes** - Route definitions.
  - **/schemas** - Schema files for data validation or database schema.
  - **/services** - Service files containing business logic.
  - **/utils** - Utility/helper files.
- **/tmp** - Directory to store temporary files (e.g., images).

## 🚀 Technologies

This project was developed using the following technologies:

- **JavaScript:** The primary programming language for the project.
- **NodeJS:** The JavaScript runtime used for server-side development.
- **Express:** A minimalist web framework for Node.js used to build the API.
- **bcryptjs:** A library for hashing passwords.
- **cookie-parser:** Middleware used for parsing cookies.
- **cors:** A package enabling Cross-Origin Resource Sharing for secure communication between servers.
- **dotenv:** A module for loading environment variables from a .env file into process.env.
- **jsonwebtoken:** Used for generating and verifying JSON Web Tokens (JWT).
- **knex:** A SQL query builder for Node.js used for interacting with the database.
- **multer:** Middleware for handling multipart/form-data, particularly used for file uploads.
- **sqlite3:** SQLite database driver.
- **mercadopago:** Integration for payment processing through Mercado Pago.
- **yup:** A schema validation library.

### Development Dependencies
- **Jest:** JavaScript testing framework.
- **nodemon:** Development tool for automatically restarting the server on file changes.
- **@flydotio/dockerfile:** Tool for creating Dockerfiles.
- **kill-port:** Used to kill a process currently using a particular port.

These technologies form the foundation of the project, covering server-side development, database interaction, middleware usage, authentication, validation, testing, and development convenience.

## 🏃‍♀️ Running the Project Locally

To run this project locally, follow these steps:

1. Clone the repository.
2. Install dependencies with `npm install`.
3. Set up necessary environment variables. You can refer to the `.env.example` file for guidance.
4. Start the local server with `npm start` or `npm run dev`.

The `.env.example` file serves as a reference for setting up the required environment variables.

## 🏁 Getting Started

Before proceeding, it's essential to create an admin account using the master credentials to access the application fully.

To create an admin account, utilize a POST request to the `/admin` route. Ensure you have the necessary permissions and follow the API's documentation or guidelines for admin account creation.

## 📝 License

This project is licensed under the [MIT License](LICENSE).

## 🌐 Deploy

The backend is hosted at [https://foodexplorer.fly.dev](https://foodexplorer.fly.dev). To access the frontend repository, visit [https://github.com/JocaBadasss/FoodExplorer](https://github.com/JocaBadasss/FoodExplorer).

## 🤝 Contribution

Contributions are welcome! Feel free to open a pull request for enhancements, bug fixes, or new feature additions.

## 📧 Contact

For any queries or suggestions, please reach out via email at [joaocarlos1208@hotmail.com](mailto:joaocarlos1208@hotmail.com).


Made with ♥ by Joca :wave:
