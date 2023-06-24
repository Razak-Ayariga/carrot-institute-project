# Delivery app
This is a delivery app for ordering food.
Node js with Express as Backend Framework
Mysql sequelize for database and database management.

## Get app Started

First, Install Node Modules:
 # In the root directory and in the client directory
 bash
 npm install
 # or 
 yarn install
 

 Run app
# In the root directory
bash
npm start
# or
yarn start

# Testing the route
Once the database is connected and the app is running, open postman to test the following routes using your own port and localhost.


## Restaurant Routes
### Sign Up
Endpoint: /restaurant/signUp
Method: POST
Auth Required: No
Description: Registers a new restaurant.
Request Body: JSON object containing the restaurant data.
Expected Output: Returns the created restaurant object.

### Sign In 
Endpoint: /restaurant/signIn
Method: POST
Auth Required: No
Description: Authenticates a restaurant user.
Request Body: JSON object containing the restaurant credentials.
Expected Output: Returns a token for restaurant authentication.

### Get All Restaurants
Endpoint: /restaurant/allRestaurants
Method: GET
Auth Required: No
Description: Retrieves all restaurants.
Expected Output: Returns an array of all restaurant objects.

### Get All Orders
 Endpoint: /restaurant/allOrders
Method: GET
Auth Required: Yes (verifyToken)
Description: Retrieves all orders received by a restaurant.
Expected Output: Returns an array of all restaurant order objects.


## User Routes
## Sign Up
Endpoint: /user/signUp
Method: POST
Auth Required: No
Description: Registers a new user.
Request Body: JSON object containing the user data.
Expected Output: Returns the created user object.

## Sign In
Endpoint: /user/signIn
Method: POST
Auth Required: No
Description: Authenticates a user.
Request Body: JSON object containing the user credentials.
Expected Output: Returns a token for user authentication.

## VIew All User Orders
Endpoint: /user/allOrders
Method: GET
Auth Required: Yes (verifyToken)
Description: Retrieves all orders placed by the authenticated user.
Expected Output: Returns an array of all user order objects.

## View All Menu
Endpoint: /user/allMenu
Method: GET
Auth Required: No
Description: Retrieves all available menu items.
Expected Output: Returns an array of all menu objects.


## Menu Routes
### Add Menu
Endpoint: /addMenu
Method: POST
Auth Required: Yes (verifyToken)
Description: Creates a new menu item.
Request Body: JSON object containing the menu data.
Expected Output: Returns the created menu object.

### Update Menu
Endpoint: /restaurant/updateMenu/:id
Method: PUT
Auth Required: Yes (verifyToken)
Description: Updates an existing menu item.
Request Parameters: id - ID of the menu item to update.
Request Body: JSON object containing the updated menu data.
Expected Output: Returns the updated menu object.

### Cancel Menu
Endpoint: /restaurant/cancelMenu/:id
Method: DELETE
Auth Required: Yes (verifyToken)
Description: Cancels a menu item.
Request Parameters: id - ID of the menu item to cancel.
Expected Output: Returns a success message indicating the menu cancellation.

### Get All Menu
Endpoint: /restaurant/allMenu
Method: GET
Auth Required: Yes (verifyToken)
Description: Retrieves all menu items.
Expected Output: Returns an array of all menu objects.


## Order Routes
### Place Order
Endpoint: /user/order
Method: POST
Auth Required: Yes (verifyToken)
Description: Places a new order.
Request Body: JSON object containing the order data.
Expected Output: Returns the created order object.

### Update Order
Endpoint: /user/updateOrder/:id
Method: PUT
Auth Required: Yes (verifyToken)
Description: Updates an existing order.
Request Parameters: id - ID of the order to update.
Request Body: JSON object containing the updated order data.
Expected Output: Returns the updated order object.

### Get All User Orders
Endpoint: /user/allOrders
Method: GET
Auth Required: No
Description: Retrieves all orders placed by a user.
Expected Output: Returns an array of all user order objects.

### Cancel Order
Endpoint: /user/cancelOrder/:id
Method: DELETE
Auth Required: Yes (verifyToken)
Description: Cancels an order.
Request Parameters: id - ID of the order to cancel.
Expected Output: Returns a success message indicating the order cancellation.