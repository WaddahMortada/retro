import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Logo from './Logo'
import Confirm from './Confirm'
import Column from './Column'
import AddColumn from './Action/Column/Add'
import ActionsColumn from './ActionsColumn'
import AdminSelector from './AdminSelector'
import Footer from './Footer'
import { Row, Col, Button, Navbar, Nav, Card, Toast } from 'react-bootstrap'
import { faChalkboard, faColumns, faListUl, faPlus, faMinus, faUsers, faCopy } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Board = props => {
  // Card: { value: null, totalVotes: 0 }
  // Column: {title, cards}
  // Board: [column1, column2]
  const ColumnComponent = []
  const [showActions, setShowActions] = useState(props.routerHistroy.location.hash === '#showActions')
  const [showConfirm, setShowConfirm] = useState(false)
  const [showAddColumn, setShowAddColumn] = useState(false)
  const [innerWidth, setInnerWidth] = useState(window.innerWidth)
  const [showNotification, setShowNotification] = useState(false)

  const updateInnerWidth = () => {
    setInnerWidth(window.innerWidth)
  }

  useEffect(() => {
    window.addEventListener('resize', updateInnerWidth)
  }, [])

  useEffect(() => {
    props.copyUrlMessage ? setShowNotification(true) : setShowNotification(false)
  }, [props.copyUrlMessage])

  const handleCloseConfirm = () => setShowConfirm(false)
  const handleShowConfirm = () => setShowConfirm(true)
  const handleCloseAddColumn = () => setShowAddColumn(false)
  const handleShowAddColumn = () => setShowAddColumn(true)
  const toggleShowActions = () => {
    setShowActions(!showActions)
    const hash = !showActions ? '#showActions' : '#hideActions'
    props.routerHistroy.push(props.routerHistroy.location.search + hash)
  }
  const hideNotification = () => props.setCopyUrlMessage(null)

  const resetBoard = () => {
    handleCloseConfirm()
    props.resetBoard()
  }

  const updateColumn = (index, column, broadcastUpdate = true) => {
    column.cards.sort((a, b) => {
      return b.group.id - a.group.id || parseFloat(b.totalVotes) - parseFloat(a.totalVotes)
    })
    props.columns[index] = column
    const updatedColumns = [...props.columns]
    props.setColumns(updatedColumns)
    if (broadcastUpdate) {
      console.log({ board: props.board, columns: updatedColumns })
      props.socket.emit('setColumns', { board: props.board, columns: updatedColumns })
    } else {
      props.socket.emit('updateSocketColumnState', { board: props.board, columns: updatedColumns })
    }
  }

  const deleteColumn = index => {
    props.columns.splice(index, 1)
    const updatedColumns = [...props.columns]
    props.setColumns(updatedColumns)
    props.socket.emit('updateSocketColumnState', { board: props.board, columns: updatedColumns })
  }

  const pad = n => {
    return n < 10 ? `0${n}` : n
  }

  const copyBoard = () => {
    const date = new Date()
    let text = `Retro Baord - ${pad(date.getDate())}-${pad(date.getMonth())}-${date.getFullYear()} \n`

    props.columns.forEach(column => {
      console.log(column)
      text += `${column.title} - Column \n`
      column.cards.forEach(card => {
        console.log(card)
        text += `• ${card.value} \n`
      })
    })

    text += 'Actions - Column \n'
    text += props.actions

    // writeToClipboard(text)
  }

  const writeToClipboard = text => {
    navigator.clipboard.writeText(text).then(() => {
      props.setCopyUrlMessage('The Board has been copied to clipboard successfully!')
    }, (error) => {
      console.log('clipboard write failed', error)
    })
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
          board={props.board}
        />
      </Col>
    )
  })

  const AddColumnModule = <AddColumn columns={props.columns} setColumns={props.setColumns} show={showAddColumn} handleClose={handleCloseAddColumn} handleShow={handleShowAddColumn} socket={props.socket} board={props.board} />

  return (
    <div style={{ height: '100%' }}>
      <Row>
        <Col style={{ width: '100%', paddingRight: 0 }}>
          <Navbar className="navBar justify-content-center" bg="dark" variant="dark">
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
            <Col md={4} style={{ paddingRight: '30px' }}>
              {/* <AdminSelector admin={props.admin} setAdmin={props.setAdmin} /> */}
              <Button style={{ padding: '5px 10px' }} size="sm" variant="dark-red" className="inlineBlock float-right" onClick={handleShowConfirm} disabled={!props.admin}>
                <b>New {innerWidth > 1252 ? 'Board' : null}</b> <FontAwesomeIcon className="icon-thumb" icon={faChalkboard} />
              </Button>
              <Button variant="success" size="sm" className="float-right add-column-btn" onClick={handleShowAddColumn} disabled={disableAddColumn}>
                <b>Add {innerWidth > 1252 ? 'Column' : null}</b> <FontAwesomeIcon className="icon-thumb" icon={faColumns} />
              </Button>
              {/* <Button style={{ color: '#faf6db', backgroundColor: '#dcb02c', marginLeft: '10px' }} variant="warning" size="sm" className="float-right" onClick={copyBoard}>
                <b>Copy {innerWidth > 1252 ? 'Board' : null}</b> <FontAwesomeIcon className="icon-thumb" icon={faCopy} />
              </Button> */}
              <Button variant="flat" size="sm" className="float-right actions-btn" onClick={toggleShowActions}>
                <small><FontAwesomeIcon className="icon-thumb" icon={showActions ? faMinus : faPlus} /></small> <b>Actions</b> <FontAwesomeIcon className="icon-thumb" icon={faListUl} />
              </Button>
            </Col>
          </Navbar>
        </Col>
      </Row>
      <div className="boardToastContainer">
        <Toast className="boardToast" animation={false} show={showNotification} onClose={hideNotification} delay={5000} autohide>
          <Toast.Header>
            <strong className="mr-auto">Notification</strong>
          </Toast.Header>
          <Toast.Body style={{ backgroundColor: '#3e6679', color: 'white' }}>
            {props.copyUrlMessage}
          </Toast.Body>
        </Toast>
      </div>
      <Row className="contentBoard">
        {/* <Col md={{ span: showActions ? 9 : 12 }}> */}
        <Col  >
          <Row style={{ height: '100%' }}>
            <Col>
              {showConfirm ? <Confirm type="reset" submit={resetBoard} show={showConfirm} handleClose={handleCloseConfirm} /> : null}
              <Card className="boardCard">
                <Card.Body className="mainCardBody">
                    <Col className={' ' + (showActions ? 'showCol' : null)}>
                  <Row style={{ height: '99%' }}>
                      {showAddColumn ? AddColumnModule : null}
                      <Row style={{ height: '100%' }}>
                        {ColumnComponent}
                      </Row>
                    </Col>
                    <Col className={'column ' + (showActions ? 'showActions' : 'hideActions')} md={{ span: 3 }}>
                      {showActions ? <ActionsColumn showActions={showActions} socket={props.socket} actions={props.actions} setActions={props.setActions} board={props.board} /> : null}
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
        {/* <Col className={' ' + (showActions ? 'show' : 'hide')} md={{ span: 3 }}>
          {showActions ? <ActionsColumn showActions={showActions} socket={props.socket} actions={props.actions} setActions={props.setActions} board={props.board} /> : null}
        </Col> */}
      </Row>
      <Row>
        <Col style={{ width: '100%' }}>
          <Footer />
        </Col>
      </Row>
    </div>
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
  actions: PropTypes.any,
  setActions: PropTypes.any,
  board: PropTypes.any,
  copyUrlMessage: PropTypes.any,
  setCopyUrlMessage: PropTypes.any,
  routerHistroy: PropTypes.any
}

export default Board
