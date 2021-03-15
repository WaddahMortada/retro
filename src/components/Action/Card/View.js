import React, { useState } from 'react'
import GroupsColumn from '../../GroupsColumn'
import PropTypes from 'prop-types'
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-regular-svg-icons'
import { faThumbsUp as solidFaThumbsUp, faThumbsDown as solidFaThumbsDown, faPen, faLayerGroup } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Row, Col, Button, OverlayTrigger, Popover } from 'react-bootstrap'

const View = props => {
  const [showGroups, setShowGroups] = useState(false)

  const toggleShowGroups = () => setShowGroups(!showGroups)

  // votes: { [props.id]: upVote: false, downVote: false }
  const setUserVotesProperty = () => {
    if (!props.card.votes.hasOwnProperty(props.id)) {
      props.card.votes[props.id] = { upVote: false, downVote: false }
    }
  }

  const upVote = () => {
    setUserVotesProperty()

    if (!props.card.votes[props.id].upVote) {
      // Only increment local total user votes if user didn't vote at all on this card
      if (!props.card.votes[props.id].downVote) {
        props.voteFunctions.upVote()
      }

      // to undo the down vote and vote up instead, it should increment by two votes. Otherwise, increment by one
      props.card.totalVotes += props.card.votes[props.id].downVote ? 2 : 1

      props.card.votes[props.id].upVote = true
      props.card.votes[props.id].downVote = false
    } else {
      // Undo UpVote when click thump up again
      props.card.votes[props.id].upVote = false
      props.card.totalVotes--
      props.voteFunctions.downVote()
    }

    props.updateCard(props.card)
  }

  const downVote = () => {
    setUserVotesProperty()

    if (!props.card.votes[props.id].downVote) {
      // Only increment local total user votes if user didn't vote at all on this card
      if (!props.card.votes[props.id].upVote) {
        props.voteFunctions.upVote()
      }

      // to undo the up vote and down vote instead, it should decrement by two votes. Otherwise, decrement by one
      props.card.totalVotes -= props.card.votes[props.id].upVote ? 2 : 1

      props.card.votes[props.id].upVote = false
      props.card.votes[props.id].downVote = true
    } else {
      // Undo DownVote when click thump down again
      props.card.votes[props.id].downVote = false
      props.card.totalVotes++
      props.voteFunctions.downVote()
    }

    props.updateCard(props.card)
  }

  const selectGroup = group => {
    props.card.group = group
    props.updateCard(props.card)
    toggleShowGroups()
  }

  const upVoted = props.card.votes.hasOwnProperty(props.id) && props.card.votes[props.id].upVote
  const downVoted = props.card.votes.hasOwnProperty(props.id) && props.card.votes[props.id].downVote
  const disabled = props.votes.disable && !upVoted && !downVoted

  let votesClass = ''
  if (upVoted) {
    votesClass = ' up-voted'
  } else if (downVoted) {
    votesClass = ' down-voted'
  }

  const EditButton = <Button variant="flat-light" style={{ marginLeft: '3px' }} size="smm" className="float-right" onClick={() => props.setEdit(true)}>
    <FontAwesomeIcon className="icon-thumb" icon={faPen} />
  </Button>

  const PopoverComponent = <Popover className="groupsPopover" placement="bottom">
    <Popover.Title style={{ backgroundColor: '#ceae31', color: '#faf6db', borderBottom: 'none' }}>
      <strong className="mr-auto">Groups Selector</strong>
    </Popover.Title>
    <Popover.Content style={{ backgroundColor: '#065f6d', color: '#faf6db' }}>
      <GroupsColumn setGroup={selectGroup}/>
    </Popover.Content>
  </Popover>

  return (
    <Row>
      <Col>
        <div className="viewCard">{props.card.value}</div>
        {props.id === props.card.id ? EditButton : null}
        <OverlayTrigger show={showGroups} onToggle={() => toggleShowGroups()} trigger="click" rootClose placement="bottom" overlay={PopoverComponent}>
          <Button style={{ background: '#ceae31', padding: '2px 5px' }} variant="flat-light" size="sm" className="float-right" onClick={toggleShowGroups}>
            <FontAwesomeIcon className="icon-thumb" icon={faLayerGroup} />
          </Button>
        </OverlayTrigger>
        <div className={'inlineBlock' + (disabled ? ' disable' : '') + (upVoted ? ' up-voted' : ' thumb')} onClick={() => upVote()}>
          {upVoted ? null : <FontAwesomeIcon className="icon-thumb" icon={faThumbsUp} />}
          <FontAwesomeIcon className="icon-thumb-solid" icon={solidFaThumbsUp} />
        </div>
        <span className={'card-votes-total' + (disabled ? ' disable' : votesClass)}>
          <b>{props.card.totalVotes}</b>
        </span>
        <div className={'inlineBlock' + (disabled ? ' disable' : '') + (downVoted ? ' down-voted' : ' thumb')} onClick={() => downVote()}>
          {downVoted ? null : <FontAwesomeIcon className="icon-thumb" icon={faThumbsDown} />}
          <FontAwesomeIcon className="icon-thumb-solid" icon={solidFaThumbsDown} />
        </div>
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
