// We no longer need to load the CSV directly here
// as it will be loaded by the SQL engine

export const predefinedQueries = [
  {
    name: "Select All Orders (Limited)",
    query: "SELECT * FROM orders LIMIT 100;",
    description: "Shows a sample of all order data with all columns"
  },
  {
    name: "Select Recent Orders",
    query: "SELECT * FROM orders ORDER BY orderDate DESC LIMIT 50;",
    description: "Shows the most recent orders first"
  },
  {
    name: "Select Orders with High Freight",
    query: "SELECT * FROM orders WHERE freight > 100 ORDER BY freight DESC LIMIT 25;",
    description: "Shows orders with high shipping costs"
  },
  {
    name: "Count Orders by Ship Country",
    query: "SELECT shipCountry, COUNT(*) as order_count FROM orders GROUP BY shipCountry ORDER BY order_count DESC;",
    description: "Provides a summary of orders by destination country"
  },
  {
    name: "Customer Order Analysis",
    query: "SELECT customerID, COUNT(*) as order_count, SUM(freight) as total_freight FROM orders GROUP BY customerID ORDER BY total_freight DESC LIMIT 15;",
    description: "Shows top customers by total freight costs"
  },
  {
    name: "Shipping Analysis by City",
    query: "SELECT shipCity, shipCountry, COUNT(*) as shipment_count, AVG(freight) as avg_freight FROM orders GROUP BY shipCity, shipCountry ORDER BY shipment_count DESC LIMIT 20;",
    description: "Shows most frequent shipping destinations with average freight costs"
  }
]; 