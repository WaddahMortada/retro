import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Card, Button } from 'react-bootstrap'
import { exportActionsToPdf, useFocus } from '../lib/helpers'
import { faFileExport } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const bullet = '\u2022'
const bulletWithSpace = `${bullet} `
const enter = 13

const ActionsColumn = props => {
  const [actionsRef, setActionsFocus] = useFocus()

  useEffect(() => {
    if (!props.actions) props.setActions(bulletWithSpace)
  }, [])

  useEffect(() => {
    setActionsFocus(props.showActions)
  }, [props.showActions])

  const handleInput = event => {
    const { keyCode, target } = event
    const selectionStart = target.selectionStart

    target.value = target.value.split('\n').map(row => {
      if (row === '') {
        return bulletWithSpace
      }
      if (!row.includes(bullet)) {
        return bulletWithSpace + row
      }
      return row
    }).join('\n')

    if (keyCode === enter) {
      // Update the select position
      target.selectionStart = selectionStart + bulletWithSpace.length
      target.selectionEnd = selectionStart + bulletWithSpace.length
    }
  }

  const updateActions = newActions => {
    props.setActions(newActions)
    props.socket.emit('setActions', newActions)
  }

  return (
    <Card className="actionsBoardCard fullHeight">
      <Card.Header>
        <h5 className="inlineBlock">Actions</h5>
        <Button className="float-right" size="sm" variant="info" title="Export to PDF" onClick={() => exportActionsToPdf(props.actions)}>
          <FontAwesomeIcon className="icon-thumb" icon={faFileExport} />
        </Button>
      </Card.Header>
      <Card.Body>
        <textarea className="textareaInput" ref={actionsRef} autoFocus={props.showActions} onChange={(e) => updateActions(e.target.value)} onKeyUp={handleInput} onClick={handleInput} value={props.actions}></textarea>
      </Card.Body>
    </Card>
  )
}

ActionsColumn.propTypes = {
  showActions: PropTypes.any,
  socket: PropTypes.any,
  actionsData: PropTypes.any,
  actions: PropTypes.any,
  setActions: PropTypes.any
}

export default ActionsColumn
