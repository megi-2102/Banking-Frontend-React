// Import axios to make HTTP requests to the backend
import axios from "axios"

// Import React hook for managing state
import { useState } from "react"

const AccountsByCity = () => {

  // Base backend API URL
  const api = "http://localhost:8080"

  // State to store the entered city
  const [city, setCity] = useState("")

  // State to store accounts retrieved from the API
  const [accounts, setAccounts] = useState([])

  // State to store error messages
  const [error, setError] = useState("")

  // Handle form submission when searching by city
  const handleSearch = (e) => {

    e.preventDefault() // Prevent page refresh

    // Send GET request to retrieve accounts by city
    axios.get(api + "/api/accounts/city/" + city.toLowerCase())
      .then((response) => {
        setAccounts(response.data) // Save retrieved accounts
        setError("") // Clear previous errors
      })
      .catch((err) => {
        console.error(err) // Log error to console
        setAccounts([]) // Clear previous results
        setError("No accounts found for this city.") // Show error message
      })
  }

  return (
    <div className="card">
      <h2>Find Accounts by City</h2>

      {/* Search form */}
      <form onSubmit={handleSearch} className="form">

        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => {
            setCity(e.target.value) // Update city state
            setError("")
            setAccounts([]) // Clear old results while typing
          }}
          required
        />

        {/* Button to start search */}
        <button type="submit" className="btn btn-green">
          Search
        </button>
      </form>

      {/* Display error message if search fails */}
      {error && <p className="error">{error}</p>}

      {/* Table displaying accounts */}
      <table>
        <thead>
          <tr>
            <th>Account ID</th>
            <th>Type</th>
            <th>Balance</th>
            <th>Interest Rate (%)</th>
            <th>Next Check Number</th>
          </tr>
        </thead>

        <tbody>

          {/* Display accounts if results exist */}
          {accounts.length > 0 ? (
            accounts.map((account) => (
              <tr key={account.accountId}>

                {/* Display account details */}
                <td>{account.accountId}</td>
                <td>{account.type}</td>
                <td>{account.balance}</td>

                {/* Display interest rate if available */}
                <td>{account.interestRate ?? "N/A"}</td>

                {/* Display next check number if available */}
                <td>{account.nextCheckNumber ?? "N/A"}</td>
              </tr>
            ))
          ) : (

            // Show message if no accounts found
            <tr>
              <td colSpan="5">No accounts found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default AccountsByCity