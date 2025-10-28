"use client";
import React, { useState, useEffect, useRef } from 'react';

const stepsData = [
  {
    "title": "Step 1: Protocol & Key Exchange",
    "description": "The client initiates the connection, and both sides negotiate the protocol version and exchange initial public keys. 🔑"
  },
  {
    "title": "Step 2: Host Key Verification",
    "description": "The server sends its public host key. The client verifies this key to ensure it is connecting to the correct server (prevents Man-in-the-Middle attacks). 🛡️"
  },
  {
    "title": "Step 3: Client Authentication",
    "description": "The client sends authentication details (e.g., password or private key signature) to prove its identity."
  },
  {
    "title": "Step 4: Authentication Success",
    "description": "The server validates the credentials and sends a success message, establishing a secure, encrypted tunnel."
  },
  {
    "title": "Step 5: Channel Request",
    "description": "The client requests a specific service channel, typically a 'shell' (for command-line access) or file transfer (SFTP)."
  },
  {
    "title": "Step 6: Secure Session Ready",
    "description": "The server confirms the channel is open. The encrypted session is now fully established, and data transfer can begin. ✅"
  },
  {
    "title": "Communication Complete",
    "description": "The secure SSH session is established, and the client can now securely transmit commands and data over the encrypted channel. 🔒"
  }
];

// SSH Packet Icon (Lock Symbol)
const LockIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" fill="currentColor"/>
    <path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="#06b6d4" strokeWidth="2" fill="none"/>
  </svg>
);

const PacketTitle = ({ title, className }) => (
  <span className={`whitespace-nowrap font-bold text-lg text-cyan-400 absolute top-[-30px] ${className}`}>
    {title}
  </span>
);

const App = () => {
  const [step, setStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const animationTimeoutRef = useRef(null);
  const totalSteps = 60; // 6 animation phases, 10 steps each.

  useEffect(() => {
    if (isAnimating) {
      // Pause longer at the end of each phase (multiples of 10)
      const delay = [10, 20, 30, 40, 50, 60].includes(step) ? 1000 : 250; 
      animationTimeoutRef.current = setTimeout(() => {
        setStep(prevStep => {
          if (prevStep < totalSteps) {
            return prevStep + 1;
          } else {
            setIsAnimating(false);
            return prevStep;
          }
        });
      }, delay);
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
      if (step >= totalSteps) {
        setStep(0);
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
  
  const getPositionAndOpacity = (currentStep) => {
    let top = 0;
    let left = 0;
    let opacity = 0;
    let title = "";
    
    // Phase 1 (1-10): Client Request (Top Track)
    if (currentStep > 0 && currentStep <= 10) {
      left = (currentStep / 9) * 85;
      top = 45;
      opacity = 1;
      title = stepsData[0].title;
    } 
    // Phase 2 (11-20): Server Reply (Bottom Track)
    else if (currentStep > 10 && currentStep <= 20) {
      left = (1 - ((currentStep - 10) / 9)) * 85;
      top = 173;
      opacity = 1;
      title = stepsData[1].title;
    } 
    // Phase 3 (21-30): Client Request (Top Track)
    else if (currentStep > 20 && currentStep <= 30) {
      left = ((currentStep - 20) / 9) * 85;
      top = 45;
      opacity = 1;
      title = stepsData[2].title;
    } 
    // Phase 4 (31-40): Server Reply (Bottom Track)
    else if (currentStep > 30 && currentStep <= 40) {
      left = (1 - ((currentStep - 30) / 9)) * 85;
      top = 173;
      opacity = 1;
      title = stepsData[3].title;
    } 
    // Phase 5 (41-50): Client Request (Top Track)
    else if (currentStep > 40 && currentStep <= 50) {
      left = ((currentStep - 40) / 9) * 85;
      top = 45;
      opacity = 1;
      title = stepsData[4].title;
    } 
    // Phase 6 (51-60): Server Reply (Bottom Track)
    else if (currentStep > 50 && currentStep <= 60) {
      left = (1 - ((currentStep - 50) / 9)) * 85;
      top = 173;
      opacity = 1;
      title = stepsData[5].title;
    } else {
      opacity = 0;
    }

    return {
      style: {
        left: `calc(${left}% - 24px)`,
        top: `${top}px`,
        opacity: opacity,
        transition: 'left 0.25s linear, top 0.25s linear'
      },
      title: title
    };
  };

  const packet = getPositionAndOpacity(step);

  const getVisibleStepIndex = () => {
    if (step <= 10) return 0;
    if (step <= 20) return 1;
    if (step <= 30) return 2;
    if (step <= 40) return 3;
    if (step <= 50) return 4;
    if (step <= 60) return 5;
    return 6;
  };
  
  const visibleStepIndex = getVisibleStepIndex();
  // Include "Communication Complete" when all animation steps are done
  const finalStepsData = step > totalSteps ? [...stepsData, stepsData[stepsData.length - 1]] : stepsData;
  const visibleSteps = finalStepsData.slice(0, visibleStepIndex + 1);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-zinc-950 font-['Inter']">
      <div className="absolute top-4 left-4">
        <button
          onClick={handleGoBack}
          className="flex items-center space-x-2 text-cyan-400 hover:text-cyan-300 transition-colors duration-300"
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
        <h1 className="text-5xl font-bold text-cyan-400">SSH Protocol Visualization</h1>
        <p className="text-xl text-zinc-400">
          A step-by-step look at how a secure shell connection is established.
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
                    <div className="w-2.5 h-2.5 rounded-sm bg-cyan-500"></div>
                    <div className="w-2.5 h-2.5 rounded-sm bg-indigo-500"></div>
                    <div className="w-2.5 h-2.5 rounded-sm bg-purple-500"></div>
                  </div>
                </div>
              </div>
              <p className="text-lg text-zinc-200">Client</p>
            </div>

            {/* Lines and Packets */}
            <div className="flex flex-col justify-center items-center relative flex-grow mx-8 gap-32 h-[240px]">
              {/* Request (top track) */}
              <div className={`line-container relative flex items-center w-full h-0.5 transition-opacity duration-500 opacity-100 ${isAnimating && (step >= 1 && step <= 10 || step >= 21 && step <= 30 || step >= 41 && step <= 50) ? 'animate-track-right' : ''}`}>
                <div className="absolute w-0 h-0 border-solid border-y-[8px] border-l-[12px] border-transparent border-l-cyan-400 top-1/2 -translate-y-1/2 right-0"></div>
              </div>
              {/* Reply (bottom track) */}
              <div className={`line-container relative flex items-center w-full h-0.5 transition-opacity duration-500 opacity-100 ${isAnimating && (step >= 11 && step <= 20 || step >= 31 && step <= 40 || step >= 51 && step <= 60) ? 'animate-track-left' : ''}`}>
                <div className="absolute w-0 h-0 border-solid border-y-[8px] border-r-[12px] border-transparent border-r-cyan-400 top-1/2 -translate-y-1/2 left-0"></div>
              </div>
              
              {/* This is the single packet element */}
              {step > 0 && step <= totalSteps && (
                <div className={`packet absolute z-10 flex flex-col items-center`} style={packet.style}>
                  <PacketTitle title={packet.title} />
                  <LockIcon className={`text-cyan-400 w-10 h-10`} />
                </div>
              )}
            </div>
            
            {/* Server Device */}
            <div className="flex flex-col items-center gap-4 flex-shrink-0">
              <div className="flex flex-col gap-2">
                <div className="w-24 h-8 bg-zinc-600 rounded-md border border-zinc-400 shadow-inner relative before:content-[''] before:absolute before:top-1/2 before:left-2 before:-translate-y-1/2 before:w-2 before:h-2 before:rounded-full before:bg-cyan-400 before:shadow-[0_0_5px_#22d3ee]"></div>
                <div className="w-24 h-8 bg-zinc-600 rounded-md border border-zinc-400 shadow-inner relative before:content-[''] before:absolute before:top-1/2 before:left-2 before:-translate-y-1/2 before:w-2 before:h-2 before:rounded-full before:bg-cyan-400 before:shadow-[0_0_5px_#22d3ee]"></div>
                <div className="w-24 h-8 bg-zinc-600 rounded-md border border-zinc-400 shadow-inner relative before:content-[''] before:absolute before:top-1/2 before:left-2 before:-translate-y-1/2 before:w-2 before:h-2 before:rounded-full before:bg-cyan-400 before:shadow-[0_0_5px_#22d3ee]"></div>
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
                <p className="text-lg text-zinc-300">Click the Start button to see the SSH secure connection process in action.</p>
              </>
            )}
            {visibleSteps.map((item, index) => (
              <div key={index} className="pb-4 mb-4 border-b border-dashed border-zinc-700 last:border-b-0">
                <h2 className="text-xl font-bold text-white mb-2">{item.title}</h2>
                <p className="text-lg text-zinc-400" dangerouslySetInnerHTML={{ __html: item.description }}></p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-4 mt-6">
        <button onClick={handleToggleAnimation} disabled={step >= totalSteps && !isAnimating} className="px-6 py-3 rounded-lg border-none font-bold cursor-pointer transition-colors duration-300 bg-cyan-400 text-zinc-950 hover:bg-cyan-500 disabled:bg-zinc-700 disabled:text-zinc-500 disabled:cursor-not-allowed">
          {isAnimating ? 'Pause' : 'Start'}
        </button>
        <button onClick={handleReset} className="px-6 py-3 rounded-lg border border-zinc-700 font-bold cursor-pointer transition-colors duration-300 bg-transparent text-white hover:bg-zinc-800">Reset</button>
      </div>

      <div className="bg-zinc-800 p-6 rounded-xl shadow-lg border border-zinc-700 flex flex-col items-center justify-center mt-8 w-full max-w-7xl">
        <h2 className="text-2xl font-semibold text-white">SSH Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-6 w-full">
          <div className="bg-zinc-700 p-6 rounded-lg border border-zinc-600 flex flex-col items-center text-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-key-round text-cyan-400">
              <path d="M2 18 17 3l3 3L5 21z"/>
              <path d="m14 8-1 1"/>
            </svg>
            <h3 className="text-xl font-bold text-cyan-400 mt-4 mb-2">Public Key Authentication</h3>
            <p className="text-lg text-zinc-400 leading-relaxed">The most secure way to log in, using asymmetric cryptography instead of passwords. This is key to automating tasks safely.</p>
          </div>
          <div className="bg-zinc-700 p-6 rounded-lg border border-zinc-600 flex flex-col items-center text-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shield-half text-cyan-400">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              <path d="M12 22V10"/>
            </svg>
            <h3 className="text-xl font-bold text-cyan-400 mt-4 mb-2">Encrypted Tunneling</h3>
            <p className="text-lg text-zinc-400 leading-relaxed">SSH encrypts all data sent between the client and server, protecting against eavesdropping and session hijacking on insecure networks.</p>
          </div>
          <div className="bg-zinc-700 p-6 rounded-lg border border-zinc-600 flex flex-col items-center text-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-plug-zap text-cyan-400">
              <path d="m13 19-9 3V5l9-3-2 3.5"/>
              <path d="M19 19V9h-4"/>
              <path d="M19 13.5l1.5 2L19 17.5"/>
              <path d="M19 9v1"/>
            </svg>
            <h3 className="text-xl font-bold text-cyan-400 mt-4 mb-2">Port Forwarding / Tunneling</h3>
            <p className="text-lg text-zinc-400 leading-relaxed">SSH can securely tunnel other traffic (like HTTP or VNC) through the encrypted connection, allowing secure access to services over untrusted networks.</p>
          </div>
        </div>
      </div>
      <style jsx>{`
        .line-container {
          background-image: repeating-linear-gradient(90deg, #22d3ee 0, #22d3ee 5px, transparent 5px, transparent 10px);
          background-size: 10px 1px;
        }

        .packet {
          animation-duration: 3s;
          animation-timing-function: linear;
          animation-fill-mode: forwards;
          position: absolute;
          z-index: 10;
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
      `}</style>
    </div>
  );
};

export default App;
