import React from 'react'
import { Col, Navbar, Nav } from 'react-bootstrap'
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Footer = () => {
  return (
    <Col style={{ width: '100%', position: 'fixed', margin: 'auto', left: 0, bottom: 0, padding: '10px' }}>
      <Navbar style={{ color: '#faf6db' }} className="navBar justify-content-center" bg="dark" variant="dark">
        <Nav>
          <Nav.Item>
            <Nav.Link href="https://github.com/WaddahMortada">
              GitHub <FontAwesomeIcon className="icon-thumb" icon={faGithub} />
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="https://www.linkedin.com/in/waddah-mortada">
              LinkedIn <FontAwesomeIcon className="icon-thumb" icon={faLinkedin} />
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </Navbar>
    </Col>
  )
}

export default Footer
