import axios from "axios";

export async function fireTrackingPixel(status) {
  const startFire = "http://www.mocky.io/v2/5be098b232000072006496f5";
  const endFire = "http://www.mocky.io/v2/5be098d03200004d006496f6";
  try {
    switch (status) {
      case "start":
        await axios.get(startFire);
        break;

      default:
        await axios.get(endFire);
        break;
    }
  } catch (error) {
    alert(error);
  }
}
