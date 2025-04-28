npm install 

<!-- for run migrateion file -->
npm i -g sequelize-cli  

npm run migrate

<!-- for start project  -->
npm start



env
<!-- postgres -->

DB_NAME="inventory_management_system"
DB_USERNAME=""
DB_PASSWORD=""
DB_HOST="localhost"
DB_DIALECT="postgres"
DB_PORT="5432"
DB_LOGGING="false"

PORT="3000"

<!-- mysql -->
DB_NAME="inventory_management_system"
DB_USERNAME=""
DB_PASSWORD=""
DB_HOST="localhost"
DB_DIALECT="mysql"
DB_PORT="3306"
DB_LOGGING="false"

PORT="3000"


<!-- you need to add this folder and file config/config.json -->

{
  "development": {
    "username": "root",
    "password": "",
    "database": "inventory_management_system",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "inventory_management_system",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "inventory_management_system",
    "host": "127.0.0.1",
    "dialect": "postgres"
  }
}
