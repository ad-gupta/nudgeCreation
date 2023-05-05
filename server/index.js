import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import multer from "multer";
import dotenv from "dotenv";
import wireFrame from "./models/nudgeModel.js";
import path from "path";
const dirname = path.resolve();
const app = express();

app.use(cors());
dotenv.config();
app.use(express.json());

const connectDB = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("Connected to DB");
    })
    .catch((err) => {
      console.log(err);
    });
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, dirname + "/uploads/");
  },
  filename: (req, file, cb) => {
    const filename = `${file.fieldname}${Date.now()}${path.extname(
      file.originalname
    )}`; // Create custom filename
    cb(null, filename);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1048576, // = 1 Mb
  },
});

app.post("/upload", upload.any(), async (req, res) => {
  try {
    const { tag, title, ScheduledDate, ScheduledTime, desc, invitationLine } =
      req.body;
    const imgArr = req.files;
    const coverNudgeimg = imgArr[0].filename;
    const iconImg = imgArr[1].filename;

    const result = await wireFrame.create({
      tag,
      title,
      ScheduledDate,
      ScheduledTime,
      desc,
      invitationLine,
      coverNudgeimg,
      iconImg,
    });
    res.json(result)
  } catch (err) {
    console.log(err);
  }
});

app.listen(8000, () => {
  connectDB();
  console.log("server is running");
});
