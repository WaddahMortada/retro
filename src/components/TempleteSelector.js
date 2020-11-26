import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Row, Col, Nav, Navbar, Card, Button, Form } from 'react-bootstrap'
import Logo from './Logo'
import AdminSelector from './AdminSelector'
import { faUsers } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const randomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

const generateBoardNumber = () => {
  return randomNumber(100, 999) + Date.now().toString(randomNumber(30, 36)) + randomNumber(100, 999)
}

const TemplateSelector = props => {
  const [voteLimit, setVoteLimit] = useState(5)
  const [template, setTemplate] = useState('mad_sad_glad')

  // console.log(generateBoardNumber())

  const create = () => {
    event.preventDefault()
    props.setTemplate(template)
    props.votes.limit = voteLimit
    const votes = { ...props.votes }
    props.setVotes(votes)
    const board = props.board || '1111' //generateBoardNumber()

    // create a new board here? 🤷‍♂️
    if (props.boards && !props.boards[props.board]) props.socket.emit('createBoard', board)

    props.socket.emit('resetBoard', { board: board, reset: true })
    props.socket.emit('setTemplate', { board: board,  template: template })
    props.socket.emit('setVotes', { board: board, votes: votes })
    props.socket.emit('setActions', { board: board, actions: '' })

    props.routerHistroy.push({
      search: '?board=' + board
    })
  }

  return (
    <Row className="fullHeight nav">
      <Col>
        <Navbar className="navBar" bg="dark" variant="dark">
          <Col md={4}>
            <Nav className="mr-auto">
              <div className="navText">
                <span title="Number of Online Users" style={{ color: (props.onlineUsers > 0) ? '#0eb90e' : '#9e192a' }}>
                  <FontAwesomeIcon className="icon-thumb" icon={faUsers} style={{ fontSize: 'medium' }} /> {props.onlineUsers}
                </span>
                &nbsp; &nbsp; Create Board
              </div>
            </Nav>
          </Col>
          <Logo templateSelector={true} />
          {/* <AdminSelector admin={props.admin} setAdmin={props.setAdmin} /> */}
        </Navbar>
        <Card className="templateCard">
          <Card.Body>
            <form onSubmit={create}>
              <Row className="justify-content-md-center">
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Template</Form.Label>
                    <Form.Control as="select" onChange={(e) => setTemplate(e.target.value)} value={template} required>
                      <option value="blank_board">Blank Board</option>
                      <option value="mad_sad_glad">Mad Sad Glad</option>
                      <option value="start_stop_continue">Start Stop Continue</option>
                      <option value="liked_learnt_lacked">Liked Learnt Lacked</option>
                    </Form.Control>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Max votes per user (whole board)</Form.Label>
                    <Form.Control size="sm" type="number" min="1" step="1" pattern="\d+" value={voteLimit} onChange={(e) => setVoteLimit(e.target.value)} required />
                  </Form.Group>
                  <Button className="float-right submitModalButton" variant="success" as="input" type="submit" value="Create" />
                </Col>
              </Row>
            </form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  )
}

TemplateSelector.propTypes = {
  setTemplate: PropTypes.any,
  setVotes: PropTypes.any,
  votes: PropTypes.any,
  socket: PropTypes.any,
  admin: PropTypes.any,
  setAdmin: PropTypes.any,
  onlineUsers: PropTypes.any,
  board: PropTypes.any,
  boards: PropTypes.any,
  routerHistroy: PropTypes.any
}

export default TemplateSelector
