import './App.css';
import UserCard from './components/UserCard';

function App() {
  return (
    <div className="App">
      <UserCard 
        name = 'John Smith' 
        username = 'johnsmith1' 
        email = 'john_smith@yahoo.com' 
        phone = {75765765}
      />

      <UserCard 
        name = 'Jane Jones' 
        username = 'johnsmith1' 
        email = 'john_smith@yahoo.com' 
        phone = {75765765}
      />

      <UserCard 
        name = 'John Doe' 
        username = 'johnsmith1' 
        email = 'john_smith@yahoo.com' 
        phone = {75765765}
      />
    </div>
  );
}

export default App;
