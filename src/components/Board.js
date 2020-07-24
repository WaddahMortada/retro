import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Column from './Column'
import AddColumn from './Action/Column/Add'
import ActionsColumn from './ActionsColumn'
import { Row, Col, Button } from 'react-bootstrap'

const Board = props => {
  // Card: { value: null, upVote: 0 }
  // Column: {title, cards}
  // Board: [column1, column2]
  const ColumnComponent = []
  const [columns, setColumns] = useState([{ title: '', cards: [{ value: '', upVote: 0 }] }])
  const [display, setDisplayModule] = useState(false)

  useEffect(() => {
    const columnsTitle = props.type !== 'blank_board' ? props.type.split('_') : []
    const columnsObjects = []
    columnsTitle.forEach(title => {
      columnsObjects.push({ title: title, cards: [] })
    })
    setColumns(columnsObjects)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const displayAddModule = () => {
    setDisplayModule(true)
  }

  const closeModule = () => {
    setDisplayModule(false)
  }

  const updateColumn = (index, column) => {
    columns[index] = column
    setColumns([...columns])
  }

  const deleteColumn = index => {
    columns.splice(index, 1)
    setColumns([...columns])
  }

  columns.forEach((column, key) => {
    ColumnComponent.push(
      <Column
        key={key}
        index={key}
        column={column}
        votes={props.votes}
        voteFunctions={props.voteFunctions}
        columnFunctions={{ update: updateColumn, delete: deleteColumn }}
      />
    )
  })

  const AddColumnModule = <div className="editModule">
    <AddColumn columns={columns} setColumns={setColumns} closeModule={closeModule} onBlur={closeModule} />
  </div>

  return (
    <Row>
      <Col>
        <Row>
          <Col>
            {display ? AddColumnModule : null}
          </Col>
        </Row>
        <Row>
          <Col>
            <div className={(display) ? 'dim' : null} onClick={(display) ? () => setDisplayModule(false) : null}>
              <Row>
                <Col>
                  <h5 className="inlineBlock">Used Votes: {props.votes.total} out of {props.votes.limit}</h5>
                  {!display ? <Button variant="success" className="inlineBlock floatRight" onClick={() => displayAddModule()}>Add Column</Button> : null}
                </Col>
              </Row>
              <Row>
                {ColumnComponent}
                <ActionsColumn />
              </Row>
            </div>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

Board.propTypes = {
  type: PropTypes.any,
  votes: PropTypes.any,
  voteFunctions: PropTypes.any
}

export default Board
