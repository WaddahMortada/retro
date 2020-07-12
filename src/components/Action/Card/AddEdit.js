import React, { useState } from 'react'
import PropTypes from 'prop-types'

const AddEdit = props => {
  const isEdit = props.card && props.card.value
  const [inputText, setInputText] = useState(isEdit ? props.card.value : '')

  const addCard = (event) => {
    event.preventDefault()
    if (inputText) {
      setInputText('')
      props.card.value = inputText
      props.updateCardValue(props.card, props.index)
    }
  }

  const deleteCard = () => {
    setInputText('')
    props.deleteCard()
  }

  return (
    <form onSubmit={addCard}>
      <div>
        <div>
          <input type="text" autoFocus value={inputText} onChange={e => setInputText(e.target.value)} />
          <input type="submit" value={isEdit ? 'Edit' : 'Add'} />
          <button onClick={() => deleteCard()}>Delete</button>
        </div>
      </div>
    </form>
  )
}

AddEdit.propTypes = {
  card: PropTypes.any,
  index: PropTypes.any,
  updateCardValue: PropTypes.any,
  deleteCard: PropTypes.any
}

export default AddEdit
