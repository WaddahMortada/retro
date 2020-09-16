import React from 'react'
import PropTypes from 'prop-types'
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-regular-svg-icons'
import { faThumbsUp as solidFaThumbsUp, faThumbsDown as solidFaThumbsDown, faPen } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Row, Col, Button } from 'react-bootstrap'

const View = props => {
  const upVote = () => {
    if (!props.votes.disable) {
      props.card.totalCardVotes++
      props.updateCard(props.card, props.localVotes + 1)
      props.voteFunctions.upVote()
    }
  }

  const downVote = () => {
    props.card.totalCardVotes--
    props.updateCard(props.card, props.localVotes - 1)
    props.voteFunctions.downVote()
  }

  const DownVote = <div className="inlineBlock thumb" onClick={() => downVote()}>
    <FontAwesomeIcon className="icon-thumb" icon={faThumbsDown} />
    <FontAwesomeIcon className="icon-thumb-solid" icon={solidFaThumbsDown} />
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
          {props.card.totalCardVotes ? props.card.totalCardVotes : null}
        </div>
        {props.localVotes ? DownVote : null }
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
  id: PropTypes.any,
  localVotes: PropTypes.any
}

export default View
