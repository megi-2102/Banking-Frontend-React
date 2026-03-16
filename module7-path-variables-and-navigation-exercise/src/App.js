import './App.css';
import Calculator from './components/Calculator';
import {Route, Routes} from 'react-router-dom'
import ResultPage from './components/ResultPage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path = "/" element = {<Calculator/>}/>
        <Route path = "/show-result/:total" element = {<ResultPage/>}/>
      </Routes>
    </div>
  );
}

export default App;
