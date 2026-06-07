import { useContext, useEffect, useState } from "react";
import Chat from "./Chat.jsx";
import "./ChatWindow.css";
import {MyContext} from "./MyContext.jsx";
import {ScaleLoader} from "react-spinners";

let mediaRecorder, localStream;

function ChatWindow() {
  const {prompt, setPrompt, reply, setReply, currThreadId, setIsLoading, newChat, setNewChat, prevChats, setPrevChats} = useContext(MyContext);

  const [startBtn, setStartBtn] = useState(true);
  const [stopBtn, setStopBtn] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

  const startAudio= async ()=>{
    setIsRecording(true);
    setStartBtn(false);
    setStopBtn(true);
    let audioChunks = [];
    try {
      localStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder = new MediaRecorder(localStream);

      mediaRecorder.ondataavailable = e => {
        if (e.data.size > 0) audioChunks.push(e.data);
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
        const response = await fetch("https://yapaibackend.onrender.com/audio", {
            method: "POST",
            headers: { "Content-Type": "application/octet-stream" },
            body: audioBlob
        });
        const data = await response.json();
        setPrompt(prompt+data.text);
      }
    }catch(err){
      console.log(err);
    }
    mediaRecorder.start();
  }

  const stopAudio=()=>{
    setIsRecording(false);
    setStartBtn(true);
    setStopBtn(false);
    mediaRecorder.stop();
    localStream.getTracks().forEach(track => track.stop());
  }

  const getReply = async () => {
    if(newChat) setNewChat(false);
    setIsLoading(true);
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: prompt,
        threadId: currThreadId
      })
    };
    try {
      const response = await fetch("https://yapaibackend.onrender.com/chat", options);
      const res = await response.json();
      setReply(res.reply);
    }catch(err) {
      console.log(err);
    }
    setIsLoading(false);
  }

  useEffect(()=>{
    if(prompt&&reply){
      setPrevChats(prevChats=>([...prevChats,{role: "user", message: prompt},{role: "model", message: reply}]))
    }
    setPrompt("");
  },[reply]);

  return (
    <div className="chatWindow">
      <Chat></Chat>
      <div className="chatInput">
        <div className="inputBox">
          {!isRecording&&<input placeholder="Ask YapAI" value={prompt} onChange={(e)=>setPrompt(e.target.value)} onKeyDown={(e)=>{e.key==='Enter'? getReply():''}}></input>}
          {isRecording&&<ScaleLoader color={window.matchMedia('(prefers-color-scheme: dark)').matches?'white':'black'}   loader={isRecording} width={15} height={20} barCount={15} className="scaleLoader" />}
          <div id="submit" >
            {startBtn&&<i className="fa-solid fa-microphone" onClick={startAudio}></i>}
            {stopBtn&&<i class="fa-solid fa-stop" onClick={stopAudio}></i>}
            <i onClick={getReply} className="fa-solid fa-circle-up" style={{color:"#1f3b9b"}}></i></div>
        </div>
        {!newChat&&<p className="info">YapAI is AI and can make mistakes.</p>}
      </div>
    </div>
  )
}

export default ChatWindow;
