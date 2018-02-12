
const inquirer = require('inquirer');
const mysql = require("mysql");




var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "",
    database: "bamazon"
});

//query function

const makeQuery = () => {connection.query(
    'SELECT * FROM products',
    function (err, results, fields) {
        if(err){
            console.log(err);
            
        }
        for(var i = 0; i < results.length; i++){
            console.log(`Item Id: ${results[i].item_id} || Item Name: ${results[i].product_name} || Price: ${results[i].price}

----------------------------------------------------
`); // results contains rows returned by server
        // console.log(fields); // fields contains extra meta data about results, if available
        }
        prompts();
    });
}


//Function to call prompts
const prompts = () =>
   {inquirer.prompt([
        {
            name: 'itemToBuy',
            type: 'input',
            message: 'Which item would you like to buy? Enter Item ID#'
        },
        {
            name: 'amount',
            type: 'input',
            message: 'How many would you like to buy?'
        }
    ]).then((answer) => {
        let query = 'SELECT * FROM products WHERE item_id=' + answer.itemToBuy; 
        connection.query(query, (err, res) => {
            if(answer.amount <= res[0].stock_quatity) {
                for(var i = 0; i < res.length; i++){
                    let quantity = res[i].stock_quatity;
                    let name = res[i].product_name;
                    let updatedQuantity = quantity - answer.amount;
                    let totalCost = res[i].price * answer.amount;

                    connection.query('UPDATE products SET ? WHERE ?', 
                    [{
                        stock_quatity: updatedQuantity
                    },
                    {
                        item_id: answer.itemToBuy
                    }
                ])
                    
                    console.log(`Bamazon Thanks You!
The total cost of your order is $${totalCost}`);
                    
                }
            }else{
                console.log("All out");
            }
            inquirer.prompt([{
                name: 'anotherItem',
                type: 'confirm',
                message: 'Would you like another?'
            }]).then((answer) =>
            {
                if(answer.anotherItem === true){
                    makeQuery();
                } else { 
                    console.log('Lame');
                };
                
                
            })
            // makeQuery();
        })
    }).catch((error) =>
    {
        console.log(error);
        
    })
};



makeQuery();

