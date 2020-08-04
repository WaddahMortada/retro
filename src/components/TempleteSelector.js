import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Modal, Button, Form } from 'react-bootstrap'

const TemplateSelector = props => {
  const [voteLimit, setVoteLimit] = useState(5)
  const [template, setTemplate] = useState()

  const create = () => {
    event.preventDefault()
    props.setTemplate(template)
    props.votes.limit = voteLimit
    props.setVotes({ ...props.votes })
    props.handleClose()
  }

  return (
    <Modal show={props.show} onHide={props.handleClose} aria-labelledby="contained-modal-title-vcenter" centered backdrop="static" keyboard={false}>
      <Modal.Header className="addColumnModelTitle">
        <Modal.Title>Create Board</Modal.Title>
      </Modal.Header>
      <Modal.Body className="addColumnModelBody">
        <form onSubmit={create}>
          <Form.Group controlId="exampleForm.ControlSelect1">
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
        </form>
      </Modal.Body>
    </Modal>
  )
}

TemplateSelector.propTypes = {
  setTemplate: PropTypes.any,
  setVotes: PropTypes.any,
  votes: PropTypes.any,
  show: PropTypes.any,
  handleShow: PropTypes.any,
  handleClose: PropTypes.any
}

export default TemplateSelector
