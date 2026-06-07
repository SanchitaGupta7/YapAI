import "./Sidebar.css";
import { useContext, useEffect } from "react";
import {MyContext} from "./MyContext.jsx";
import {v1 as uuid} from "uuid";

function Sidebar() {
  const {allThreads, setAllThreads, currThreadId, setNewChat, setPrompt, setReply, setCurrThreadId, setPrevChats} = useContext(MyContext);

  const deleteThread= async (e, threadId)=>{
    e.stopPropagation();
    try{
      if(!threadId) return;
      await fetch(`http://localhost:9090/api/thread/${threadId}`, {
        method:"DELETE"
      });
      setAllThreads(prev=>prev.filter(thread=>thread.threadId!==threadId));
      if(currThreadId===threadId)
        createNewChat();
    }catch(err){
      console.log(err);
    }
  }

  const changeThread= async (threadId)=>{
    setCurrThreadId(threadId);
    try{
      const response= await fetch(`http://localhost:9090/api/thread/${threadId}`);
      const res = await response.json();
      const formattedRes= res.map((msg)=>({role:msg.role, message:msg.content}))
      setPrevChats(formattedRes);
      setNewChat(false);
      setReply(null);
    }catch(err){
      console.log(err);
    }
  }

  const createNewChat= ()=>{
    setNewChat(true);
    setPrompt("");
    setReply(null);
    setCurrThreadId(uuid());
    setPrevChats([]);
  }

  const getAllThreads = async () => {
    try{
      const response = await fetch("http://localhost:9090/api/thread");
      const res = await response.json();
      const filteredRes = res.map(thread=>({threadId:thread.threadId, title:thread.title}));
      setAllThreads(filteredRes);
    }catch(err){
      console.log(err);
    }
  };

  useEffect(()=>{
    getAllThreads();
  },[currThreadId])

  return (
    <section className="sidebar">
      <div className="brand">
        <img className="logo" src="/logo.jpg" alt="logo"></img>
        <span><p>YapAI</p></span>
      </div>
      <div onClick={createNewChat} className="newChat">
        <span><i class="fa-regular fa-pen-to-square"></i></span>
        <span><p>New Chat</p></span>
      </div>

      <div className="recent">
        <p>Recent</p>
        <ul className="history">
          {
            allThreads?.map((thread, idx)=>{
              return <li className={thread.threadId===currThreadId?"highlighted":""} onClick={()=>{changeThread(thread.threadId)}} key={idx}>{thread.title.substring(0,19)}<i onClick={(e)=>{deleteThread(e, thread.threadId)}} class="fa-solid fa-trash"></i></li>
            })
          }
        </ul>
      </div>

      <div className="sign">
        <p>By Sanchita &hearts;</p>
      </div>
    </section>
  )
}

export default Sidebar;
