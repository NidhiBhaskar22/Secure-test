// import { useCallback, useEffect, useRef, useState } from "react";
// import { isMobile } from "react-device-detect";

// export function useCamDetection({ disabled = false } = {}) {
//   const [webCamStatus, setWebCamStatus] = useState(null);
//   const videoRef = useRef(null);

//   /**
//    * Get all input devices and check permissions.
//    * If a video input device has an empty label, access is blocked.
//    */
//   const getPermissions = () => {
//     navigator.mediaDevices
//       .enumerateDevices()
//       .then((devices) => {
//         if (
//           devices
//             .filter(({ kind }) => kind === "videoinput")
//             .some(({ label }) => label === "")
//         ) {
//           setWebCamStatus("blocked");
//         } else {
//           if (isMobile) {
//             setWebCamStatus("on");
//           } else {
//             navigator.mediaDevices
//               .getUserMedia({ video: true })
//               .then(() => {
//                 setWebCamStatus("on");
//               })
//               .catch(() => {
//                 setWebCamStatus("blocked");
//               });
//           }
//         }
//       })
//       .catch((err) => console.error(err));
//   };

//   useEffect(() => {
//     if (disabled) return;

//     if (webCamStatus === "on" && videoRef.current) {
//       videoRef.current.play().catch(() => {
//         console.error("Video playback failed");
//       });
//     }
//   }, [disabled, webCamStatus]);

//   /**
//    * If the user pauses the video, force it to replay.
//    */
//   const replayVideo = useCallback(() => {
//     if (disabled) return;

//     const video = videoRef.current;
//     if (webCamStatus === "off" && video) {
//       video.play();
//       setWebCamStatus("on");
//     }
//   }, [webCamStatus, disabled]);

//   useEffect(() => {
//     let getPermissionsInterval;

//     const requestCam = async () => {
//       try {
//         await navigator.mediaDevices.getUserMedia({ video: true });
//       } catch (e) {
//         console.error("Camera permission blocked");
//       }

//       getPermissions();
//       getPermissionsInterval = setInterval(getPermissions, 60 * 1000);
//     };

//     if (!disabled) {
//       requestCam();
//     }

//     return () => {
//       clearInterval(getPermissionsInterval);
//     };
//   }, [disabled]);

//   return {
//     webCamStatus,
//     videoRef,
//     replayVideo,
//   };
// }
