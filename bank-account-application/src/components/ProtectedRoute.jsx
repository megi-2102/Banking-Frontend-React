import { Navigate } from "react-router-dom"

// ProtectedRoute component used to protect pages that require login
// It receives "children", which represents the component inside it
function ProtectedRoute({ children }) {
  // Check if the user is logged in by reading the value from localStorage
  // If localStorage contains "true", the user is considered logged in
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true"

  // If the user is logged in → render the protected component (children)
  // If the user is not logged in → redirect them to the login page
  return isLoggedIn ? children : <Navigate to="/login"/>
}

export default ProtectedRoute