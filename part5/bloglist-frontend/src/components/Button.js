import PropTypes from "prop-types";

const Button = ({ text, handler, className }) => {
  return (
    <button onClick={handler} className={className}>
      {text}
    </button>
  );
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  handler: PropTypes.func.isRequired,
};

export default Button;
