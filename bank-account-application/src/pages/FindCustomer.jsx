// Import axios to make HTTP requests
import axios from 'axios'
import { useState } from 'react'

const FindCustomer = () => {

  // State to store the entered customer ID
  const [id, setId] = useState('')

  // State to store the found customer
  const [customer, setCustomer] = useState(null)

  // State to store error messages
  const [error, setError] = useState('')

  const api = "http://localhost:8080"

  // Function executed when the search form is submitted
  const handleSearch = (e) => {
    e.preventDefault()

    if(id < 1)
      setError("Customer id cannot be less than 1")

    else {
    // Request customer from backend using axios
    axios.get(api + '/api/customers/' + id)
      .then(response => {
        setCustomer(response.data) // Save retrieved customer
        setError("") // Clear errors
      })
      .catch(error => {
        setCustomer(null) // Remove previous result
        setError("Customer not found.")
        console.log("Unable to find customer", error)
      })
    }
  }

  return (
    <div className="card">
      <h2>Find Customer by ID</h2>

      {/* Search form */}
      <form onSubmit={handleSearch} className="form">
        <input
          type="number"
          placeholder="Enter customer ID"
          value={id}
          onChange={(e) => {
            setId(e.target.value) 
            setError("")
          }}
          required
        />

        <button type="submit" className="btn btn-green">
          Search
        </button>
      </form>

      {/* Display error message */}
      {error && <p className="error">{error}</p>}

      {/* Display customer details if found */}
      {customer && (
        <div className="result-box">
          <p><strong>Customer ID:</strong> {customer.customerId}</p>
          <p><strong>Type:</strong> {customer.type}</p>
          <p><strong>Name:</strong> {customer.name}</p>
          <p><strong>Street:</strong> {customer.streetNumber}</p>
          <p><strong>Postal Code:</strong> {customer.postalCode}</p>
          <p><strong>City:</strong> {customer.city}</p>
          <p><strong>Province:</strong> {customer.province}</p>
        </div>
      )}
    </div>
  )
}

export default FindCustomer