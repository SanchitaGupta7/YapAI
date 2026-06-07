import "./Chat.css";
import {SyncLoader} from "react-spinners";
import {MyContext} from "./MyContext.jsx";
import { useContext, useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/atom-one-dark.css";

function Chat() {
  const {isLoading, newChat, prevChats, reply} = useContext(MyContext);
  const [latestReply, setLatestReply] = useState(null);

  // useEffect(()=>{
  //   if(!prevChats?.length)  return;
  //   const content = reply.split(" ");
  //   let idx= 0;
  //   const interval = setInterval(()=>{
  //     setLatestReply(content.slice(0, idx+1).join(" "));
  //     idx++;
  //     if(idx>=content.length) clearInterval(interval);
  //   },40)
  // }, [prevChats, reply])

useEffect(() => {
  if (!reply){
    setLatestReply(null);
    return;
  }
  const content = reply.split(" ");
  let idx = 0;
  setLatestReply(""); // reset before typing
  const interval = setInterval(() => {
    setLatestReply(content.slice(0, idx + 1).join(" "));
    idx++;

    if (idx >= content.length) {
      clearInterval(interval);
    }
  }, 40);
  return () => clearInterval(interval);
}, [reply]);

  return (
    <>
      {newChat&& <div className="container1"><h1>Any new ideas to explore?</h1></div>}
      {!newChat&&<div className="chats">
        <div style={{marginTop:"2rem"}}></div>
          {
            prevChats?.slice(0,-1).map((chat, idx)=>
              <div className={chat.role==="user"?"userDiv":"modelDiv"} key={idx}>
                {chat.role==="user"?
                  <p className="userMsg">{chat.message}</p>
                  :
                  <ReactMarkdown rehypePlugins={[rehypeHighlight]}>{chat.message}</ReactMarkdown>
                }
              </div>
            )
          }
          {
            prevChats.length>0&& latestReply!=null &&
            <div className="modelDiv" key={"typing"}>
              <ReactMarkdown rehypePlugins={[rehypeHighlight]}>{latestReply}</ReactMarkdown>
            </div>
          }
          {
            prevChats.length>0&& latestReply===null &&
            <div className="modelDiv" key={"non-typing"}>
              <ReactMarkdown rehypePlugins={[rehypeHighlight]}>{prevChats[prevChats.length-1].message}</ReactMarkdown>
            </div>
          }
          {
            isLoading&&
            <SyncLoader color={window.matchMedia('(prefers-color-scheme: dark)').matches?'white':'black'} className="loader" size={5} style={{marginBottom:"2rem", textAlign:"left"}} loading={isLoading}></SyncLoader>
          }
      </div>}
    </>
  )
}

export default Chat;
