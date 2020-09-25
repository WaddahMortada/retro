import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Row, Col, Nav, Navbar, Card, Button, Form } from 'react-bootstrap'
import Logo from './Logo'
import AdminSelector from './AdminSelector'

const TemplateSelector = props => {
  const [voteLimit, setVoteLimit] = useState(5)
  const [template, setTemplate] = useState('mad_sad_glad')

  const create = () => {
    event.preventDefault()
    props.setTemplate(template)
    props.votes.limit = voteLimit
    const votes = { ...props.votes }
    props.setVotes(votes)

    props.socket.emit('resetBoard', true)
    props.socket.emit('setTemplate', template)
    props.socket.emit('setVotes', votes)
    props.socket.emit('setActions', '')
  }

  return (
    <Row className="fullHeight nav">
      <Col>
        <Navbar className="navBar" bg="dark" variant="dark">
          <Col xs={5}>
            <Nav className="mr-auto">
              <h5 className="navHeader">Create Board</h5>
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
  setAdmin: PropTypes.any
}

export default TemplateSelector
