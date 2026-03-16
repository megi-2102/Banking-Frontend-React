import { useState } from "react"

const RandomNumberComponent = ({checkPrediction}) => {

    const[randomNumber, setRandomNumber] = useState(0)

    const generateRandomNumber = () => {
        let newRandomNumber = Math.floor(Math.random()*100)
        setRandomNumber(newRandomNumber)
        checkPrediction(newRandomNumber)
    }

    return (
        <div>
            <h1> {randomNumber} </h1>
            <div> 
                <button onClick = {generateRandomNumber}> Generate Random Number </button>
            </div>
        </div>
    );
}
export default RandomNumberComponent