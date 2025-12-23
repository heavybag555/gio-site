"use client";

import { useParams } from "next/navigation";
import projectsData from "@/data/projectsData";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useCursorStore, usePlayingVideoStore } from "@/store/zustand";
import Image from "next/image";

const formatTime = (seconds) => {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  return [h, m, s].map((unit) => String(unit).padStart(2, "0")).join(":");
};

const Details = ({ setDetailsVisible, project }) => {
  return (
    <>
      <div className="fixed bottom-[var(--footerReserve)] left-0 px-4 z-[100]">
        <ul>
          <li className="normal-txt">{project.index}</li>
          <li className="normal-txt">{project.title}</li>
          {project.author && <li className="normal-txt">{project.author}</li>}
          <li className="normal-txt">{project.camera}</li>
          <li className="normal-txt">{project.filmStock}</li>
        </ul>
      </div>
      <div
        className="fixed inset-0 w-screen h-screen bg-[#16161683] backdrop-blur-lg z-40"
        onClick={() => setDetailsVisible(false)}
      />
    </>
  );
};

const ProjectsDetail = () => {
  const { slug } = useParams();
  const [detailsVisible, setDetailsVisible] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const project = projectsData.find((item) => item.id === String(slug));
  const router = useRouter();
  const videoRef = useRef(null);
  const [videoTime, setVideoTime] = useState("00:00:00");
  const [progressPercent, setProgressPercent] = useState(0);
  const { handleMouseEnter, handleMouseLeave, handleClick } = useCursorStore();
  const { setIsPlaying } = usePlayingVideoStore();

  useEffect(() => {
    if (!project?.video) {
      setIsPlaying(false);
      return;
    }

    const video = videoRef.current;
    if (!video) return;
    video.play();
    setIsPlaying(true);

    const updateTime = () => {
      setVideoTime(formatTime(video.currentTime));
      setProgressPercent((video.currentTime / video.duration) * 100);
    };

    video.addEventListener("timeupdate", updateTime);
    return () => {
      video.removeEventListener("timeupdate", updateTime);
    };
  }, [project]);

  const togglePlayPause = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  const toggleFullscreen = () => {
    const video = videoRef.current;
    if (!video) return;

    if (!document.fullscreenElement) {
      video.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    handleMouseEnter("playVideo");
    return () => handleMouseLeave();
  }, []);

  if (!project) {
    return <div>Nothing to show at the moment.</div>;
  }

  const hasVideo = !!project.video;

  return (
    <>
      <div className="">
        <header
          className="fixed top-[var(--pageInsetTop)] right-0 w-full px-4 mix-blend-exclusion z-10"
          onMouseEnter={() => handleMouseEnter("default")}
        >
          <ul className="relative grid grid-cols-5 max-lg:grid-cols-2 ">
            <div className="flex items-center max-lg:gap-4">
              {hasVideo && (
                <a className="relative normal-txt max-lg:hidden">{videoTime}</a>
              )}
              <a className="normal-txt hidden max-lg:block">{project.index}</a>
              <a className="normal-txt hidden max-lg:block">{project.title}</a>
            </div>
            <a className="normal-txt max-lg:hidden">{project.title}</a>
            <a className="normal-txt">{project.author}</a>
            <a className="normal-txt max-lg:hidden">{project.category}</a>
            <a className="normal-txt max-lg:hidden">{project.camera}</a>
          </ul>

          <div className="fixed top-[var(--pageInsetTop)] right-0 px-4 flex justify-end cursor-default">
            <button
              className="normal-txt cursor-pointer select-none hover:text-gray-400 transition-colors"
              onClick={() => {
                router.back();
                handleClick();
              }}
            >
              Close
            </button>
          </div>
        </header>

        {hasVideo && (
          <div className="fixed top-[calc(var(--pageInsetTop)+20px)] left-0 w-full h-[1px] bg-white-20 z-10">
            <div
              className="h-full bg-white transition-all duration-200 ease-linear"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        )}

        <section
          className={`w-full h-full ${
            hasVideo
              ? "fixed top-0 flex justify-center items-center cursor-none"
              : "pt-[calc(var(--pageInsetTop)+24px)] pb-[var(--footerReserve)] overflow-y-auto min-h-screen flex flex-col items-center gap-4"
          }`}
          onMouseEnter={() =>
            handleMouseEnter(hasVideo ? "playVideo" : "default")
          }
          onMouseLeave={() => handleMouseLeave()}
        >
          {hasVideo ? (
            <video
              ref={videoRef}
              src={project.video}
              autoPlay
              loop
              muted={isMuted}
              className="w-full h-auto"
              onClick={togglePlayPause}
            />
          ) : (
            <div className="w-full flex flex-col items-center gap-10 px-4">
              {project.images && project.images.length > 0
                ? project.images.map((imgSrc, idx) => (
                    <div key={idx} className="relative w-full max-w-[1200px]">
                      <Image
                        src={imgSrc}
                        alt={`${project.title} - ${idx + 1}`}
                        width={1200}
                        height={800}
                        className="w-full h-auto object-contain"
                        priority={idx === 0}
                      />
                    </div>
                  ))
                : project.img && (
                    <div className="relative w-full max-w-[1200px]">
                      <Image
                        src={project.img}
                        alt={project.title}
                        width={1200}
                        height={800}
                        className="w-full h-auto object-contain"
                        priority
                      />
                    </div>
                  )}
            </div>
          )}
        </section>

        <footer
          className="fixed bottom-[var(--pageInsetBottom)] right-0 w-full px-4 mix-blend-exclusion z-50"
          onMouseEnter={() => handleMouseLeave()}
        >
          <ul className="relative flex justify-between">
            <div className="flex items-center max-lg:gap-4">
              <button
                className="normal-txt hover:text-gray-400 transition-colors"
                onClick={() => setDetailsVisible(true)}
              >
                Details
              </button>
            </div>
            {hasVideo && (
              <div className="flex items-center gap-4">
                <button className="normal-txt hover:text-gray-400 transition-colors" onClick={toggleFullscreen}>
                  Fullscreen
                </button>
                <button className="normal-txt hover:text-gray-400 transition-colors" onClick={toggleMute}>
                  {isMuted ? "Unmute" : "Mute"}
                </button>
              </div>
            )}
          </ul>
        </footer>
      </div>
      {detailsVisible && <Details setDetailsVisible={setDetailsVisible} project={project} />}
    </>
  );
};

export default ProjectsDetail;
