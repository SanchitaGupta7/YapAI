import express from "express";
import "dotenv/config";
import cors from "cors";
import mongoose from "mongoose";
import chatRoutes from "./routes/chat.js";

const app = express();
const PORT = 9090;

app.use(cors());
app.use(express.json());
app.use('/audio', express.raw({ type: 'application/octet-stream', limit: '10mb' }));
app.use("/api", chatRoutes);

const connectDB = async() => {
  try{
    await mongoose.connect(process.env.MONGO_URL);
    console.log("DB Connected.");
  }catch(err) {
    console.log("Failed to connect with DB. ",err);
  }
}

// app.post("/test", async (req, res) => {
//   const options = {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       contents: [{ role: "user", parts: [{ text: req.body.message }] }],
//     }),
//   };
//   try {
//     const response = await fetch(
//       `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GOOGLE_API_KEY}`,
//       options,
//     );
//     const data = await response.json();
//     //console.log(data.candidates[0].content.parts[0].text);
//     res.send(data.candidates[0].content.parts[0].text);
//   } catch (err) {
//     console.log(err);
//   }
// });



app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}.`);
  connectDB();
});
