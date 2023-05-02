import express from "express";
import { MongoClient } from "mongodb";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();

app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.use(
  cors({
    origin: "*",
  })
);

const uri =
  "mongodb+srv://usn012y2018:facepay1@facepay.y1chyja.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);

app.post("/api/upload-image", async (req, res) => {
  const { userImages } = req.body;
  // const base64Image = userImages[0].split(";base64,").pop();
  // const imageBuffer = Buffer.from(base64Image, "base64");

  try {
    await client.connect();
    const database = client.db("facepay");
    const collection = database.collection("images");
    for (let i = 0; i < userImages.length; i++) {
      const base64Image = userImages[i];
      console.log("uploading", base64Image);
      await collection.insertOne({ img: base64Image, user_id: "Darshan" });
    }
    await client.close();
    console.log("added...");
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

app.listen(5000, () => {
  console.log("Server listening on port 5000");
});
