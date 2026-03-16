import ProductCard from "./ProductCard"
import { useState, useEffect } from "react"
import axios from 'axios'
import { Link } from "react-router-dom"

const ListProducts = () => {

    const [productList, setProductList] = useState([])
    const api = 'http://localhost:8088/api/v1/products'

    const loadProducts = () => {
        axios.get(api)
            .then(response => {setProductList(response.data)})
            .catch(error => {console.log('Unable to load data')})
    }

    useEffect (() => {
        loadProducts()}, []);

    return (
        <div>
            <h1>Products</h1>
            <Link to="/register-product">Register Product</Link>
            {
                productList.map(
                    product => <ProductCard key = {product.id} product = {product}/>
                )
            }
        </div>
    )
}

export default ListProducts