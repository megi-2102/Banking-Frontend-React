// Import axios to make HTTP requests to the backend
import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

const UpdateCustomer = () => {
  // Get customer ID from the URL
  const { id } = useParams()

  // Hook used to navigate to another page
  const navigate = useNavigate()

  // Base URL of the backend API
  const api = "http://localhost:8080"

  // State to store the current customer data
  const [currentCustomer, setCurrentCustomer] = useState(null)

  // State for form input values
  const [name, setName] = useState("")
  const [postalCode, setPostalCode] = useState("")
  const [city, setCity] = useState("")
  const [province, setProvince] = useState("")

  // State for validation errors and success messages
  const [errors, setErrors] = useState([])
  const [message, setMessage] = useState("")


  // Load customer details when the page opens
useEffect(() => {
  axios.get(api + '/api/customers/' + id)
    .then((response) => {
        setCurrentCustomer(response.data) // Save retrieved customer
        setErrors([]) // Clear previous errors
      })
    .catch((err) => {
      console.error(err)
      setErrors(["Failed to load customer."]) // Show error message
    })
}, [id]) // Run effect when id changes

  // Handle customer update form submission
  const handleSubmit = (e) => {
    // Prevent page refresh
    e.preventDefault()

    const validationErrors = []

    // Require at least one field to be updated
    if (name === "" && postalCode === "" && city === "" && province === "") {
      validationErrors.push("Please enter at least one field to update.")
    }

    // Show validation errors if they exist
    if (validationErrors.length > 0) {
      setErrors(validationErrors)
      setMessage("")
      return
    }

    // Create updated customer object with new or old values by leaving fields empty
    const updatedCustomer = {
      ...currentCustomer,
      name: name !== "" ? name : currentCustomer.name,
      postalCode: postalCode !== "" ? postalCode : currentCustomer.postalCode,
      city: city !== "" ? city : currentCustomer.city,
      province: province !== "" ? province : currentCustomer.province
    }

    // Send update request to backend
    axios.put(api + '/api/customers/' + id, updatedCustomer)
      .then(() => {
        setMessage("Customer updated successfully.") // Show success message
        setErrors([]) // Clear errors

        // Redirect to customers page after 1 second
        setTimeout(() => {
          navigate("/customers")
        }, 1000)
      })
      .catch((err) => {
        console.error(err)
        setErrors(["Failed to update customer."]) // Show error
        setMessage("") // Clear success message
      })
  }

  return (
    <div className="card">
      <h2>Update Customer</h2>

      {/* Display validation errors if exist*/}
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

      {/* Show current customer details */}
      {currentCustomer && (
        <div className="result-box">
          <p><strong>Customer ID:</strong> {currentCustomer.customerId}</p>
          <p><strong>Type:</strong> {currentCustomer.type}</p>
          <p><strong>Name:</strong> {currentCustomer.name}</p>
          <p><strong>Street:</strong> {currentCustomer.streetNumber}</p>
          <p><strong>Postal Code:</strong> {currentCustomer.postalCode}</p>
          <p><strong>City:</strong> {currentCustomer.city}</p>
          <p><strong>Province:</strong> {currentCustomer.province}</p>
        </div>
      )}

      {/* Form to update customer details */}
      <form className="form" onSubmit={handleSubmit}>
        <label>New Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Leave empty to keep current name"
        />

        <label>New Postal Code</label>
        <input
          type="text"
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
          placeholder="Leave empty to keep current postal code"
        />

        <label>New City</label>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Leave empty to keep current city"
        />

        <label>New Province</label>
        <input
          type="text"
          value={province}
          onChange={(e) => setProvince(e.target.value)}
          placeholder="Leave empty to keep current province"
        />
        
        {/* Button to submit update request */}
        <button type="submit" className="btn btn-yellow">
          Update Customer
        </button>
      </form>
    </div>
  )
}

export default UpdateCustomer