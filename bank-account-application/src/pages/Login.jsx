import { useState } from "react"
import { useNavigate } from "react-router-dom"

const Login = () => {
  const navigate = useNavigate()

  // State to store the email and password entered by the user
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })

  // State to store validation errors
  const [errors, setErrors] = useState([])

  // State to store success messages
  const [message, setMessage] = useState("")

  // Handle changes in input fields
  const handleChange = (e) => {
    const { name, value } = e.target

    // Update the formData state with the new value
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault() // Prevent page refresh

    const validationErrors = []
    setErrors([])
    setMessage("")

    // Validate email input
    if (!formData.email.trim()) {
      validationErrors.push("Email is required.")
    }

    // Validate password input
    if (!formData.password.trim()) {
      validationErrors.push("Password is required.")
    }

    // If validation fails, display errors
    if (validationErrors.length > 0) {
      setErrors(validationErrors)
      return
    }

    // Retrieve the registered user from localStorage
    const registeredUser = JSON.parse(localStorage.getItem("registeredUser"))

    // If no user is registered, show an error
    if (!registeredUser) {
      setErrors(["No registered user found. Please register first."])
      return
    }

    // Check if entered credentials match the registered user
    if (
      formData.email === registeredUser.email &&
      formData.password === registeredUser.password
    ) {
      // Store login status in localStorage
      localStorage.setItem("isLoggedIn", "true")

      // Store logged-in user details
      localStorage.setItem("loggedInUser", JSON.stringify(registeredUser))

      // Show success message
      setMessage("Login successful.")

      // Redirect user to home page after 1 second
      setTimeout(() => {
        navigate("/")
      }, 1000)
    } else {
      // Display error if email or password is incorrect
      setErrors(["Invalid email or password."])
    }
  }

  return (
    <div className="card">
      <h2>Login</h2>

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

      {/* Login form */}
      <form className="form" onSubmit={handleSubmit}>
        
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

        {/* Submit button */}
        <button type="submit" className="btn btn-green">
          Login
        </button>
      </form>
    </div>
  )
}

export default Login