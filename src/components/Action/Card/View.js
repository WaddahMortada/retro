import React from 'react'
import PropTypes from 'prop-types'

const View = props => {
  return (
    <div>
      <div>{props.card.value}</div>
      <button onClick={() => props.setEdit(true)}>Edit</button>
    </div>
  )
}

View.propTypes = {
  card: PropTypes.any,
  setEdit: PropTypes.any
}

export default View
