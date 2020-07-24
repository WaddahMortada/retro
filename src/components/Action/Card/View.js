import React from 'react'
import PropTypes from 'prop-types'
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-regular-svg-icons'
import { faThumbsUp as solidFaThumbsUp, faThumbsDown as solidFaThumbsDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Row, Col, Button } from 'react-bootstrap'

const View = props => {
  const upVote = () => {
    if (!props.votes.disable) {
      props.card.upVote++
      props.updateCard(props.card)
      props.voteFunctions.upVote()
    }
  }

  const downVote = () => {
    props.card.upVote--
    props.updateCard(props.card)
    props.voteFunctions.downVote()
  }

  const DownVote = <div className="inlineBlock thumb" onClick={() => downVote()}>
    <FontAwesomeIcon className="icon-thumb" icon={faThumbsDown} />
    <FontAwesomeIcon className="icon-thumb-solid" icon={solidFaThumbsDown} />
  </div>

  return (
    <Row>
      <Col>
        <div className="inlineBlock">{props.card.value}</div>
        <Button variant="info" className="inlineBlock floatRight" onClick={() => props.setEdit(true)}>Edit</Button>
        <div className={'inlineBlock thumb' + ((props.votes.disable) ? ' disable' : '')} onClick={() => upVote()}>
          <FontAwesomeIcon className="icon-thumb" icon={faThumbsUp} />
          <FontAwesomeIcon className="icon-thumb-solid" icon={solidFaThumbsUp} />
          {props.card.upVote ? props.card.upVote : null}
        </div>
        { props.card.upVote ? DownVote : null }
      </Col>
    </Row>
  )
}

View.propTypes = {
  card: PropTypes.any,
  setEdit: PropTypes.any,
  updateCard: PropTypes.any,
  voteFunctions: PropTypes.any,
  votes: PropTypes.any
}

export default View
