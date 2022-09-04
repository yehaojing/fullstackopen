import PropTypes from 'prop-types' 

const Button = ({ text, handler }) => {
    return (
      <button onClick={handler}>
        {text}
      </button>
    )
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
  handler: PropTypes.func.isRequired
}

export default Button