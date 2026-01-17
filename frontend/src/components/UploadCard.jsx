import CloudUploadIcon from "@mui/icons-material/CloudUpload";

function UploadCard({ onImageSelect, imagePreview }) {
  return (
    <label className="cursor-pointer w-full h-full block">

      {/* Card container */}
      <div className="relative w-full h-full rounded-xl overflow-hidden border border-neutral-800 hover:border-neutral-600 transition">

        {imagePreview ? (
          <img
            src={imagePreview}
            alt="Uploaded preview"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-3 text-gray-400 hover:text-gray-200 transition">
            <CloudUploadIcon style={{ fontSize: 48 }} />
            <span className="text-sm">Click to upload image</span>
          </div>
        )}

      </div>

      {/* Hidden input */}
      <input
        type="file"
        accept="image/*"
        className="hidden"
        onChange={onImageSelect}
      />
    </label>
  );
}

export default UploadCard;
