import React from 'react'
import PropTypes from 'prop-types'
import { Col } from 'react-bootstrap'
import Warrimoo from '../assets/warrimoo.gif'
import RetroooGta from '../assets/retroooo-gta-thick.png'

const Logo = props => {
  return (
    <Col md={4} >
      <div className="center">
        <a href="/">
          <img className="logo" src={RetroooGta} />
          <img className="logoImage" src={Warrimoo} />
        </a>
      </div>
    </Col>
  )
}

Logo.propTypes = {
  templateSelector: PropTypes.any
}

export default Logo
