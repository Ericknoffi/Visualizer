"use client";
import React, { useState, useEffect, useRef } from 'react';

const stepsData = [
  {
    "title": "Step 1: Sending Echo Request",
    "description": "The client sends a small datagram called an 'Echo Request' to the server. This is like a 'hello, are you there?' message. 📡"
  },
  {
    "title": "Step 2: Server Receives Request",
    "description": "The server receives the Echo Request and prepares to respond. Unlike UDP, the purpose here is verification and diagnostics, not data transfer."
  },
  {
    "title": "Step 3: Server Sends Echo Reply",
    "description": "The server responds by sending back its own datagram, an 'Echo Reply,' to the client. 📡"
  },
  {
    "title": "Step 4: Client Receives Reply",
    "description": "The client receives the Echo Reply and uses it to calculate the round-trip time. This verifies that the connection is working."
  },
  {
    "title": "Round-Trip Complete",
    "description": "The entire process is complete. The client has successfully 'pinged' the server, confirming reachability and measuring the response time. ✅"
  }
];

const App = () => {
  const [step, setStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const animationTimeoutRef = useRef(null);

  // This useEffect hook controls the animation flow by advancing the step
  // after a specific delay for each phase.
  useEffect(() => {
    if (!isAnimating || step === 0 || step > stepsData.length) {
      return;
    }
    
    // Clear any previous timeout to prevent multiple timers running
    clearTimeout(animationTimeoutRef.current);

    let delay = 0;
    // Determine the duration of the current step
    switch (step) {
      case 1: // Echo Request animation
      case 3: // Echo Reply animation
        delay = 3000;
        break;
      case 2: // Pause at the server
      case 4: // Pause at the client
        delay = 2000;
        break;
      default:
        // This case should not be reached but handles any unexpected steps
        setIsAnimating(false);
        return;
    }
    
    // Set a new timeout to advance to the next step
    animationTimeoutRef.current = setTimeout(() => {
      setStep(prevStep => prevStep + 1);
    }, delay);

    // Cleanup function to clear the timeout if the component unmounts or
    // dependencies change
    return () => clearTimeout(animationTimeoutRef.current);

  }, [isAnimating, step]);

  const handleToggleAnimation = () => {
    if (isAnimating) {
      setIsAnimating(false);
      clearTimeout(animationTimeoutRef.current);
    } else {
      if (step === 0 || step > stepsData.length) {
        setStep(1);
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

  const TrainIcon = ({ className }) => (
    <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 462 462" xmlSpace="preserve" className={`text-indigo-500 w-10 h-10 ${className}`} fill="currentColor">
      <g>
        <g>
          <polygon points="291,58.296 291,41.796 171,41.796 171,58.296 0,58.296 0,98.296 211,98.296 211,158.624 251,158.624 251,98.296 462,98.296 462,58.296"/>
          <path d="M86.488,168.392l-23.896,23.896v204.02l23.896,23.896h289.023l23.896-23.896v-204.02l-23.896-23.896H86.488z M215.727,295.296H95.437v-87.641l8.745-8.745h111.545V295.296z M366.562,295.296H246.273v-96.386h111.545l8.744,8.745V295.296z"/>
        </g>
      </g>
    </svg>
  );

  const PacketTitle = ({ title, className }) => (
    <span className={`whitespace-nowrap font-bold text-lg text-indigo-500 absolute top-[-30px] ${className}`}>
      {title}
    </span>
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-zinc-950 font-['Inter']">
      <div className="absolute top-4 left-4">
        <button
          onClick={handleGoBack}
          className="flex items-center space-x-2 text-indigo-500 hover:text-indigo-400 transition-colors duration-300"
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
        <h1 className="text-5xl font-bold text-indigo-500">ICMP Ping-Pong</h1>
        <p className="text-xl text-zinc-400">
          A visualization of how a client pings a server.
        </p>
      </div>
      <div className="flex flex-col lg:flex-row gap-8 w-full max-w-7xl items-stretch justify-center">
        <div className="bg-zinc-800 p-6 rounded-xl shadow-lg border border-zinc-700 flex flex-col flex-grow items-center justify-center min-h-[500px]">
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
                    <div className="w-2.5 h-2.5 rounded-sm bg-indigo-500"></div>
                    <div className="w-2.5 h-2.5 rounded-sm bg-purple-500"></div>
                    <div className="w-2.5 h-2.5 rounded-sm bg-purple-500"></div>
                  </div>
                </div>
              </div>
              <p className="text-lg text-zinc-200">Client</p>
            </div>

            {/* Lines and Packets */}
            <div className="flex flex-col justify-center items-center relative flex-grow mx-8 gap-32 h-[240px]">
              {/* Line 1: Request (top track) */}
              <div className={`line-container relative flex items-center w-full h-0.5 transition-opacity duration-500 opacity-100 ${isAnimating && (step === 1 || step === 2) ? 'animate-track-right' : ''}`}>
                <div className="absolute w-0 h-0 border-solid border-y-[8px] border-l-[12px] border-transparent border-l-indigo-500 top-1/2 -translate-y-1/2 right-0"></div>
              </div>
              {/* Line 2: Reply (bottom track) */}
              <div className={`line-container relative flex items-center w-full h-0.5 transition-opacity duration-500 opacity-100 ${isAnimating && (step === 3 || step === 4) ? 'animate-track-left' : ''}`}>
                <div className="absolute w-0 h-0 border-solid border-y-[8px] border-r-[12px] border-transparent border-r-indigo-500 top-1/2 -translate-y-1/2 left-0"></div>
              </div>
              
              {/* This is the single packet element */}
              {step >= 1 && step <= 4 && (
                <div className={`packet absolute z-10 flex flex-col items-center 
                  ${step === 1 ? 'animate-move-right-request' : ''}
                  ${step === 2 ? 'at-server' : ''}
                  ${step === 3 ? 'animate-move-left-reply' : ''}
                  ${step === 4 ? 'at-client' : ''}`}>
                  <PacketTitle title={stepsData[step - 1].title.split(':')[1].trim()} />
                  <TrainIcon />
                </div>
              )}
            </div>
            
            {/* Server Device */}
            <div className="flex flex-col items-center gap-4 flex-shrink-0">
              <div className="flex flex-col gap-2">
                <div className="w-24 h-8 bg-zinc-600 rounded-md border border-zinc-400 shadow-inner relative before:content-[''] before:absolute before:top-1/2 before:left-2 before:-translate-y-1/2 before:w-2 before:h-2 before:rounded-full before:bg-indigo-500 before:shadow-[0_0_5px_#6366f1]"></div>
                <div className="w-24 h-8 bg-zinc-600 rounded-md border border-zinc-400 shadow-inner relative before:content-[''] before:absolute before:top-1/2 before:left-2 before:-translate-y-1/2 before:w-2 before:h-2 before:rounded-full before:bg-indigo-500 before:shadow-[0_0_5px_#6366f1]"></div>
                <div className="w-24 h-8 bg-zinc-600 rounded-md border border-zinc-400 shadow-inner relative before:content-[''] before:absolute before:top-1/2 before:left-2 before:-translate-y-1/2 before:w-2 before:h-2 before:rounded-full before:bg-indigo-500 before:shadow-[0_0_5px_#6366f1]"></div>
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
                <p className="text-lg text-zinc-300">Click the Start button to see the ICMP ping-pong in action.</p>
              </>
            )}
            {stepsData.slice(0, step).map((item, index) => (
              <div key={index} className="pb-4 mb-4 border-b border-dashed border-zinc-700 last:border-b-0">
                <h2 className="text-xl font-bold text-white mb-2">{item.title}</h2>
                <p className="text-lg text-zinc-400" dangerouslySetInnerHTML={{ __html: item.description }}></p>
              </div>
            ))}
            {step > stepsData.length && (
              <div className="pb-4 mb-4 border-b border-dashed border-zinc-700 last:border-b-0">
                <h2 className="text-xl font-bold text-white mb-2">Round-Trip Complete</h2>
                <p className="text-lg text-zinc-400">The entire process is complete. The client has successfully &#39;pinged&#39; the server, confirming reachability and measuring the response time. ✅</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-4 mt-6">
        <button onClick={handleToggleAnimation} disabled={step > stepsData.length} className="px-6 py-3 rounded-lg border-none font-bold cursor-pointer transition-colors duration-300 bg-indigo-500 text-zinc-950 hover:bg-indigo-600 disabled:bg-zinc-700 disabled:text-zinc-500 disabled:cursor-not-allowed">
          {isAnimating ? 'Pause' : 'Start'}
        </button>
        <button onClick={handleReset} className="px-6 py-3 rounded-lg border border-zinc-700 font-bold cursor-pointer transition-colors duration-300 bg-transparent text-white hover:bg-zinc-800">Reset</button>
      </div>

      <div className="bg-zinc-800 p-6 rounded-xl shadow-lg border border-zinc-700 flex flex-col items-center justify-center mt-8 w-full max-w-7xl">
        <h2 className="text-2xl font-semibold text-white">ICMP Applications</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-6 w-full">
          <div className="bg-zinc-700 p-6 rounded-lg border border-zinc-600 flex flex-col items-center text-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-network text-indigo-500">
              <path d="M11 11c0 1.66-1.34 3-3 3s-3-1.34-3-3 1.34-3 3-3 3 1.34 3 3z"/>
              <path d="M12 2v2"/>
              <path d="M4.22 4.22l1.42 1.42"/>
              <path d="M2 12h2"/>
              <path d="M4.22 19.78l1.42-1.42"/>
              <path d="M12 22v-2"/>
              <path d="M19.78 19.78l-1.42-1.42"/>
              <path d="M22 12h-2"/>
              <path d="M19.78 4.22l-1.42 1.42"/>
              <path d="M22 12h-2"/>
              <path d="M14 11h2"/>
              <path d="M11 14v2"/>
              <path d="M17 11c0 1.66-1.34 3-3 3s-3-1.34-3-3 1.34-3 3-3 3 1.34 3 3z"/>
              <path d="M11 11h-2"/>
              <path d="M14 11v2"/>
              <path d="M17 11c0 1.66-1.34 3-3 3s-3-1.34-3-3 1.34-3 3-3 3 1.34 3 3z"/>
            </svg>
            <h3 className="text-xl font-bold text-indigo-500 mt-4 mb-2">Network Diagnostics</h3>
            <p className="text-lg text-zinc-400 leading-relaxed">ICMP is fundamental for network troubleshooting. Tools like `ping` and `traceroute` use ICMP to test host reachability and trace the path packets take across a network.</p>
          </div>
          <div className="bg-zinc-700 p-6 rounded-lg border border-zinc-600 flex flex-col items-center text-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shield text-indigo-500">
              <path d="M20 12v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-6c0-1.66 1.34-3 3-3h10c1.66 0 3 1.34 3 3z"/>
              <path d="M12 2L4 5v5c0 4.42 3.58 8 8 8s8-3.58 8-8V5L12 2z"/>
              <path d="M12 2v18"/>
            </svg>
            <h3 className="text-xl font-bold text-indigo-500 mt-4 mb-2">Error Reporting</h3>
            <p className="text-lg text-zinc-400 leading-relaxed">ICMP is used by routers and hosts to send error messages. For example, a &quot;Destination Unreachable&quot; message is sent when a host or network can&#39;t be reached, helping diagnose routing problems.</p>
          </div>
          <div className="bg-zinc-700 p-6 rounded-lg border border-zinc-600 flex flex-col items-center text-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-cloud-rain text-indigo-500">
              <path d="M4 14.899a7 7 0 1 1 11.5 6.096"/>
              <path d="M13.5 14.899a7 7 0 1 1 11.5 6.096"/>
              <line x1="16" x2="16" y1="18" y2="24"/>
              <line x1="8" x2="8" y1="18" y2="24"/>
              <line x1="12" x2="12" y1="18" y2="24"/>
              <line x1="20" x2="20" y1="18" y2="24"/>
              <path d="M22 17.5a4 4 0 0 0-4-4H8.5a4.5 4.5 0 1 0 0 9H18a4 4 0 0 0 4-4z"/>
              <path d="M22 17.5a4 4 0 0 0-4-4H8.5a4.5 4.5 0 1 0 0 9H18a4 4 0 0 0 4-4z"/>
            </svg>
            <h3 className="text-xl font-bold text-indigo-500 mt-4 mb-2">Performance Monitoring</h3>
            <p className="text-lg text-zinc-400 leading-relaxed">System administrators use ICMP to monitor network latency and packet loss. Tools continuously `ping` critical servers to ensure they are available and responding within an acceptable timeframe.</p>
          </div>
        </div>
      </div>
      <style jsx>{`
        .line-container {
          background-image: repeating-linear-gradient(90deg, #6366f1 0, #6366f1 5px, transparent 5px, transparent 10px);
          background-size: 10px 1px;
        }

        .at-server {
          left: calc(100% - 40px);
          top: 45px;
        }

        .at-client {
          left: 0;
          top: 173px;
        }

        .animate-move-right-request {
          animation: move-right-request 3s linear forwards;
        }

        .animate-move-left-reply {
          animation: move-left-reply 3s linear forwards;
        }

        .animate-track-right {
          animation: move-track-right 0.5s linear infinite;
        }

        .animate-track-left {
          animation: move-track-left 0.5s linear infinite;
        }

        @keyframes move-track-right {
          from {
            background-position-x: 0;
          }
          to {
            background-position-x: 20px;
          }
        }
        
        @keyframes move-track-left {
          from {
            background-position-x: 0;
          }
          to {
            background-position-x: -20px;
          }
        }
        
        @keyframes move-right-request {
          0% {
            left: 0;
            top: 45px;
            opacity: 1;
          }
          100% {
            left: calc(100% - 40px);
            top: 45px;
            opacity: 1;
          }
        }

        @keyframes move-left-reply {
          0% {
            left: calc(100% - 40px);
            top: 173px;
            opacity: 1;
          }
          100% {
            left: 0;
            top: 173px;
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default App;
