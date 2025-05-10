import './App.css'
import React, {useState, useEffect} from 'react'
import ProductService from './services/Product'
import ProductAdd from './ProductAdd'
import ProductEdit from './ProductEdit'

const ProductList = ({setIsPositive, setShowMessage, setMessage}) => {

// Komponentin tilan määritys
const [products, setProducts] = useState([])
const [lisäystila, setLisäystila] = useState(false)
const [muokkaustila, setMuokkaustila] = useState(false)
const [reload, reloadNow] = useState(false)
const [muokattavaProduct, setMuokattavaProduct] = useState('')
const [search, setSearch] = useState("")


useEffect(() => {

  const token = localStorage.getItem('token')
  ProductService.setToken(token)

  ProductService.getAll()
  .then(data => {
    setProducts(data)
        })
    },[lisäystila, reload, muokkaustila]
)

//Hakukentän onChange tapahtumankäsittelijä
const handleSearchInputChange = (event) => {
  setSearch(event.target.value.toLowerCase())
}

const editProducts = (prod) => {
  setMuokattavaProduct(prod)
  setMuokkaustila(true)
}

const deleteProduct = (prod) => {
    let vastaus = window.confirm(`Remove Product ${prod.productName}?`)

    if (vastaus === true) {
        ProductService.remove(prod.productId)
        .then(res => {
            if (res.status === 200) {
                setMessage(`Successfully removed product ${prod.productName}.`)
                setIsPositive(true)
                setShowMessage(true)
                window.scrollBy(0, -10000) // Scrollataan ylös jotta nähdään alert

                // Ilmoituksen piilotus
                setTimeout(() => {
                setShowMessage(false)},
                5000
                )
            }
            
                }
            )
        .catch(error => {
            setMessage(error.message)
            setIsPositive(false)
            setShowMessage(true)
            window.scrollBy(0, -10000) // Scrollataan ylös jotta nähdään alert
    
            setTimeout(() => {
                setShowMessage(false)
                }, 10000)
          })

    } // Jos poisto halutaankin perua
    else {
        setMessage('Poisto peruttu onnistuneesti.')
        setIsPositive(true)
        setShowMessage(true)
        window.scrollBy(0, -10000) // Scrollataan ylös jotta nähdään alert

        // Ilmoituksen piilotus
        setTimeout(() => {
        setShowMessage(false)},
        5000
        )
    }
}

  return (
    <>
        <h1><nobr>Products</nobr>

                {lisäystila && <ProductAdd setLisäystila={setLisäystila}
                setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage} />}

                {!lisäystila && <button className="nappi" onClick={() => setLisäystila(true)}>Add new</button>}</h1>

                {!lisäystila && !muokkaustila &&
                  <input placeholder="Search by product name" value={search} onChange={handleSearchInputChange} />
                }

                {muokkaustila && <ProductEdit setMuokkaustila={setMuokkaustila}
                setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage} muokattavaProduct={muokattavaProduct} />}

                {!lisäystila && !muokkaustila &&
                <table id="userTable">
                    <thead>
                        <tr>
                            <th>ProductID</th>
                            <th>Product name</th>
                            <th>Quantity per unit</th>
                            <th>Unit price</th>
                            <th>Units in stock</th>
                            <th>Units on order</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                    {products && products.map(p => 
                            {
                                const lowerCaseName = p.productName.toLowerCase()
                                if (lowerCaseName.indexOf(search) > -1) {
                                    return(
                                        <tr key={p.productId}>
                                            <td>{p.productId}</td>
                                            <td>{p.productName}</td>
                                            <td>{p.quantityPerUnit}</td>
                                            <td>{p.unitPrice}</td>
                                            <td>{p.unitsInStock}</td>
                                            <td>{p.unitsOnOrder}</td>
                                            <td><button onClick={() => editProducts(p)}>Edit</button></td>
                                            <td><button onClick={() => deleteProduct(p)}>Delete</button></td>
                                        </tr>
                                    )
                                }
                            }
                        )
                    }
                    </tbody>
                </table>
                }
    </>
  )
}

export default ProductList