const data = '{"name":"Laptop","price":500}';
const obj = JSON.parse(data);
console.log(obj.name); // Output: Laptop
console.log(obj.price); // Output: 500

// Convert JavaScript object to JSON string
const jsonString = JSON.stringify(obj);
console.log(jsonString); // Output: {"name":"Laptop","price":500}