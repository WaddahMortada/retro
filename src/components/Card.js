import React, { useState } from 'react'
import PropTypes from 'prop-types'
import AddEditCard from './Action/Card/AddEdit'
import ViewCard from './Action/Card/View'

const Card = props => {
  const [edit, setEdit] = useState(false)

  const updateCardValue = card => {
    props.OnUpdateCard(card)
    if (edit) setEdit(false)
  }

  const deleteCard = () => {
    setEdit(false)
    for (let index = props.card.upVote; index > 0; index--) {
      props.voteFunctions.downVote()
    }
    props.OnDeleteCard(props.index)
  }

  const ViewCardModule = <ViewCard OnUpVote={updateCardValue} card={props.card} setEdit={setEdit} voteFunctions={props.voteFunctions} votes={props.votes} />
  const AddEditCardModule = <AddEditCard index={props.index} card={props.card} updateCardValue={updateCardValue} deleteCard={deleteCard} />

  return <div>{(props.card.value && !edit) ? ViewCardModule : AddEditCardModule}</div>
}

Card.propTypes = {
  card: PropTypes.any,
  index: PropTypes.any,
  OnUpdateCard: PropTypes.any,
  OnDeleteCard: PropTypes.any,
  voteFunctions: PropTypes.any,
  votes: PropTypes.any
}

export default Card
