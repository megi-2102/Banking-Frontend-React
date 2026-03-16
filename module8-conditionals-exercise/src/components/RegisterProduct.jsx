import { useState } from "react"
import "../styles/RegisterProduct.css"

const RegisterProduct = () => {

    const[name, setName] = useState("")
    const[description, setDescription] = useState("")
    const[price, setPrice] = useState(0)

    const[isInvalidName, setIsInvalidName] = useState(false)
    const[isInvalidDescription, setIsInvalidDescription] = useState(false)
    const[isInvalidPrice, setIsInvalidPrice] = useState(false)

    const handleSubmit = (event) => {
        event.preventDefault();
        if(name === "")
            setIsInvalidName(true)
        else
            setIsInvalidName(false)

        if (description === "")
            setIsInvalidDescription(true)
        else
            setIsInvalidDescription(false)

        if(price < 0)
            setIsInvalidPrice(true)
        else
            setIsInvalidPrice(false)
    }

    return (
        <div className = "form-container">
            <h1> Enter product details: </h1>
            <form onSubmit = {handleSubmit}>
                Name: <input type = 'text' name = 'name' value = {name} onChange = {event => setName(event.target.value)}/> 
                {isInvalidName && <span className = "error-message"> Name cannot be blank </span>} <br/>
                Description: <input type = 'text' name = 'description' value = {description} onChange = {event => setDescription(event.target.value)}/> 
                {isInvalidDescription && <span className = "error-message"> Description cannot be blank </span>} <br/>
                Price: <input type = 'number' name = 'price' value = {price} onChange = {event => setPrice(event.target.value)}/> 
                {isInvalidPrice && <span className = "error-message"> Price cannot be negative </span>} <br/>
                <button type = "submit"> Submit </button>
            </form>
        </div>
    )
}

export default RegisterProduct