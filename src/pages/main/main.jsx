import React, { useRef, useEffect, useState } from "react";
import { MainContainer, VideoWrapper, ButtonWrapper } from "./main.styled";
import { fireTrackingPixel } from "../../services/main";
import { VIDEO_SOURCE } from "../../utils/urls";

export function sleep(ms = 0) {
  return new Promise((r) => setTimeout(r, ms));
}

export default function Main() {
  const [displayButton, setDisplayButton] = useState(false);
  const [disablePause, setDisablePause] = useState(false);
  const [buttonTitle, setButtonTitle] = useState("Spin");

  const videoRef = useRef(null);

  useEffect(() => {
    onStart();
  }, [videoRef]);

  function onStart() {
    fireTrackingPixel("start");
  }

  function onEnd() {
    fireTrackingPixel("end");
  }

  async function handleFirstPause() {
    videoRef.current.pause();
    const videoCurrentTime = videoRef.current.currentTime;
    setDisplayButton(true);
    await sleep(10000);
    if (videoRef.current.currentTime === videoCurrentTime) {
      videoRef.current.currentTime = 21.0;
      videoRef.current.play();
    }
  }

  function handleDownloadButton() {
    setDisplayButton(true);
    setButtonTitle("Download now");
  }

  function handleSpinClick() {
    videoRef.current.play();
    setDisplayButton(false);
    setDisablePause(true);
  }

  function handleDownloadClick() {
    window.open(
      "https://play.google.com/store/apps/details?id=com.huuuge.casino.texas&hl=en"
    );
  }

  function onVideoTimeUpdate(e) {
    const currentTime = Math.floor(e.target.currentTime);
    switch (currentTime) {
      case 4:
        if (!disablePause) {
          handleFirstPause();
        }
        break;
      case 21:
        handleDownloadButton();
        break;
      default:
        break;
    }
  }

  return (
    <MainContainer>
      <VideoWrapper>
        <video
          width="100%"
          height="100%"
          autoPlay
          controls
          ref={videoRef}
          onTimeUpdate={(e) => onVideoTimeUpdate(e)}
          onEnded={onEnd}
        >
          <source src={VIDEO_SOURCE} type="video/mp4" />
        </video>
      </VideoWrapper>
      <ButtonWrapper>
        <button
          style={{ display: !displayButton && "none" }}
          onClick={
            buttonTitle === "Spin" ? handleSpinClick : handleDownloadClick
          }
        >
          {buttonTitle}
        </button>
      </ButtonWrapper>
    </MainContainer>
  );
}
