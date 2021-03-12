import React, { useState } from 'react'
import PropTypes from 'prop-types'
import AddEditCard from './Action/Card/AddEdit'
import ViewCard from './Action/Card/View'
import { didUserVote } from '../lib/helpers'
import CardBootstrap from 'react-bootstrap/Card'

const Card = props => {
  const [edit, setEdit] = useState(false)

  const updateCard = card => {
    props.cardFunctions.update(card, props.index)
    if (edit) setEdit(false)
  }

  const deleteCard = () => {
    setEdit(false)
    if (didUserVote(props.id,  props.card.votes)) props.voteFunctions.downVote()
    props.cardFunctions.delete(props.index)
  }

  const ViewCardModule = <ViewCard updateCard={updateCard} card={props.card} setEdit={setEdit} voteFunctions={props.voteFunctions} votes={props.votes} id={props.id} />
  const AddEditCardModule = <AddEditCard index={props.index} card={props.card} cardFunctions={{ update: updateCard, delete: deleteCard }} tempCard={props.tempCard} tempCardValue={props.tempCardValue} setTempCardValue={props.setTempCardValue} />

  return (
    <CardBootstrap style={{ borderColor: props.card.group, borderStyle: 'double' }} className="itemChildCard">
      <CardBootstrap.Body>
        {(props.card.value && !edit) ? ViewCardModule : AddEditCardModule}
      </CardBootstrap.Body>
    </CardBootstrap>
  )
}

Card.propTypes = {
  card: PropTypes.any,
  index: PropTypes.any,
  cardFunctions: PropTypes.any,
  voteFunctions: PropTypes.any,
  votes: PropTypes.any,
  id: PropTypes.any,
  tempCard: PropTypes.any,
  tempCardValue: PropTypes.any,
  setTempCardValue: PropTypes.any
}

export default Card
