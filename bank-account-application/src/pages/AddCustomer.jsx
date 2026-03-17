// Import axios to make HTTP requests
import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const AddCustomer = () => {

  const navigate = useNavigate()

  const api = "http://localhost:8080"

  // State storing customer form data
  const [customer, setCustomer] = useState({
    type: "person",
    name: "",
    streetNumber: "",
    postalCode: "",
    city: "",
    province: ""
  })

  // State for success and error messages
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")

  // Update state when input fields change
  const handleChange = (e) => {
    const { name, value } = e.target

    setCustomer((prev) => ({
      ...prev,
      [name]: value
    }))
    // Clear error message when user starts typing
    setError("")
  }

  // Submit the form to create a new customer
  const handleSubmit = (e) => {
    e.preventDefault()

    // Show error message if postal code has invalid form
    const postalCodeRegex = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/ 
    if (!postalCodeRegex.test(customer.postalCode.trim())) {
      setError("Postal code must be in valid format, for example T3R 3E3.")
    }
    else {
      axios.post(api + '/api/customers', customer)
      .then(() => {

        // Show success message
        setMessage("Customer created successfully.")
        setError("")

        // Redirect to customers page after 1 second
        setTimeout(() => {
          navigate("/customers")
        }, 1000)

      })
      .catch((err) => {
        console.error(err)

        // Show error message if creation fails
        setError("Failed to create customer.")
        setMessage("")
      })
    }
  }

  return (
    <div className="card">
      <h2>Add Customer</h2>

      {/* Success message */}
      {message && <p className="success">{message}</p>}

      {/* Error message */}
      {error && <p className="error">{error}</p>}

      {/* Add customer form */}
      <form className="form" onSubmit={handleSubmit}>
        <label>Customer Type</label>
        <select
          name="type"
          value={customer.type}
          onChange={handleChange}
        >
          <option value="person">Person</option>
          <option value="company">Company</option>
        </select>

        <label>Name</label>
        <input
          type="text"
          name="name"
          placeholder="Enter name"
          value={customer.name}
          onChange={handleChange}
          required
        />

        <label>Street Address</label>
        <input
          type="text"
          name="streetNumber"
          placeholder="Street address"
          value={customer.streetNumber}
          onChange={handleChange}
          required
        />

        <label>Postal Code</label>
        <input
          type="text"
          name="postalCode"
          placeholder="Postal code"
          value={customer.postalCode}
          onChange={handleChange}
          required
        />

        <label>City</label>
        <input
          type="text"
          name="city"
          placeholder="City"
          value={customer.city}
          onChange={handleChange}
          required
        />

        <label>Province</label>
        <input
          type="text"
          name="province"
          placeholder="Province"
          value={customer.province}
          onChange={handleChange}
          required
        />

        <button type="submit" className="btn btn-green">
          Create Customer
        </button>
      </form>
    </div>
  )
}

export default AddCustomer