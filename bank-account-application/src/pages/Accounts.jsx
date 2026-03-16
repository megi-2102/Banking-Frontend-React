// Import axios to make HTTP requests
import axios from 'axios'

// Import React hooks for state and lifecycle
import { useEffect, useState } from 'react'

// Import Link for navigation between pages
import { Link } from 'react-router-dom'

const Accounts = () => {

  // Base backend API URL
  const api = "http://localhost:8080"

  // State to store accounts retrieved from the backend
  const [accounts, setAccounts] = useState([])

  // State to store error messages
  const [error, setError] = useState('')

  // Function to load all accounts from backend
  const loadAccounts = () => {

    // Send GET request to retrieve accounts
    axios.get(api + '/api/accounts')
      .then(response => {
        setAccounts(response.data) // Save accounts in state
        setError("") // Clear previous errors
      })
      .catch(err => {
        console.error(err) // Log error
        setError('Failed to load accounts.') // Show error message
      })
  }

  // Run loadAccounts when the component first loads
  useEffect(() => {
    loadAccounts()
  }, [])

  // Function to delete an account
  const handleDelete = (accountId) => {

    // Ask user confirmation before deleting
    if (!window.confirm('Delete this account?')) return

    // Send DELETE request to backend
    axios.delete(api + '/api/accounts/' + accountId)
      .then(() => {
        loadAccounts() // Reload accounts after deletion
      })
      .catch(err => {
        console.error(err) // Log error
        setError('Failed to delete account.') // Show error message
      })
  }

  return (
    <div className="card">

      {/* Page title and Add Account button */}
      <div className="page-header">
        <h2>View All Accounts</h2>

        <Link to="/accounts/add" className="btn btn-green">
          Add Account
        </Link>
      </div>

      {/* Display error message if one exists */}
      {error && <p className="error">{error}</p>}
 
      {/* Accounts table */}
      <table>
        <thead>
          <tr>
            <th>Account ID</th>
            <th>Type</th>
            <th>Balance</th>
            <th>Interest Rate (%)</th>
            <th>Next Check Number</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>

          {/* Display accounts if they exist */}
          {accounts.length > 0 ? (
            accounts.map((account) => (
              <tr key={account.accountId}>

                {/* Display account details */}
                <td>{account.accountId}</td>
                <td>{account.type}</td>
                <td>{account.balance}</td>

                {/* Show interest rate if available */}
                <td>{account.interestRate ?? 'N/A'}</td>

                {/* Show next check number if available */}
                <td>{account.nextCheckNumber ?? 'N/A'}</td>

                {/* Update and Delete actions */}
                <td>
                  <Link
                    to={'/accounts/update/' + account.accountId}
                    className="btn btn-yellow"
                  >
                    Update
                  </Link>

                  <button
                    className="btn btn-red"
                    onClick={() => handleDelete(account.accountId)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (

            // Show message if no accounts exist
            <tr>
              <td colSpan="6">No accounts found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Accounts