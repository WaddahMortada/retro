import React from 'react'
import { Col, Navbar, Nav } from 'react-bootstrap'
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Footer = () => {
  return (
    <Navbar fixed="bottom" style={{ color: '#faf6db', bottom: 0, height: '7%' }} className="navBar justify-content-center" bg="dark" variant="dark">
        <Nav>
          <Nav.Item>
            <Nav.Link className="footerLink" href="https://github.com/WaddahMortada">
              GitHub <FontAwesomeIcon className="icon-thumb" icon={faGithub} />
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link className="footerLink" href="https://www.linkedin.com/in/waddah-mortada">
              LinkedIn <FontAwesomeIcon className="icon-thumb" icon={faLinkedin} />
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </Navbar>
  )
}

export default Footer
