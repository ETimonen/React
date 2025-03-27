import './App.css'
import React, {useState, useEffect} from 'react'
import CustomerService from './services/Customer'
import Customer from './Customer'
import CustomerAdd from './CustomerAdd'

const CustomerList = ({setIsPositive, setShowMessage, setMessage}) => {

// Komponentin tilan määritys
const [customers, setCustomers] = useState([])
const [showCustomers, setShowCustomers] = useState(false)
const [lisäystila, setLisäystila] = useState(false)

useEffect(() => {
  CustomerService.getAll()
  .then(data => {
    setCustomers(data)
  })
  },[lisäystila]
)

  return (
      <>
        <h1>
            <nobr style={{ cursor: 'pointer' }} onClick={() => setShowCustomers(!showCustomers)}>
                Customers
            </nobr>
            {!lisäystila && <button className="nappi" onClick={() => setLisäystila(true)}>Add new</button>}
        </h1>
        {lisäystila && <CustomerAdd setLisäystila={setLisäystila} 
        setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage}
        />}



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