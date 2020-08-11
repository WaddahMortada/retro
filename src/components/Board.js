import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Confirm from './Confirm'
import Column from './Column'
import AddColumn from './Action/Column/Add'
import ActionsColumn from './ActionsColumn'
import { toTitleCase } from '../lib/helpers'
import { Row, Col, Button, Navbar, Nav, Card } from 'react-bootstrap'
import { faChalkboard, faColumns, faListUl } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Board = props => {
  // Card: { value: null, upVote: 0 }
  // Column: {title, cards}
  // Board: [column1, column2]
  const ColumnComponent = []
  const [columns, setColumns] = useState([{ title: '', cards: [{ value: '', upVote: 0 }] }])
  const [showActions, setShowActions] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [showAddColumn, setShowAddColumn] = useState(false)

  useEffect(() => {
    const columnsTitle = props.type !== 'blank_board' ? props.type.split('_') : []
    const columnsObjects = []
    columnsTitle.forEach(title => {
      columnsObjects.push({ title: title, cards: [] })
    })
    setColumns(columnsObjects)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const handleCloseConfirm = () => setShowConfirm(false)
  const handleShowConfirm = () => setShowConfirm(true)
  const handleCloseAddColumn = () => setShowAddColumn(false)
  const handleShowAddColumn = () => setShowAddColumn(true)
  const toggleShowActions = () => setShowActions(!showActions)

  const resetBoard = () => {
    handleCloseConfirm()
    props.resetBoard()
  }

  const updateColumn = (index, column) => {
    columns[index] = column
    setColumns([...columns])
  }

  const deleteColumn = index => {
    columns.splice(index, 1)
    setColumns([...columns])
  }

  let carouselClass = null
  if (columns.length >= 3 && showActions) {
    carouselClass = 'carousel-45'
  } else if (columns.length > 3) {
    carouselClass = 'carousel-32'
  }

  columns.forEach((column, key) => {
    ColumnComponent.push(
      <Col key={key} md={{ span: showActions ? 6 : 4 }} className={'column ' + carouselClass}>
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

  const AddColumnModule = <AddColumn columns={columns} setColumns={setColumns} show={showAddColumn} handleClose={handleCloseAddColumn} handleShow={handleShowAddColumn} />

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
              <Col className={'fullHeight column ' + (showActions ? 'show' : 'hide')} md={{ span: 4 }}><ActionsColumn /></Col>
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
  resetBoard: PropTypes.any
}

export default Board
