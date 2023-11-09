import React, { useEffect, useState } from 'react'
import { Card, Container, Divider, Form, Icon, Message} from 'semantic-ui-react'
import ScrollToBottom from 'react-scroll-to-bottom'

const Chat = ({socket,username,room}) => {
  const [currentMessage,setCurrentMessages]=useState("")
  const [messagesList,setMessagesList]=useState([])

  const styles ={
    
    cont:{
      
      position: "fixed",
      top: "50px",
      width: "400px"
    },
    car :{
      height:"300px"
    }
  }

  const sendMessage = async() =>{
    if (username && currentMessage) {
      const info={
        message: currentMessage,
        room,
        author: username,
        time: new Date(Date.now()).getHours() +
        ":" + new Date(Date.now()).getMinutes(),
      }
      await socket.emit("send_message",info)
        setMessagesList((list)=>[...list,info])
        setCurrentMessages("")
    }
  }

  useEffect(()=>{
    const messageHandle = (data) =>{
      setMessagesList((list)=>[...list,data])
    }
    socket.on("receive_message", messageHandle)
    return () => socket.off("receive_message", messageHandle)
  },[socket])

  return (
    <Container style={styles.cont}>
      <Card fluid>
    <Card.Content header={`Live Chat | Room:${room}`}/>
    <ScrollToBottom>
      <Card.Content style={styles.car}>
          {messagesList.map((item, i)=>{
          return <span key={i}>
              <Message 
              style={{textAlign:username==item.author?'right':'left', }}
              success={username == item.author}
              info={username != item.author}
              >
              <Message.Header>{item.message}</Message.Header>
              <p style={{color:"#000"}}>Enviado por: <strong style={{color:"#000"}}>{item.author}</strong>, a las {""} <i style={{color:"#000"}}>{item.time}</i></p>
              
            </Message>
            <Divider/>
                </span>
        })
        }
      </Card.Content> 
    </ScrollToBottom>
    <Card.Content extra>
      <Form>
    <Form.Field>
      <div className='ui action input'>
      <input
        value={currentMessage}  
        type="text" 
        placeholder='Mensaje...'
        onChange={(e)=>setCurrentMessages(e.target.value)}
        onKeyUp={(e)=>{
          if (e.key == "Enter") {
              sendMessage()
          }
        }}
      />
      <button type='button'
              className='ui icon right labeled button' 
              style={{background: "#39ff14",color:"#000"}} 
          onClick={() =>sendMessage()}>
        <Icon name='send' style={{color:"#000"}} />
        Enviar
      </button>
      </div>
    </Form.Field>
    </Form>
    </Card.Content>
  </Card>
    </Container>
  )
}

export default Chat