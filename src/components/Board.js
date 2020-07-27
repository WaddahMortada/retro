import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Column from './Column'
import AddColumn from './Action/Column/Add'
import ActionsColumn from './ActionsColumn'
import { Row, Col, Button, Navbar, Nav, Card } from 'react-bootstrap'
import { faColumns } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

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

  const AddColumnButton = <Button variant="success" className="float-right" style={{ padding: '5px' }} onClick={() => displayAddModule()}>
    <b>Add Column</b> <FontAwesomeIcon className="icon-thumb" icon={faColumns} />
  </Button>

  return (
    <Row className="fullHeight">
      <Col className="fullHeight">
        <Navbar className="secondNav">
          <Nav className="mr-auto">
            <h5 className="inlineBlock">Used Votes: {props.votes.total} out of {props.votes.limit}</h5>
          </Nav>
          {!display ? AddColumnButton : null}
        </Navbar>
        <Card className="boardCard fullHeight">
          <Card.Body className="fullHeight">
            <Row className="fullHeight">
              <Col className="fullHeight">
                {/* <div className={(display) ? 'dim' : null} onClick={(display) ? () => setDisplayModule(false) : null}> */}
                <Row>
                  <Col>
                    {display ? AddColumnModule : null}
                  </Col>
                </Row>
                <Row className="fullHeight">
                  {ColumnComponent}
                  <Col className="fullHeight"><ActionsColumn /></Col>
                </Row>
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
