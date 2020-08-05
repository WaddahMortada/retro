import React, { useState, useEffect } from 'react'
import TemplateSelector from './TempleteSelector'
import Board from './Board'
import { toTitleCase } from '../lib/helpers'
import { Container, Row, Col, Button, Navbar, Nav } from 'react-bootstrap'
import { faChalkboard } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Warrimoo from '../assets/warrimoo.gif'
import RetroooGta from '../assets/retroooo-gta-thick.png'
import '../assets/warrimoo.png'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../style/style.css'

const App = props => {
  const [template, setTemplate] = useState('')
  const [votes, setVotes] = useState({ limit: 5, total: 0, disable: false })

  const resetBoard = () => {
    if (window.confirm('Are you sure you want to clear current board?')) {
      setTemplate('')
    }
  }

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

  const TemplateCompnent = <TemplateSelector setTemplate={setTemplate} votes={votes} setVotes={setVotes} />

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
              <h5 className="navHeader">Template: </h5> &nbsp; <p className="navHeader">{template ? toTitleCase(template) : 'Unset!'}</p>
            </Nav>
            <Button style={{ color: 'white', padding: '5px 10px' }} variant="warning" className="inlineBlock float-right" onClick={resetBoard} disabled={(!template) ? true : false}>
              <b>New Board</b> <FontAwesomeIcon className="icon-thumb" icon={faChalkboard} />
            </Button>
          </Navbar>
        </Col>
      </Row>
      {!template
        ? TemplateCompnent
        : <Board type={template} votes={votes} voteFunctions={{ upVote: upVote, downVote: downVote }} />
      }
    </Container>
  )
}

export default App
