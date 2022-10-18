import { connect } from 'react-redux'
import { filter } from '../reducers/filterReducer'


const Filter = (props) => {
    const handleChange = (event) => {
        event.preventDefault()
        props.filter(event.target.value)
    }

    const style = {
        marginBottom: 10
    }

    return (
        <div style={style}>
            Filter: <input onChange={handleChange}/>
        </div>
    )
}

const mapDispatchToProps = {
    filter
}

const ConnectedFilter = connect(null, mapDispatchToProps)(Filter)

export default ConnectedFilter