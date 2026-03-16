// Import axios to make HTTP requests to the backend
import axios from "axios"

// Import React hook for managing state
import { useState } from "react"

// Import navigation hook for page redirection
import { useNavigate } from "react-router-dom"

const AddAccount = () => {
  // Hook used to navigate to another page
  const navigate = useNavigate()

  // Base backend API URL
  const api = "http://localhost:8080"

  // State storing form values
  const [customerId, setCustomerId] = useState("")
  const [type, setType] = useState("savings")
  const [balance, setBalance] = useState("")
  const [interestRate, setInterestRate] = useState("")
  const [nextCheckNumber, setNextCheckNumber] = useState("")

  // State for validation errors and success message
  const [errors, setErrors] = useState([])
  const [message, setMessage] = useState("")

  // Clear errors and success message when user edits a field
  const clearFeedback = () => {
    setErrors([])
    setMessage("")
  }

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault() // Prevent page refresh

    setErrors([])
    setMessage("")

    const validationErrors = []

    // Validate customer ID
    if (!customerId) {
      validationErrors.push("Please enter a Customer ID.")
    }

    // Validate balance value
    if (balance === "" || Number(balance) < 0) {
      validationErrors.push("Balance cannot be negative.")
    }

    // Validate interest rate for savings accounts
    if (type === "savings" && (interestRate === "" || Number(interestRate) < 0)) {
      validationErrors.push("Interest rate cannot be negative.")
    }

    // Validate check number for checking accounts
    if (type === "checking" && (nextCheckNumber === "" || Number(nextCheckNumber) < 0)) {
      validationErrors.push("Next check number cannot be negative.")
    }

    // Show all local validation errors first
    if (validationErrors.length > 0) {
      setErrors(validationErrors)
      return
    }

    // Check if customer exists
    axios.get(api + "/api/customers/" + customerId)
      .then(() => {
        // Create account payload object
        const accountPayload = {
          type,
          balance: Number(balance)
        }

        // Add interest rate for savings accounts
        if (type === "savings") {
          accountPayload.interestRate = Number(interestRate)
        }

        // Add check number for checking accounts
        if (type === "checking") {
          accountPayload.nextCheckNumber = Number(nextCheckNumber)
        }

        // Send request to create account
        axios.post(api + "/api/accounts/customer/" + customerId, accountPayload)
          .then(() => {
            setMessage("Account created successfully.") // Show success message
            setErrors([]) // Clear errors

            // Redirect to accounts page after 1 second
            setTimeout(() => {
              navigate("/accounts")
            }, 1000)
          })
          .catch((err) => {
            console.error(err) // Log error
            setErrors(["Failed to create account."]) // Show error message
          })
      })
      .catch(() => {
        // Show customer not found error
        setErrors(["Customer does not exist."])
      })
  }

  return (
    <div className="card">
      <h2>Add Account</h2>

      {/* Display validation errors */}
      {errors.length > 0 && (
        <div>
          {errors.map((error, index) => (
            <p key={index} className="error">
              {error}
            </p>
          ))}
        </div>
      )}

      {/* Display success message */}
      {message && <p className="success">{message}</p>}

      {/* Account creation form */}
      <form className="form" onSubmit={handleSubmit}>
        <label>Customer ID</label>
        <input
          type="number"
          min="1"
          value={customerId}
          onChange={(e) => {
            setCustomerId(e.target.value)
            clearFeedback()
          }}
          placeholder="Enter customer ID"
          required
        />

        <label>Account Type</label>
        <select
          value={type}
          onChange={(e) => {
            setType(e.target.value)
            clearFeedback()
          }}
        >
          <option value="savings">Savings</option>
          <option value="checking">Checking</option>
        </select>

        <label>Balance</label>
        <input
          type="number"
          value={balance}
          onChange={(e) => {
            setBalance(e.target.value)
            clearFeedback()
          }}
          placeholder="Enter balance"
          required
        />

        {/* Show interest rate field for savings accounts */}
        {type === "savings" && (
          <>
            <label>Interest Rate (%)</label>
            <input
              type="number"
              step="0.01"
              value={interestRate}
              onChange={(e) => {
                setInterestRate(e.target.value)
                clearFeedback()
              }}
              placeholder="Enter interest rate"
              required
            />
          </>
        )}

        {/* Show next check number field for checking accounts */}
        {type === "checking" && (
          <>
            <label>Next Check Number</label>
            <input
              type="number"
              value={nextCheckNumber}
              onChange={(e) => {
                setNextCheckNumber(e.target.value)
                clearFeedback()
              }}
              placeholder="Enter next check number"
              required
            />
          </>
        )}

        {/* Submit button */}
        <button type="submit" className="btn btn-green">
          Create Account
        </button>
      </form>
    </div>
  )
}

export default AddAccount