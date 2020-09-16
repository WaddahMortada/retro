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
  const [id, setId] = useState()
  // const [template, setTemplate] = useState('mad_sad_glad')
  const [template, setTemplate] = useState('')
  const [votes, setVotes] = useState({ limit: 5, total: 0, disable: false })
  const [columns, setColumns] = useState([{ title: '', cards: [{ value: '', totalCardVotes: 0, id: ''  }] }])

  // Handling Socket Events
  props.socket.on('join', data => {
    console.log('join', data)
    setId(data.id)

    // Getting state from server
    if (data.state.template && data.state.template !== template) {
      setTemplate(data.state.template)
    }

    if (data.state.votes && data.state.votes.limit !== votes.limit) {
      data.state.votes.total = votes.total
      setVotes(data.state.votes)
    }

    if (data.state.columns && data.state.columns !== columns) {
      setColumns(data.state.columns)
    }

    // Sending current state to server
    if (!data.state.template && template) {
      props.socket.emit('setTemplate', template)
      props.socket.emit('setVotes', votes)
    }
  })

  props.socket.on('setTemplate', (newTemplate) => {
    if (newTemplate !== template) {
      setTemplate('')
      setTemplate(newTemplate)
    }
  })

  props.socket.on('setVotes', (newVotes) => {
    if (newVotes !== votes) setVotes(newVotes)
  })

  // props.socket.on('setColumns', (newColumns) => {
  //   if (newColumns !== columns) setColumns(newColumns)
  // })

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

  useEffect(() => {
    const columnsTitle = template !== 'blank_board' ? template.split('_') : []
    const columnsObjects = []
    columnsTitle.forEach(title => {
      columnsObjects.push({ title: title, cards: [] })
    })
    setColumns(columnsObjects)
  }, [template])

  // useEffect(() => {
  //   props.socket.emit('setColumns', columns)
  // }, [columns])

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
        : <Board type={template} votes={votes} voteFunctions={{ upVote: upVote, downVote: downVote }} resetBoard={resetBoard} socket={props.socket} columns={columns} setColumns={setColumns} id={id} />
      }
    </Container>
  )
}

Dashboard.propTypes = {
  socket: PropTypes.any
}

export default Dashboard
