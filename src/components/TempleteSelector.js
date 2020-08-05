import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Row, Col, Card, Button, Form } from 'react-bootstrap'

const TemplateSelector = props => {
  const [voteLimit, setVoteLimit] = useState(5)
  const [template, setTemplate] = useState()

  const create = () => {
    event.preventDefault()
    props.setTemplate(template)
    props.votes.limit = voteLimit
    props.setVotes({ ...props.votes })
  }

  return (
    <Row>
      <Col>
        <Card className="boardCard">
          <Card.Header className="secondNav">
            <h5>Create Board</h5>
          </Card.Header>
          <Card.Body>
            <form onSubmit={create}>
              <Row className="justify-content-md-center">
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Template</Form.Label>
                    <Form.Control as="select" onChange={(e) => setTemplate(e.target.value)} value={template} required>
                      <option value=""></option>
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
  votes: PropTypes.any
}

export default TemplateSelector
