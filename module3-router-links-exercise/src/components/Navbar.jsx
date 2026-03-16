import '../styles/Navbar.css'
import {Link} from 'react-router-dom'

const Navbar = () => {
    return (
        <div className="topnav">
            <Link to = "/home"> Home </Link>
            <Link to = "/news"> News </Link>
            <Link to = "/contact"> Contact </Link>
            <Link to = "/about"> About </Link>
        </div>
    );
}

export default Navbar