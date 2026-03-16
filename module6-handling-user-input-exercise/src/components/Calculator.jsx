import { useState } from "react";

const Calculator = () => {

    const[number1, setNumber1] = useState(0)
    const[number2, setNumber2] = useState(0)
    const[message, setMessage] = useState("")

    const Calculate = (event) => {

        let total = (Number(number1) + Number(number2))
        setMessage(number1 + " + " + number2 + " = "+ total)
        event.preventDefault()
    }

    const resetPage = (event) => {
        setNumber1(0)
        setNumber2(0)
        setMessage("")
        event.preventDefault()
    }

    return (
        <div>
            <form onSubmit = {Calculate}>
                <input 
                    type = "number"
                    name = "number1"
                    value = {number1}
                    onChange = {event => setNumber1(event.target.value)}
                />
                + 
                <input 
                    type = "number"
                    name = "number2"
                    value = {number2}
                    onChange = {event => setNumber2(event.target.value)}
                />
                <button type = "submit"> Calculate </button>
                <button type = "button" onClick = {resetPage}> Reset </button>
                <p><b> {message} </b></p>
            </form>
        </div>
    );
}

export default Calculator