import React, { useState, useEffect } from 'react'
import TemplateSelector from './TempleteSelector'

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
      <button onClick={() => setTemplate()}>New Board</button>
    </div>
  )
}

export default App
