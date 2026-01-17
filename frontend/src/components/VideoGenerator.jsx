import { useState } from "react";
import { uploadImage, generateVideo } from "../services/api";


function VideoGenerator() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [prompt, setPrompt] = useState("");
  const [motion, setMotion] = useState("slow");
  // const [imageUrl, setImageUrl] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [processing, setProcessing] = useState(false);




  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleGenerate = async () => {
    if (!image) return;

    try {
      setProcessing(true);

      // 1️⃣ Upload image to Cloudinary
      const uploadResponse = await uploadImage(image);
      const uploadedImageUrl = uploadResponse.imageUrl;
      setImageUrl(uploadedImageUrl);

      // 2️⃣ Generate video using image URL
      const videoResponse = await generateVideo({
        imageUrl: uploadedImageUrl,
        prompt,
        motion,
      });

      setVideoUrl(videoResponse.videoUrl);
    } catch (error) {
      console.error("Generation failed:", error);
    } finally {
      setProcessing(false);
    }
  };


  return (
    <div style={{ maxWidth: "400px" }}>
      {/* Image Upload */}
      <input type="file" accept="image/*" onChange={handleImageChange} />

      {/* Image Preview */}
      {preview && (
        <img
          src={preview}
          alt="Preview"
          style={{ width: "100%", marginTop: "10px" }}
        />
      )}

      <br /><br />

      {/* Motion Prompt */}
      <input
        type="text"
        placeholder="Describe motion (e.g. wind blowing)"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        style={{ width: "100%", padding: "8px" }}
      />

      <br /><br />

      {/* Motion Style Dropdown */}
      <select
        value={motion}
        onChange={(e) => setMotion(e.target.value)}
        style={{ width: "100%", padding: "8px" }}
      >
        <option value="slow">Slow</option>
        <option value="cinematic">Cinematic</option>
        <option value="dynamic">Dynamic</option>
      </select>

      <br /><br />

      <button onClick={handleGenerate} disabled={processing || !image}>
        {processing ? "Generating Video..." : "Generate Video"}
      </button>

      {videoUrl && (
        <video
          src={videoUrl}
          controls
          autoPlay
          loop
          style={{ width: "100%", marginTop: "15px" }}
        />
      )}

    </div>
  );
}

export default VideoGenerator;
