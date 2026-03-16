import './App.css';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import NewsPage from './components/NewsPage';
import AboutPage from './components/AboutPage';
import ContactPage from './components/ContactPage';
import Footer from './components/Footer';
import{Routes, Route} from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Footer/>
      <Routes>
        <Route path = "/" element = {<HomePage/>}/>
        <Route path = "/home" element = {<HomePage/>}/>
        <Route path = "/news" element = {<NewsPage/>}/>
        <Route path = "/contact" element = {<ContactPage/>}/>
        <Route path = "/about" element = {<AboutPage/>}/>
      </Routes>
    </div>
  );
}

export default App;
