import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Column from './Column'

const Board = props => {
  const columns = []
  const [totalVotes, setTotalVotes] = useState(0)
  const [votesDisabled, setVotesDisabled] = useState(false)

  const upVote = () => {
    if (totalVotes < props.voteLimit) {
      setTotalVotes(totalVotes + 1)
    }
  }

  const downVote = () => {
    if (totalVotes > 0) {
      setTotalVotes(totalVotes - 1)
    }
  }

  useEffect(() => {
    console.log('totalVotes ', totalVotes)
    if (totalVotes >= props.voteLimit) {
      setVotesDisabled(true)
    } else {
      setVotesDisabled(false)
    }
  }, [totalVotes]) // eslint-disable-line react-hooks/exhaustive-deps

  props.type.split('_').forEach((title, key) => {
    columns.push(
      <Column key={key} title={title} votesDisabled={votesDisabled} upVote={upVote} downVote={downVote} />
    )
  })

  return (
    <div>
      <h3>Used Votes: {totalVotes} out of {props.voteLimit}</h3>
      <div>{columns}</div>
    </div>
  )
}

Board.propTypes = {
  type: PropTypes.any,
  voteLimit: PropTypes.any
}

export default Board
