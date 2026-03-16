import '../styles/ProductCard.css'
const ProductCard = (props) => {

    const{name, description, price} = props.product

    return (
        <div className = 'product-card'> 
            <h1> {name} </h1> 
            <p className = 'description'> {description} </p> 
            <p className = 'price'> Price: ${price} </p>
            <p className = 'button'> <button type = 'button'> Add to basket </button> </p>
        </div>
    )
}

export default ProductCard