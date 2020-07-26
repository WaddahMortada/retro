import React, { useState, useEffect } from 'react'
import TemplateSelector from './TempleteSelector'
import Board from './Board'
import { toTitleCase } from '../lib/helpers'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../style/style.css'
import { Container, Row, Col, Button, Navbar, Nav } from 'react-bootstrap'
import Warrimoo from '../assets/warrimoo.gif'

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
            <h1>Retroooo Tool</h1><img style={{ paddingLeft: '20px', width: '80px', height: '45px' }} src={Warrimoo} />
          </Row>
        </Col>
      </Row>
      <Row>
        <Col>
          <Navbar bg="dark" variant="dark">
            <Nav className="mr-auto">
              <h5 className="inlineBlock">Template: {toTitleCase(template)}</h5>
            </Nav>
            <Button variant="warning" className="inlineBlock float-right" onClick={() => resetTemplate()}>New Board</Button>
          </Navbar>
        </Col>
      </Row>
      <Board type={template} votes={votes} voteFunctions={{ upVote: upVote, downVote: downVote }} />
    </Container>
  )
}

export default App
