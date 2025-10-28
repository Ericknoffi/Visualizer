"use client";
import React, { useState, useEffect, useRef } from 'react';

const stepsData = [
  {
    "title": "Step 1: Control Connection",
    "description": "Your computer talks to the FTP server on the main channel (Port 21). Like telling a game server, 'I want to trade items.'"
  },
  {
    "title": "Step 2: Passive Mode Response",
    "description": "The server replies with a new channel (data port). Like the game server saying, 'Use this slot to trade.'"
  },
  {
    "title": "Step 3: Data Connection",
    "description": "Your computer opens that channel (data connection). Like entering a private game room for the trade."
  },
  {
    "title": "Step 4: File Transfer",
    "description": "The file moves through the channel. Like swapping the item inside the room."
  },
  {
    "title": "Step 5: Transfer Complete",
    "description": "The trade channel closes, but the main channel (control connection) stays open for more trades."
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
        }, 5000); // Increased duration to make it slower
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

  const TrainIcon = ({ className }) => (
    <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 462 462" xmlSpace="preserve" className={`text-yellow-400 w-10 h-10 ${className}`} fill="currentColor">
      <g>
        <g>
          <polygon points="291,58.296 291,41.796 171,41.796 171,58.296 0,58.296 0,98.296 211,98.296 211,158.624 251,158.624 251,98.296 462,98.296 462,58.296"/>
          <path d="M86.488,168.392l-23.896,23.896v204.02l23.896,23.896h289.023l23.896-23.896v-204.02l-23.896-23.896H86.488z M215.727,295.296H95.437v-87.641l8.745-8.745h111.545V295.296z M366.562,295.296H246.273v-96.386h111.545l8.744,8.745V295.296z"/>
        </g>
      </g>
    </svg>
  );

  const PacketTitle = ({ title, className }) => (
      <span className={`whitespace-nowrap font-bold text-lg text-yellow-400 absolute top-[-30px] ${className}`}>
        {title}
      </span>
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-zinc-950 font-['Inter']">
      <div className="absolute top-4 left-4">
        <button
          onClick={handleGoBack}
          className="flex items-center space-x-2 text-yellow-400 hover:text-yellow-300 transition-colors duration-300"
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
        <h1 className="text-5xl font-bold text-yellow-400">File Transfer Protocol (FTP)</h1>
        <p className="text-xl text-zinc-400">
          A visualization of how a client and server transfer a resource.
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
                {/* Line 1: Control (top track) */}
                <div className={`line-container relative flex items-center w-full h-0.5 transition-opacity duration-500 opacity-100 ${isAnimating && (step === 1 || step === 3) ? 'animate-track-right' : ''}`}>
                    <div className="absolute bg-zinc-950 px-1 font-bold text-yellow-400 text-base top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap">{(step < 3) ? 'Control (Port 21)' : 'Data Connection'}</div>
                    <div className="absolute w-0 h-0 border-solid border-y-[8px] border-l-[12px] border-transparent border-l-yellow-400 top-1/2 -translate-y-1/2 right-0"></div>
                </div>

                {/* Line 2: Data (bottom track) */}
                <div className={`line-container relative flex items-center w-full h-0.5 transition-opacity duration-500 opacity-100 ${isAnimating && (step === 2 || step === 4) ? 'animate-track-left' : ''}`}>
                    <div className="absolute bg-zinc-950 px-1 font-bold text-yellow-400 text-base top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap">{(step < 3) ? 'Data Connection' : 'Control (Port 21)'}</div>
                    <div className="absolute w-0 h-0 border-solid border-y-[8px] border-r-[12px] border-transparent border-r-yellow-400 top-1/2 -translate-y-1/2 left-0"></div>
                </div>

                {/* Single Train */}
                <div className={`train-packet absolute z-10 flex flex-col items-center
                  ${step === 1 && isAnimating ? 'animate-move-right-step-1' : ''}
                  ${step === 2 && isAnimating ? 'animate-move-left-step-2' : ''}
                  ${step === 3 && isAnimating ? 'animate-move-right-step-3' : ''}
                  ${step === 4 && isAnimating ? 'animate-move-left-step-4' : ''}
                  ${step < 1 || step > 4 ? 'opacity-0' : 'opacity-100'}
                  ${step === 1 && !isAnimating ? 'left-[calc(100%-40px)] top-[45px]' : ''}
                  ${step === 2 && !isAnimating ? 'left-0 top-[173px]' : ''}
                  ${step === 3 && !isAnimating ? 'left-[calc(100%-40px)] top-[45px]' : ''}
                  ${step === 4 && !isAnimating ? 'left-0 top-[173px]' : ''}
                `}>
                  {(step > 0 && step < 5) && <PacketTitle title={stepsData[step - 1].title.split(':')[1].trim()} />}
                  <TrainIcon />
                </div>
            </div>
            
            {/* Server Device */}
            <div className="flex flex-col items-center gap-4 flex-shrink-0">
              <div className="flex flex-col gap-2">
                <div className="w-24 h-8 bg-zinc-600 rounded-md border border-zinc-400 shadow-inner relative before:content-[''] before:absolute before:top-1/2 before:left-2 before:-translate-y-1/2 before:w-2 before:h-2 before:rounded-full before:bg-yellow-400 before:shadow-[0_0_5px_#facc15]"></div>
                <div className="w-24 h-8 bg-zinc-600 rounded-md border border-zinc-400 shadow-inner relative before:content-[''] before:absolute before:top-1/2 before:left-2 before:-translate-y-1/2 before:w-2 before:h-2 before:rounded-full before:bg-yellow-400 before:shadow-[0_0_5px_#facc15]"></div>
                <div className="w-24 h-8 bg-zinc-600 rounded-md border border-zinc-400 shadow-inner relative before:content-[''] before:absolute before:top-1/2 before:left-2 before:-translate-y-1/2 before:w-2 before:h-2 before:rounded-full before:bg-yellow-400 before:shadow-[0_0_5px_#facc15]"></div>
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
                <p className="text-lg text-zinc-300">Click the Start button to see a file being transferred via FTP in Passive Mode.</p>
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
        <button onClick={handleToggleAnimation} disabled={step > stepsData.length} className="px-6 py-3 rounded-lg border-none font-bold cursor-pointer transition-colors duration-300 bg-yellow-400 text-zinc-950 hover:bg-yellow-500 disabled:bg-zinc-700 disabled:text-zinc-500 disabled:cursor-not-allowed">
          {isAnimating ? 'Pause' : 'Start'}
        </button>
        <button onClick={handleReset} className="px-6 py-3 rounded-lg border border-zinc-700 font-bold cursor-pointer transition-colors duration-300 bg-transparent text-white hover:bg-zinc-800">Reset</button>
      </div>

      <div className="bg-zinc-800 p-6 rounded-xl shadow-lg border border-zinc-700 flex flex-col items-center justify-center mt-8 w-full max-w-7xl">
        <h2 className="text-2xl font-semibold text-white">FTP Applications & Alternatives</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-6 w-full">
          <div className="bg-zinc-700 p-6 rounded-lg border border-zinc-600 flex flex-col items-center text-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-folder-archive text-yellow-400">
              <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-8a2 2 0 0 1-1.41-2.41L9 2H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2Z"/>
              <path d="M10 12h4"/>
              <path d="M12 10v4"/>
            </svg>
            <h3 className="text-xl font-bold text-yellow-400 mt-4 mb-2">Legacy File Hosting</h3>
            <p className="text-lg text-zinc-400 leading-relaxed">FTP is still used for transferring files in some legacy systems and web hosting environments where security is not a primary concern.</p>
          </div>
          <div className="bg-zinc-700 p-6 rounded-lg border border-zinc-600 flex flex-col items-center text-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-cloud-upload text-yellow-400">
              <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/>
              <path d="M12 12v9"/>
              <path d="m16 16-4-4-4 4"/>
            </svg>
            <h3 className="text-xl font-bold text-yellow-400 mt-4 mb-2">SFTP (Secure Alternative)</h3>
            <p className="text-lg text-zinc-400 leading-relaxed">SFTP encrypts both commands and data, making it the preferred and most secure method for file transfers today.</p>
          </div>
          <div className="bg-zinc-700 p-6 rounded-lg border border-zinc-600 flex flex-col items-center text-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file-lock text-yellow-400">
              <path d="M14 2v4a2 2 0 0 0 2 2h4"/>
              <path d="M10 22H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8l6 6v4"/>
              <rect width="8" height="5" x="2" y="15" rx="1"/>
              <path d="M7 15v-2c0-1.1-1.34-2-3-2S1 13.9 1 15v2h6Z"/>
            </svg>
            <h3 className="text-xl font-bold text-yellow-400 mt-4 mb-2">FTPS (Secure Alternative)</h3>
            <p className="text-lg text-zinc-400 leading-relaxed">FTPS adds a layer of SSL/TLS encryption to standard FTP, securing login credentials and data packets.</p>
          </div>
        </div>
      </div>
      <style jsx>{`
        .line-container {
          background-image: repeating-linear-gradient(90deg, #facc15 0, #facc15 5px, transparent 5px, transparent 10px);
          background-size: 10px 1px;
        }

        .train-packet {
          animation-duration: 5s;
          animation-timing-function: linear;
          animation-fill-mode: forwards;
        }

        .animate-move-right-step-1 {
          animation-name: move-right-step-1;
        }

        .animate-move-left-step-2 {
          animation-name: move-left-step-2;
        }
        
        .animate-move-right-step-3 {
          animation-name: move-right-step-3;
        }
        
        .animate-move-left-step-4 {
          animation-name: move-left-step-4;
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
        
        @keyframes move-right-step-1 {
          0% {
            left: 0;
            top: 45px;
          }
          100% {
            left: calc(100% - 40px);
            top: 45px;
          }
        }

        @keyframes move-left-step-2 {
          0% {
            left: calc(100% - 40px);
            top: 173px;
          }
          100% {
            left: 0;
            top: 173px;
          }
        }
        
        @keyframes move-right-step-3 {
          0% {
            left: 0;
            top: 45px;
          }
          100% {
            left: calc(100% - 40px);
            top: 45px;
          }
        }
        
        @keyframes move-left-step-4 {
          0% {
            left: calc(100% - 40px);
            top: 173px;
          }
          100% {
            left: 0;
            top: 173px;
          }
        }
        
      `}</style>
    </div>
  );
};

export default App;
