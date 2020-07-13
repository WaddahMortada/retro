import React, { useState } from 'react'
import PropTypes from 'prop-types'

const TemplateSelector = props => {
  const [voteLimit, setVoteLimit] = useState(5)
  const [template, setTemplate] = useState()

  const create = () => {
    event.preventDefault()
    props.setTemplate(template)
    props.votes.limit = voteLimit
    props.setVotes({ ...props.votes })
  }

  return (
    <div id="templateOptions">
      <h2>Create Board</h2>
      <form onSubmit={create}>
        <h3>Template</h3>
        <select onChange={(e) => setTemplate(e.target.value)} value={template} required>
          <option value=""></option>
          <option value="mad_sad_glad">Mad Sad Glad</option>
          <option value="start_stop_continue">Start Stop Continue</option>
          <option value="liked_learnt_lacked">Liked Learnt Lacked</option>
        </select>
        <h3>Max votes per user (whole board)</h3>
        <input type="number" min="1" step="1" pattern="\d+" value={voteLimit} onChange={(e) => setVoteLimit(e.target.value)} required />
        <input type="submit" value="Create"/>
      </form>
    </div>
  )
}

TemplateSelector.propTypes = {
  setTemplate: PropTypes.any,
  setVotes: PropTypes.any,
  votes: PropTypes.any
}

export default TemplateSelector
