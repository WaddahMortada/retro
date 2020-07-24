import React, { useState } from 'react'
import Col from 'react-bootstrap/Col'

const bullet = '\u2022'
const bulletWithSpace = `${bullet} `
const enter = 13

const ActionsColumn = props => {
  const [actions, setActions] = useState()

  const handleInput = (event) => {
    const { keyCode, target } = event
    const { selectionStart, value } = target

    if (keyCode === enter) {
      // Add bullet point to the end (new line)
      target.value = [...value].map((char, i) => {
        return (i === selectionStart - 1) ? `\n${bulletWithSpace}` : char
      }).join('')

      // Update the select position
      target.selectionStart = selectionStart + bulletWithSpace.length
      target.selectionEnd = selectionStart + bulletWithSpace.length
    }

    if (value[0] !== bullet) {
      target.value = `${bulletWithSpace}${value}`
    }
  }

  return (
    <Col>
      <h5 className="inlineBlock">Actions</h5>
      <div>
        <textarea className="actionsList" onBlur={() => console.log('Blur: ', actions)} onChange={(e) => setActions(e.target.value)} onKeyUp={handleInput} rows="5" value={actions}></textarea>
      </div>
    </Col>
  )
}

export default ActionsColumn
