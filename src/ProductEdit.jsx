import './App.css'
import React, { useState } from 'react'
import ProductService from './services/Product'

const ProductEdit = ({ setMuokkaustila, setIsPositive, setMessage, setShowMessage, muokattavaProduct }) => {

    console.log(muokattavaProduct)

    const [productId, setProductId] = useState(muokattavaProduct?.productId || 0)
    const [productName, setProductName] = useState(muokattavaProduct.productName || "")
    const [supplierId, setSupplierId] = useState(muokattavaProduct.supplierId || 0)
    const [categoryId, setCategoryId] = useState(muokattavaProduct.categoryId || 0)
    const [quantityPerUnit, setQuantityPerUnit] = useState(muokattavaProduct.quantityPerUnit || "")
    const [unitPrice, setUnitPrice] = useState(muokattavaProduct.unitPrice || "")
    const [unitsInStock, setUnitsInStock] = useState(muokattavaProduct.unitsInStock || "")
    const [unitsOnOrder, setUnitsOnOrder] = useState(muokattavaProduct.unitsOnOrder || "")
    const [reorderLevel, setReorderLevel] = useState(muokattavaProduct.reorderLevel || "")
    const [discontinued, setDiscontinued] = useState(muokattavaProduct.discontinued || false)
    const [imageLink, setImageLink] = useState(muokattavaProduct.imageLink || "")

  const handleSubmit = (event) => {
    event.preventDefault()

    const updatedProduct = {
        productId: productId,
        productName: productName,
        supplierID: parseInt(supplierId) || null,
        categoryID: parseInt(categoryId) || null,
        quantityPerUnit: quantityPerUnit || "",
        unitPrice: parseFloat(unitPrice) || 0,
        unitsInStock: parseInt(unitsInStock) || 0,
        unitsOnOrder: parseInt(unitsOnOrder) || 0,
        reorderLevel: parseInt(reorderLevel) || 0,
        discontinued: discontinued,
        imageLink: imageLink || ""
      }

    ProductService.update(updatedProduct)
      .then(response => {
        if (response.status === 200) {
          setMessage(`Edited product: ${updatedProduct.productName}`)
          setIsPositive(true)
          setShowMessage(true)
          setTimeout(() => setShowMessage(false), 5000)
          setMuokkaustila(false)
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
    <div id="edit">
      <h2>Edit Product</h2>
      <form onSubmit={handleSubmit}>
        <div><input type="text" value={productId} disabled /></div>
        <div><input type="text" value={productName} onChange={e => setProductName(e.target.value)} required placeholder="Product Name" /></div>
        <div><input type="number" value={supplierId ?? ''} onChange={e => setSupplierId(e.target.value === '' ? null : parseInt(e.target.value))}/></div>
        <div><input type="number" value={categoryId ?? ''} onChange={e => setCategoryId(e.target.value === '' ? null : parseInt(e.target.value))}/></div>
        <div><input type="text" value={quantityPerUnit} onChange={e => setQuantityPerUnit(e.target.value)} placeholder="Quantity Per Unit" /></div>
        <div><input type="number" step="0.01" value={unitPrice} onChange={e => setUnitPrice(e.target.value)} placeholder="Unit Price" /></div>
        <div><input type="number" value={unitsInStock} onChange={e => setUnitsInStock(e.target.value)} placeholder="Units In Stock" /></div>
        <div><input type="number" value={unitsOnOrder} onChange={e => setUnitsOnOrder(e.target.value)} placeholder="Units On Order" /></div>
        <div><input type="number" value={reorderLevel} onChange={e => setReorderLevel(e.target.value)} placeholder="Reorder Level" /></div>
        <div><label><input type="checkbox" checked={discontinued} onChange={e => setDiscontinued(e.target.checked)} />Discontinued</label></div>
        <div><input type="text" value={imageLink} onChange={e => setImageLink(e.target.value)} placeholder="Image Link" /></div>

        <input type="submit" value="Save" />
        <input type="button" value="Back" onClick={() => setMuokkaustila(false)} />
      </form>
    </div>
  )
}

export default ProductEdit
