import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Card, Button, Toast } from 'react-bootstrap'
import { exportActionsToPdf, useFocus } from '../lib/helpers'
import { faFileExport, faCopy } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const bullet = '\u2022'
const bulletWithSpace = `${bullet} `
const enter = 13
const backspace = 8

const ActionsColumn = props => {
  const [actionsRef, setActionsFocus] = useFocus()
  const [showNotification, setShowNotification] = useState(false)

  const toggleShowNotification = () => setShowNotification(!showNotification)

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
      if (keyCode !== backspace) {
        if (row === '') {
          return bulletWithSpace
        }
        if (!row.includes(bullet)) {
          return bulletWithSpace + row
        }
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

  const copyToClipboard = (e) => {
    actionsRef.current.select()
    document.execCommand('copy')
    e.target.focus()
    toggleShowNotification()
  }

  return (
    <Card className="actionsBoardCard fullHeight">
      <Toast className="actionsToasts" animation={true} show={showNotification} onClose={toggleShowNotification} delay={3000} autohide>
        <Toast.Header>
          <strong className="mr-auto">Copied to clipboard!</strong>
        </Toast.Header>
      </Toast>
      <Card.Header>
        <h5 className="inlineBlock">Actions</h5>
        <Button className="float-right" size="sm" variant="info" title="Export to PDF" onClick={() => exportActionsToPdf(props.actions)}>
          <FontAwesomeIcon className="icon-thumb" icon={faFileExport} />
        </Button>
        <Button className="float-right copy-button" size="sm" variant="copy" title="Copy to Clipboard" onClick={copyToClipboard}>
          <FontAwesomeIcon className="icon-thumb" icon={faCopy} />
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
