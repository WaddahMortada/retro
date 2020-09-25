import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'react-bootstrap'
import { faUserCog } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const AdminSelector = props => {
  const toggleAdmin = () => {
    console.log('toggleAdmin', props.admin)
    props.setAdmin(!props.admin)
  }

  const toggleText = props.admin ? 'Disclaim' : 'Claim'

  return (
    <Button style={{ padding: '5px 10px', margin: '0px 10px', fontSize: '17px' }} className="float-right" size="sm" variant="admin" title={`${toggleText} Admin Rights`} onClick={toggleAdmin}>
      <b>{toggleText} Admin</b> <FontAwesomeIcon className="icon-thumb" icon={faUserCog} />
    </Button>
  )
}

AdminSelector.propTypes = {
  admin: PropTypes.any,
  setAdmin: PropTypes.any
}

export default AdminSelector
