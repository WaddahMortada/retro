import React, { useState, useEffect } from 'react'
import TemplateSelector from './TempleteSelector'
import { toTitleCase } from '../lib/helpers'

const App = props => {
  const [template, setTemplate] = useState()

  useEffect(() => {
    console.log(template)
  })

  if (!template) {
    return (
      <TemplateSelector setTemplate={setTemplate} />
    )
  }

  return (
    <div className="appContainer">
      <h1>Retro Tool</h1>
      <h3>{toTitleCase(template)}</h3>
      <button onClick={() => setTemplate()}>New Board</button>
    </div>
  )
}

export default App
