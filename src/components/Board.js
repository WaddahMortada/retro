import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Column from './Column'
import AddColumn from './Action/Column/Add'
import ActionsColumn from './ActionsColumn'
import { Row, Col, Button, Navbar, Nav, Card } from 'react-bootstrap'

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
      <Col key={key}>
        <Column
          index={key}
          column={column}
          votes={props.votes}
          voteFunctions={props.voteFunctions}
          columnFunctions={{ update: updateColumn, delete: deleteColumn }}
        />
      </Col>
    )
  })

  const AddColumnModule = <div className="editModule">
    <AddColumn columns={columns} setColumns={setColumns} closeModule={closeModule} onBlur={closeModule} />
  </div>

  return (
    <Row>
      <Col>
        <Navbar className="backgroundColorGreen">
          <Nav className="mr-auto">
            <h5 className="inlineBlock">Used Votes: {props.votes.total} out of {props.votes.limit}</h5>
          </Nav>
          {!display ? <Button variant="success" className="inlineBlock float-right" onClick={() => displayAddModule()}>Add Column</Button> : null}
        </Navbar>
        <Card className="backgroundColorGreen">
          <Card.Body>
            <Row>
              <Col>
                {/* <div className={(display) ? 'dim' : null} onClick={(display) ? () => setDisplayModule(false) : null}> */}
                <div>
                  <Row>
                    <Col>
                      {display ? AddColumnModule : null}
                    </Col>
                  </Row>
                  <Row>
                    {ColumnComponent}
                    <Col><ActionsColumn /></Col>
                  </Row>
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card>
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
