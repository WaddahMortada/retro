import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Row, Col, Nav, Navbar, Card, Button, Form } from 'react-bootstrap'
import Logo from './Logo'
import Footer from './Footer'
import AdminSelector from './AdminSelector'
import { faChalkboard } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const randomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

const generateBoardNumber = () => {
  return randomNumber(100, 999) + Date.now().toString(randomNumber(30, 36)) + randomNumber(100, 999)
}

const TemplateSelector = props => {
  const [voteLimit, setVoteLimit] = useState(5)
  const [template, setTemplate] = useState(props.template ? props.template : 'liked_learnt_lacked_longed-for')

  const create = () => {
    event.preventDefault()
    props.setTemplate(template)
    props.votes.limit = voteLimit
    const votes = { ...props.votes }
    props.setVotes(votes)
    props.setAdmin(true)
    const board = props.board || generateBoardNumber()

    if (props.boards && !props.boards[props.board]) props.socket.emit('createBoard', board)

    props.socket.emit('resetBoard', { board: board, reset: true })
    props.socket.emit('setTemplate', { board: board,  template: template })
    props.socket.emit('setVotes', { board: board, votes: votes })
    props.socket.emit('setActions', { board: board, actions: '' })

    // const fullUrl = getFullUrl(board)
    // writeToClipboard(fullUrl)

    props.routerHistroy.push({
      search: '?board=' + board
    })
  }

  const getFullUrl = board => {
    const currentHref = window.location.href
    const path = props.routerHistroy.location.search
    if (path.includes(board) && currentHref.includes(path)) {
      return currentHref
    }
    return window.location.href + '?board=' + board
  }

  const writeToClipboard = fullUrl => {
    navigator.clipboard.writeText(fullUrl).then(() => {
      props.setCopyUrlMessage('The board URL copied to clipboard successfully!')
    }, (error) => {
      console.log('clipboard write failed', error)
    })
  }

  return (
    <Row style={{ height: '90%' }}>
      <Col style={{ paddingRight: 0 }}>
        <Navbar className="navBar" bg="dark" variant="dark">
          <Col md={4}>
            <Nav className="mr-auto">
              <div className="navText" style={{ color: '#ccc23f' }}>
                <FontAwesomeIcon className="icon-thumb" icon={faChalkboard} />
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
                      <option value="liked_learnt_lacked_longed-for">4 Ls</option>
                      <option value="what-went-well?_what-didn’t-go-so-well?_what-have-i-learned?_what-still-puzzles-me?">Original 4</option>
                      <option value="wind-💨_sun-☀️_anchor-⚓️_reef-⛰">Sailboat ⛵️</option>
                      <option value="mad_sad_glad">Mad Sad Glad</option>
                      <option value="good_bad_ideas">Good Bad Ideas</option>
                      <option value="keep_add_remove">Keep Add Remove</option>
                      <option value="start_stop_continue">Start Stop Continue</option>
                      <option value="liked_learnt_lacked">Liked Learnt Lacked</option>
                      <option value="keep-doing_less-of_more-of_start-doing_stop-doing">Keep Less More Start Stop</option>
                      <option value="Engine:-what-make-us-move-faster?_parachute:-what-is-slowing-us-down?">Engine Parachute</option>
                      <option value="happy-😃_meh-😑_sad-🙁">Happy Meh Sad</option>
                      <option value="pros_cons">Pros Cons</option>
                      <option value="drop_add_keep_improve">Drop Add Keep Improve</option>
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
        <Footer />
      </Col>
    </Row>
  )
}

TemplateSelector.propTypes = {
  template: PropTypes.any,
  setTemplate: PropTypes.any,
  setVotes: PropTypes.any,
  votes: PropTypes.any,
  socket: PropTypes.any,
  admin: PropTypes.any,
  setAdmin: PropTypes.any,
  board: PropTypes.any,
  boards: PropTypes.any,
  routerHistroy: PropTypes.any,
  setCopyUrlMessage: PropTypes.any
}

export default TemplateSelector
