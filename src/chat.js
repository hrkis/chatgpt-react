import React, {  useState } from 'react';
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: '',
});

const openai = new OpenAIApi(configuration);

function ChatGPTComponent() {

  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
 
  async function handleInputChange(event) {
    setInput(event.target.value);
  }

   
    const sendRequestToOpenAI = async(e) => {
    
   
    const chatResponse = await openai.createChatCompletion({
        "model": "GIVE_MODEL", // Give here the Model to fetch the response
        "messages": messages, 
        "n": 1, 
        "max_tokens": 250,
    })
    setInput('');
    console.log("messages ",messages);
    console.log("chatResponse ",chatResponse)
  
    let messagesVar = JSON.parse(JSON.stringify(messages)) ;
    messagesVar.push(chatResponse.data.choices[0].message);
    console.log(messagesVar)
    setMessages(messagesVar);
   }
 
  const checkSubmit = (e) => {  
    if(e.key === 'Enter') {
      let messagesVar = messages;
      messagesVar.push({
          "role": "user",
          "content": input
      })
      setMessages(messagesVar);
      setInput('');
      sendRequestToOpenAI();        
    }
  }


  return (
    <div style={{width: "100%", border: '1px solid'}}>
      <div style={{textAlign: 'center'}}><b>ChatGPT With ReactJS </b></div>
    <div style={{margin:0, padding:0, minHeight:'560px' ,  height:'560px', overflow:'auto'} }>


{
messages.map((m)=>{

  if(m.role == 'assistant') {
         return (
          <div class="chat-container-box darker-background">
            <img src="./images/assistant.png" alt='Assist' />
            <p>{m.content}</p>
          </div>
          )
      }
      else {
        return (
          <div class="chat-container-box ">
            <img src="./images/user.png" alt='User' className='right'/>
            <p className='text-right'>{m.content}</p>
          </div>
        )
      }
    }
)}



   
    </div>
    <div style={{marginTop:'5px'}}>
      <input style={{ width:"100%",height:'40px'}} type="text" placeholder='Type text here'  value={input} onKeyDown={(e)=> checkSubmit(e)} onChange={handleInputChange} />
    </div>
  </div>
  );
}

export default ChatGPTComponent;