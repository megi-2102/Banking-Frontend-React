// Import axios to make HTTP requests
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Customers = () => {

  // State to store customers retrieved from the API
  const [customers, setCustomers] = useState([])

  // State to store error messages
  const [error, setError] = useState('')

  const api = "http://localhost:8080";

  // Function to retrieve all customers from the backend
  const loadCustomers = () => {
    axios.get(api +'/api/customers')
      .then(response => {
        setCustomers(response.data) // Save retrieved customers
        setError("") // Clear previous errors
      })
      .catch(error => {
        setError("Failed to load customers.") // Show error if request fails
        console.log("Unable to load customers")
      })
  }

  // useEffect runs once when the component loads
  // It loads the list of customers
  useEffect(() => {
    loadCustomers()
  }, [])

  // Function to delete a customer
  const handleDelete = (customerId) => {

    // Ask the user for confirmation before deleting
    if (!window.confirm("Delete this customer?")) return

    axios.delete(api +'/api/customers/'+ customerId)
      .then(() => {
        loadCustomers() // Reload customers after deletion
      })
      .catch(error => {
        setError("Failed to delete customer.")
      })
  }

  return (
    <div className="card">

      {/* Page header with title and Add Customer button */}
      <div className="page-header">
        <h2>View All Customers</h2>

        <Link to="/customers/add" className="btn btn-green">
          Add Customer
        </Link>
      </div>

      {/* Display error message if one exists */}
      {error && <p className="error">{error}</p>}

      {/* Customers table */}
      <table>
        <thead>
          <tr>
            <th>Customer ID</th>
            <th>Type</th>
            <th>Name</th>
            <th>Street</th>
            <th>Postal Code</th>
            <th>City</th>
            <th>Province</th>
            <th>Accounts</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {/* Display customers if any exist */}
          {customers.length > 0 ? (
            customers.map((customer) => (
              <tr key={customer.customerId}>
                <td>{customer.customerId}</td>
                <td>{customer.type}</td>
                <td>{customer.name}</td>
                <td>{customer.streetNumber}</td>
                <td>{customer.postalCode}</td>
                <td>{customer.city}</td>
                <td>{customer.province}</td>

                {/* Display customer accounts */}
                <td>
                  {customer.accounts && customer.accounts.length > 0 ? (
                    <div>
                      {customer.accounts.map((account) => (
                        <div key={account.accountId}>
                          {account.type} - #{account.accountId} - Balance: {account.balance}
                        </div>
                      ))}
                    </div>
                  ) : (
                    "No accounts"
                  )}
                </td>

                {/* Update and Delete actions */}
                <td>
                  <Link
                    to={'/customers/update/' + customer.customerId}
                    className="btn btn-yellow"
                  >
                    Update
                  </Link>

                  <button
                    className="btn btn-red"
                    onClick={() => handleDelete(customer.customerId)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9">No customers found.</td>
            </tr>
          )}

        </tbody>
      </table>
    </div>
  )
}

export default Customers