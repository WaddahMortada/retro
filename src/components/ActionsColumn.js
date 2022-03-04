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
  const [innerWidth, setInnerWidth] = useState(window.innerWidth)

  const updateInnerWidth = () => {
    setInnerWidth(window.innerWidth)
  }

  useEffect(() => {
    window.addEventListener('resize', updateInnerWidth)
  }, [])

  const toggleShowNotification = () => setShowNotification(!showNotification)

  useEffect(() => {
    const actions = { current: bulletWithSpace, previous: props.actions.previous}
    if (!props.actions.current) props.setActions(actions)
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

  const updateActions = (newActions, previousActions = false) => {
    const actions = previousActions ? { current: props.actions.current, previous: newActions } : { current: newActions, previous: props.actions.previous }
    props.setActions(actions)
    props.socket.emit('setActions', { board: props.board, actions: actions })
  }

  const copyToClipboard = (e) => {
    actionsRef.current.select()
    document.execCommand('copy')
    e.target.focus()
    toggleShowNotification()
  }

  return (
    <Card className="actionsBoardCard">
      <Toast className="actionsToasts" animation={false} show={showNotification} onClose={toggleShowNotification} delay={3000} autohide>
        <Toast.Header>
          <strong className="mr-auto">Notification</strong>
        </Toast.Header>
        <Toast.Body style={{ backgroundColor: '#3e6679', color: 'white' }}>
          Copied to clipboard!
        </Toast.Body>
      </Toast>
      <Card.Header>
        <h5 className="inlineBlock">Actions</h5>
        <Button className="float-right" size="sm" variant="info" title="Export to PDF" onClick={() => exportActionsToPdf(props.actions)}>
          {innerWidth > 1498 ? <b>PDF</b> : null} <FontAwesomeIcon className="icon-thumb" icon={faFileExport} />
        </Button>
        <Button className="float-right copy-button" size="sm" variant="copy" title="Copy to Clipboard" onClick={copyToClipboard}>
          {innerWidth > 1498 ? <b>Copy</b> : null} <FontAwesomeIcon className="icon-thumb" icon={faCopy} />
        </Button>
      </Card.Header>
      <Card.Body>
        <textarea className="textareaInput" ref={actionsRef} autoFocus={props.showActions} onChange={(e) => updateActions(e.target.value)} onKeyUp={handleInput} onClick={handleInput} value={props.actions.current}></textarea>
        <h6>Previous Actions:</h6>
        <textarea className="textareaInput" onChange={(e) => updateActions(e.target.value, true)} onKeyUp={handleInput} onClick={handleInput} value={props.actions.previous}></textarea>
      </Card.Body>
    </Card>
  )
}

ActionsColumn.propTypes = {
  showActions: PropTypes.any,
  socket: PropTypes.any,
  actions: PropTypes.any,
  setActions: PropTypes.any,
  board: PropTypes.any
}

export default ActionsColumn
