import { useState } from "react";
import {useNavigate} from "react-router-dom";

const Calculator = () => {

    const[number1, setNumber1] = useState(0)
    const[number2, setNumber2] = useState(0)
    const navigate = useNavigate()

    const Calculate = () => {
        let total = Number(number1) + Number(number2)
        navigate('/show-result/'+ total)
    }

    return (
        <div>
            <form>
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
                <button type = "button" onClick = {Calculate}> Calculate </button>
            </form>
        </div>
    );
}

export default Calculator