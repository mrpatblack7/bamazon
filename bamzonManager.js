var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table");

var connection = mysql.createConnection({
	host:"localhost",
	port:8889,
	user:"root",
	password:"root",
	database:"bamazon"
});

connection.connect(function(err){
	if(err)throw err;
	console.log("connected as id" + connection.threadId);
});

function displayInventory(){
	connection.query('SELECT * FROM Products', function(err, res){
		if(err){console.log(err)};
		var theDisplayTable = new Table({
			head: ['Item ID', 'Product Name', 'Category', 'Price', 'Quantity'],
			colWidths: [10,25,25,10,14]
		});
		for(i=0; i<res.length;i++){
			theDisplayTable.push(
				[res[i].item_id,res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]
				);
		}
		console.log(theDisplayTable.toString());
		inquirerForUpdates();
    });
    
    //function lowInventory() {
        // Create array to hold data
        // Check if we have low inventory
        // Loop through the results and append to the data array
         // Output the data

    // Prompt the user to enter an item id
//function userPrompt(){};
/*inquirer.prompt({
    type: "list",
    name: "userChoice",
    message: "What would you like to do?",
    choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product", "Exit"]
}).then(function (user) {
    choice = user.userChoice;
*/
// What did the manager select?
//using switch case and break

// Add inventory to the store
// Loop through the results and append to the data array

// Prompt the user to enter a quantity
//function updateStock(itemId, stockQuantity)

    
};