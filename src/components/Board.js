import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Logo from './Logo'
import Confirm from './Confirm'
import Column from './Column'
import AddColumn from './Action/Column/Add'
import ActionsColumn from './ActionsColumn'
import AdminSelector from './AdminSelector'
import { Row, Col, Button, Navbar, Nav, Card } from 'react-bootstrap'
import { faChalkboard, faColumns, faListUl, faPlus, faMinus, faUsers } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Board = props => {
  // Card: { value: null, totalVotes: 0 }
  // Column: {title, cards}
  // Board: [column1, column2]
  const ColumnComponent = []
  const [showActions, setShowActions] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [showAddColumn, setShowAddColumn] = useState(false)
  const [innerWidth, setInnerWidth] = useState(window.innerWidth)

  const updateInnerWidth = () => {
    setInnerWidth(window.innerWidth)
  }

  useEffect(() => {
    window.addEventListener('resize', updateInnerWidth)
  }, [])

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
    column.cards.sort((a, b) => parseFloat(b.totalVotes) - parseFloat(a.totalVotes))
    props.columns[index] = column
    const updatedColumns = [...props.columns]
    props.setColumns(updatedColumns)
    if (broadcastUpdate) {
      props.socket.emit('setColumns', updatedColumns)
    } else {
      props.socket.emit('updateSocketColumnState', updatedColumns)
    }
  }

  const deleteColumn = index => {
    props.columns.splice(index, 1)
    const updatedColumns = [...props.columns]
    props.setColumns(updatedColumns)
    props.socket.emit('updateSocketColumnState', updatedColumns)
  }

  let disableAddColumn = props.columns.length >= 5
  if (!props.admin) disableAddColumn = true

  props.columns.forEach((column, key) => {
    ColumnComponent.push(
      <Col key={key} className="column">
        <Column
          index={key}
          column={column}
          votes={props.votes}
          voteFunctions={props.voteFunctions}
          columnFunctions={{ update: updateColumn, delete: deleteColumn }}
          id={props.id}
          admin={props.admin}
          socket={props.socket}
          deleteColumn={props.deleteColumn}
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
          <Col md={4}>
            <Nav className="mr-auto">
              <div className="navText">
                <span title="Number of Online Users" style={{ color: (props.onlineUsers > 0) ? '#0eb90e' : '#9e192a' }}>
                  <FontAwesomeIcon className="icon-thumb" icon={faUsers} style={{ fontSize: 'medium' }} /> {props.onlineUsers}
                </span>
                &nbsp;&nbsp; Votes:&nbsp;
                <span className={(props.votes.total === props.votes.limit ? 'danger' : null)}>
                  <b>{props.votes.total} out of {props.votes.limit}</b>
                </span>
              </div>
            </Nav>
          </Col>
          <Logo />
          <Col md={4}>
            {/* <AdminSelector admin={props.admin} setAdmin={props.setAdmin} /> */}
            <Button style={{ padding: '5px 10px' }} size="sm" variant="dark-red" className="inlineBlock float-right" onClick={handleShowConfirm} disabled={!props.admin}>
              <b>New {innerWidth > 1252 ? 'Board' : null}</b> <FontAwesomeIcon className="icon-thumb" icon={faChalkboard} />
            </Button>
            <Button variant="success" size="sm" className="float-right add-column-btn" onClick={handleShowAddColumn} disabled={disableAddColumn}>
              <b>Add {innerWidth > 1252 ? 'Column' : null}</b> <FontAwesomeIcon className="icon-thumb" icon={faColumns} />
            </Button>
            <Button variant="flat" size="sm" className="float-right actions-btn" onClick={toggleShowActions}>
              <small><FontAwesomeIcon className="icon-thumb" icon={showActions ? faMinus : faPlus} /></small> <b>Actions</b> <FontAwesomeIcon className="icon-thumb" icon={faListUl} />
            </Button>
          </Col>
        </Navbar>
        <Card className="boardCard fullHeight">
          <Card.Body className="mainCardBody">
            <Row className="fullHeight">
            <Col md={{ span: showActions ? 9 : 12 }}>
                {showAddColumn ? AddColumnModule : null}
                <Row className="fullHeight">
                  {ColumnComponent}
                </Row>
              </Col>
              <Col className={'fullHeight column ' + (showActions ? 'show' : 'hide')} md={{ span: 3 }}><ActionsColumn showActions={showActions} socket={props.socket} actionsData={props.actionsData} actions={props.actions} setActions={props.setActions} /></Col>
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
  id: PropTypes.any,
  admin: PropTypes.any,
  setAdmin: PropTypes.any,
  deleteColumn: PropTypes.any,
  actionsData: PropTypes.any,
  actions: PropTypes.any,
  setActions: PropTypes.any
}

export default Board
