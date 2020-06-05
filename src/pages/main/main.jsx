import React, { useRef, useEffect, useState } from "react";
import { MainContainer, VideoWrapper, ButtonWrapper } from "./main.styled";
import { fireTrackingPixel } from "../../services/main";
import { VIDEO_SOURCE, DOWNLOAD_ANDROID, DOWNLOAD_IOS } from "../../utils/urls";
import { sleep } from "../../utils/functions";
import {
  SPIN,
  START,
  DOWNLOAD_NOW,
  END,
  NONE,
  NOT_SUPPORTED,
} from "../../utils/constans";
import { IronButton } from "../../components/button/button";
import { isAndroid, isIOS } from "react-device-detect";

export default function Main() {
  const [displayButton, setDisplayButton] = useState(false);
  const [disablePause, setDisablePause] = useState(false);
  const [buttonTitle, setButtonTitle] = useState(SPIN);

  const videoRef = useRef(null);

  useEffect(() => {
    onStart();
  }, [videoRef]);

  function onStart() {
    fireTrackingPixel(START);
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

  async function handleFirstPause() {
    const videoCtx = videoRef.current;
    videoCtx.pause();
    setDisablePause(true);
    const videoCurrentTime = videoCtx.currentTime;
    setDisplayButton(true);
    await sleep(10000);
    if (videoCtx.currentTime === videoCurrentTime) {
      videoCtx.currentTime = 21.0;
      videoCtx.play();
    }
  }

  function handleDownloadButton() {
    setDisplayButton(true);
    setButtonTitle(DOWNLOAD_NOW);
  }

  function handleSpinClick() {
    videoRef.current.play();
    setDisplayButton(false);
  }

  function handleDownloadClick() {
    if (isAndroid) {
      window.open(DOWNLOAD_ANDROID);
    } else if (isIOS) {
      window.open(DOWNLOAD_IOS);
    } else {
      alert(NOT_SUPPORTED);
    }
  }

  function onEnd() {
    fireTrackingPixel(END);
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
        <IronButton
          title={buttonTitle}
          style={{ display: !displayButton && NONE }}
          onClick={buttonTitle === SPIN ? handleSpinClick : handleDownloadClick}
        >
          {buttonTitle}
        </IronButton>
      </ButtonWrapper>
    </MainContainer>
  );
}
