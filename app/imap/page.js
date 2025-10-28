"use client";
import React, { useState, useEffect, useRef } from 'react';

const stepsData = [
  {
    "title": "Step 1: Echo Request (Successful)",
    "description": "The client sends an Echo Request packet to the server, starting the first diagnostic test."
  },
  {
    "title": "Step 2: Echo Reply",
    "description": "The server receives the request and sends an Echo Reply back, confirming the connection is active."
  },
  {
    "title": "Step 3: Echo Request (Failed)",
    "description": "The client sends another Echo Request, but this time a problem occurs on the network."
  },
  {
    "title": "Step 4: Time Exceeded",
    "description": "An intermediate router notices the packet's Time-to-Live (TTL) has expired and sends a 'Time Exceeded' message back to the client, reporting the error."
  },
  {
    "title": "Diagnosis Complete",
    "description": "The client has now confirmed a successful connection and identified a potential network problem."
  }
];

const App = () => {
  const [step, setStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const animationTimeoutRef = useRef(null);

  useEffect(() => {
    if (isAnimating) {
      clearTimeout(animationTimeoutRef.current);
      let delay = 0;
      let nextStep = step + 1;
      
      switch (step) {
        case 1:
          delay = 2500;
          break;
        case 2:
          delay = 2500;
          break;
        case 3:
          delay = 2500;
          break;
        case 4:
          delay = 2500;
          break;
        default:
          nextStep = 0;
          setIsAnimating(false);
          break;
      }

      if (delay > 0) {
        animationTimeoutRef.current = setTimeout(() => {
          setStep(nextStep);
          if (nextStep >= stepsData.length) {
            setIsAnimating(false);
          }
        }, delay);
      }
    }

    return () => {
      clearTimeout(animationTimeoutRef.current);
    };
  }, [isAnimating, step]);

  const handleToggleAnimation = () => {
    if (isAnimating) {
      setIsAnimating(false);
      clearTimeout(animationTimeoutRef.current);
    } else {
      if (step >= stepsData.length) {
        setStep(1);
      } else {
        setStep(prevStep => prevStep + 1);
      }
      setIsAnimating(true);
    }
  };

  const handleReset = () => {
    setIsAnimating(false);
    clearTimeout(animationTimeoutRef.current);
    setStep(0);
  };
  
  const handleGoBack = () => {
    window.location.href = '/';
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-zinc-950 font-['Inter']">
      <div className="absolute top-4 left-4">
        <button
          onClick={handleGoBack}
          className="flex items-center space-x-2 text-lime-500 hover:text-lime-400 transition-colors duration-300"
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
        <h1 className="text-5xl font-bold text-lime-500">ICMP Advanced Visualization</h1>
        <p className="text-xl text-zinc-400">
          A visualization of a successful and a failed ICMP communication.
        </p>
      </div>
      <div className="flex flex-col lg:flex-row gap-8 w-full max-w-7xl items-stretch justify-center">
        <div className="bg-zinc-800 p-6 rounded-xl shadow-lg border border-zinc-700 flex flex-col flex-grow items-center justify-center min-h-[500px] relative">
          <div className="relative flex w-full h-full items-center justify-between">
            
            {/* Client Device */}
            <div className="flex flex-col items-center gap-4 flex-shrink-0">
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

            {/* Lines and Packets */}
            <div className="flex flex-col justify-center items-center relative flex-grow mx-8 gap-8 h-[240px]">
              
              {/* Line 1: Echo Request (Successful) */}
              <div className={`line relative flex items-center w-full h-0.5 transition-opacity duration-500 ${step >= 1 ? 'opacity-100' : 'opacity-0'}`}>
                <div className="absolute bg-zinc-950 px-1 font-bold text-lime-500 text-base top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap">Echo Request</div>
                <div className={`packet absolute w-4 h-4 rounded-sm border-2 border-white bg-lime-500 z-10 top-1/2 -translate-y-1/2 left-0 ${step === 1 && isAnimating ? 'animate-right' : step > 1 ? 'end-position-right' : 'opacity-0'}`}></div>
                <div className="absolute w-0 h-0 border-solid border-y-[8px] border-l-[12px] border-transparent border-l-lime-500 top-1/2 -translate-y-1/2 right-0"></div>
              </div>
              
              {/* Line 2: Echo Reply */}
              <div className={`line relative flex items-center w-full h-0.5 transition-opacity duration-500 ${step >= 2 ? 'opacity-100' : 'opacity-0'}`}>
                <div className="absolute bg-zinc-950 px-1 font-bold text-lime-500 text-base top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap">Echo Reply</div>
                <div className={`packet absolute w-4 h-4 rounded-sm border-2 border-white bg-lime-500 z-10 top-1/2 -translate-y-1/2 right-0 ${step === 2 && isAnimating ? 'animate-left' : step > 2 ? 'end-position-left' : 'opacity-0'}`}></div>
                <div className="absolute w-0 h-0 border-solid border-y-[8px] border-r-[12px] border-transparent border-r-lime-500 top-1/2 -translate-y-1/2 left-0"></div>
              </div>
              
              {/* Line 3: Echo Request (Failed) */}
              <div className={`line relative flex items-center w-full h-0.5 transition-opacity duration-500 ${step >= 3 ? 'opacity-100' : 'opacity-0'}`}>
                <div className="absolute bg-zinc-950 px-1 font-bold text-lime-500 text-base top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap">Echo Request</div>
                <div className={`packet absolute w-4 h-4 rounded-sm border-2 border-white bg-lime-500 z-10 top-1/2 -translate-y-1/2 left-0 ${step === 3 && isAnimating ? 'animate-right' : step > 3 ? 'end-position-right' : 'opacity-0'}`}></div>
                <div className="absolute w-0 h-0 border-solid border-y-[8px] border-l-[12px] border-transparent border-l-lime-500 top-1/2 -translate-y-1/2 right-0"></div>
              </div>
              
              {/* Line 4: Time Exceeded */}
              <div className={`line relative flex items-center w-full h-0.5 transition-opacity duration-500 ${step >= 4 ? 'opacity-100' : 'opacity-0'}`}>
                <div className="absolute bg-zinc-950 px-1 font-bold text-lime-500 text-base top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap">Time Exceeded</div>
                <div className={`packet absolute w-4 h-4 rounded-sm border-2 border-white bg-red-500 z-10 top-1/2 -translate-y-1/2 right-0 ${step === 4 && isAnimating ? 'animate-left' : step > 4 ? 'end-position-left' : 'opacity-0'}`}></div>
                <div className="absolute w-0 h-0 border-solid border-y-[8px] border-r-[12px] border-transparent border-r-red-500 top-1/2 -translate-y-1/2 left-0"></div>
              </div>

            </div>

            {/* Server Device */}
            <div className="flex flex-col items-center gap-4 flex-shrink-0">
              <div className="flex flex-col gap-2">
                <div className="w-24 h-8 bg-zinc-600 rounded-md border border-zinc-400 shadow-inner relative before:content-[''] before:absolute before:top-1/2 before:left-2 before:-translate-y-1/2 before:w-2 before:h-2 before:rounded-full before:bg-lime-500 before:shadow-[0_0_5px_#84cc16]"></div>
                <div className="w-24 h-8 bg-zinc-600 rounded-md border border-zinc-400 shadow-inner relative before:content-[''] before:absolute before:top-1/2 before:left-2 before:-translate-y-1/2 before:w-2 before:h-2 before:rounded-full before:bg-lime-500 before:shadow-[0_0_5px_#84cc16]"></div>
                <div className="w-24 h-8 bg-zinc-600 rounded-md border border-zinc-400 shadow-inner relative before:content-[''] before:absolute before:top-1/2 before:left-2 before:-translate-y-1/2 before:w-2 before:h-2 before:rounded-full before:bg-lime-500 before:shadow-[0_0_5px_#84cc16]"></div>
              </div>
              <p className="text-lg text-zinc-200">Server</p>
            </div>
          </div>
        </div>

        <div className="bg-zinc-800 p-6 rounded-xl shadow-lg border border-zinc-700 w-80 max-h-[500px] overflow-y-auto">
          <div className="text-white">
            {step === 0 && (
              <>
                <h2 className="text-2xl font-semibold mb-4 text-white">Start Visualization</h2>
                <p className="text-lg text-zinc-300">Click the Start button to see the ICMP advanced flow in action.</p>
              </>
            )}
            {stepsData.slice(0, step).map((item, index) => (
              <div key={index} className="pb-4 mb-4 border-b border-dashed border-zinc-700 last:border-b-0">
                <h2 className="text-xl font-bold text-white mb-2">{item.title}</h2>
                <p className="text-lg text-zinc-400" dangerouslySetInnerHTML={{ __html: item.description }}></p>
              </div>
            ))}
            {step >= 5 && (
              <div className="pb-4 mb-4 border-b border-dashed border-zinc-700 last:border-b-0">
                <h2 className="text-xl font-bold text-white mb-2">Diagnosis Complete</h2>
                <p className="text-lg text-zinc-400">The client has now confirmed a successful connection and identified a potential network problem.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-4 mt-6">
        <button onClick={handleToggleAnimation} disabled={isAnimating && step < stepsData.length} className="px-6 py-3 rounded-lg border-none font-bold cursor-pointer transition-colors duration-300 bg-lime-500 text-zinc-950 hover:bg-lime-600 disabled:bg-zinc-700 disabled:text-zinc-500 disabled:cursor-not-allowed">
          {isAnimating ? 'Pause' : step >= stepsData.length ? 'Restart' : 'Start'}
        </button>
        <button onClick={handleReset} className="px-6 py-3 rounded-lg border border-zinc-700 font-bold cursor-pointer transition-colors duration-300 bg-transparent text-white hover:bg-zinc-800">Reset</button>
      </div>

      <div className="bg-zinc-800 p-6 rounded-xl shadow-lg border border-zinc-700 flex flex-col items-center justify-center mt-8 w-full max-w-7xl">
        <h2 className="text-2xl font-semibold text-white">ICMP Applications</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-6 w-full">
          <div className="bg-zinc-700 p-6 rounded-lg border border-zinc-600 flex flex-col items-center text-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-network text-lime-500">
              <rect x="2" y="2" width="20" height="8" rx="2" ry="2"/>
              <rect x="7" y="14" width="10" height="8" rx="2" ry="2"/>
              <line x1="12" y1="10" x2="12" y2="14"/>
            </svg>
            <h3 className="text-xl font-bold text-lime-500 mt-4 mb-2">Network Diagnostics</h3>
            <p className="text-lg text-zinc-400 leading-relaxed">ICMP is the protocol used by the `ping` and `traceroute` commands to test connectivity and measure latency to a host on the network.</p>
          </div>
          <div className="bg-zinc-700 p-6 rounded-lg border border-zinc-600 flex flex-col items-center text-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shield-off text-lime-500">
              <path d="M19 13.5V16l-6 3-6-3v-4"/>
              <path d="M2 3l20 20"/>
              <path d="M20.5 15c-1.5 0-3-2.5-3-2.5V8.5c0-1.1.9-2 2-2h3c.9 0 1.6.6 1.8 1.5"/>
              <path d="m14 14.5-5 5"/>
              <path d="m22 22-2-2"/>
            </svg>
            <h3 className="text-xl font-bold text-lime-500 mt-4 mb-2">Network Security</h3>
            <p className="text-lg text-zinc-400 leading-relaxed">ICMP can be used by attackers to perform reconnaissance, but it can also be used to defend networks by blocking ICMP messages that may indicate a malicious scan.</p>
          </div>
          <div className="bg-zinc-700 p-6 rounded-lg border border-zinc-600 flex flex-col items-center text-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-server-off text-lime-500">
              <path d="M8 2v2"/>
              <path d="M12 2v2"/>
              <path d="M16 2v2"/>
              <path d="M2 13v-1a2 2 0 0 1 2-2h8m4 0h4a2 2 0 0 1 2 2v1m-6 4h.01"/>
              <path d="M2 22h16a2 2 0 0 0 2-2v-1"/>
              <path d="M2 10a2 2 0 0 0 2 2h2"/>
              <path d="m2 16 1.5-1.5"/>
              <path d="m14 14 1.5-1.5"/>
              <path d="m22 22-2-2"/>
            </svg>
            <h3 className="text-xl font-bold text-lime-500 mt-4 mb-2">Error Reporting</h3>
            <p className="text-lg text-zinc-400 leading-relaxed">ICMP messages are used to report errors back to the source of a datagram. For example, a &quot;Destination Unreachable&quot; message is a common ICMP error.</p>
          </div>
        </div>
      </div>
      <style jsx>{`
        .line {
          background-image: repeating-linear-gradient(90deg, #84cc16 0, #84cc16 5px, transparent 5px, transparent 10px);
          background-size: 10px 1px;
        }

        .packet {
          animation-duration: 2.5s;
          animation-timing-function: linear;
          animation-fill-mode: forwards;
          position: absolute;
          width: 15px;
          height: 15px;
          border-radius: 4px;
          border: 2px solid #fff;
          z-index: 10;
        }

        .animate-right {
          animation-name: move-packet-right;
        }

        .animate-left {
          animation-name: move-packet-left;
        }

        @keyframes move-packet-right {
          0% {
            left: 0;
          }
          100% {
            left: calc(100% - 16px);
          }
        }
        
        @keyframes move-packet-left {
          0% {
            right: 0;
          }
          100% {
            right: calc(100% - 16px);
          }
        }

        .end-position-right {
          left: calc(100% - 16px);
        }

        .end-position-left {
          right: calc(100% - 16px);
        }
      `}</style>
    </div>
  );
};

export default App;
