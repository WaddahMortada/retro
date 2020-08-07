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
  const [show, setShow] = useState(false)

  useEffect(() => {
    const columnsTitle = props.type !== 'blank_board' ? props.type.split('_') : []
    const columnsObjects = []
    columnsTitle.forEach(title => {
      columnsObjects.push({ title: title, cards: [] })
    })
    setColumns(columnsObjects)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

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
      <Col key={key} md={{ span: 5 }} className="column">
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

  const AddColumnModule = <AddColumn columns={columns} setColumns={setColumns} show={show} handleClose={handleClose} handleShow={handleShow} />

  return (
    <Row className="fullHeight nav">
      <Col>
        <Navbar className="secondNav navBar">
          <Nav className="mr-auto">
            <h5 className="navHeader">Used Votes: </h5>&nbsp;<p className="navHeader">{props.votes.total} out of {props.votes.limit}</p>
          </Nav>
          <Button variant="success" className="float-right" style={{ padding: '5px 10px' }} onClick={handleShow}>
            <b>Add Column</b> <FontAwesomeIcon className="icon-thumb" icon={faColumns} />
          </Button>
        </Navbar>
        <Card className="boardCard fullHeight">
          <Card.Body>
            <Row className="fullHeight">
              <Col md={{ span: 9 }}>
                {show ? AddColumnModule : null}
                <Row className="fullHeight scrollable">
                  {ColumnComponent}
                </Row>
              </Col>
              <Col className="fullHeight column" md={{ span: 3 }}><ActionsColumn /></Col>
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
