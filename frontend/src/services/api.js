export const uploadImage = async (imageFile) => {
  const formData = new FormData();
  formData.append("image", imageFile);

  const response = await fetch(
    "http://localhost:5000/api/video/upload-image",
    {
      method: "POST",
      body: formData,
    }
  );

  return response.json();
};
export const generateVideo = async ({ imageUrl, prompt, motion }) => {
  const response = await fetch(
    "http://localhost:5000/api/video/generate-video",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ imageUrl, prompt, motion }),
    }
  );

  return response.json();
};
