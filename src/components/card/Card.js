import styles from "./Card.scss"

const Card = ({ children, cardClass}) => {
  return <div className="card">{children} </div>
}

export default Card
