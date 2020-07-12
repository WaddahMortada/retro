import React, { useState, useEffect } from 'react'
import TemplateSelector from './TempleteSelector'
import Board from './Board'
import { toTitleCase } from '../lib/helpers'

const App = props => {
  const [template, setTemplate] = useState()
  const [voteLimit, setVoteLimit] = useState(5)

  useEffect(() => {
    console.log(template)
  })

  if (!template) {
    return (
      <TemplateSelector setTemplate={setTemplate} setVoteLimit={setVoteLimit} />
    )
  }

  return (
    <div className="appContainer">
      <h1>Retro Tool</h1>
      <h3>{toTitleCase(template)}</h3>
      <button onClick={() => setTemplate()}>New Board</button>
      <Board type={template} voteLimit={voteLimit} />
    </div>
  )
}

export default App
