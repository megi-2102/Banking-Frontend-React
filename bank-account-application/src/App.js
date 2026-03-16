//import logo from './logo.svg';
import './App.css'
import {Routes, Route} from 'react-router-dom'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import ProtectedRoute from "./components/ProtectedRoute"

import Accounts from './pages/Accounts'
import AccountsByCity from './pages/AccountsByCity'
import AddAccount from './pages/AddAccount'
import AddCustomer from './pages/AddCustomer'
import Customers from './pages/Customers'
import FindAccount from './pages/FindAccount'
import FindCustomer from './pages/FindCustomer'
import UpdateAccount from './pages/UpdateAccount'
import UpdateCustomer from './pages/UpdateCustomer'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'

function App() {
  return (
    <div className="App">
      <Header/>
      <div className="app-layout">
      <Sidebar/>
      <main className="content">
      <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/register" element={<Register/>} />

            <Route path="/customers" element={<ProtectedRoute><Customers/></ProtectedRoute>} />
            <Route path="/customers/add" element={<ProtectedRoute><AddCustomer/></ProtectedRoute>} />
            <Route path="/customers/find" element={<ProtectedRoute><FindCustomer/></ProtectedRoute>} />
            <Route path="/customers/update/:id" element={<ProtectedRoute><UpdateCustomer /></ProtectedRoute>} />

            <Route path="/accounts" element={<ProtectedRoute><Accounts/></ProtectedRoute>} />
            <Route path="/accounts/add" element={<ProtectedRoute><AddAccount/></ProtectedRoute>} />
            <Route path="/accounts/find" element={<ProtectedRoute><FindAccount/></ProtectedRoute>} />
            <Route path="/accounts/update/:id" element={<ProtectedRoute><UpdateAccount /></ProtectedRoute>} />
            <Route path="/accounts/city" element={<ProtectedRoute><AccountsByCity /></ProtectedRoute>} />
        </Routes>
        </main>
        </div>
    </div>
  );
}

export default App;
