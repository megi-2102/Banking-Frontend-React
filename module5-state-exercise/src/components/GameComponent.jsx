import { useState } from "react"
import RandomNumberComponent from "./RandomNumberComponent"

const GameComponent = () => {

    const[previousRandomNumber, setPreviousNumber] = useState(0)
    const[message, setMessage] = useState("")
    const[userPrediction, setUserPrediction] = useState("")
    
    const buttonClicked = (choice) => {
        setUserPrediction(choice)
        setMessage("Your prediciton is: "+ choice + ". Click generate random number to find out")
    }

    const checkPrediction = (number) => {
        if(number > previousRandomNumber && userPrediction === 'higher')
            setMessage("You guessed correctly!!")
        else if(number < previousRandomNumber && userPrediction === 'lower')
            setMessage("You guessed correctly!!")
        else
            setMessage("You guessed wrongly!!")
        setPreviousNumber(number)
    }

    return (
        <div>
            <div>
                <RandomNumberComponent checkPrediction = {checkPrediction}/>
                <h1> Will the next number be higher or lower?? </h1>
                <button onClick = {() => buttonClicked("higher")}> Higher </button>
                <button onClick = {() => buttonClicked("lower")}> Lower </button>
                <p> {message} </p>
            </div>
        </div>
    )
}

export default GameComponent