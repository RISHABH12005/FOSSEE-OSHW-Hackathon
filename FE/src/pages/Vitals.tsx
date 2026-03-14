import { useEffect, useState } from "react";
import { Heart, Activity } from "lucide-react";

export default function Vitals() {
  const [heartRate, setHeartRate] = useState<string>("--");
  const [spo2, setSpO2] = useState<string>("--");

  // Motion state (polled from /api/motion)
  const [moving, setMoving] = useState<boolean>(false);
  const [steps, setSteps] = useState<number>(0);
  const [distance, setDistance] = useState<number>(0);

  useEffect(() => {
    let stopped = false;
    const poll = async () => {
      if (stopped) return;
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2500);

      try {
        const res = await fetch("http://localhost:8000/api/vitals", {
          signal: controller.signal,
        });

        if (res.status === 204) {
          setHeartRate("--");
          setSpO2("--");
        
        } else {
          const data = await res.json();
          setHeartRate(String(data.heartRate ?? "--"));
          setSpO2(String(data.spo2 ?? "--"));
        }
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        clearTimeout(timeoutId);
        if (!stopped) setTimeout(poll, 2000);
      }
    };

    poll();
    return () => {
      stopped = true;
    };
  }, []);

  // Poll motion endpoint separately and store motion payload
  useEffect(() => {
    let stopped = false;
    const poll = async () => {
      if (stopped) return;
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2500);

      try {
        const res = await fetch("https://488b74888570.ngrok-free.app/api/motion", {
          headers: {
            "ngrok-skip-browser-warning": "true",
          },
          signal: controller.signal,
        });

        if (!res.ok) {
          setMoving(false);
          setSteps(0);
          setDistance(0);
        } else {
          const data = await res.json();
          setMoving(Boolean(data.moving ?? false));
          setSteps(Number(data.steps ?? 0));
          setDistance(Number(data.distance_m ?? 0));
        }
      } catch (err) {
        console.error("Motion fetch error:", err);
        setMoving(false);
        setSteps(0);
        setDistance(0);
      } finally {
        clearTimeout(timeoutId);
        if (!stopped) setTimeout(poll, 2000);
      }
    };

    poll();
    return () => {
      stopped = true;
    };
  }, []);

  return (
    <div className="min-h-screen bg-hero-gradient relative overflow-hidden">
      <div className="leaf-pattern"></div>

      {/* Decorative circles */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-[hsl(142,55%,45%,0.08)] rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-[hsl(152,45%,30%,0.06)] rounded-full blur-3xl"></div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-[hsl(142,55%,45%,0.1)] px-4 py-2 rounded-full mb-6 animate-fade-in-up">
            <Heart className="w-4 h-4 text-red-500" />
            <span className="text-sm font-medium text-[hsl(152,45%,30%)]">
              Real-time Health Monitoring
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 font-['Playfair_Display'] animate-fade-in-up delay-100" style={{ opacity: 0 }}>
            <span className="text-[hsl(152,40%,20%)]">Health</span>
            <span className="text-gradient"> Monitor</span>
          </h1>
          <p className="text-lg text-[hsl(152,20%,40%)] max-w-xl mx-auto animate-fade-in-up delay-200" style={{ opacity: 0 }}>
            Monitor vital signs in real-time with accurate heart rate and SpO₂ measurements.
          </p>
        </div>

        {/* Vitals Cards Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Heart Rate Card */}
          <div className="feature-card animate-fade-in-up delay-400" style={{ opacity: 0 }}>
            <div className="flex items-center justify-between mb-6">
              <div className="icon-box">
                <Heart className="w-7 h-7" />
              </div>
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                heartRate !== "--" 
                  ? "bg-[hsl(142,55%,45%,0.1)] text-[hsl(152,45%,30%)]" 
                  : "bg-gray-100 text-gray-500"
              }`}>
                {heartRate !== "--" ? "Active" : "Waiting"}
              </div>
            </div>
            <h3 className="text-lg font-semibold text-[hsl(152,20%,45%)] mb-2">Heart Rate</h3>
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-bold text-gradient">{heartRate}</span>
              <span className="text-xl text-[hsl(152,20%,45%)]">bpm</span>
            </div>
            <div className="mt-4 h-2 bg-[hsl(142,55%,45%,0.1)] rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-[hsl(152,45%,30%)] to-[hsl(142,55%,45%)] rounded-full transition-all duration-500"
                style={{ width: heartRate !== "--" ? `${Math.min(Number(heartRate) / 2, 100)}%` : "0%" }}
              ></div>
            </div>
          </div>

          {/* SpO2 Card */}
          <div className="feature-card animate-fade-in-up delay-500" style={{ opacity: 0 }}>
            <div className="flex items-center justify-between mb-6">
              <div className="w-14 h-14 rounded-2xl bg-[hsl(25,90%,55%,0.1)] flex items-center justify-center">
                <Activity className="w-7 h-7 text-[hsl(25,90%,55%)]" />
              </div>
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                spo2 !== "--" 
                  ? "bg-[hsl(25,90%,55%,0.1)] text-[hsl(25,90%,55%)]" 
                  : "bg-gray-100 text-gray-500"
              }`}>
                {spo2 !== "--" ? "Active" : "Waiting"}
              </div>
            </div>
            <h3 className="text-lg font-semibold text-[hsl(152,20%,45%)] mb-2">Blood Oxygen (SpO₂)</h3>
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-bold text-[hsl(25,90%,55%)]">{spo2}</span>
              <span className="text-xl text-[hsl(152,20%,45%)]">%</span>
            </div>
            <div className="mt-4 h-2 bg-[hsl(25,90%,55%,0.1)] rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-[hsl(25,90%,55%)] to-[hsl(35,90%,55%)] rounded-full transition-all duration-500"
                style={{ width: spo2 !== "--" ? `${Number(spo2)}%` : "0%" }}
              ></div>
            </div>
          </div>
        </div>

        {/* Motion Status Card */}
        <div className="bg-white rounded-3xl p-8 shadow-xl border border-[hsl(140,25%,88%)] animate-fade-in-up delay-600" style={{ opacity: 0 }}>
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className={`w-4 h-4 rounded-full ${moving ? "bg-[hsl(142,55%,45%)]" : "bg-red-500"} animate-pulse`}></div>
              <div>
                <p className="text-sm text-[hsl(152,20%,45%)]">Motion</p>
                <p className={`text-2xl font-bold ${moving ? "text-[hsl(142,55%,45%)]" : "text-red-500"}`}>{moving ? "Moving" : "Not Moving"}</p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-center">
                <p className="text-sm text-[hsl(152,20%,45%)]">Steps</p>
                <p className="text-lg font-semibold text-[hsl(152,40%,20%)]">{steps}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-[hsl(152,20%,45%)]">Distance (m)</p>
                <p className="text-lg font-semibold text-[hsl(152,40%,20%)]">{distance.toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
