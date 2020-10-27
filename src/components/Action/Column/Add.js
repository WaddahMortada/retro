import React, { useEffect, useState, useRef } from 'react'
import PropTypes from 'prop-types'
import { Modal, Form, Button } from 'react-bootstrap'

const Add = props => {
  const [title, setTitle] = useState('')
  const autoFocus = useRef(null);

  useEffect(() => {
    autoFocus.current.focus();
  }, []);

  const submit = (event) => {
    event.preventDefault()
    props.columns.push({ title: title, cards: [] })
    const columns = [...props.columns]
    props.setColumns(columns)
    props.socket.emit('setColumns', { board: props.board, columns: columns })
    setTitle('')
    props.handleClose()
  }

  return (
    <Modal aria-labelledby="contained-modal-title-vcenter" centered show={props.show} onHide={props.handleClose}>
      <Modal.Header className="addColumnModelTitle">
        <Modal.Title>Add New Column</Modal.Title>
      </Modal.Header>
      <Modal.Body className="addColumnModelBody">
        <form onSubmit={submit}>
          <Form.Group>
            <Form.Control className="inputModal" type="text" ref={autoFocus} onChange={(e) => setTitle(e.target.value)} value={title} required />
            <Button className="float-right submitModalButton" variant="success" as="input" type="submit" value="Submit" />
            <Button className="float-right closeModalButton" variant="secondary" onClick={props.handleClose}>Close</Button>
          </Form.Group>
        </form>
      </Modal.Body>
    </Modal>
  )
}

Add.propTypes = {
  columns: PropTypes.any,
  setColumns: PropTypes.any,
  show: PropTypes.any,
  handleShow: PropTypes.any,
  handleClose: PropTypes.any,
  socket: PropTypes.any,
  board: PropTypes.any
  // closeModule: PropTypes.any
}

export default Add
