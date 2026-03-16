// Import axios to make HTTP requests to the backend
import axios from "axios"

// Import React hook for managing state
import { useState } from "react"

const FindAccount = () => {

  // Base backend API URL
  const api = "http://localhost:8080"

  // State to store the entered account ID
  const [id, setId] = useState("")

  // State to store the found account
  const [account, setAccount] = useState(null)

  // State to store error messages
  const [error, setError] = useState("")

  // Handle search form submission
  const handleSearch = (e) => {

    e.preventDefault() // Prevent page refresh

    // Send GET request to retrieve account by ID
    axios.get(api + "/api/accounts/" + id)
      .then((response) => {
        setAccount(response.data) // Save account data
        setError("") // Clear previous errors
      })
      .catch((err) => {
        console.error(err) // Log error
        setAccount(null) // Clear previous account
        setError("Account not found.") // Show error message
      })
  }

  return (
    <div className="card">
      <h2>Find Account by ID</h2>

      {/* Search form */}
      <form onSubmit={handleSearch} className="form">

        <input
          type="number"
          placeholder="Enter account ID"
          value={id}
          onChange={(e) => setId(e.target.value)} // Update ID state
          required
        />

        {/* Submit button to search account */}
        <button type="submit" className="btn btn-green">
          Search
        </button>

      </form>

      {/* Display error message if account not found */}
      {error && <p className="error">{error}</p>}

      {/* Display account details if found */}
      {account && (
        <div className="result-box">

          <p><strong>Account ID:</strong> {account.accountId}</p>
          <p><strong>Type:</strong> {account.type}</p>
          <p><strong>Balance:</strong> {account.balance}</p>

          {/* Show interest rate only for savings accounts */}
          {account.type === "savings" && (
            <p><strong>Interest Rate (%):</strong> {account.interestRate}</p>
          )}

          {/* Show next check number only for checking accounts */}
          {account.type === "checking" && (
            <p><strong>Next Check Number:</strong> {account.nextCheckNumber}</p>
          )}
        </div>
      )}
    </div>
  )
}

export default FindAccount