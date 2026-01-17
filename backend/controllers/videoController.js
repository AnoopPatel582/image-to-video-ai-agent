const cloudinary = require("../config/cloudinary");
const Replicate = require("replicate");

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

exports.uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No image uploaded" });
    }

    const stream = cloudinary.uploader.upload_stream(
      { resource_type: "image" },
      (error, result) => {
        if (error) {
          return res.status(500).json({ error: "Cloudinary upload failed" });
        }
        res.json({ imageUrl: result.secure_url });
      }
    );

    stream.end(req.file.buffer);
  } catch (err) {
    res.status(500).json({ error: "Image upload error" });
  }
};

exports.generateVideo = async (req, res) => {
  try {
    const { imageUrl, prompt, motion } = req.body;

    if (!imageUrl) {
      return res.status(400).json({ error: "Image URL missing" });
    }

    const videoStream = await replicate.run(
      "wan-video/wan-2.2-t2v-fast",
      {
        input: {
          image: imageUrl,
          prompt: prompt || "subtle natural motion",
          motion_style: motion || "slow",
        },
      }
    );

    const cloudinaryStream = cloudinary.uploader.upload_stream(
      { resource_type: "video" },
      (error, result) => {
        if (error) {
          console.error("Cloudinary error:", error);
          return res.status(500).json({ error: "Video upload failed" });
        }

        res.json({ videoUrl: result.secure_url });
      }
    );

    const reader = videoStream.getReader();

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      cloudinaryStream.write(Buffer.from(value));
    }

    cloudinaryStream.end();

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Video generation failed" });
  }
};

