import './App.css'
import React, { useState } from 'react'
import ProductService from './services/Product'

const ProductAdd = ({ setLisäystila, setShowMessage, setIsPositive, setMessage }) => {

  const [productName, setProductName] = useState('')
  const [supplierId, setSupplierId] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [quantityPerUnit, setQuantityPerUnit] = useState('')
  const [unitPrice, setUnitPrice] = useState('')
  const [unitsInStock, setUnitsInStock] = useState('')
  const [unitsOnOrder, setUnitsOnOrder] = useState('')
  const [reorderLevel, setReorderLevel] = useState('')
  const [discontinued, setDiscontinued] = useState(false)
  const [imageLink, setImageLink] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()

    const newProduct = {
      productName,
      supplierID: parseInt(supplierId),
      categoryID: parseInt(categoryId),
      quantityPerUnit,
      unitPrice: parseFloat(unitPrice),
      unitsInStock: parseInt(unitsInStock),
      unitsOnOrder: parseInt(unitsOnOrder),
      reorderLevel: parseInt(reorderLevel),
      discontinued,
      imageLink
    }

    console.log(newProduct)

    ProductService.create(newProduct)
      .then(response => {
        if (response.status === 200 || response.status === 201) {
          setMessage(`Added new product: ${newProduct.productName}`)
          setIsPositive(true)
          setShowMessage(true)

          setTimeout(() => setShowMessage(false), 5000)
          setLisäystila(false)
        }
      })
      .catch(error => {
        setMessage(error.message)
        setIsPositive(false)
        setShowMessage(true)
        setTimeout(() => setShowMessage(false), 10000)
      })
  }

  return (
    <div id="addNew">
      <h2>Add Product</h2>

      <form onSubmit={handleSubmit}>
        <div><input type='text' value={productName} onChange={e => setProductName(e.target.value)} required placeholder='Product Name' /></div>
        <div><input type='number' value={supplierId} onChange={e => setSupplierId(e.target.value)} placeholder='Supplier ID' /></div>
        <div><input type='number' value={categoryId} onChange={e => setCategoryId(e.target.value)} placeholder='Category ID' /></div>
        <div><input type='text' value={quantityPerUnit} onChange={e => setQuantityPerUnit(e.target.value)} placeholder='Quantity Per Unit' /></div>
        <div><input type='number' step='0.01' value={unitPrice} onChange={e => setUnitPrice(e.target.value)} placeholder='Unit Price' /></div>
        <div><input type='number' value={unitsInStock} onChange={e => setUnitsInStock(e.target.value)} placeholder='Units In Stock' /></div>
        <div><input type='number' value={unitsOnOrder} onChange={e => setUnitsOnOrder(e.target.value)} placeholder='Units On Order' /></div>
        <div><input type='number' value={reorderLevel} onChange={e => setReorderLevel(e.target.value)} placeholder='Reorder Level' /></div>
        <div>
          <label>
            <input type='checkbox' checked={discontinued} onChange={e => setDiscontinued(e.target.checked)} />
            Discontinued
          </label>
        </div>
        <div><input type='text' value={imageLink} onChange={e => setImageLink(e.target.value)} placeholder='Image Link' /></div>

        <input type='submit' value='Save' />
        <input type='button' value='Back' onClick={() => setLisäystila(false)} />
      </form>
    </div>
  )
}

export default ProductAdd