import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Add = props => {
  const [title, setTitle] = useState('')

  const submit = (event) => {
    event.preventDefault()
    props.columns.push({ title: title, cards: [] })
    props.setColumns([...props.columns])
    setTitle('')
  }
  return (
    <form onSubmit={submit}>
      <input type="text" autoFocus onChange={(e) => setTitle(e.target.value)} value={title} />
      <input type="submit" value="Submit" />
      <button onClick={props.closeModule}>Close</button>
    </form>
  )
}

Add.propTypes = {
  columns: PropTypes.any,
  setColumns: PropTypes.any,
  closeModule: PropTypes.any
}

export default Add
