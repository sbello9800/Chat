import { useState } from 'react'
import io from 'socket.io-client'
import Chat from './components/Chat'
import { Container, Card, Icon, Form, Button } from 'semantic-ui-react'
import ParticleBg from './components/particleBg'
import './styles/style.css'



const socket = io.connect("http://localhost:3001")

const styles ={
  body:{
    position: "relative",
    width: "300px",
    height: "400px",

  },
  cont:{
    position: "fixed",
    width: "300px",
    height: "310px",
    margin: "auto",
    top: "0",
    left: "0",
    right: "0",
    bottom: "0",
    background:"transparent",
    
  },
  liryc:{
    color: "#fff",
    
  },
  button:{
    alignitems: "center",
    width:"100px",
  }

}

function App() {
  const [username, setUsername] = useState("")
  const [room, setRoom] = useState("")
  const [showChat, setShowChat] = useState(false)

  const joinRoom = () =>{
    if (username !== "" && room !== "") {
      socket.emit("join_room",room)
      setShowChat(true)
    }
  }

  return (

    <Container style={styles.body}>
      <ParticleBg/>
{
!showChat?
<Card style={styles.cont}>
<div className='header'>
  Join
</div>
<Card.Content>
<Form >
    <Form.Field >
      <label style={styles.liryc}>Username</label>
      <input 
      type="text" 
      placeholder='Name...' 
      onChange={e=>setUsername(e.target.value)}
      />
    </Form.Field>
    <Form.Field>
      <label style={styles.liryc}>Room</label>
      <input 
      type="text" 
      placeholder='ID Sala...' 
      onChange={e=>setRoom(e.target.value)}
      />
    </Form.Field>
    <Button onClick={joinRoom} inverted='white' color='green' style={styles.button} >Join</Button>
</Form>
</Card.Content>
<Card.Content extra style={styles.liryc} >
<Icon name='user' /> 4 Friends
</Card.Content>
</Card>
:
<Chat socket={socket} username={username} room={room}/>}
    </Container>
  )
}

export default App
