import './App.css';
import ListProducts from './components/ListProducts';
import RegisterProduct from './components/RegisterProduct';
import {Route, Routes} from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Routes> 
        <Route path = '/' element = {<ListProducts/>}/>
        <Route path = '/register-product' element = {<RegisterProduct/>}/>
      </Routes>
    </div>
  );
}

export default App;
