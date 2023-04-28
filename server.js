import { createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
const port = 3000;
const supabaseUrl = "https://elgioqjgqpyxbmqiujvk.supabase.co";
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Add to LeaderBoard
app.post("/leaderboard", async (req, res) => {
  try {
    const input = req.body;
    const { data, error } = await supabase.from("leaderboard").insert(input);
    if (error) throw new Error(error);
    res.status(200).send(data[0]);
  } catch (error) {
    console.log(JSON.stringify(error));
    res.status(500).send(error);
  }
});

// Get LeaderBoard
app.get("/leaderboard", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("leaderboard")
      .select("name, score")
      .order("score", { ascending: false });
    if (error) throw new Error(error);
    res.send(data);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

////////////////////
// Start Server
///////////////////

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
