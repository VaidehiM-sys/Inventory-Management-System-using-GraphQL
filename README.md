# Inventory Management System using React.js, GraphQL and Node.js

Inventory Management System developed using React.js to create front end components, Node.js is used as a backend server and API implemented using GraphQL

The project has a schema.graphql file. 
* Schema.graphql file includes an enum for inventory categories (Shirts, Jeans, Jackets, Sweaters, and Accessories).
*	Created a type for Product that outlines the following data / scalar types:
	id: Int!
	Category: Category!
	Name: String!
	Price: Float
	Image: String
* Created an input for Product
*	Created a query and a mutation

server.js file includes following :
*	A reference to Apollo Server
*	An API to retrieve products.
*	An API to add a product.
*	A resolvers object that sets Query and Mutation properties.

app.jsx file that uses GraphQL API and has following :
*	A list function with a GraphQL query to retrieve data.
*	A create (add) function with a GraphQL query to create (add) data.

 
