import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../components/css/CustomerManagement.css'; // Assuming your CSS file is in the same directory

const API_URL = 'http://localhost:8080/api/customers'; // Replace with your API URL

const CustomerManagement = () => {
  const [customers, setCustomers] = useState([]);
  const [newCustomer, setNewCustomer] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch customers from the API
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get(API_URL);
        setCustomers(response.data);
      } catch (error) {
        setError('Failed to fetch customers');
      } finally {
        setLoading(false);
      }
    };
    fetchCustomers();
  }, []);

  // Handle adding a new customer
  const handleAddCustomer = async () => {
    if (!newCustomer.name || !newCustomer.email || !newCustomer.phone) {
      setError('All fields are required!');
      return;
    }
    try {
      const response = await axios.post(API_URL, newCustomer);
      setCustomers([...customers, response.data]); // Add new customer to the list
      setNewCustomer({ name: '', email: '', phone: '' }); // Clear the form
      setError('');
    } catch (error) {
      setError('Failed to add customer');
    }
  };

  // Handle removing a customer
  const handleRemoveCustomer = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setCustomers(customers.filter((cust) => cust.id !== id)); // Remove customer from the list
    } catch (error) {
      setError('Failed to remove customer');
    }
  };

  // Handle updating a customer
  const handleUpdateCustomer = async (id) => {
    if (!newCustomer.name || !newCustomer.email || !newCustomer.phone) {
      setError('All fields are required!');
      return;
    }
    try {
      const response = await axios.put(`${API_URL}/${id}`, newCustomer);
      setCustomers(
        customers.map((cust) => (cust.id === id ? response.data : cust))
      );
      setNewCustomer({ name: '', email: '', phone: '' }); // Clear the form
      setError('');
    } catch (error) {
      setError('Failed to update customer');
    }
  };

  return (
    <div>
      <h2>Customer Management</h2>

      {error && <div className="error">{error}</div>}

      {/* Form to add/update customer */}
      <div>
        <input
          type="text"
          placeholder="Name"
          value={newCustomer.name}
          onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={newCustomer.email}
          onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}
        />
        <input
          type="text"
          placeholder="Phone"
          value={newCustomer.phone}
          onChange={(e) => setNewCustomer({ ...newCustomer, phone: e.target.value })}
        />
        <button onClick={handleAddCustomer}>Add Customer</button>
      </div>

      {/* Display Customer List */}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <table border="1" cellPadding="5">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((cust) => (
              <tr key={cust.id}>
                <td>{cust.id}</td>
                <td>{cust.name}</td>
                <td>{cust.email}</td>
                <td>{cust.phone}</td>
                <td>
                  <button onClick={() => handleRemoveCustomer(cust.id)}>Delete</button>
                  <button onClick={() => handleUpdateCustomer(cust.id)}>Update</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CustomerManagement;
