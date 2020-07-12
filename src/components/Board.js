import React from 'react'
import PropTypes from 'prop-types'
import Column from './Column'

const Board = props => {
  const columns = []

  props.type.split('_').forEach((title, key) => {
    columns.push(
      <Column title={title} />
    )
  })

  return (
    <div>{columns}</div>
  )
}

Board.propTypes = {
  type: PropTypes.any
}

export default Board
