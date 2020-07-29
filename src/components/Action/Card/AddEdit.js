import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Button from 'react-bootstrap/Button'
import { faTrash, faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const AddEdit = props => {
  const isEdit = props.card && props.card.value
  const [inputText, setInputText] = useState(isEdit ? props.card.value : '')
  const [rowsNumber, setRowsNumber] = useState(isEdit ? props.card.value.split('\n').length : 1)

  const addCard = () => {
    if (inputText) {
      setInputText('')
      props.card.value = inputText
      props.cardFunctions.update(props.card)
    }
  }

  const deleteCard = () => {
    setInputText('')
    props.cardFunctions.delete()
  }

  const updateInputSize = (event) => {
    const { keyCode, target } = event
    const rowsNum = target.value.split('\n').length

    switch (keyCode) {
      case 13: // Enter
        setRowsNumber(rowsNumber + 1)
        break
      case 8: // Backspace
        if (rowsNum !== rowsNumber) {
          setRowsNumber((rowsNum > 0) ? rowsNum : 1)
        }
        break
    }
  }

  // Fix AUTOFOCUS SELECTOR POINTER (should always start at the end)
  return (
    <form>
      <textarea className="textareaInput columnInput" rows={rowsNumber} onKeyUp={updateInputSize} autoFocus value={inputText} onChange={e => setInputText(e.target.value)} />
      <Button className="float-right deleteCardButton" size="sm" variant="danger" onClick={() => deleteCard()}>
        <FontAwesomeIcon className="icon-thumb" icon={faTrash} />
      </Button>
      <Button className="float-right submitCardButton" size="sm" variant="success" onClick={() => addCard()}>
        <FontAwesomeIcon className="icon-thumb" icon={faCheck} />
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
