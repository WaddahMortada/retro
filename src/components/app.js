import React, { useState, useEffect } from 'react'
import TemplateSelector from './TempleteSelector'
import Board from './Board'
import { Container, Row, Col, Button, Navbar, Nav } from 'react-bootstrap'
import Warrimoo from '../assets/warrimoo.gif'
import RetroooGta from '../assets/retroooo-gta-thick.png'
import '../assets/warrimoo.png'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../style/style.css'

const App = props => {
  const [template, setTemplate] = useState('')
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
      {!template
        ? <TemplateSelector setTemplate={setTemplate} votes={votes} setVotes={setVotes} />
        : <Board type={template} votes={votes} voteFunctions={{ upVote: upVote, downVote: downVote }} resetBoard={() => setTemplate('')} />
      }
    </Container>
  )
}

export default App
