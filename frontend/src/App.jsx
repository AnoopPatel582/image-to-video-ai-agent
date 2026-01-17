import { useState } from "react";
import DemoCard from "./components/DemoCard";
import UploadCard from "./components/UploadCard";
import DownloadIcon from "@mui/icons-material/Download";
import { uploadImage, generateVideo } from "./services/api";


function App() {
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [prompt, setPrompt] = useState("");
  const [motion, setMotion] = useState("slow");
  const [videoUrl, setVideoUrl] = useState("");
  const [processing, setProcessing] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white px-4 py-8">

      {/* Header Section */}
      <div className="max-w-5xl mx-auto pt-10 text-center">
        <h1 className="text-3xl md:text-4xl font-semibold">
          Image to Video AI Generator
        </h1>

        <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
          Upload an image and let AI generate a realistic short video.
          <br />
          Control motion style and download the result instantly.
        </p>
      </div>

      {/* Cards Section */}
      <div className="max-w-5xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Demo Card */}
        <div className="bg-neutral-900 rounded-xl border border-neutral-800 p-3 h-72">
          <DemoCard />
        </div>
        {/* Upload Card */}
        <div className="bg-neutral-900 rounded-xl border border-neutral-800 p-4 h-72">
          <UploadCard
            imagePreview={imagePreview}
            onImageSelect={(e) => {
              const file = e.target.files[0];
              if (!file) return;
              setImage(file);
              setImagePreview(URL.createObjectURL(file));
              setVideoUrl(""); // reset previous video if any
            }}
          />
        </div>
      </div>
      {/* Control Section */}
      <div className="max-w-3xl mx-auto mt-14 bg-neutral-900 border border-neutral-800 rounded-xl p-6">
       
        {/* Prompt Input */}
        <textarea
          rows={4}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe motion (e.g. gentle wind, cinematic movement)"
          className="w-full bg-neutral-800 text-white rounded-lg px-4 py-3 mb-4 resize-none outline-none focus:ring-2 focus:ring-gray-600"
        />



        {/* Motion Dropdown */}
        <select
          value={motion}
          onChange={(e) => setMotion(e.target.value)}
          className="w-full bg-neutral-800 text-white rounded-lg px-4 py-3 mb-6 outline-none focus:ring-2 focus:ring-gray-600"
        >
          <option value="slow">Slow</option>
          <option value="cinematic">Cinematic</option>
          <option value="dynamic">Dynamic</option>
        </select>


        {/* Generate Button */}
        <div className="flex justify-center">
          <button
            onClick={async () => {
              if (!image) return;

              try {
                setProcessing(true);

                // 1️⃣ Upload image
                const uploadRes = await uploadImage(image);

                // 2️⃣ Generate video
                const videoRes = await generateVideo({
                  imageUrl: uploadRes.imageUrl,
                  prompt,
                  motion,
                });

                setVideoUrl(videoRes.videoUrl);
              } catch (err) {
                console.error(err);
              } finally {
                setProcessing(false);
              }
            }}
            disabled={processing || !image}
            className="bg-white text-black font-medium px-8 py-3 rounded-lg hover:bg-gray-200 transition disabled:opacity-50"
          >
            {processing ? "Generating..." : "Generate Video"}
          </button>
        </div>
        {videoUrl && (
          <div className="mt-6 flex flex-col items-center gap-3">
            <video
              src={videoUrl}
              controls
              className="w-64 rounded-lg border border-neutral-700"
            />

            <a
              href={videoUrl}
              download
              className="text-gray-300 hover:text-white"
              title="Download video"
            >
              <DownloadIcon />
            </a>
          </div>
        )}



      </div>

    </div>
  );
}

export default App;
