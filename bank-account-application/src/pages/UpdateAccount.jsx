// Import axios to make HTTP requests to the backend
import axios from "axios"

// Import React hooks for state and lifecycle
import { useEffect, useState } from "react"

// Import navigation and URL parameter hooks
import { useNavigate, useParams } from "react-router-dom"

const UpdateAccount = () => {
  // Get account ID from the URL
  const { id } = useParams()

  // Hook used to navigate to another page
  const navigate = useNavigate()

  // Base backend API URL
  const api = "http://localhost:8080"

  // State to store the current account data
  const [currentAccount, setCurrentAccount] = useState(null)

  // State to store the current account type
  const [accountType, setAccountType] = useState("")

  // State for form input values
  const [balance, setBalance] = useState("")
  const [interestRate, setInterestRate] = useState("")
  const [nextCheckNumber, setNextCheckNumber] = useState("")

  // State for errors and success message
  const [errors, setErrors] = useState([])
  const [message, setMessage] = useState("")

  // Load account details when the page opens
  useEffect(() => {
    // Request account data from the backend
    axios.get(api + "/api/accounts/" + id)
      .then((response) => {
        setCurrentAccount(response.data) // Save account data
        setAccountType(response.data.type) // Save account type
        setErrors([]) // Clear previous errors
      })
      .catch((err) => {
        console.error(err) // Log error
        setErrors(["Failed to load account."]) // Show error message
      })
  }, [id])

  // Clear errors and success message when user edits a field
  const clearFeedback = () => {
  setErrors([])
  setMessage("")
}

  // Handle form submission for updating account
  const handleSubmit = (e) => {
    e.preventDefault() // Prevent page refresh

    const validationErrors = []

    // Validate balance if entered
    if (balance !== "" && Number(balance) < 0) {
      validationErrors.push("Balance cannot be negative.")
    }

    // Validate interest rate for savings accounts
    if (accountType === "savings" && interestRate !== "" && Number(interestRate) < 0) {
      validationErrors.push("Interest rate cannot be negative.")
    }

    // Validate next check number for checking accounts
    if (accountType === "checking" && nextCheckNumber !== "" && Number(nextCheckNumber) < 0) {
      validationErrors.push("Next check number cannot be negative.")
    }

    // Require at least one field to be updated
    if (balance === "" && interestRate === "" && nextCheckNumber === "") {
      validationErrors.push("Please enter at least one field to update.")
    }

    // Show validation errors if they exist
    if (validationErrors.length > 0) {
      setErrors(validationErrors)
      setMessage("")
      return
    }

    // Create updated account object with new or old values
    const updatedAccount = {
      ...currentAccount,
      balance: balance !== "" ? Number(balance) : currentAccount.balance
    }

    // Update interest rate for savings accounts
    if (accountType === "savings") {
      updatedAccount.interestRate =
        interestRate !== "" ? Number(interestRate) : currentAccount.interestRate
    }

    // Update next check number for checking accounts
    if (accountType === "checking") {
      updatedAccount.nextCheckNumber =
        nextCheckNumber !== "" ? Number(nextCheckNumber) : currentAccount.nextCheckNumber
    }

    // Send update request to the backend
    axios.put(api + "/api/accounts/" + id, updatedAccount)
      .then(() => {
        setMessage("Account updated successfully.") // Show success message
        setErrors([]) // Clear errors

        // Redirect to accounts page after 1 second
        setTimeout(() => {
          navigate("/accounts")
        }, 1000)
      })
      .catch((err) => {
        console.error(err) // Log error
        setErrors(["Failed to update account."]) // Show error message
        setMessage("") // Clear success message
      })
  }

  return (
    <div className="card">
      <h2>Update Account</h2>

      {/* Display validation errors */}
      {errors.length > 0 && (
        <div>
          {errors.map((error, index) => (
            <p key={index} className="error">{error}</p>
          ))}
        </div>
      )}

      {/* Display success message */}
      {message && <p className="success">{message}</p>}

      {/* Show current account details */}
      {currentAccount && (
        <div className="result-box">
          <p><strong>Account ID:</strong> {currentAccount.accountId}</p>
          <p><strong>Type:</strong> {currentAccount.type}</p>
          <p><strong>Current Balance:</strong> {currentAccount.balance}</p>

          {/* Show current interest rate for savings */}
          {currentAccount.type === "savings" && (
            <p><strong>Current Interest Rate:</strong> {currentAccount.interestRate}</p>
          )}

          {/* Show current next check number for checking */}
          {currentAccount.type === "checking" && (
            <p><strong>Current Next Check Number:</strong> {currentAccount.nextCheckNumber}</p>
          )}
        </div>
      )}

      {/* Form for updating account details */}
      <form className="form" onSubmit={handleSubmit}>
        <label>New Balance</label>
        <input
          type="number"
          value={balance}
          onChange={(e) => {
            setBalance(e.target.value) // Update balance state
            clearFeedback()
          }} 
          placeholder="Leave empty to keep current balance"
        />

        {/* Show interest rate input for savings */}
        {accountType === "savings" && (
          <>
            <label>New Interest Rate (%)</label>
            <input
              type="number"
              step="0.01"
              value={interestRate}
              onChange={(e) => {
                setInterestRate(e.target.value) // Update interest rate state
                clearFeedback()
              }}              
              placeholder="Leave empty to keep current interest rate"
            />
          </>
        )}

        {/* Show next check number input for checking */}
        {accountType === "checking" && (
          <>
            <label>New Next Check Number</label>
            <input
              type="number"
              value={nextCheckNumber}
              onChange={(e) => {
              setNextCheckNumber(e.target.value) // Update next check number state
              clearFeedback()
            }}
              placeholder="Leave empty to keep current next check number"
            />
          </>
        )}

        {/* Submit button */}
        <button type="submit" className="btn btn-yellow">
          Update Account
        </button>
      </form>
    </div>
  )
}

export default UpdateAccount