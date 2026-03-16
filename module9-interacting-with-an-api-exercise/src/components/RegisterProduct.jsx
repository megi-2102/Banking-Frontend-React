import { useState } from "react"
import "../styles/RegisterProduct.css"
import axios from 'axios'
import { useNavigate } from "react-router-dom"

const RegisterProduct = () => {
    const navigate = useNavigate()
    const api = 'http://localhost:8088/api/v1/products'

    const[name, setName] = useState("")
    const[description, setDescription] = useState("")
    const[price, setPrice] = useState()

    const[isInvalidName, setIsInvalidName] = useState(false)
    const[isInvalidDescription, setIsInvalidDescription] = useState(false)
    const[isInvalidPrice, setIsInvalidPrice] = useState(false)

    const handleSubmit = (event) => {
        event.preventDefault();

        const invalidName = name === ""
        const invalidDescription = description === ""
        const invalidPrice = price < 0

        setIsInvalidName(invalidName)
        setIsInvalidDescription(invalidDescription)
        setIsInvalidPrice(invalidPrice)

        if(!invalidName && !invalidDescription && !invalidPrice)
        {
            axios.post(api, 
                {
                    name: name,
                    description: description,
                    price: price
                }
            )
            .then(response => {navigate("/")})
            .catch(error => { console.log("Unable to add new product") })        }
    }

    return (
        <div className = "form-container">
            <h1> Enter product details: </h1>
            <form onSubmit = {handleSubmit}>
                Name: <input type = 'text' name = 'name' value = {name} onChange = {event => setName(event.target.value)}/> 
                {isInvalidName && <span className = "error-message"> Name cannot be blank </span>} <br/>
                Description: <input type = 'text' name = 'description' value = {description} onChange = {event => setDescription(event.target.value)}/> 
                {isInvalidDescription && <span className = "error-message"> Description cannot be blank </span>} <br/>
                Price: <input type = 'number' name = 'price' value = {price} onChange = {event => setPrice(Number(event.target.value))}/> 
                {isInvalidPrice && <span className = "error-message"> Price cannot be negative </span>} <br/>
                <button type = "submit"> Submit </button>
            </form>
        </div>
    )
}

export default RegisterProduct