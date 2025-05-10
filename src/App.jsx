import React, {useState, useEffect} from 'react'
import './App.css'
import Laskuri from './Laskuri'
import Viesti from './Viesti'
import Posts from './Posts'
import CustomerList from './CustomerList'
import UserList from './UserList'
import Message from './Message'
import Login from './Login'
import ProductList from './ProductList'

import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import 'bootstrap/dist/css/bootstrap.min.css'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

const App = () => {

// App komponentin tila
const [showLaskuri, setShowLaskuri] = useState(false)
// Statet messagen näyttämistä varten
const [showMessage, setShowMessage] = useState(false)
const [message, setMessage] = useState('')
const [isPositive, setIsPositive] = useState(false)

const [loggedInUser, setLoggedInUser] = useState('')
const [loggedAccess, setAccess] = useState(null)

useEffect(() => {
  let storedUser = localStorage.getItem("username")
  if (storedUser !== null) {
    setLoggedInUser(storedUser)
  }
  let accesslevelId = localStorage.getItem("accesslevelId")
  if (accesslevelId !== null) {
    setAccess(Number(accesslevelId))
  }
},[])

const huomio = () => {
  alert("Huomio!")
} 

const logout = () => {
  localStorage.clear()
  setLoggedInUser('')
  setAccess(null)
}

  return (
<div className="App">

  {!loggedInUser && <Login setMessage={setMessage} setIsPositive={setIsPositive} setShowMessage={setShowMessage} setLoggedInUser={setLoggedInUser} setAccess={setAccess}/>}

  { loggedInUser &&
        <Router>
        
            <Navbar bg="dark" variant="dark">
              <Nav className="mr-auto">
                  <Nav.Link href='/customers'>Customers</Nav.Link>
                  <Nav.Link href='/posts'>Some higlights</Nav.Link>
                  { (loggedAccess === 2) &&
                  <Nav.Link href='/users'>Users</Nav.Link>
                  }
                  <Nav.Link href='/products'>Products</Nav.Link>
                  <Nav.Link href='/laskuri'>Laskuri</Nav.Link>
                  <button onClick={() => logout()}>Logout</button>
              </Nav>
            </Navbar>
                          
          <h1>Northwind Corporation</h1>

          {showMessage && <Message message={message} isPositive={isPositive} />}

          <Routes>
            <Route path="/customers"
            element={<CustomerList setMessage={setMessage} setIsPositive={setIsPositive} 
            setShowMessage={setShowMessage} />}>
            </Route>

            <Route path="/users"
            element={<UserList setMessage={setMessage} setIsPositive={setIsPositive} 
            setShowMessage={setShowMessage} />}>
            </Route>

            <Route path="/products"
            element={<ProductList setMessage={setMessage} setIsPositive={setIsPositive} 
            setShowMessage={setShowMessage} />}>
            </Route>

            <Route path="/posts"
            element={<Posts />}>
            </Route>
            
            <Route path="/laskuri" 
            element={<Laskuri />}>
            </Route>
          
          </Routes>
        </Router>
  }
</div>
  )
}

export default App
