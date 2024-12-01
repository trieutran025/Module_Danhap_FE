import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../components/css/EmployeeManagement.css';  // Assuming the CSS file is in the same directory

const API_URL = 'http://localhost:5000/api/employees'; // Example API URL

const EmployeeManagement = () => {
  const [employees, setEmployees] = useState([]);
  const [newEmployee, setNewEmployee] = useState({
    name: '',
    email: '',
    mobile: '',
    address: '',    
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch employees from the API
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get(API_URL);
        setEmployees(response.data);
      } catch (error) {
        setError('Failed to fetch employees');
      } finally {
        setLoading(false);
      }
    };
    fetchEmployees();
  }, []);

  // Handle adding a new employee
  const handleAddEmployee = async () => {
    if (!newEmployee.name || !newEmployee.email || !newEmployee.mobile || !newEmployee.address) {
      setError('All fields are required!');
      return;
    }
    try {
      const response = await axios.post(API_URL, newEmployee);
      setEmployees([...employees, response.data]); // Add new employee to the list
      setNewEmployee({ name: '', email: '', mobile: '', address: '' }); // Clear the form
      setError('');
    } catch (error) {
      setError('Failed to add employee');
    }
  };

  // Handle removing an employee
  const handleRemoveEmployee = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setEmployees(employees.filter((emp) => emp.id !== id)); // Remove employee from the list
    } catch (error) {
      setError('Failed to remove employee');
    }
  };

  // Handle updating an employee
  const handleUpdateEmployee = async (id) => {
    if (!newEmployee.name || !newEmployee.email || !newEmployee.mobile || !newEmployee.address) {
      setError('All fields are required!');
      return;
    }
    try {
      const response = await axios.put(`${API_URL}/${id}`, newEmployee);
      setEmployees(
        employees.map((emp) => (emp.id === id ? response.data : emp))
      );
      setNewEmployee({ name: '', email: '', mobile: '', address: '' }); // Clear the form
      setError('');
    } catch (error) {
      setError('Failed to update employee');
    }
  };

  return (
    <div>
      <h2>Employee Management</h2>

      {error && <div className="error">{error}</div>}

      {/* Form to add/update employee */}
      <div>
        <input
          type="text"
          placeholder="Name"
          value={newEmployee.name}
          onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Email"
          value={newEmployee.email}
          onChange={(e) => setNewEmployee({ ...newEmployee, email: e.target.value })}
        />
        <input
          type="text"
          placeholder="Mobile"
          value={newEmployee.mobile}
          onChange={(e) => setNewEmployee({ ...newEmployee, mobile: e.target.value })}
        />
        <input
          type="text"
          placeholder="Address"
          value={newEmployee.address}
          onChange={(e) => setNewEmployee({ ...newEmployee, address: e.target.value })}
        />
        <button onClick={handleAddEmployee}>Add Employee</button>
      </div>

      {/* Display Employee List */}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <table border="1" cellPadding="5">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr key={emp.id}>
                <td>{emp.id}</td>
                <td>{emp.name}</td>
                <td>{emp.email}</td>
                <td>{emp.mobile}</td>
                <td>{emp.address}</td>
                <td>
                  <button onClick={() => handleRemoveEmployee(emp.id)}>Delete</button>
                  <button onClick={() => handleUpdateEmployee(emp.id)}>Update</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default EmployeeManagement;