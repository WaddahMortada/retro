import React, { useState, useEffect } from 'react'
import TemplateSelector from './TempleteSelector'
import Board from './Board'
import { toTitleCase } from '../lib/helpers'
import '../style/style.css'

const App = props => {
  const [template, setTemplate] = useState()
  const [votes, setVotes] = useState({ limit: 5, total: 0, disable: false })

  const upVote = () => {
    if (votes.total < votes.limit) {
      votes.total = votes.total + 1
      setVotes({ ...votes })
    }
  }

  const downVote = () => {
    if (votes.total > 0) {
      votes.total = votes.total - 1
      setVotes({ ...votes })
    }
  }

  useEffect(() => {
    if (votes.total >= votes.limit) {
      votes.disable = true
      setVotes({ ...votes })
    } else {
      votes.disable = false
      setVotes({ ...votes })
    }
  }, [votes.total, votes.limit]) // eslint-disable-line react-hooks/exhaustive-deps

  const resetTemplate = () => {
    if (window.confirm('Are you sure you want to clear current board?')) setTemplate()
  }

  if (!template) {
    return (
      <div className="appContainer">
        <TemplateSelector setTemplate={setTemplate} votes={votes} setVotes={setVotes} />
      </div>
    )
  }

  return (
    <div className="appContainer">
      <h1>Retro Tool</h1>
      <h3 className="inlineBlock">{toTitleCase(template)}</h3>
      <button className="inlineBlock floatRight" onClick={() => resetTemplate()}>New Board</button>
      <Board type={template} votes={votes} voteFunctions={{ upVote: upVote, downVote: downVote }} />
    </div>
  )
}

export default App
