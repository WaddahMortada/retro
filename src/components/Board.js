import React from 'react'
import PropTypes from 'prop-types'
import Column from './Column'

const Board = props => {
  const columns = []

  props.type.split('_').forEach((title, key) => {
    columns.push(
      <Column key={key} title={title} votes={props.votes} votefunctions={props.votefunctions} />
    )
  })

  return (
    <div>
      <h3>Used Votes: {props.votes.total} out of {props.votes.limit}</h3>
      <div>{columns}</div>
    </div>
  )
}

Board.propTypes = {
  type: PropTypes.any,
  votes: PropTypes.any,
  votefunctions: PropTypes.any
}

export default Board
