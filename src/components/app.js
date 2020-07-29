import React, { useState, useEffect } from 'react'
import TemplateSelector from './TempleteSelector'
import Board from './Board'
import { toTitleCase } from '../lib/helpers'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../style/style.css'
import { Container, Row, Col, Button, Navbar, Nav } from 'react-bootstrap'
import { faChalkboard } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Warrimoo from '../assets/warrimoo.gif'
import RetroooGta from '../assets/retroooo-gta-thick.png'
import '../assets/warrimoo.png'
import 'bootstrap/dist/css/bootstrap.min.css'
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
    <Container fluid className="appContainer">
      <Row>
        <Col>
          <Row className="justify-content-md-center">
            <img className="logoImage" src={Warrimoo} />
          </Row>
          <Row className="justify-content-md-center">
            <img className="logo" src={RetroooGta} />
          </Row>
        </Col>
      </Row>
      <Row className="nav">
        <Col>
          <Navbar className="navBar" bg="dark" variant="dark">
            <Nav className="mr-auto">
              <h5 className="navHeader">Template: {toTitleCase(template)}</h5>
            </Nav>
            <Button style={{ color: 'white', padding: '5px 10px' }} variant="warning" className="inlineBlock float-right" onClick={() => resetTemplate()}>
              <b>New Board</b> <FontAwesomeIcon className="icon-thumb" icon={faChalkboard} />
            </Button>
          </Navbar>
        </Col>
      </Row>
      <Board type={template} votes={votes} voteFunctions={{ upVote: upVote, downVote: downVote }} />
    </Container>
  )
}

export default App
