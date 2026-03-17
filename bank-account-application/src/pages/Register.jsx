import { useState } from "react"
import { useNavigate } from "react-router-dom"

const Register = () => {
  // Used to redirect the user to another page
  const navigate = useNavigate()

  // State for form input values
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: ""
  })

  // State for validation errors
  const [errors, setErrors] = useState([])

  // State for success message
  const [message, setMessage] = useState("")

  // Update form state when the user types in an input field
  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
    // Clear errors when typing
    setErrors([])
  }

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault()

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    const validationErrors = []
    setMessage("")


    // Validate full name
    if (!formData.fullName.trim()) {
      validationErrors.push("Full name is required.")
    }

    // Validate email
    if (!formData.email.trim()) {
      validationErrors.push("Email is required.")
    }

    // Validate password
    if (!formData.password.trim()) {
      validationErrors.push("Password is required.")
    }

    // Validate confirm password
    if (!formData.password.trim()) {
      validationErrors.push("Password is required.")
    } else if (!passwordRegex.test(formData.password)) {
      validationErrors.push(
        "Password must be at least 8 characters and include uppercase, lowercase, a number and a special character."
      )
    }

    // Check if passwords match
    if (
      formData.password.trim() &&
      formData.confirmPassword.trim() &&
      formData.password !== formData.confirmPassword
    ) {
      validationErrors.push("Passwords do not match.")
    }

    // Show errors if validation fails
    if (validationErrors.length > 0) {
      setErrors(validationErrors)
      return
    }

    // Create new user object
    const registeredUser = {
      fullName: formData.fullName,
      email: formData.email,
      password: formData.password
    }

    // Save the registered user in localStorage
    localStorage.setItem("registeredUser", JSON.stringify(registeredUser))

    // Clear errors and show success message
    setErrors([])
    setMessage("Registration successful. You can now log in.")

    // Redirect to login page after 1 second
    setTimeout(() => {
      navigate("/login")
    }, 1000)
  }

  return (
    <div className="card">
      <h2>Register</h2>

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
      
      {/* Register form */}
      <form className="form" onSubmit={handleSubmit}>
        
        {/* Full name input */}
        <label>Full Name</label>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          placeholder="Enter your full name"
        />

        {/* Email input */}
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
        />

        {/* Password input */}
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your password"
        />

        {/* Confirm password input */}
        <label>Confirm Password</label>
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Confirm your password"
        />

        {/* Submit button */}
        <button type="submit" className="btn btn-green">
          Register
        </button>
      </form>
    </div>
  )
}

export default Register