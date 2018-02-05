CREATE TABLE `bamazon`.`products`
(
  `item_id` INT NOT NULL AUTO_INCREMENT,
  `product_name` VARCHAR
(150) NOT NULL,
  `department_name` VARCHAR
(150) NOT NULL,
  `price` INT NULL,
  `stock_quatity` INT NULL,
  PRIMARY KEY
(`item_id`));