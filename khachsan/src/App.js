import React from "react";
import EmployeeManagement from "./componet/EmployeeManagement";
import CustomerManagement from "./componet/CustomerManagement"; // Make sure the path is correct

const App = () => {
  // The error 'no-unused-expressions' could occur if you had an unused expression, 
  // make sure any expressions are part of a valid statement like a function call or assignment
  
  // Example of avoiding an unused expression
  let s = "This is a string"; // Now 's' is properly defined and used.
  
  // Fixing any unused expression issue by calling a function with 's'
  console.log(s); // This would not trigger the "no-unused-expressions" error
  
  return (
    <div>
      <EmployeeManagement />
    <CustomerManagement />
  </div>
  );
};

export default App;
