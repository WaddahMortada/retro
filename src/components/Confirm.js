import React from 'react'
import PropTypes from 'prop-types'
import { Modal, Button } from 'react-bootstrap'
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Confirm = props => {
  let msg
  switch (props.type) {
    case 'delete':
      msg = 'delete'
      break;
    case 'reset':
      msg = 'reset current board'
      break;
  }

  return (
    <Modal aria-labelledby="contained-modal-title-vcenter" size={(props.type === 'reset') ? 'lg' : 'md'} centered show={props.show} onHide={props.handleClose}>
      <Modal.Header className="confirmHeader">
        <Modal.Title>Are you sure you want to {msg}?</Modal.Title>
      </Modal.Header>
      <Modal.Body className="confirmBody">
        <FontAwesomeIcon className="fa-cog fa-4x" icon={faExclamationCircle} />
      </Modal.Body>
      <Modal.Footer className="confirmFooter">
        <Button variant="secondary" onClick={props.handleClose}>
          No
        </Button>
        <Button variant="danger" onClick={props.submit}>
          Yes, {props.type} it!
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

Confirm.propTypes = {
  type: PropTypes.any,
  submit: PropTypes.any,
  show: PropTypes.any,
  handleClose: PropTypes.any
}

export default Confirm
