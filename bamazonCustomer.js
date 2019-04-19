var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table");

var connection = mysql.createConnection({
    host: "localhost",
    port: 8889,
    user: "root",
    password: "root",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id" + connection.threadId);
});

var displayProducts = function () {
    var query = "Select * FROM products";
    connection.query(query, function (err, res) {
        if (err) throw err;
        var displayTable = new Table({
            head: ["Item ID", "Product Name", "Catergory", "Price", "Quantity"],
            colWidths: [10, 20, 20, 10, 14]
        });
        for (var i = 0; i < res.length; i++) {
            displayTable.push(
                [res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]
            );
        }
        console.log(displayTable.toString());
        purchasePrompt();
    });
}

function purchasePrompt() {
    inquirer.prompt([
        {
            name: "ID",
            type: "input",
            message: "Please enter item ID that you would like to purchase.",
            filter: Number
        },
        {
            name: "Quantity",
            type: "input",
            message: "How many of this item would you like to purchase?",
            filter: Number
        },

    ]).then(function (answers) {
        var quantityNeeded = answers.Quantity;
        var IDrequested = answers.ID;
        purchaseOrder(IDrequested, quantityNeeded);
    });
};

function purchaseOrder(ID, amtNeeded) {
    connection.query('Select * FROM products WHERE item_id = ' + ID, function (err, res) {
        if (err) { console.log(err) };
        if (amtNeeded <= res[0].stock_quantity) {
            var quantity = res[0].stock_quantity;
            var totalCost = res[0].price * amtNeeded;
            console.log("Good news your order is in stock!");
            console.log("Your total cost for " + amtNeeded + " " + res[0].product_name + " is " + totalCost + " Thank you!");
           
            connection.query('UPDATE products SET stock_quantity = ' + (quantity - amtNeeded) + ' WHERE item_id = ' + ID);
            
            
        } else {
            console.log("Insufficient quantity, sorry we do not have enough " + res[0].product_name + "to complete your order.");
        };
        displayProducts();
    });
};

displayProducts();

//   7. Once the customer has placed the order, your application should check
    //    if your store has enough of the product to meet the customer's request.
    //  * If not, the app should log a phrase like `Insufficient quantity!`, and 
    //  then prevent the order from going through.


    // 8. However, if your store _does_ have enough of the product, you should 
    // fulfill the customer's order.
    //    * This means updating the SQL database to reflect the remaining quantity.
    //    * Once the update goes through, show the customer the total cost of 
    // their purchase.

    