import React from 'react'
import PropTypes from 'prop-types'
import { toTitleCase } from '../lib/helpers'

const Column = props => {
  return (
    <div>
      <h3>{toTitleCase(props.title)}</h3>
    </div>
  )
}

Column.propTypes = {
  title: PropTypes.any
}

export default Column
