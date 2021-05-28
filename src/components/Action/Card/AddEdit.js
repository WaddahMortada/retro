import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Confirm from '../../Confirm'
import { Form, Button } from 'react-bootstrap'
import { faTrash, faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const AddEdit = props => {
  const cardValue = (props.tempCard && props.tempCardValue) ? props.tempCardValue : ''
  const isEdit = props.card && props.card.value
  const [inputText, setInputText] = useState(isEdit ? props.card.value : cardValue)
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

  const updateInput = event => {
    updateInputSize(event)
    event.target.selectionStart = props.position
  }

  const updateInputSize = event => {
    event.target.style.height = 'inherit'
    event.target.style.height = `${event.target.scrollHeight}px`
  }

  const updateInputText = event => {
    console.log('input position: ', event.target.selectionStart)
    setInputText(event.target.value)
    props.setPosition(event.target.selectionStart)
  }

  useEffect(() => {
    if (props.tempCard) {
      props.setTempCardValue(inputText)
    }
  }, [inputText])

  return (
    <form>
      {displayConfirm ? <Confirm type="delete" submit={deleteCard} show={displayConfirm} handleClose={handleClose} /> : null}
      <Form.Group>
        <textarea className="textareaInput" onKeyUp={updateInputSize} onFocus={updateInput} autoFocus value={inputText} onChange={updateInputText} />
      </Form.Group>
      <Button className="float-right submitCardButton" size="sm" variant="success" onClick={() => addCard()}>
        <FontAwesomeIcon className="icon-thumb" icon={faCheck} />
      </Button>
      <Button className="float-right deleteCardButton" size="sm" variant="danger" onClick={props.tempCard ? deleteCard : handleShow}>
        <FontAwesomeIcon className="icon-thumb" icon={faTrash} />
      </Button>
    </form>
  )
}

AddEdit.propTypes = {
  card: PropTypes.any,
  cardFunctions: PropTypes.any,
  tempCard: PropTypes.any,
  tempCardValue: PropTypes.any,
  setTempCardValue: PropTypes.any,
  position: PropTypes.any,
  setPosition: PropTypes.any
}

export default AddEdit
