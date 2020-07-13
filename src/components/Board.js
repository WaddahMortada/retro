import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Column from './Column'
import AddColumn from './Action/Column/Add'

const Board = props => {
  const ColumnComponent = []
  const [columns, setColumns] = useState(props.type !== 'blank_board' ? props.type.split('_') : [])
  const [display, setDisplayModule] = useState(false)

  const displayAddModule = () => {
    setDisplayModule(true)
  }

  const closeModule = () => {
    setDisplayModule(false)
  }

  const setColumnTitle = (index, title) => {
    columns[index] = title
    setColumns([...columns])
  }

  const deleteColumn = index => {
    columns.splice(index, 1)
    setColumns([...columns])
  }

  columns.forEach((title, key) => {
    ColumnComponent.push(
      <Column
        key={key}
        index={key}
        title={title}
        votes={props.votes}
        votefunctions={props.votefunctions}
        deleteColumn={deleteColumn}
        setColumnTitle={setColumnTitle}
      />
    )
  })

  const AddColumnModule = <div className="editModule">
    <AddColumn columns={columns} setColumns={setColumns} closeModule={closeModule} onBlur={closeModule} />
  </div>

  return (
    <div className="board">
      {display ? AddColumnModule : null}
      <div className={(display) ? 'dim' : null} onClick={(display) ? () => setDisplayModule(false) : null}>
        <h3>Used Votes: {props.votes.total} out of {props.votes.limit}</h3>
        {!display ? <button onClick={() => displayAddModule()}>Add Column</button> : null}
        {ColumnComponent}
      </div>
    </div>
  )
}

Board.propTypes = {
  type: PropTypes.any,
  votes: PropTypes.any,
  votefunctions: PropTypes.any
}

export default Board
