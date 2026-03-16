import { useEffect, useRef, useState } from "react";
import {
  Video,
  Wifi,
  WifiOff,
  Activity,
  AlertCircle,
} from "lucide-react";
import { ControlPad } from "../components/control-pad";
import { ArrowControlPad } from "../components/Arrow-controller-pad";
import axios from "axios";

const FeedPage = () => {
  const liveCanvasRef = useRef<HTMLCanvasElement>(null);
  const resultCanvasRef = useRef<HTMLCanvasElement>(null);
  const intervalRef = useRef<number | null>(null);

  const [wsStatus, setWsStatus] = useState("Connecting...");
  const [isConnected, setIsConnected] = useState(false);
  const [direction, setDirection] = useState("");
  const [detectionStatus, setDetectionStatus] = useState(
    "Initializing AI detection system..."
  );
  const [frameCount, setFrameCount] = useState(0);
  const [controlStyle, setControlStyle] = useState<"text" | "arrows">("text");

  const CONTROL_API_URL = "http://10.137.194.51:8000/control";
  const ROBOFLOW_API_KEY = "iWTbz1A2Zwcd6yJNw8F3";
  const ROBOFLOW_API_URL =
    "https://serverless.roboflow.com/person-detection-9a6mk/16";

  const handleDirectionStart = async (dir: string) => {
    setDirection(dir);
    try {
      // let temp;
      // if (dir === "s") {
      //   temp = "stop";
      // } if(dir === "f") {
      //   temp = "forward";
      // } else if(dir === "b") {
      //   temp = "backward";
      // } else if(dir === "a") {
      //   temp = "left";
      // } else if(dir === "c") {
      //   temp = "right";
      // }
      const res = await fetch(`${CONTROL_API_URL}`, {
        method: "POST",
        headers: {
          "ngrok-skip-browser-warning": "true",
        },
        body: JSON.stringify({ direction: dir }),
      });

      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      console.log("Control response:", data);
    } catch (error) {
      console.error("Error sending control command:", error);
    }
  };

  useEffect(() => {
    const liveCanvas = liveCanvasRef.current;
    const resultCanvas = resultCanvasRef.current;
    if (!liveCanvas || !resultCanvas) return;

    const liveCtx = liveCanvas.getContext("2d");
    const resultCtx = resultCanvas.getContext("2d");
    if (!liveCtx || !resultCtx) return;

    const liveSocket = new WebSocket("ws://10.137.194.51:8000/share") as any;
    liveSocket.binaryType = "arraybuffer";
    let frameIndex = 0;

    liveSocket.onmessage = async (event: any) => {
      const blob = new Blob([event.data], { type: "image/jpeg" });
      const url = URL.createObjectURL(blob);
      const img = new Image();

      img.onload = async () => {
        liveCanvas.width = img.width;
        liveCanvas.height = img.height;
        resultCanvas.width = img.width;
        resultCanvas.height = img.height;

        liveCtx.drawImage(img, 0, 0);
        resultCtx.drawImage(img, 0, 0);

        URL.revokeObjectURL(url);
        setFrameCount((prev) => prev + 1);
        setIsConnected(true);
        setWsStatus("Connected");

        frameIndex++;

        // Run AI every 30 frames
        if (frameIndex % 30 !== 0) return;

        try {
          const frameBase64 = liveCanvas.toDataURL("image/jpeg").split(",")[1];

          const response = await axios.post(ROBOFLOW_API_URL, frameBase64, {
            params: { api_key: ROBOFLOW_API_KEY },
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          });

          const predictions = response.data.predictions;
          setDetectionStatus(`${predictions.length} persons detected`);

          resultCtx.strokeStyle = "lime";
          resultCtx.lineWidth = 2;

          predictions.forEach((pred: any) => {
            const { x, y, width, height, confidence } = pred;
            resultCtx.strokeRect(x - width / 2, y - height / 2, width, height);
            resultCtx.fillText(
              `${(confidence * 100).toFixed(1)}%`,
              x - width / 2,
              y - height / 2 - 5
            );
          });
        } catch (err) {
          console.error("Roboflow error", err);
          setDetectionStatus("Detection failed");
        }
      };

      img.src = url;
    };

    liveSocket.onclose = () => {
      setIsConnected(false);
      setWsStatus("Disconnected from Camera");
    };

    liveSocket.onerror = () => {
      setIsConnected(false);
      setWsStatus("Error connecting to Camera");
    };

    return () => {
      liveSocket.close();
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div className="min-h-screen bg-hero-gradient pt-28 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-[hsl(var(--forest-dark))] mb-4 font-['Playfair_Display']">
            Live Feed Monitoring
          </h1>
          <div className="flex flex-wrap items-center gap-4">
            <div
              className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                isConnected
                  ? "bg-[hsl(var(--meadow),0.15)] text-[hsl(var(--forest))] border border-[hsl(var(--meadow),0.3)]"
                  : "bg-[hsl(var(--sunset),0.15)] text-[hsl(var(--sunset-dark))] border border-[hsl(var(--sunset),0.3)]"
              }`}
            >
              {isConnected ? (
                <Wifi className="h-4 w-4" />
              ) : (
                <WifiOff className="h-4 w-4" />
              )}
              <span>WebSocket: {wsStatus}</span>
            </div>
            <div className="flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium bg-[hsl(var(--forest),0.1)] text-[hsl(var(--forest))] border border-[hsl(var(--forest),0.2)]">
              <Activity className="h-4 w-4" />
              <span>AI Detection Active</span>
            </div>
          </div>
        </div>

        {/* Mobile-only Control Section */}
        <div className="lg:hidden mb-8">
          <div className="card-glass rounded-2xl p-6 border border-[hsl(var(--meadow),0.2)]">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-[hsl(var(--forest-dark))]">
                🎮 Motor Controls
              </h3>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setControlStyle("text")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                    controlStyle === "text"
                      ? "bg-[hsl(var(--forest))] text-white shadow-md"
                      : "bg-[hsl(var(--meadow-light),0.5)] text-[hsl(var(--forest))] hover:bg-[hsl(var(--meadow-light))]"
                  }`}
                >
                  Text
                </button>
                <button
                  onClick={() => setControlStyle("arrows")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                    controlStyle === "arrows"
                      ? "bg-[hsl(var(--forest))] text-white shadow-md"
                      : "bg-[hsl(var(--meadow-light),0.5)] text-[hsl(var(--forest))] hover:bg-[hsl(var(--meadow-light))]"
                  }`}
                >
                  Arrows
                </button>
              </div>
            </div>
            {controlStyle === "text" ? (
              <ControlPad
                onDirectionStart={handleDirectionStart}
                currentDirection={direction}
              />
            ) : (
              <ArrowControlPad
                onDirectionStart={handleDirectionStart}
                currentDirection={direction}
              />
            )}
          </div>
        </div>

        {/* Desktop View - Camera Feeds */}
        <div className="hidden lg:grid lg:grid-cols-2 gap-8">
          {/* Live Camera Feed Card */}
          <div className="card-glass rounded-2xl p-6 border border-[hsl(var(--meadow),0.2)]">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="icon-box">
                  <Video className="h-5 w-5 text-[hsl(var(--forest))]" />
                </div>
                <h3 className="text-xl font-semibold text-[hsl(var(--forest-dark))]">
                  📹 Live Camera Feed
                </h3>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setControlStyle("text")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                    controlStyle === "text"
                      ? "bg-[hsl(var(--forest))] text-white shadow-md"
                      : "bg-[hsl(var(--meadow-light),0.5)] text-[hsl(var(--forest))] hover:bg-[hsl(var(--meadow-light))]"
                  }`}
                >
                  Text
                </button>
                <button
                  onClick={() => setControlStyle("arrows")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                    controlStyle === "arrows"
                      ? "bg-[hsl(var(--forest))] text-white shadow-md"
                      : "bg-[hsl(var(--meadow-light),0.5)] text-[hsl(var(--forest))] hover:bg-[hsl(var(--meadow-light))]"
                  }`}
                >
                  Arrows
                </button>
              </div>
            </div>

            <div className="relative">
              <canvas
                ref={liveCanvasRef}
                width="640"
                height="480"
                className="w-full h-auto bg-[hsl(var(--forest-dark))] rounded-xl border-2 border-[hsl(var(--meadow),0.3)]"
              />
              <div className="absolute top-4 left-4">
                <div
                  className={`flex items-center space-x-2 px-3 py-1.5 rounded-full text-xs font-medium backdrop-blur-sm ${
                    isConnected
                      ? "bg-[hsl(var(--meadow),0.3)] text-white border border-[hsl(var(--meadow),0.5)]"
                      : "bg-[hsl(var(--sunset),0.3)] text-white border border-[hsl(var(--sunset),0.5)]"
                  }`}
                >
                  <div
                    className={`w-2 h-2 rounded-full ${
                      isConnected
                        ? "bg-[hsl(var(--meadow-light))] animate-pulse"
                        : "bg-[hsl(var(--sunset))]"
                    }`}
                  ></div>
                  <span>{isConnected ? "LIVE" : "OFFLINE"}</span>
                </div>
              </div>
            </div>

            <div className="mt-4 p-4 bg-[hsl(var(--meadow-light),0.3)] rounded-xl border border-[hsl(var(--meadow),0.2)]">
              <div className="flex items-center justify-between text-sm text-[hsl(var(--forest))]">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-[hsl(var(--forest))] rounded-full animate-pulse"></div>
                  <span>Streaming • AI Analysis Active</span>
                </div>
                <span className="font-medium">Frames: {frameCount}</span>
              </div>
            </div>

            {controlStyle === "text" ? (
              <ControlPad
                onDirectionStart={handleDirectionStart}
                currentDirection={direction}
              />
            ) : (
              <ArrowControlPad
                onDirectionStart={handleDirectionStart}
                currentDirection={direction}
              />
            )}
          </div>

          {/* Detection Results Card */}
          <div className="card-glass rounded-2xl p-6 border border-[hsl(var(--meadow),0.2)]">
            <div className="flex items-center space-x-3 mb-6">
              <div className="icon-box bg-[hsl(var(--sunset),0.15)]">
                <AlertCircle className="h-5 w-5 text-[hsl(var(--sunset-dark))]" />
              </div>
              <h3 className="text-xl font-semibold text-[hsl(var(--forest-dark))]">
                🧠 Detection Results
              </h3>
            </div>

            <div className="relative">
              <canvas
                ref={resultCanvasRef}
                width="640"
                height="480"
                className="w-full h-auto bg-[hsl(var(--forest-dark))] rounded-xl border-2 border-[hsl(var(--meadow),0.3)]"
              />
              <div className="absolute top-4 left-4">
                <div className="bg-[hsl(var(--meadow),0.3)] text-white border border-[hsl(var(--meadow),0.5)] px-3 py-1.5 rounded-full text-xs font-medium backdrop-blur-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-[hsl(var(--meadow-light))] rounded-full animate-pulse"></div>
                    <span>AI PROCESSING</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 p-4 bg-[hsl(var(--meadow-light),0.3)] rounded-xl border border-[hsl(var(--meadow),0.2)]">
              <div className="flex items-center space-x-2 mb-2">
                <Activity className="h-4 w-4 text-[hsl(var(--forest))]" />
                <span className="font-medium text-[hsl(var(--forest-dark))]">
                  Detection Status:
                </span>
              </div>
              <p className="text-[hsl(var(--forest))] text-sm">
                {detectionStatus}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedPage;

// import { useEffect, useRef, useState } from "react";
// import { Video, Wifi, WifiOff, Activity, AlertCircle } from "lucide-react";
// import { ControlPad } from "../components/control-pad";
// import { ArrowControlPad } from "../components/Arrow-controller-pad";
// import axios from "axios";
// interface Prediction {
//   x: number;
//   y: number;
//   width: number;
//   height: number;
//   confidence: number;
//   class: string;
//   class_id: number;
//   detection_id: string;
// }

// const FeedPage = () => {
//   const liveCanvasRef = useRef<HTMLCanvasElement>(null);
//   const resultCanvasRef = useRef<HTMLCanvasElement>(null);
//   const intervalRef = useRef<number | null>(null);

//   const [wsStatus, setWsStatus] = useState("Connecting...");
//   const [isConnected, setIsConnected] = useState(false);
//   const [direction, setDirection] = useState("");
//   const [detectionStatus, setDetectionStatus] = useState(
//     "Initializing AI detection system..."
//   );
//   const [frameCount, setFrameCount] = useState(0);
//   const [controlStyle, setControlStyle] = useState<"text" | "arrows">("text");

//   const CONTROL_API_URL = "http://172.27.145.113:8000/control";
//   const ROBOFLOW_API_KEY = "iWTbz1A2Zwcd6yJNw8F3";
//   const ROBOFLOW_API_URL =
//     "https://serverless.roboflow.com/person-detection-9a6mk/16";

//   const handleDirectionStart = async (dir: string) => {
//     setDirection(dir);
//     try {
//       // let temp;
//       // if (dir === "s") {
//       //   temp = "stop";
//       // } if(dir === "f") {
//       //   temp = "forward";
//       // } else if(dir === "b") {
//       //   temp = "backward";
//       // } else if(dir === "a") {
//       //   temp = "left";
//       // } else if(dir === "c") {
//       //   temp = "right";
//       // }
//       const res = await fetch(`${CONTROL_API_URL}`, {
//         method: "POST",
//         headers: {
//           "ngrok-skip-browser-warning": "true",
//         },
//         body: JSON.stringify({ direction: dir }),
//       });

//       if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
//       const data = await res.json();
//       console.log("Control response:", data);
//     } catch (error) {
//       console.error("Error sending control command:", error);
//     }
//   };

//   useEffect(() => {
//     const liveCanvas = liveCanvasRef.current;
//     const resultCanvas = resultCanvasRef.current;
//     if (!liveCanvas || !resultCanvas) return;

//     const liveCtx = liveCanvas.getContext("2d");
//     const resultCtx = resultCanvas.getContext("2d");
//     if (!liveCtx || !resultCtx) return;

//     const liveSocket = new WebSocket("ws://172.27.145.113:8000/share") as any;
//     liveSocket.binaryType = "arraybuffer";
//     let frameIndex = 0;

//     liveSocket.onmessage = async (event: any) => {
//       const blob = new Blob([event.data], { type: "image/jpeg" });
//       const url = URL.createObjectURL(blob);
//       const img = new Image();

//       img.onload = async () => {
//         liveCanvas.width = img.width;
//         liveCanvas.height = img.height;
//         resultCanvas.width = img.width;
//         resultCanvas.height = img.height;

//         liveCtx.drawImage(img, 0, 0);
//         resultCtx.drawImage(img, 0, 0);

//         URL.revokeObjectURL(url);
//         setFrameCount((prev) => prev + 1);
//         setIsConnected(true);
//         setWsStatus("Connected");

//         frameIndex++;

//         // Run AI every 30 frames
//         if (frameIndex % 30 !== 0) return;

//         try {
//           const frameBase64 = liveCanvas.toDataURL("image/jpeg").split(",")[1];

//           const response = await axios.post(ROBOFLOW_API_URL, frameBase64, {
//             params: { api_key: ROBOFLOW_API_KEY },
//             headers: {
//               "Content-Type": "application/x-www-form-urlencoded",
//             },
//           });

//           const predictions = response.data.predictions;
//           setDetectionStatus(`${predictions.length} persons detected`);

//           resultCtx.strokeStyle = "lime";
//           resultCtx.lineWidth = 2;

//           predictions.forEach((pred: any) => {
//             const { x, y, width, height, confidence } = pred;
//             resultCtx.strokeRect(x - width / 2, y - height / 2, width, height);
//             resultCtx.fillText(
//               `${(confidence * 100).toFixed(1)}%`,
//               x - width / 2,
//               y - height / 2 - 5
//             );
//           });
//         } catch (err) {
//           console.error("Roboflow error", err);
//           setDetectionStatus("Detection failed");
//         }
//       };

//       img.src = url;
//     };

//     liveSocket.onclose = () => {
//       setIsConnected(false);
//       setWsStatus("Disconnected from Camera");
//     };

//     liveSocket.onerror = () => {
//       setIsConnected(false);
//       setWsStatus("Error connecting to Camera");
//     };

//     return () => {
//       liveSocket.close();
//       if (intervalRef.current) clearInterval(intervalRef.current);
//     };
//   }, []);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 pt-28 pb-16">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="mb-8">
//           <h1 className="text-4xl font-bold text-gray-900 mb-4">
//             Live Feed Monitoring
//           </h1>
//           <div className="flex items-center space-x-4">
//             <div
//               className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium transition-colors ${
//                 isConnected
//                   ? "bg-green-100 text-green-700 border border-green-200"
//                   : "bg-red-100 text-red-700 border border-red-200"
//               }`}
//             >
//               {isConnected ? (
//                 <Wifi className="h-4 w-4" />
//               ) : (
//                 <WifiOff className="h-4 w-4" />
//               )}
//               <span>WebSocket: {wsStatus}</span>
//             </div>
//             <div className="flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-700 border border-blue-200">
//               <Activity className="h-4 w-4" />
//               <span>AI Detection Active</span>
//             </div>
//           </div>
//         </div>

//         <div className="grid lg:grid-cols-2 gap-8">
//           <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200">
//             <div className="flex items-center justify-between mb-6">
//               <div className="flex items-center space-x-3">
//                 <div className="bg-blue-100 p-2 rounded-lg">
//                   <Video className="h-5 w-5 text-blue-600" />
//                 </div>
//                 <h3 className="text-xl font-semibold text-gray-900">
//                   📹 Live Camera Feed
//                 </h3>
//               </div>
//               <div className="flex items-center space-x-2">
//                 <button
//                   onClick={() => setControlStyle("text")}
//                   className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
//                     controlStyle === "text"
//                       ? "bg-blue-100 text-blue-700"
//                       : "bg-gray-100 text-gray-600 hover:bg-gray-200"
//                   }`}
//                 >
//                   Text
//                 </button>
//                 <button
//                   onClick={() => setControlStyle("arrows")}
//                   className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
//                     controlStyle === "arrows"
//                       ? "bg-blue-100 text-blue-700"
//                       : "bg-gray-100 text-gray-600 hover:bg-gray-200"
//                   }`}
//                 >
//                   Arrows
//                 </button>
//               </div>
//             </div>

//             <div className="relative">
//               <canvas
//                 ref={liveCanvasRef}
//                 width="640"
//                 height="480"
//                 className="w-full h-auto bg-gray-900 rounded-lg border-2 border-gray-200"
//               />
//               <div className="absolute top-4 left-4">
//                 <div
//                   className={`flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-medium ${
//                     isConnected
//                       ? "bg-green-500/20 text-green-300 border border-green-500/30"
//                       : "bg-red-500/20 text-red-300 border border-red-500/30"
//                   }`}
//                 >
//                   <div
//                     className={`w-2 h-2 rounded-full ${
//                       isConnected ? "bg-green-400 animate-pulse" : "bg-red-400"
//                     }`}
//                   ></div>
//                   <span>{isConnected ? "LIVE" : "OFFLINE"}</span>
//                 </div>
//               </div>
//             </div>

//             <div className="mt-4 p-3 bg-gray-50 rounded-lg">
//               <div className="flex items-center justify-between text-sm text-gray-600">
//                 <div className="flex items-center space-x-2">
//                   <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
//                   <span>Streaming • AI Analysis Active</span>
//                 </div>
//                 <span>Frames: {frameCount}</span>
//               </div>
//             </div>

//             {controlStyle === "text" ? (
//               <ControlPad
//                 onDirectionStart={handleDirectionStart}
//                 currentDirection={direction}
//               />
//             ) : (
//               <ArrowControlPad
//                 onDirectionStart={handleDirectionStart}
//                 currentDirection={direction}
//               />
//             )}
//           </div>

//           <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200">
//             <div className="flex items-center space-x-3 mb-6">
//               <div className="bg-emerald-100 p-2 rounded-lg">
//                 <AlertCircle className="h-5 w-5 text-emerald-600" />
//               </div>
//               <h3 className="text-xl font-semibold text-gray-900">
//                 🧠 Detection Results
//               </h3>
//             </div>

//             <div className="relative">
//               <canvas
//                 ref={resultCanvasRef}
//                 width="640"
//                 height="480"
//                 className="w-full h-auto bg-gray-900 rounded-lg border-2 border-gray-200"
//               />
//               <div className="absolute top-4 left-4">
//                 <div className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-3 py-1 rounded-full text-xs font-medium">
//                   <div className="flex items-center space-x-2">
//                     <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
//                     <span>AI PROCESSING</span>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="mt-4 p-4 bg-gray-50 rounded-lg">
//               <div className="flex items-center space-x-2 mb-2">
//                 <Activity className="h-4 w-4 text-emerald-600" />
//                 <span className="font-medium text-gray-900">
//                   Detection Status:
//                 </span>
//               </div>
//               <p className="text-gray-700 text-sm">{detectionStatus}</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FeedPage;
