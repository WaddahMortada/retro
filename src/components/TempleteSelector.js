import React from 'react'
import PropTypes from 'prop-types'

const TemplateSelector = props => {
  return (
    <div id="templateOptions">
      <h2>Please Select a template for your new reto board:</h2>
      <ul>
        <li onClick={() => props.setTemplate('mad_sad_glad')}><h4>Mad Sad Glad</h4></li>
        <li onClick={() => props.setTemplate('start_stop_continue')}><h4>Start Stop Continue</h4></li>
        <li onClick={() => props.setTemplate('liked_learnt_lacked')}><h4>Liked Learnt Lacked</h4></li>
      </ul>
    </div>
  )
}

TemplateSelector.propTypes = {
  setTemplate: PropTypes.any
}

export default TemplateSelector
