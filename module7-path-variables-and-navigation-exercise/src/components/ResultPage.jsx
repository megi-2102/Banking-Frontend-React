import {useParams} from "react-router-dom";
import {useNavigate} from "react-router-dom";

const ResultPage = () => {

    const params = useParams()
    const navigate = useNavigate()

    const goBack = () => {
        navigate('/')
    }

    return (
        <div>
            <h1>{params.total}</h1>
            <p><button type = "button" onClick={goBack}> Do another calculation </button></p>
        </div>
    );
}

export default ResultPage