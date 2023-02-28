import express from "express";
import { v2 as cloudinary } from "cloudinary";

import Post from "../mongodb/models/post.js";

const router = express.Router();

cloudinary.config({
  cloud_name: "dvo4ip4rg",
  api_key: "192395415264419",
  api_secret: "LJEeJ6KGOTyyN8EShnGSm-c8T-Y",
});

router.route("/").get(async (req, res) => {
  try {
    const posts = await Post.find({});
    res.status(200).json({ success: true, data: posts });
  } catch (err) {
    res
      .status(500)
      .json({
        success: false,
        message: "Fetching posts failed, please try again",
      });
  }
});

router.route("/").post(async (req, res) => {
  try {
    const { name, prompt, photo } = req.body;
    const photoUrl = await cloudinary.uploader.upload(photo);

    const newPost = await Post.create({
      name,
      prompt,
      photo: photoUrl.url,
    });

    res.status(200).json({ success: true, data: newPost });
  } catch (err) {
    res
      .status(500)
      .json({
        success: false,
        message: "Unable to create a post, please try again",
      });
  }
});

export default router;
