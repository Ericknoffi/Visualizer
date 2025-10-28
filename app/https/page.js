"use client";
import React, { useState, useEffect, useRef } from 'react';

const stepsData = [
  {
    "title": "TCP Handshake",
    "description": "Your computer knocks on the vault (server) at Counter 443 (HTTPS). Both agree to start the treasure hunt (connection setup)."
  },
  {
    "title": "TLS Handshake",
    "description": "They share a secret code (TLS keys) so only you and the vault can read the map (secure communication)."
  },
  {
    "title": "Encrypted Request",
    "description": "Your computer sends a locked note (HTTPS request), like saying, 'Please give me the golden map!'"
  },
  {
    "title": "Encrypted Response",
    "description": "The vault replies with a locked message (HTTPS response), like saying, 'Here’s your golden map!' (status 200 OK)."
  },
  {
    "title": "Data Transfer",
    "description": "The treasure (webpage) is delivered in small, locked chests (encrypted packets) piece by piece."
  }
];

const App = () => {
  const [step, setStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const animationTimeoutRef = useRef(null);

  useEffect(() => {
    if (isAnimating) {
      if (step <= stepsData.length) {
        animationTimeoutRef.current = setTimeout(() => {
          setStep(step + 1);
        }, 3000);
      } else {
        setIsAnimating(false);
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
      if (step === 0 || step >= stepsData.length) {
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

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-zinc-950 font-['Inter']">
      <div className="absolute top-4 left-4">
        <button
          onClick={handleGoBack}
          className="flex items-center space-x-2 text-zinc-300 hover:text-zinc-400 transition-colors duration-300"
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
        <h1 className="text-5xl font-bold text-zinc-300">Hypertext Transfer Protocol Secure (HTTPS)</h1>
        <p className="text-xl text-zinc-400">
          A visualization of how a client and server transfer a resource securely.
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
            <div className="flex flex-col justify-center items-center relative flex-grow mx-8 gap-8 h-[180px]">
              {/* Step 1: TCP Handshake */}
              <div className={`line relative flex items-center w-full h-0.5 transition-opacity duration-500 ${step >= 1 ? 'opacity-100' : 'opacity-0'}`}>
                <div className={`packet absolute w-4 h-4 rounded-sm border-2 border-white bg-zinc-300 z-10 top-1/2 -translate-y-1/2 ${step === 1 && isAnimating ? 'animate-move-right' : 'opacity-0'}`}></div>
                <div className="absolute bg-zinc-950 px-1 font-bold text-zinc-300 text-base top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap">TCP Handshake</div>
                <div className="absolute w-0 h-0 border-solid border-y-[8px] border-l-[12px] border-transparent border-l-zinc-300 top-1/2 -translate-y-1/2 right-0"></div>
              </div>
              {/* Step 2: TLS Handshake */}
              <div className={`line relative flex items-center w-full h-0.5 transition-opacity duration-500 ${step >= 2 ? 'opacity-100' : 'opacity-0'}`}>
                <div className={`packet absolute w-4 h-4 rounded-sm border-2 border-white bg-zinc-300 z-10 top-1/2 -translate-y-1/2 right-0 ${step === 2 && isAnimating ? 'animate-move-left' : 'opacity-0'}`}></div>
                <div className="absolute bg-zinc-950 px-1 font-bold text-zinc-300 text-base top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap">TLS Handshake</div>
                <div className="absolute w-0 h-0 border-solid border-y-[8px] border-r-[12px] border-transparent border-r-zinc-300 top-1/2 -translate-y-1/2 left-0"></div>
              </div>
              {/* Step 3: Encrypted Request */}
              <div className={`line relative flex items-center w-full h-0.5 transition-opacity duration-500 ${step >= 3 ? 'opacity-100' : 'opacity-0'}`}>
                <div className={`packet absolute w-4 h-4 rounded-sm border-2 border-white bg-zinc-300 z-10 top-1/2 -translate-y-1/2 ${step === 3 && isAnimating ? 'animate-move-right' : 'opacity-0'}`}></div>
                <div className="absolute bg-zinc-950 px-1 font-bold text-zinc-300 text-base top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap">Encrypted Request</div>
                <div className="absolute w-0 h-0 border-solid border-y-[8px] border-l-[12px] border-transparent border-l-zinc-300 top-1/2 -translate-y-1/2 right-0"></div>
              </div>
              {/* Step 4: Encrypted Response */}
              <div className={`line relative flex items-center w-full h-0.5 transition-opacity duration-500 ${step >= 4 ? 'opacity-100' : 'opacity-0'}`}>
                <div className={`packet absolute w-4 h-4 rounded-sm border-2 border-white bg-zinc-300 z-10 top-1/2 -translate-y-1/2 right-0 ${step === 4 && isAnimating ? 'animate-move-left' : 'opacity-0'}`}></div>
                <div className="absolute bg-zinc-950 px-1 font-bold text-zinc-300 text-base top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap">Encrypted Response</div>
                <div className="absolute w-0 h-0 border-solid border-y-[8px] border-r-[12px] border-transparent border-r-zinc-300 top-1/2 -translate-y-1/2 left-0"></div>
              </div>
              {/* Step 5: Data Transfer */}
              <div className={`line relative flex items-center w-full h-0.5 transition-opacity duration-500 ${step >= 5 ? 'opacity-100' : 'opacity-0'}`}>
                <div className={`packet absolute w-4 h-4 rounded-sm border-2 border-white bg-zinc-300 z-10 top-1/2 -translate-y-1/2 ${step === 5 && isAnimating ? 'animate-move-right' : 'opacity-0'}`}></div>
                <div className="absolute bg-zinc-950 px-1 font-bold text-zinc-300 text-base top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap">Data Transfer</div>
                <div className="absolute w-0 h-0 border-solid border-y-[8px] border-l-[12px] border-transparent border-l-zinc-300 top-1/2 -translate-y-1/2 right-0"></div>
              </div>
            </div>
            
            {/* Server Device */}
            <div className="flex flex-col items-center gap-4 flex-shrink-0">
              <div className="flex flex-col gap-2">
                <div className="w-24 h-8 bg-zinc-600 rounded-md border border-zinc-400 shadow-inner relative before:content-[''] before:absolute before:top-1/2 before:left-2 before:-translate-y-1/2 before:w-2 before:h-2 before:rounded-full before:bg-zinc-300 before:shadow-[0_0_5px_#bdbdbd]"></div>
                <div className="w-24 h-8 bg-zinc-600 rounded-md border border-zinc-400 shadow-inner relative before:content-[''] before:absolute before:top-1/2 before:left-2 before:-translate-y-1/2 before:w-2 before:h-2 before:rounded-full before:bg-zinc-300 before:shadow-[0_0_5px_#bdbdbd]"></div>
                <div className="w-24 h-8 bg-zinc-600 rounded-md border border-zinc-400 shadow-inner relative before:content-[''] before:absolute before:top-1/2 before:left-2 before:-translate-y-1/2 before:w-2 before:h-2 before:rounded-full before:bg-zinc-300 before:shadow-[0_0_5px_#bdbdbd]"></div>
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
                <p className="text-lg text-zinc-300">Click the Start button to see a secure file being transferred via HTTPS.</p>
              </>
            )}
            {stepsData.slice(0, step).map((item, index) => (
              <div key={index} className="pb-4 mb-4 border-b border-dashed border-zinc-700 last:border-b-0">
                <h2 className="text-xl font-bold text-white mb-2">{item.title}</h2>
                <p className="text-lg text-zinc-400" dangerouslySetInnerHTML={{ __html: item.description }}></p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-4 mt-6">
        <button onClick={handleToggleAnimation} disabled={step > stepsData.length} className="px-6 py-3 rounded-lg border-none font-bold cursor-pointer transition-colors duration-300 bg-zinc-300 text-zinc-950 hover:bg-zinc-400 disabled:bg-zinc-700 disabled:text-zinc-500 disabled:cursor-not-allowed">
          {isAnimating ? 'Pause' : 'Start'}
        </button>
        <button onClick={handleReset} className="px-6 py-3 rounded-lg border border-zinc-700 font-bold cursor-pointer transition-colors duration-300 bg-transparent text-white hover:bg-zinc-800">Reset</button>
      </div>

      <div className="bg-zinc-800 p-6 rounded-xl shadow-lg border border-zinc-700 flex flex-col items-center justify-center mt-8 w-full max-w-7xl">
        <h2 className="text-2xl font-semibold text-white">HTTPS Features & Security</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-6 w-full">
          <div className="bg-zinc-700 p-6 rounded-lg border border-zinc-600 flex flex-col items-center text-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shield-check text-zinc-300">
              <path d="M12 19.5 6 16V6l6-3 6 3v10l-6 3z" />
              <path d="m9 12 2 2 4-4" />
            </svg>
            <h3 className="text-xl font-bold text-zinc-300 mt-4 mb-2">End-to-End Encryption</h3>
            <p className="text-lg text-zinc-400 leading-relaxed">
              HTTPS encrypts all data in transit, protecting against eavesdropping,
              man-in-the-middle attacks, and tampering.
            </p>
          </div>
          <div className="bg-zinc-700 p-6 rounded-lg border border-zinc-600 flex flex-col items-center text-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-certificate text-zinc-300">
              <path d="M20.5 15c-1.5 0-3-2.5-3-2.5V2.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v10c0 0 1.5 2.5 0 2.5z" />
              <path d="M12 21H6a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2h12a2 2 0 0 1 2 2v2" />
              <line x1="7" x2="17" y1="21" y2="21" />
              <line x1="7" x2="17" y1="17" y2="17" />
            </svg>
            <h3 className="text-xl font-bold text-zinc-300 mt-4 mb-2">Authentication</h3>
            <p className="text-lg text-zinc-400 leading-relaxed">
              The TLS handshake uses digital certificates to verify the identity of the server, ensuring the client is communicating with the intended website.
            </p>
          </div>
          <div className="bg-zinc-700 p-6 rounded-lg border border-zinc-600 flex flex-col items-center text-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-fingerprint text-zinc-300">
              <path d="M2 12a10 10 0 0 1 10-10c.83 0 1.64.09 2.41.26" />
              <path d="M22 12a10 10 0 0 1-10 10c-.83 0-1.64-.09-2.41-.26" />
              <path d="M10 2c-.83 0-1.64.09-2.41.26" />
              <path d="M8 11.5c.5-2 2-3.5 4-3.5 2.15 0 3.8 1.65 4 3.5" />
              <path d="M17 6.5c-1.5 0-3.5 1-4.5 2.5" />
              <path d="M14 11.5c-.25-1.5-1.2-3-2.5-3" />
              <path d="M11 11.5c.25-1.5 1.2-3 2.5-3" />
              <path d="M10 16c-1.5-1-2.5-3-2.5-3" />
              <path d="M9 14.5c.5 1.5 2 2.5 4 2.5s3.5-1 4-2.5" />
            </svg>
            <h3 className="text-xl font-bold text-zinc-300 mt-4 mb-2">Data Integrity</h3>
            <p className="text-lg text-zinc-400 leading-relaxed">
              The TLS protocol uses cryptographic checksums to detect any changes to the data in transit,
              preventing malicious actors from altering the information.
            </p>
          </div>
        </div>
      </div>
      <style jsx>{`
        .line {
          background-image: repeating-linear-gradient(90deg, #bdbdbd 0, #bdbdbd 5px, transparent 5px, transparent 10px);
          background-size: 10px 1px;
        }

        .packet {
          animation-duration: 2.5s;
          animation-timing-function: linear;
          animation-fill-mode: forwards;
        }

        .animate-move-right {
          animation-name: move-packet-right;
        }
        
        .animate-move-left {
            animation-name: move-packet-left;
        }

        @keyframes move-packet-right {
          0% {
            left: 0;
            opacity: 1;
          }
          95% {
            left: calc(100% - 16px);
            opacity: 1;
          }
          100% {
            left: calc(100% - 16px);
            opacity: 0;
          }
        }
        
        @keyframes move-packet-left {
          0% {
            left: calc(100% - 16px);
            opacity: 1;
          }
          95% {
            left: 0;
            opacity: 1;
          }
          100% {
            left: 0;
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default App;
