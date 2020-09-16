import React, { useState } from 'react'
import PropTypes from 'prop-types'
import AddEditCard from './Action/Card/AddEdit'
import ViewCard from './Action/Card/View'
import CardBootstrap from 'react-bootstrap/Card'

const Card = props => {
  const [edit, setEdit] = useState(false)

  const updateCard = (card, votes = props.localVotes) => {
    props.cardFunctions.update(props.index, card, votes)
    if (edit) setEdit(false)
  }

  const deleteCard = () => {
    setEdit(false)
    for (let index = props.localVotes; index > 0; index--) {
      props.voteFunctions.downVote()
    }
    props.cardFunctions.delete(props.index)
  }

  const ViewCardModule = <ViewCard updateCard={updateCard} card={props.card} setEdit={setEdit} voteFunctions={props.voteFunctions} votes={props.votes} id={props.id} localVotes={props.localVotes} />
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
  localVotes: PropTypes.any,
  id: PropTypes.any
}

export default Card
