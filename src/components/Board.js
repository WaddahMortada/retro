import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Confirm from './Confirm'
import Column from './Column'
import AddColumn from './Action/Column/Add'
import ActionsColumn from './ActionsColumn'
import { Row, Col, Button, Navbar, Nav, Card } from 'react-bootstrap'
import { faChalkboard, faColumns, faListUl } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Board = props => {
  // Card: { value: null, upVote: 0 }
  // Column: {title, cards}
  // Board: [column1, column2]
  const ColumnComponent = []
  const [showActions, setShowActions] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [showAddColumn, setShowAddColumn] = useState(false)

  const handleCloseConfirm = () => setShowConfirm(false)
  const handleShowConfirm = () => setShowConfirm(true)
  const handleCloseAddColumn = () => setShowAddColumn(false)
  const handleShowAddColumn = () => setShowAddColumn(true)
  const toggleShowActions = () => setShowActions(!showActions)

  const resetBoard = () => {
    handleCloseConfirm()
    props.resetBoard()
  }

  const updateColumn = (index, column, broadcastUpdate = true) => {
    props.columns[index] = column
    const updatedColumns = [...props.columns]
    props.setColumns(updatedColumns)
    if (broadcastUpdate) props.socket.emit('setColumns', updatedColumns)
  }

  const deleteColumn = index => {
    props.columns.splice(index, 1)
    const updatedColumns = [...props.columns]
    props.setColumns(updatedColumns)
    props.socket.emit('setColumns', updatedColumns)
  }

  let carouselClass = null
  if (props.columns.length >= 3 && showActions) {
    carouselClass = 'carousel-45'
  } else if (props.columns.length > 3) {
    carouselClass = 'carousel-32'
  }

  props.columns.forEach((column, key) => {
    ColumnComponent.push(
      <Col key={key} md={{ span: showActions ? 6 : 4 }} className={'column ' + carouselClass}>
        <Column
          index={key}
          column={column}
          votes={props.votes}
          voteFunctions={props.voteFunctions}
          columnFunctions={{ update: updateColumn, delete: deleteColumn }}
          id={props.id}
        />
      </Col>
    )
  })

  const AddColumnModule = <AddColumn columns={props.columns} setColumns={props.setColumns} show={showAddColumn} handleClose={handleCloseAddColumn} handleShow={handleShowAddColumn} socket={props.socket} />

  return (
    <Row className="fullHeight nav">
      <Col>
        {showConfirm ? <Confirm type="reset" submit={resetBoard} show={showConfirm} handleClose={handleCloseConfirm} /> : null}
        <Navbar className="navBar" bg="dark" variant="dark">
          <Nav className="mr-auto">
            <h5 className="navHeader">Used Votes: </h5>&nbsp;<p className={'navHeader ' + (props.votes.total === props.votes.limit ? 'danger' : null)}><b>{props.votes.total} out of {props.votes.limit}</b></p>
          </Nav>
          <Button variant="flat" className="float-right" style={{ padding: '5px 10px', fontSize: '17px' }} onClick={toggleShowActions}>
            <b>Actions</b> <FontAwesomeIcon className="icon-thumb" icon={faListUl} />
          </Button>
          <Button variant="success" className="float-right" style={{ padding: '5px 10px', margin: '0px 10px' }} onClick={handleShowAddColumn}>
            <b>Add Column</b> <FontAwesomeIcon className="icon-thumb" icon={faColumns} />
          </Button>
          <Button style={{ color: 'white', padding: '5px 10px' }} variant="dark-red" className="inlineBlock float-right" onClick={handleShowConfirm}>
            <b>New Board</b> <FontAwesomeIcon className="icon-thumb" icon={faChalkboard} />
          </Button>
        </Navbar>
        <Card className="boardCard fullHeight">
          <Card.Body>
            <Row className="fullHeight">
              <Col md={{ span: showActions ? 8 : 12 }}>
                {showAddColumn ? AddColumnModule : null}
                <Row className="fullHeight scrollable">
                  {ColumnComponent}
                </Row>
              </Col>
              <Col className={'fullHeight column ' + (showActions ? 'show' : 'hide')} md={{ span: 4 }}><ActionsColumn showActions={showActions} /></Col>
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
  voteFunctions: PropTypes.any,
  resetBoard: PropTypes.any,
  socket: PropTypes.any,
  columns: PropTypes.any,
  setColumns: PropTypes.any,
  id: PropTypes.any
}

export default Board
