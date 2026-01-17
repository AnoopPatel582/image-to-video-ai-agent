import { useEffect, useState } from "react";
import demoImage from "../assets/ai_img.avif";
import demoVideo from "../assets/ai_video.mp4";

function DemoCard() {
    const [showVideo, setShowVideo] = useState(false);
    const [wipeStage, setWipeStage] = useState("idle");

    useEffect(() => {
        const startAnimation = () => {
            setShowVideo(false);
            setWipeStage("start");

            setTimeout(() => setWipeStage("mid"), 800);

            setTimeout(() => {
                setWipeStage("end");
                setShowVideo(true);
            }, 2300); 

            setTimeout(() => {
                setWipeStage("idle");
            }, 7500);
        };

        startAnimation();
        const interval = setInterval(startAnimation, 7600);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative w-full h-full overflow-hidden rounded-lg">
            {!showVideo && (
                <img
                    src={demoImage}
                    alt="AI demo"
                    className="w-full h-full object-cover"
                />
            )}

            {showVideo && (
                <video
                    src={demoVideo}
                    autoPlay
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                />
            )}

            {wipeStage !== "idle" && (
                <div
                    className={`absolute top-0 h-full w-[2px] bg-gray-300/60 transition-all duration-700
    ${wipeStage === "start"
                            ? "left-0"
                            : wipeStage === "mid"
                                ? "left-1/2"
                                : "left-full"
                        }
            ${wipeStage === "start"
                            ? "left-0"
                            : wipeStage === "mid"
                                ? "left-1/2"
                                : "left-full"
                        }
          `}
                />
            )}
        </div>
    );
}

export default DemoCard;
