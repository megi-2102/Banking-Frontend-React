const Home = () => {
  // Check if the user is logged in using localStorage
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true"
  
  // Retrieve the logged-in user's information from localStorage
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"))

  return (
    <div className="card">
      <h2>Bank Account Application</h2>

      {/* Message shown when the user is not logged in */}
      {!isLoggedIn && (
        <>
          <p>Welcome to the banking application.</p>
          <p>Please register or log in to access customers and accounts.</p>
        </>
      )}

      {/* Message shown when the user is logged in */}
      {isLoggedIn && (
        <>
          <p>
            Welcome back, {loggedInUser.fullName}!
          </p>
          <p>Use the sidebar to manage customers and accounts.</p>
        </>
      )}
    </div>
  )
}

export default Home