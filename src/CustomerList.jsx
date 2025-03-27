import './App.css'
import React, {useState, useEffect} from 'react'
import CustomerService from './services/Customer'
import Customer from './Customer'

const CustomerList = () => {

// Komponentin tilan määritys
const [customers, setCustomers] = useState([])
const [showCustomers, setShowCustomers] = useState(false)

useEffect(() => {
  CustomerService.getAll()
  .then(data => {
    setCustomers(data)
  })
  },[]
)

  return (
      <>
        <h2 onClick={() => setShowCustomers(!showCustomers)}>Customers</h2>

        {
            showCustomers && customers && customers.map(c => (
                <Customer key={c.customerId} customer={c} />
            )
            )
        }

      </>
  )
}

export default CustomerList