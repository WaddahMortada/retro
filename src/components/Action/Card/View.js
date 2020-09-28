import React from 'react'
import PropTypes from 'prop-types'
import { faThumbsUp } from '@fortawesome/free-regular-svg-icons'
import { faThumbsUp as solidFaThumbsUp, faTimes, faPen } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Row, Col, Button } from 'react-bootstrap'

const View = props => {
  // votes: { [props.id]: 0 }
  const upVote = () => {
    if (!props.votes.disable) {
      if (!props.card.votes.hasOwnProperty(props.id)) props.card.votes[props.id] = 0
      props.card.votes[props.id]++
      props.card.totalVotes++
      props.updateCard(props.card)
      props.voteFunctions.upVote()
    }
  }

  const downVote = () => {
    if (props.card.votes.hasOwnProperty(props.id)) props.card.votes[props.id]--
    props.card.totalVotes--
    props.updateCard(props.card)
    props.voteFunctions.downVote()
  }

  const DownVote = <div className="inlineBlock thumb" onClick={() => downVote()}>
    <FontAwesomeIcon className="icon-thumb" icon={faTimes} />
    <FontAwesomeIcon className="icon-thumb-solid" icon={faTimes} />
  </div>

  const EditButton = <Button variant="flat-light" size="smm" className="float-right" onClick={() => props.setEdit(true)}>
    <FontAwesomeIcon className="icon-thumb" icon={faPen} />
  </Button>

  return (
    <Row>
      <Col>
        <div className="viewCard">{props.card.value}</div>
        {props.id === props.card.id ? EditButton : null}
        <div className={'inlineBlock thumb' + ((props.votes.disable) ? ' disable' : '')} onClick={() => upVote()}>
          <FontAwesomeIcon className="icon-thumb" icon={faThumbsUp} />
          <FontAwesomeIcon className="icon-thumb-solid" icon={solidFaThumbsUp} />
          <span className="card-votes-total">{props.card.totalVotes ? props.card.totalVotes : null}</span>
        </div>
        {props.card.votes[props.id] ? DownVote : null }
      </Col>
    </Row>
  )
}

View.propTypes = {
  card: PropTypes.any,
  setEdit: PropTypes.any,
  updateCard: PropTypes.any,
  voteFunctions: PropTypes.any,
  votes: PropTypes.any,
  id: PropTypes.any
}

export default View
