import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Card, Button, ButtonGroup } from 'react-bootstrap'
import { faRedoAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const GroupsColumn = props => {
  return (
    <ButtonGroup>
      <Button size="lg" style={{ background: '#ffffff' }} variant="Light" onClick={e => props.setGroup('#ffffff')} />
      <Button size="lg" style={{ background: '#2acce5' }} variant="Light" onClick={e => props.setGroup('#2acce5')} />
      <Button size="lg" style={{ background: '#70ffb5' }} variant="Light" onClick={e => props.setGroup('#70ffb5')} />
      <Button size="lg" style={{ background: '#f7e031' }} variant="Light" onClick={e => props.setGroup('#f7e031')} />
      <Button size="lg" style={{ background: '#ffae2e' }} variant="Light" onClick={e => props.setGroup('#ffae2e')} />
      <Button size="lg" style={{ background: '#ff664f' }} variant="Light" onClick={e => props.setGroup('#ff664f')} />
      <Button size="lg" style={{ background: '#ff8ed4' }} variant="Light" onClick={e => props.setGroup('#ff8ed4')} />
      <Button title="Reset Selected Group" style={{ background: '#faf6db', color: '#000' }} variant="Light" onClick={e => props.setGroup('')} >
        <FontAwesomeIcon className="icon-thumb" icon={faRedoAlt} />
      </Button>
    </ButtonGroup>
  )
}

GroupsColumn.propTypes = {
  setGroup: PropTypes.any
}

export default GroupsColumn
