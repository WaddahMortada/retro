import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Card, Button, ButtonGroup } from 'react-bootstrap'
import { faLayerGroup } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const GroupsColumn = props => {
  const ButtonsComponent = []
  const [colour, setColour] = useState('')

  useEffect(() => {
    console.log(colour)
  }, [colour])

  const updateGroups = () => {
    console.log('props.groups', props.groups)
    if (colour) {
      console.log(props.groups)
      const groups = [...props.groups]
      groups.push(colour)
      props.setGroups(groups)
      console.log(colour)
      console.log(groups)
      setColour('')
      props.socket.emit('setGroups', { board: props.board, groups: groups })
    }
  }

  const setGroup = group => {
    console.log('selectGroup')
    console.log(group)
  }

  props.groups.forEach((group, key) => {
    ButtonsComponent.push(
      <Button key={key} style={{ background: group }} variant="Light" onClick={e => props.setGroup(group)}>Group {key+1}</Button>
    )
  })

  return (
    <Card className="actionsBoardCard fullHeight">
      <Card.Header>
        <h5 className="inlineBlock">Groups</h5>
      </Card.Header>
      <Card.Body>
        {/* <textarea className="textareaInput" onChange={(e) => updateActions(e.target.value)}  onClick={handleInput} value={props.groups}></textarea> */}
        <label>Select group colour:</label>
        <input type="color" id="favcolor" name="favcolor" value={colour} onChange={e => setColour(e.target.value)}/>
        <Button size="sm" variant="warning" title="Add Group" onClick={updateGroups}>
          Add Group <FontAwesomeIcon className="icon-thumb" icon={faLayerGroup} />
        </Button>
        <br/>
        <ButtonGroup vertical>
          {ButtonsComponent}
        </ButtonGroup>
      </Card.Body>
    </Card>
  )
}

GroupsColumn.propTypes = {
  showGroups: PropTypes.any,
  socket: PropTypes.any,
  groups: PropTypes.any,
  setGroups: PropTypes.any,
  setGroup: PropTypes.any,
  board: PropTypes.any
}

export default GroupsColumn
