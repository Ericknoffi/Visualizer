"use client";
import React, { useState, useEffect } from 'react';

const stepsData = [
  {
    "title": "Sending Datagram",
  "description": "The client just throws a packet to the server 📤 without asking &#39;Are you ready?&#39;. Quick but risky."
  },
  {
    "title": "Packet Lost",
  "description": "Sometimes the packet gets lost or shows up late 🚫. UDP doesn&#39;t try to fix it."
  },
  {
    "title": "Successful Delivery",
    "description": "Another packet makes it safely 🎯 and reaches the server."
  },
  {
    "title": "Server Response",
    "description": "The server replies back with its own packet 📩, but again, no guarantee it arrives."
  },
  {
    "title": "Transfer Complete",
  "description": "That&#39;s it—no handshakes, no &#39;got it&#39; messages. Simple and fast ✅."
  }
];

const AmongUsIcon = ({ direction = "right", isLost = false, title }) => {
  const amongUsSvgRight = (
    <svg width="100%" height="100%" viewBox="0 0 192 192" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
      <path fillRule="evenodd" d="M55.087 40H83c13.807 0 25 11.193 25 25S96.807 90 83 90H52c-.335 0-.668-.007-1-.02V158a6 6 0 0 0 6 6h9a6 6 0 0 0 6-6v-18a6 6 0 0 1 6-6h24a6 6 0 0 1 6 6v18a6 6 0 0 0 6 6h9a6 6 0 0 0 6-6V54c0-14.36-11.641-26-26-26H77c-9.205 0-17.292 4.783-21.913 12ZM39 86.358C31.804 81.97 27 74.046 27 65c0-9.746 5.576-18.189 13.712-22.313C45.528 27.225 59.952 16 77 16h26c16.043 0 29.764 9.942 35.338 24H147c9.941 0 18 8.059 18 18v65c0 9.941-8.059 18-18 18h-6v17c0 9.941-8.059 18-18 18h-9c-9.941 0-18-8.059-18-18v-12H84v12c0 9.941-8.059 18-18 18h-9c-9.941 0-18-8.059-18-18V86.358ZM141 129h6a6 6 0 0 0 6-6V58a6 6 0 0 0-6-6h-6.052c.035.662.052 1.33.052 2v75ZM52 52c-7.18 0-13 5.82-13 13s5.82 13 13 13h31c7.18 0 13-5.82 13-13s-5.82-13-13-13H52Z" clipRule="evenodd" />
    </svg>
  );

  const amongUsSvgLeft = (
    <svg width="100%" height="100%" viewBox="0 0 192 192" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
      <g transform="translate(192,0) scale(-1,1)">
        <path fillRule="evenodd" d="M55.087 40H83c13.807 0 25 11.193 25 25S96.807 90 83 90H52q-.502 0-1-.02V158a6 6 0 0 0 6 6h9a6 6 0 0 0 6-6v-18a6 6 0 0 1 6-6h24a6 6 0 0 1 6 6v18a6 6 0 0 0 6 6h9a6 6 0 0 0 6-6V54c0-14.36-11.641-26-26-26H77c-9.205 0-17.292 4.783-21.913 12M39 86.358C31.804 81.97 27 74.046 27 65c0-9.746 5.576-18.189 13.712-22.313C45.528 27.225 59.952 16 77 16h26c16.043 0 29.764 9.942 35.338 24H147c9.941 0 18 8.059 18 18v65c0 9.941-8.059 18-18 18h-6v17c0 9.941-8.059 18-18 18h-9c-9.941 0-18-8.059-18-18v-12H84v12c0 9.941-8.059 18-18 18h-9c-9.941 0-18-8.059-18-18zM141 129h6a6 6 0 0 0 6-6V58a6 6 0 0 0-6-6h-6.052q.052.994.052 2zM52 52c-7.18 0-13 5.82-13 13s5.82 13 13 13h31c7.18 0 13-5.82 13-13s-5.82-13-13-13z" clipRule="evenodd" />
      </g>
    </svg>
  );

  const amongUsSvg = direction === "right" ? amongUsSvgLeft : amongUsSvgRight;
  const colorClass = isLost ? "text-red-500" : "text-cyan-500";
  const bobbingClass = "animate-bobbing";

  return (
    <div className={`among-us-container relative h-16 w-16 ${bobbingClass}`}>
      <div className={`absolute top-[-40px] left-1/2 -translate-x-1/2 whitespace-nowrap text-xl font-bold ${isLost ? 'text-red-500' : 'text-cyan-500'} mb-2`}>
        {title}
      </div>
      <div className={`among-us-icon absolute w-full h-full top-1/2 -translate-y-1/2 ${colorClass}`}>
        {amongUsSvg}
      </div>
    </div>
  );
};

const App = () => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    let timeoutId;

    if (step > 0 && step < stepsData.length) {
      timeoutId = setTimeout(() => {
        setStep(prevStep => prevStep + 1);
      }, 4000);
    } else if (step === stepsData.length) {
      timeoutId = setTimeout(() => {
        setStep(0);
      }, 4000);
    }

    return () => clearTimeout(timeoutId);
  }, [step]);

  const handleReset = () => {
    setStep(0);
  };

  const handleGoBack = () => {
    window.location.href = '/';
  };

  const showWalkingAnimation = step === 1 || step === 2 || step === 3 || step === 4;
  const animationDirection = (step === 4) ? "left" : "right";
  const isLostPacket = step === 2;

  const animationClass = isLostPacket
    ? "animate-walk-red"
    : (animationDirection === "right" ? "animate-walk-client" : "animate-walk-server");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-zinc-950 font-['Inter']">
      <div className="absolute top-4 left-4">
        <button
          onClick={handleGoBack}
          className="flex items-center space-x-2 text-cyan-500 hover:text-cyan-400 transition-colors duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          <span className="font-bold">Back</span>
        </button>
      </div>
      <div className="text-center mb-8">
        <h1 className="text-5xl font-bold text-cyan-500">UDP Datagram Transfer</h1>
        <p className="text-xl text-zinc-400">
          A visualization of how a client sends a datagram to a server.
        </p>
      </div>
      <div className="flex flex-col lg:flex-row gap-8 w-full max-w-7xl items-stretch justify-center">
        <div className="bg-zinc-800 p-6 rounded-xl shadow-lg border border-zinc-700 flex flex-col flex-grow items-center justify-center min-h-[500px] relative">
          <div className="relative w-full h-[180px]">
            {/* Client Device */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 flex flex-col items-center gap-4 flex-shrink-0">
              <div className="bg-zinc-600 rounded-md p-2 border border-zinc-400 shadow-inner w-24 h-20 flex items-center justify-center">
                <div className="grid grid-rows-2 gap-1">
                  <div className="flex gap-1">
                    <div className="w-2.5 h-2.5 rounded-sm bg-red-500"></div>
                    <div className="w-2.5 h-2.5 rounded-sm bg-orange-500"></div>
                    <div className="w-2.5 h-2.5 rounded-sm bg-yellow-500"></div>
                    <div className="w-2.5 h-2.5 rounded-sm bg-blue-500"></div>
                  </div>
                  <div className="flex gap-1">
                    <div className="w-2.5 h-2.5 rounded-sm bg-green-500"></div>
                    <div className="w-2.5 h-2.5 rounded-sm bg-cyan-500"></div>
                    <div className="w-2.5 h-2.5 rounded-sm bg-indigo-500"></div>
                    <div className="w-2.5 h-2.5 rounded-sm bg-purple-500"></div>
                  </div>
                </div>
              </div>
              <p className="text-lg text-zinc-200">Client</p>
            </div>

            {/* Animation Area */}
            {showWalkingAnimation && (
              <div className={`among-us-animation absolute left-48 top-[75%] -translate-x-1/2 -translate-y-1/2 ${animationClass}`}>
                <AmongUsIcon 
                  direction={animationDirection} 
                  isLost={isLostPacket} 
                  title={stepsData[step - 1].title} />
              </div>
            )}
            {step === 0 && (
              <div className="text-zinc-500 text-sm absolute top-[75%] left-1/2 -translate-x-1/2 -translate-y-1/2">
                No active animation. Click &quot;Start&quot; to begin.
              </div>
            )}

            {/* Server Device */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 flex flex-col items-center gap-4 flex-shrink-0">
              <div className="flex flex-col gap-2">
                <div className="w-24 h-8 bg-zinc-600 rounded-md border border-zinc-400 shadow-inner relative before:content-[''] before:absolute before:top-1/2 before:left-2 before:-translate-y-1/2 before:w-2 before:h-2 before:rounded-full before:bg-cyan-500 before:shadow-[0_0_5px_#06b6d4]"></div>
                <div className="w-24 h-8 bg-zinc-600 rounded-md border border-zinc-400 shadow-inner relative before:content-[''] before:absolute before:top-1/2 before:left-2 before:-translate-y-1/2 before:w-2 before:h-2 before:rounded-full before:bg-cyan-500 before:shadow-[0_0_5px_#06b6d4]"></div>
                <div className="w-24 h-8 bg-zinc-600 rounded-md border border-zinc-400 shadow-inner relative before:content-[''] before:absolute before:top-1/2 before:left-2 before:-translate-y-1/2 before:w-2 before:h-2 before:rounded-full before:bg-cyan-500 before:shadow-[0_0_5px_#06b6d4]"></div>
              </div>
              <p className="text-lg text-zinc-200">Server</p>
            </div>
          </div>
        </div>

        <div className="bg-zinc-800 p-6 rounded-xl shadow-lg border border-zinc-700 w-80 max-h-[500px] overflow-y-auto">
          <div className="text-white">
            {stepsData.slice(0, step).map((item, index) => (
              <div key={index} className="pb-4 mb-4 border-b border-dashed border-zinc-700 last:border-b-0">
                <h2 className="text-xl font-bold text-white mb-2">{item.title}</h2>
                <p className="text-lg text-zinc-400" dangerouslySetInnerHTML={{ __html: item.description }}></p>
              </div>
            ))}
            {step === 0 && (
              <>
                <h2 className="text-2xl font-semibold mb-4 text-white">Start Visualization</h2>
                <p className="text-lg text-zinc-300">Click the Start button to begin the animation.</p>
              </>
            )}
            {step >= stepsData.length && (
              <div className="pb-4 mb-4 border-b border-dashed border-zinc-700 last:border-b-0">
                <h2 className="text-xl font-bold text-white mb-2">Transfer Complete</h2>
                <p className="text-lg text-zinc-400">That&#39;s it—no handshakes, no &#39;got it&#39; messages. Simple and fast ✅.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-4 mt-6">
        <button onClick={() => setStep(1)} disabled={step > 0} className="px-6 py-3 rounded-lg border-none font-bold cursor-pointer transition-colors duration-300 bg-cyan-500 text-zinc-950 hover:bg-cyan-600 disabled:bg-zinc-700 disabled:text-zinc-500 disabled:cursor-not-allowed">
          Start
        </button>
        <button onClick={handleReset} className="px-6 py-3 rounded-lg border border-zinc-700 font-bold cursor-pointer transition-colors duration-300 bg-transparent text-white hover:bg-zinc-800">Reset</button>
      </div>

      <div className="bg-zinc-800 p-6 rounded-xl shadow-lg border border-zinc-700 flex flex-col items-center justify-center mt-8 w-full max-w-7xl">
        <h2 className="text-2xl font-semibold text-white">UDP Applications</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-6 w-full">
          <div className="bg-zinc-700 p-6 rounded-lg border border-zinc-600 flex flex-col items-center text-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-gamepad-2 text-cyan-500">
              <path d="M6 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
              <path d="M12 2a2 2 0 0 0-2 2v2a2 2 0 0 0 4 0V4a2 2 0 0 0-2-2Z"/>
              <path d="M12 10a2 2 0 0 0-2 2v2a2 2 0 0 0 4 0v-2a2 2 0 0 0-2-2Z"/>
              <path d="M16 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
              <path d="M16 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
              <path d="M12 18a2 2 0 0 0-2 2v2a2 2 0 0 0 4 0v-2a2 2 0 0 0-2-2Z"/>
              <path d="M12 2a2 2 0 0 0-2 2v2a2 2 0 0 0 4 0V4a2 2 0 0 0-2-2Z"/>
              <path d="M12 10a2 2 0 0 0-2 2v2a2 2 0 0 0 4 0v-2a2 2 0 0 0-2-2Z"/>
              <path d="M16 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
              <path d="M16 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
              <path d="M12 18a2 2 0 0 0-2 2v2a2 2 0 0 0 4 0v-2a2 2 0 0 0-2-2Z"/>
              <path d="M10 12h-4v4h4Z"/>
              <path d="M14 12h4v4h-4Z"/>
              <path d="M12 12h4v4h-4Z"/>
              <path d="M12 8a2 2 0 0 0-2 2v2a2 2 0 0 0 4 0v-2a2 2 0 0 0-2-2Z"/>
              <rect width="20" height="12" x="2" y="6" rx="2"/>
              <path d="M12 18a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v4Z"/>
            </svg>
            <h3 className="text-xl font-bold text-cyan-500 mt-4 mb-2">Online Gaming</h3>
            <p className="text-lg text-zinc-400 leading-relaxed">UDP is essential for fast-paced online gaming. The protocol&#39;s speed and lack of overhead allow for real-time data to be sent without delay. A lost packet is less critical than a delay, as a new game state will quickly follow.</p>
          </div>
          <div className="bg-zinc-700 p-6 rounded-lg border border-zinc-600 flex flex-col items-center text-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-video text-cyan-500">
              <path d="m22 8-6 4 6 4V8Z"/>
              <rect width="14" height="12" x="2" y="6" rx="2" ry="2"/>
            </svg>
            <h3 className="text-xl font-bold text-cyan-500 mt-4 mb-2">Live Streaming</h3>
            <p className="text-lg text-zinc-400 leading-relaxed">Video and audio streaming services prioritize speed over reliability. UDP enables a continuous stream of data without pausing to resend dropped packets, which would cause noticeable buffering and lag for the user.</p>
          </div>
          <div className="bg-zinc-700 p-6 rounded-lg border border-zinc-600 flex flex-col items-center text-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-globe text-cyan-500">
              <circle cx="12" cy="12" r="10"/>
              <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/>
              <path d="M2 12h20"/>
            </svg>
            <h3 className="text-xl font-bold text-cyan-500 mt-4 mb-2">DNS (Domain Name System)</h3>
            <p className="text-lg text-zinc-400 leading-relaxed">DNS queries are small and require a quick response. The stateless nature of UDP and its minimal overhead make it perfect for fast lookups, allowing web pages to load quickly without the need for a full, reliable TCP connection.</p>
          </div>
        </div>
        <div className="among-us-icon-for-image-purposes-only-do-not-add-to-code" style={{ display: 'none' }}>
        <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB2aWV3Qm94PSIwIDAgMTkyIDE5MiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBmaWxsPSJjdXJyZW50Q29sb3IiPjxwYXRoIGZpbGxSdWxlPSJldmVub2RkIiBkPSJNNTUuMDg3IDQwSDgzYzEzLjgwNyAwIDI1IDExLjE5MyAyNSAyNVM5Ni44MDcgOTAgODMgOTBINTJjLS4zMzUgMC0uNjY4LS4wMDctMS0uMDJWMTU4YTYgNiAwIDAgMCA2IDZoOWE2IDYgMCAwIDAgNi02di0xOGE2IDYgMCAwIDEgNi02hDI0YTYgNiAwIDAgMSA2IDZ2MThhNiA2IDAgMCAwIDYgNmg5YTYgNiAwIDAgMCA2LTZWNTZjMC0xNC4zNi0xMS42NDEtMjYtMjYtMjZINzdjLTkuMjA1IDAtMTcuMjkyIDQuNzgzLTIxLjkxMyAxMk0zOSA4Ni4zNThDMzEuODA0IDgxLjkyNyAyNyA3NC4wNDYgMjcgNjVjMC05Ljc0NiA1LjU3Ni0xOC4xODkgMTMuNzEyLTIyLjMxM0M0NS41MjggMjcuMjI1IDU5Ljk1MiAxNiA3NyAxNmg0YzE2LjA0MyAwIDI5Ljc2NCA5Ljk0MiAzNS4zMzggMjRIMTQ3YzkuOTQxIDAgMTggOC4wNTkgMTggMTh2NjVjMCA5Ljk0MS04LjA1OSAxOC0xOCAxOGgtNnYxN2MwIDkuOTQxLTguMDU5IDE4LTE4IDE4aC05Yy05Ljk0MSAwLTE4LTguMDU5LTE4LTE4di0xMkg4NHYxMmMwIDkuOTQxLTguMDU5IDE4LTE4IDE4aC05Yy05LjY0MSAwLTE4LTguMDU5LTE4LTE4eiBNMTQxIDEyOWg2YTYgNiAwIDAgMCA2LTYtVjU4YTYgNiAwIDAgMC02LTZoLTYuMDUyIC5wNS4wOTk0LjA1MiAyek01MiA1MmMtNy4xOCAwLTEzIDUuODItMTMgMTNzNS44MiAxMyAxMyAxM2gzMWM3LjE4IDAgMTMtNS44MiAxMy0xM3MtNS44Mi0xMy0xMy0xM3oiIGNsaXBSdWxlPSJldmVub2RkIi8+PC9zdmc+"></img>
      <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB2aWV3Qm94PSIwIDAgMTkyIDE5MiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBmaWxsPSJjdXJyZW50Q29sb3IiPjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDE5MiwwKSBzY2FsZSgtMSwxKSI+PHBhdGggZmlsbFJ1bGU9ImV2ZW5vZGQiIGQ9Ik01NS4wODcgNDBIODNjMTMuODA3IDAgMjUgMTEuMTkzIDI1IDI1Uzk2LjgwNyA5MCA4MyA5MEg1MnEtLjUwMiAwLTEtLjAyVjE1OGE2IDYgMCAwIDAgNiA2aDlhNiA2IDAgMCAwIDYtNnYtMThhNiA2IDAgMCAxIDYtNmgyNGE2IDYgMCAwIDEgNiA2djE4YTYgNiAwIDAgMCA2IDZoOWE2IDYgMCAwIDAgNi02VjU0YzAtMTQuMzYtMTEuNjQxLTI2LTI2LTI2SDc3Yy05LjIwNSAwLTE3LjI5MiA0Ljc4My0yMS45MTMgMTJNMzkgODYuMzN2NDBjNy4wOC00LjQwMiAyMS42NzMtMTUuMTMyIDMzLjgxNC0yNi4zMTZjNy4wNDMtNi40MDcgMTEuNjc1LTEzLjY1MiAxMS44NTUtMTQuMTU4Yy4yMTMtLjU4NC40My0xLjM2NS42NC0yLjI3M2EuNzExLjc1MiAwIDAgMSAuNjk2LS40MWguMjAyYy4xMDIuMDA2LjE3Ny4wMS4yNDguMDIuMDk3LS4xNDMuMjg4LS4yOTguNDgzLS40NDYuMjItLjE1OS40MzQtLjI5Ny42NTMtLjQxNmExMy45IDEzLjkgMCAwIDEgNi4zODMtLjE2NWM4LjQwOC40NTYgMTQuNjc3IDMuNDI0IDE4LjE0NyA5LjA5M2MwIDAuMDA4IDAgLjAyLjAwNy4wMjgtLjAxMS4wMDctLjAyNS4wMS0uMDQuMDJjLS4wMDUtLjAwNS0uMDI3LS4wMTgtLjA2MS0uMDM0LS4xMzItLjA3LS40MDgtLjE2OC0uODIzLS4yNTktMS4zNjgtLjI5Mi00LjQ4NC0uNTU3LTguMzUyLS41NjEtNC41OTktLjAwNC04LjI3NS4yMjgtMTAuMjY1LjU3NC00LjA3Mi43MTEtNi44OTYgMS40ODQtOS44ODUgMi40ODJhMjguMTE0IDI4LjExNCAwIDAgMS01LjU2MSAxLjQ5YzcuNjg5IDUuOTE2IDE3LjY4OCAxMi42MzIgMjMuNDcgMTcuNzA4IDYuOTk0IDYuMDM2IDEyLjM0NSAxMi43NTcgMTUuNzc2IDE4LjM2Yy41NzQuOTU5IDEuMDY3IDEuODgyIDEuNDgzIDIuNjg1LjIyMi40MjQuNDA5Ljc4LjU3MyAxLjA3LjY0NiAxLjE1OCAxLjExMiAyLjA0NSAxLjQxNyAyLjg5MS40MTMuMzEzLjY3NS40MjcuODgyLjU2LjEwNy4wOTQuMjA1LjE5MS4yOTYuMjg3LjEzMi4xMzcuMjgxLjI3LjQ1LjM4NC4xNDcuMTA2LjI4LjIxNi4zOTcuMzI2LjY1NC42MTcuOTkzIDEuMTU4IDEuMTAxIDEuNDkxLjA1NS4xNjkuMTIyLjM1Ny4xOTcuNTYxLjE0Ni4zNzYuMjk1LjczOC40MzUgMS4wNzguNTE2IDEuMjk0LjkyIDIuNDU0IDEuMjI4IDMuNDM4LjA5NC4zMS4xODcuNjAyLjI3NC44NDkuNTMyIDEuNDYyLjg5NyAzLjA1NyAxLjA5NiA0LjY0OS4wNzEuNTY3LjE2NSAxLjM1My4yMTkgMS44MTguMTQ1IDEuMjU2LjIwNCAyLjM5LjIzOCAzLjQ0MmE2LjgzIDYuODMgMCAwIDAgLjMwMiAyLjU5YzEuMjI4IDYuMjYgMS4zOTUgMTMuNzU3LjQ4NiAyMS41NzQtLjI4NyAyLjQ4Ni0uNjIgNC45NjgtLjk5NyA3LjQyNy0uMTU2IDEuMDE0LS4zMjYgMi4wMjgtLjQ4NyAzLjAzNy0uNDgxIDMuMTE5LS43NDEgNS43OC0uOTMyIDcuNjk1LS4wOTIuODUzLS4yMDcgMS42NzktLjMyNCAyLjQ0Mi0uNDgzIDMuMDY1LS43NDIgNS43MzktLjkzNSAyLjQ5LS4xMjEuNTI1LS4xNjYuOTQzLS4yNzIgMS40OTMtLjA4NS40ODItLjE3NC45ODMtLjI2MyAxLjUwMy0uMDkxLjUxNS0uMTg3IDEuMDMtLjI4OCAxLjUzNGExMC42MzYgMTAuNjM2IDAgMCAwLS4yNjcgMS41MzEgNS44MDIgNS44MDIgMCAwIDAtLjE0OCAxLjI1Yy0uMDM3LjI5My0uMDYxLjQ3Mi0uMDc1LjUyNy0uMDE1LS4wNTUtLjAyLS4wOTEtLjAyLS4xMDh6IiBjbGlwUnVsZT0iZXZlbm9kZCIvPjwvZz48L3N2Zz4=" />
    </div>
      </div>
      <style>{`
        @keyframes bobbing {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        .animate-bobbing {
          animation: bobbing 1s ease-in-out infinite;
        }

        @keyframes walk-client {
          0% {
            left: 48px;
            opacity: 1;
          }
          90% {
            left: calc(100% - 48px);
            opacity: 1;
          }
          100% {
            left: calc(100% - 48px);
            opacity: 0;
          }
        }
        
        @keyframes walk-red {
          0% {
            left: 48px;
            opacity: 1;
          }
          50% {
            left: 50%;
            opacity: 1;
          }
          100% {
            left: 50%;
            opacity: 0;
          }
        }

        @keyframes walk-server {
          0% {
            left: calc(100% - 48px);
            opacity: 1;
          }
          90% {
            left: 48px;
            opacity: 1;
          }
          100% {
            left: 48px;
            opacity: 0;
          }
        }

        .among-us-animation {
          position: absolute;
          animation-duration: 4s;
          animation-timing-function: linear;
          animation-fill-mode: forwards;
        }
        
        .among-us-animation.animate-walk-client {
          animation-name: walk-client;
        }
        .among-us-animation.animate-walk-red {
          animation-name: walk-red;
        }
        .among-us-animation.animate-walk-server {
          animation-name: walk-server;
        }
      `}</style>
    </div>
  );
};

export default App;
