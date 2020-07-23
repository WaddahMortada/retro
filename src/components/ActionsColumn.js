import React, { useState } from 'react'

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

    // Save the changes in the state
    setActions(target.value)
  }

  return (
    <div className="column">
      <h3 className="inlineBlock">Actions</h3>
      <div>
        <textarea onBlur={() => console.log('Blur: ', actions)} onKeyUp={handleInput} rows="5">{actions}</textarea>
      </div>
    </div>
  )
}

export default ActionsColumn
