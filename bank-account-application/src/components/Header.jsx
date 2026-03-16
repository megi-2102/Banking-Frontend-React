// Import the main CSS styles for the application
import '../styles/BankAccountAppStyle.css'

// Header component displayed at the top of the application
const Header = () => {
    return (
        // Page header container
        <header className = "header">
            {/* Application title */}
            <h1>BankAccount Application</h1>
        </header>
    )
}
export default Header