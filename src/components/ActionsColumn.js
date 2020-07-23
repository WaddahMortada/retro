import React, { useState } from 'react'

const ActionsColumn = props => {
  const [actions, setActions] = useState([])

  const addAction = (e) => {
    setActions([...actions, ''])
  }

  const Actions = []

  actions.forEach((action, key) => {
    Actions.push(<li key={key}>{action}</li>)
  })

  return (
    <div className="column">
      <h3 className="inlineBlock">Actions</h3>
      <button className="addCardButton" onClick={() => addAction()}>+</button>
      <ul onChange={(e) => console.log(e)} contentEditable="true" suppressContentEditableWarning={true}>
        {Actions}
      </ul>
    </div>
  )
}

export default ActionsColumn
