import React from 'react'
import PropTypes from 'prop-types'
import { Col } from 'react-bootstrap'
import Warrimoo from '../assets/warrimoo.gif'
import RetroooGta from '../assets/retroooo-gta-thick.png'

const Logo = props => {
  return (
    <Col className="justify-content-md-center" xs={ props.templateSelector ? 0 : 3 }>
      <img className="logo" src={RetroooGta} />
      <img className="logoImage" src={Warrimoo} />
    </Col>
  )
}

Logo.propTypes = {
  templateSelector: PropTypes.any
}

export default Logo
