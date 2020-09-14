import React, { useState } from 'react'
import PropTypes from 'prop-types'
import AddEditCard from './Action/Card/AddEdit'
import ViewCard from './Action/Card/View'
import CardBootstrap from 'react-bootstrap/Card'

const Card = props => {
  const [edit, setEdit] = useState(false)

  const updateCard = card => {
    props.cardFunctions.update(props.index, card)
    if (edit) setEdit(false)
  }

  const deleteCard = () => {
    setEdit(false)
    for (let index = props.card.totalCardVotes; index > 0; index--) {
      props.voteFunctions.downVote()
    }
    props.cardFunctions.delete(props.index)
  }

  const ViewCardModule = <ViewCard updateCard={updateCard} card={props.card} setEdit={setEdit} voteFunctions={props.voteFunctions} votes={props.votes} id={props.id} />
  const AddEditCardModule = <AddEditCard index={props.index} card={props.card} cardFunctions={{ update: updateCard, delete: deleteCard }} />

  return (
    <CardBootstrap className="itemChildCard">
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
  id: PropTypes.any
}

export default Card
