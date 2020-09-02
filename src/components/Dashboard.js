import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import TemplateSelector from './TempleteSelector'
import Board from './Board'
import { Container, Row, Col } from 'react-bootstrap'
import Warrimoo from '../assets/warrimoo.gif'
import RetroooGta from '../assets/retroooo-gta-thick.png'
import '../assets/warrimoo.png'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../style/style.css'

const Dashboard = props => {
  const [template, setTemplate] = useState('')
  const [votes, setVotes] = useState({ limit: 5, total: 0, disable: false })

  // useEffect(() => {
  //   props.socket.emit('setTemplate', template)
  //   props.socket.emit('setVotes', votes)
  // }, [])

  // props.socket.on('templateState', (templateState) => {
  //   console.log('templateState', templateState)
  //   setTemplate(templateState)
  // })

  // props.socket.on('votesState', (votesState) => {
  //   console.log('votesState', votesState)
  //   setVotes(votesState)
  // })

  props.socket.on('setTemplate', (newTemplate) => {
    console.log('setTemplatet', newTemplate)
    setTemplate('')
    setTemplate(newTemplate)
  })

  props.socket.on('setVotes', (newVotes) => {
    console.log('setVotes', newVotes)
    setVotes(newVotes)
  })

  props.socket.off('setTemplate', template)
  props.socket.off('setVotes', votes)

  const resetBoard = () => {
    setTemplate('')
    setVotes({ limit: 5, total: 0, disable: false })
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
    votes.disable = votes.total >= votes.limit
    setVotes({ ...votes })
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
        ? <TemplateSelector setTemplate={setTemplate} votes={votes} setVotes={setVotes} socket={props.socket} />
        : <Board type={template} votes={votes} voteFunctions={{ upVote: upVote, downVote: downVote }} resetBoard={resetBoard} socket={props.socket} />
      }
    </Container>
  )
}

Dashboard.propTypes = {
  socket: PropTypes.any
}

export default Dashboard
