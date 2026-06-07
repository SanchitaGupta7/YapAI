import express from "express";
import Thread from "../models/Thread.js";
import getGeminiAPIResponse from "../utils/gemini.js";

const router = express.Router();

//Get all Threads
router.get("/thread", async (req, res) => {
  try {
    const threads = await Thread.find({}).sort({ updatedAt: -1 });
    res.json(threads);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to fetch threads." });
  }
});

router.get("/thread/:threadId", async (req, res) => {
  const { threadId } = req.params;
  try {
    const thread = await Thread.findOne({ threadId });
    if (!thread) {
      res.status(404).json({ error: "Thread not found." });
    }
    res.json(thread.messages);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to fetch chat." });
  }
});

router.delete("/thread/:threadId", async (req, res) => {
  const { threadId } = req.params;
  try {
    const deletedThread = await Thread.findOneAndDelete({ threadId });
    if (!deletedThread) {
      res.status(404).json({ error: "Thread not found." });
    }
    res.status(200).json({ success: "Thread deleted successfully." });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to delete thread." });
  }
});

router.post("/chat", async (req, res) => {
  const { threadId, message } = req.body;
  if (!threadId || !message) {
    return res.status(400).json({ error: "Missing required fields." });
  }
  try {
    let thread = await Thread.findOne({ threadId });
    if (!thread) {
      thread = new Thread({
        threadId,
        title: message,
        messages: [{ role: "user", content: message }],
      });
    } else {
      thread.messages.push({ role: "user", content: message });
    }
    const modelReply = await getGeminiAPIResponse(thread);
    thread.messages.push({ role: "model", content: modelReply });
    thread.updatedAt = new Date();
    await thread.save();
    res.json({ reply: modelReply });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Something wem=nt wrong." });
  }
});

router.use(express.raw({ type: "application/octet-stream", limit: "10mb" }));

router.post("/audio", async (req, res) => {
  if (!req.body || req.body.length === 0) {
    return res.status(400).json({ text: "No audio data received" });
  }
  const audioBuffer = req.body;
  try {
    const options = {
      method: "POST",
      headers: {
        Authorization: process.env.ASSEMBLY_API_KEY,
        "Content-Type": "application/octet-stream",
      },
      body: audioBuffer,
    };
    const uploadResponse = await fetch(
      "https://api.assemblyai.com/v2/upload",
      options,
    );
    const uploadData = await uploadResponse.json();
    const transcriptResponse = await fetch("https://api.assemblyai.com/v2/transcript", {
      method: "POST",
      headers: {
        Authorization: process.env.ASSEMBLY_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        audio_url: uploadData.upload_url,
      }),
    });
    let transcriptData = await transcriptResponse.json();
    
    const transcriptId = transcriptData.id;
    let status = transcriptData.status;
    while (status === "queued" || status === "processing") {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const checkResponse = await fetch(`https://api.assemblyai.com/v2/transcript/${transcriptId}`, {
        headers: { Authorization: process.env.ASSEMBLY_API_KEY },
      });
      transcriptData = await checkResponse.json();
      status = transcriptData.status;
    }
    if (status === "completed") {
      return res.json({ text: transcriptData.text });
    }else {
      return res.status(500).json({ error: "Transcription failed on AssemblyAI servers" });
    }
  } catch (err) {
    console.log(err);
    res.status(500);
  }
});

export default router;
