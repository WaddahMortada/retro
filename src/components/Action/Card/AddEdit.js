import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Button from 'react-bootstrap/Button'
import { faTrash, faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const AddEdit = props => {
  const isEdit = props.card && props.card.value
  const [inputText, setInputText] = useState(isEdit ? props.card.value : '')

  const addCard = (event) => {
    event.preventDefault()
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

  return (
    <form onSubmit={addCard}>
      <input type="text" autoFocus value={inputText} onChange={e => setInputText(e.target.value)} />
      <Button className="float-right" size="sm" variant="danger" onClick={() => deleteCard()}>
        <FontAwesomeIcon className="icon-thumb" icon={faTrash} />
      </Button>
      <Button className="float-right" size="sm" variant="success" onClick={() => addCard()}>
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
