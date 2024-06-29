import React, { useEffect, useState } from 'react'
import { ItemList } from '../ItemList/ItemList'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import "./ItemListContainer.css"

const getProducts = async () => {
    try {
        const response = await fetch('http://localhost:8080/api/products').then(res => res.json())
        return response
    } catch (error) {
        console.log(error)
    }
}

const ItemsListContainer = () => {
    const [products, setProducts] = useState([])

    useEffect(() => {
        const fetchProducts = async () => {
            const products = await getProducts()
            setProducts(products)
        }
        fetchProducts()
    }, [])

    return (
        <Container className='containerCard'>
            <Row>
                <ItemList products={products} />
            </Row>
        </Container>
    )
}

export default ItemsListContainer
