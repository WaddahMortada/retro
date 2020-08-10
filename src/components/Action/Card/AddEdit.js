import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Confirm from '../../Confirm'
import { Form, Button } from 'react-bootstrap'
import { faTrash, faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const AddEdit = props => {
  const isEdit = props.card && props.card.value
  const [inputText, setInputText] = useState(isEdit ? props.card.value : '')
  const [displayConfirm, setDisplayConfirm] = useState(false)

  const handleClose = () => setDisplayConfirm(false)
  const handleShow = () => setDisplayConfirm(true)

  const addCard = () => {
    if (inputText) {
      setInputText('')
      props.card.value = inputText.trim()
      props.cardFunctions.update(props.card)
    }
  }

  const deleteCard = () => {
    setInputText('')
    props.cardFunctions.delete()
    handleClose()
  }

  const updateInputSize = (e) => {
    e.target.style.height = 'inherit'
    e.target.style.height = `${e.target.scrollHeight}px`
  }

  return (
    <form>
      {displayConfirm ? <Confirm type="delete" submit={deleteCard} show={displayConfirm} handleClose={handleClose} /> : null}
      <Form.Group>
        <textarea className="textareaInput" onKeyUp={updateInputSize} onFocus={updateInputSize} autoFocus value={inputText} onChange={e => setInputText(e.target.value)} />
      </Form.Group>
      <Button className="float-right submitCardButton" size="sm" variant="success" onClick={() => addCard()}>
        <FontAwesomeIcon className="icon-thumb" icon={faCheck} />
      </Button>
      <Button className="float-right deleteCardButton" size="sm" variant="danger" onClick={handleShow}>
        <FontAwesomeIcon className="icon-thumb" icon={faTrash} />
      </Button>
    </form>
  )
}

AddEdit.propTypes = {
  card: PropTypes.any,
  index: PropTypes.any,
  cardFunctions: PropTypes.any
}

export default AddEdit
