import React, { useRef, useEffect, useState } from "react";
import Main from "./pages/main/main";

export function sleep(ms = 0) {
  return new Promise((r) => setTimeout(r, ms));
}

function App() {
  return (
    <Main />
    // <div className="App">
    //   <video
    //     width="100%"
    //     height="100%"
    //     autoPlay
    //     controls
    //     ref={videoRef}
    //     onChange={(e) => console.log({ e })}
    //   >
    //     <source
    //       src={
    //         "https://static.ssacdn.com/creatives/irv-biliionare_casino-port-rgl_10038/irv-biliionare_casino-port-rgl/assets/billionaire_v2.mp4"
    //       }
    //       type="video/mp4"
    //     />
    //   </video>
    //   <button
    //     style={{ display: displayVideo ? "flex" : "none" }}
    //     onClick={buttonTitle === "Spin" ? handleButtonClick : handleDownload}
    //   >
    //     {buttonTitle}
    //   </button>
    // </div>
  );
}

export default App;
