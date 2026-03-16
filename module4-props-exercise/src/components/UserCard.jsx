import '../styles/UserCard.css'

const UserCard = (props) => {
    const name = props.name
    const username = props.username
    const email = props.email
    const phone = props.phone

    return (
        <div className = 'user-card'>
            <h1> {name} </h1>
            <p> Username: {username} </p>
            <p> Email: {email} </p>
            <p> Phone: {phone} </p>

            <div className = 'button-container'>
                <button> Update </button>
                <button> Delete </button>
            </div>
        </div>
    );
}

export default UserCard