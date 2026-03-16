import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"

const Sidebar = () => {
  const navigate = useNavigate()

  // Check whether the user is logged in by reading localStorage
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true"
  
  // State to store the text entered in the search box
  const [searchTerm, setSearchTerm] = useState("")

  // Function to log the user out
  const handleLogout = () => {
    // Remove login-related data from localStorage
    localStorage.removeItem("isLoggedIn")
    localStorage.removeItem("loggedInUser")

    // Redirect user to the home page after logout
    navigate("/")
  }

  // Menu items shown depending on whether the user is logged in
  const menuItems = isLoggedIn
    ? [
        { label: "Home", path: "/" },
        { label: "View Customers", path: "/customers", section: "Customers" },
        { label: "Add Customer", path: "/customers/add", section: "Customers" },
        { label: "Find Customer", path: "/customers/find", section: "Customers" },
        { label: "View Accounts", path: "/accounts", section: "Accounts" },
        { label: "Add Account", path: "/accounts/add", section: "Accounts" },
        { label: "Find Account", path: "/accounts/find", section: "Accounts" },
        { label: "Accounts by City", path: "/accounts/city", section: "Accounts" }
      ]
    : [
        { label: "Home", path: "/" },
        { label: "Login", path: "/login" },
        { label: "Register", path: "/register" }
      ]

  // Filter menu items based on the search term entered by the user
  const filteredItems = menuItems.filter((item) =>
    item.label.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Separate filtered items into groups for display
  const groupedCustomers = filteredItems.filter((item) => item.section === "Customers")
  const groupedAccounts = filteredItems.filter((item) => item.section === "Accounts")
  const generalItems = filteredItems.filter((item) => !item.section)

  return (
    <aside className="sidebar">
      {/* Search box inside the sidebar */}
      <div className="sidebar-search">
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Update search term when user types
        />
        <button type="button">🔍</button>
      </div>

      {/* General navigation section */}
      <h3>Navigation</h3>

      {/* Render menu items without a section, e.g. Home, Login, Register */}
      {generalItems.map((item) => (
        <Link key={item.path} to={item.path}>
          {item.label}
        </Link>
      ))}

      {/* Show extra sections only when the user is logged in */}
      {isLoggedIn && (
        <>
          {/* Customers section */}
          <h3>Customers</h3>
          {groupedCustomers.map((item) => (
            <Link key={item.path} to={item.path}>
              {item.label}
            </Link>
          ))}

          {/* Accounts section */}
          <h3>Accounts</h3>
          {groupedAccounts.map((item) => (
            <Link key={item.path} to={item.path}>
              {item.label}
            </Link>
          ))}

          {/* Logout button */}
          <button className="btn btn-red logout-button" onClick={handleLogout}>
            Logout
          </button>
        </>
      )}
    </aside>
  )
}

export default Sidebar