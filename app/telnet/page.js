"use client";
import React, { useState, useEffect, useRef } from 'react';

const stepsData = [
  {
    "title": "Step 1: Connection Request",
    "description": "The client attempts to establish a connection with the Telnet server on TCP Port 23. This is the initial handshake. 🤝"
  },
  {
    "title": "Step 2: Connection Established",
    "description": "The server accepts the connection and sends a prompt, indicating the virtual terminal session is open and ready to receive commands."
  },
  {
    "title": "Step 3: Command Sent",
    "description": "The client sends a command (e.g., 'ls' or 'dir') to the server over the established session."
  },
  {
    "title": "Step 4: Server Processing",
    "description": "The server executes the command and prepares the output. This usually involves very little network traffic."
  },
  {
    "title": "Step 5: Output Sent",
    "description": "The server sends the resulting command output (e.g., a file list) back to the client for display."
  },
  {
    "title": "Step 6: Session Continues",
    "description": "The client displays the output. The connection remains open and ready for the next command, maintaining the interactive session."
  },
  {
    "title": "Session Established",
    "description": "The client and server have completed a command cycle. Telnet maintains a bidirectional, interactive session for further remote control. 💻"
  }
];

// Race Car SVG Icon (from the user)
const RaceCarIcon = ({ className, style }) => (
  <svg fill="currentColor" width="40" height="40" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg" className={className} style={style}>
    <path d="M1 9 A 1 1 0 0 0 0 10 A 1 1 0 0 0 0.0546875 10.324219L0.06640625 10.359375 A 1 1 0 0 0 0.068359375 10.365234L1 13L1 17 A 1 1 0 0 0 1.3027344 17.714844L1.3027344 17.716797L1.3203125 17.732422 A 1 1 0 0 0 1.3710938 17.777344L3.109375 19.322266C3.4845211 20.849615 4.863228 22 6.5 22C7.4442457 22 8.3035013 21.615993 8.9355469 21L15 21L21.064453 21C21.696499 21.615993 22.555754 22 23.5 22C24.444246 22 25.303501 21.615993 25.935547 21L27 21 A 1 1 0 0 0 27.710938 20.703125L29.697266 18.716797 A 1 1 0 0 0 29.720703 18.693359L29.720703 18.691406 A 1 1 0 0 0 30 18 A 1 1 0 0 0 29.367188 17.070312C28.575364 16.686866 27.360565 16.319879 25.9375 16.001953C25.305275 15.384832 24.445227 15 23.5 15C22.975667 15 22.481401 15.125864 22.033203 15.335938C20.352604 15.127354 18.610562 15 17 15L15 15L15 13 A 1 1 0 0 0 14 12 A 1 1 0 0 0 13.929688 12.001953C9.953385 12.013595 6 13 6 13L6 10 A 1 1 0 0 0 5 9L1 9 z M 6.5 17C7.3402718 17 8 17.659728 8 18.5C8 19.340272 7.3402718 20 6.5 20C5.6597282 20 5 19.340272 5 18.5C5 17.659728 5.6597282 17 6.5 17 z M 23.5 17C24.340272 17 25 17.659728 25 18.5C25 19.340272 24.340272 20 23.5 20C22.659728 20 22 19.340272 22 18.5C22 17.659728 22.659728 17 23.5 17 z"/>
  </svg>
);


const PacketTitle = ({ title, className }) => (
  <span className={`whitespace-nowrap font-bold text-lg text-green-400 absolute top-[-30px] ${className}`}>
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
    let scaleX = 1; // Default for moving right

    // The pattern is: Top Track (Request), Bottom Track (Reply)
    // Step 1: Connection Request (Top Track)
    if (currentStep > 0 && currentStep <= 10) {
      left = (currentStep / 9) * 85;
      top = 45;
      opacity = 1;
      title = stepsData[0].title;
      scaleX = 1; // Facing right
    } 
    // Step 2: Connection Established (Bottom Track)
    else if (currentStep > 10 && currentStep <= 20) {
      left = (1 - ((currentStep - 10) / 9)) * 85;
      top = 173;
      opacity = 1;
      title = stepsData[1].title;
      scaleX = -1; // Facing left
    } 
    // Step 3: Command Sent (Top Track)
    else if (currentStep > 20 && currentStep <= 30) {
      left = ((currentStep - 20) / 9) * 85;
      top = 45;
      opacity = 1;
      title = stepsData[2].title;
      scaleX = 1; // Facing right
    } 
    // Step 4: Server Processing (No movement, slight pause after 30, before 41)
    // Step 5: Output Sent (Bottom Track)
    else if (currentStep > 40 && currentStep <= 50) {
      left = (1 - ((currentStep - 40) / 9)) * 85;
      top = 173;
      opacity = 1;
      title = stepsData[4].title;
      scaleX = -1; // Facing left
    } 
    // Additional Command/Next Cycle (Step 6) - Using the next request (Step 3 again)
    else if (currentStep > 50 && currentStep <= 60) {
      left = ((currentStep - 50) / 9) * 85;
      top = 45;
      opacity = 1;
      title = stepsData[5].title;
      scaleX = 1; // Facing right
    } else {
      opacity = 0;
    }
    
    // Override Title for Pause Steps (Steps 2 and 4)
    if (currentStep > 10 && currentStep <= 11) { title = stepsData[1].title; opacity = 0; } // End of Step 1, Start of Step 2
    if (currentStep > 20 && currentStep <= 30) { title = stepsData[2].title; } // Command Sent
    if (currentStep > 30 && currentStep <= 40) { title = stepsData[3].title; opacity = 0; } // Server Processing/Pause

    return {
      style: {
        left: `calc(${left}% - 24px)`,
        // Adjusted top position: 45px for top track (request) -> 30px (15px higher)
        // 173px for bottom track (reply) -> 158px (15px higher)
        top: `${top === 45 ? 30 : top === 173 ? 158 : top}px`,
        opacity: opacity,
        transform: `scaleX(${scaleX})`, // Apply scaleX for direction
        transition: 'left 0.25s linear, top 0.25s linear, transform 0.25s linear'
      },
      title: title,
      scaleX: scaleX
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
  // Ensure we include the final step description
  const finalStepsData = step > totalSteps ? [...stepsData, stepsData[stepsData.length - 1]] : stepsData;
  const visibleSteps = finalStepsData.slice(0, visibleStepIndex + 1);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-zinc-950 font-['Inter']">
      <div className="absolute top-4 left-4">
        <button
          onClick={handleGoBack}
          className="flex items-center space-x-2 text-green-400 hover:text-green-300 transition-colors duration-300"
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
        <h1 className="text-5xl font-bold text-green-400">Telnet Protocol Visualization</h1>
        <p className="text-xl text-zinc-400">
          A step-by-step look at establishing and using a remote terminal session.
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
              <div className={`line-container relative flex items-center w-full h-0.5 transition-opacity duration-500 opacity-100 ${isAnimating && (step >= 1 && step <= 10 || step >= 21 && step <= 30 || step >= 51 && step <= 60) ? 'animate-track-right' : ''}`}>
                <div className="absolute w-0 h-0 border-solid border-y-[8px] border-l-[12px] border-transparent border-l-green-400 top-1/2 -translate-y-1/2 right-0"></div>
              </div>
              {/* Reply (bottom track) */}
              <div className={`line-container relative flex items-center w-full h-0.5 transition-opacity duration-500 opacity-100 ${isAnimating && (step >= 11 && step <= 20 || step >= 41 && step <= 50) ? 'animate-track-left' : ''}`}>
                <div className="absolute w-0 h-0 border-solid border-y-[8px] border-r-[12px] border-transparent border-r-green-400 top-1/2 -translate-y-1/2 left-0"></div>
              </div>
              
              {/* This is the single packet element */}
              {step > 0 && step <= totalSteps && (
                <div 
                  className={`packet absolute z-10 flex flex-col items-center`} 
                  style={{ ...packet.style, transform: 'none', top: packet.style.top }} // Remove transform from outer div
                >
                  {/* Title is positioned relative to the container, not flipped */}
                  <PacketTitle title={packet.title} /> 
                  {/* Icon is flipped based on direction */}
                  <RaceCarIcon className={`text-green-400 w-12 h-12`} style={{ transform: `scaleX(${packet.scaleX})` }} />
                </div>
              )}
            </div>
            
            {/* Server Device */}
            <div className="flex flex-col items-center gap-4 flex-shrink-0">
              <div className="flex flex-col gap-2">
                <div className="w-24 h-8 bg-zinc-600 rounded-md border border-zinc-400 shadow-inner relative before:content-[''] before:absolute before:top-1/2 before:left-2 before:-translate-y-1/2 before:w-2 before:h-2 before:rounded-full before:bg-green-400 before:shadow-[0_0_5px_#4ade80]"></div>
                <div className="w-24 h-8 bg-zinc-600 rounded-md border border-zinc-400 shadow-inner relative before:content-[''] before:absolute before:top-1/2 before:left-2 before:-translate-y-1/2 before:w-2 before:h-2 before:rounded-full before:bg-green-400 before:shadow-[0_0_5px_#4ade80]"></div>
                <div className="w-24 h-8 bg-zinc-600 rounded-md border border-zinc-400 shadow-inner relative before:content-[''] before:absolute before:top-1/2 before:left-2 before:-translate-y-1/2 before:w-2 before:h-2 before:rounded-full before:bg-green-400 before:shadow-[0_0_5px_#4ade80]"></div>
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
                <p className="text-lg text-zinc-300">Click the Start button to see the Telnet command session in action.</p>
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
        <button onClick={handleToggleAnimation} disabled={step >= totalSteps && !isAnimating} className="px-6 py-3 rounded-lg border-none font-bold cursor-pointer transition-colors duration-300 bg-green-400 text-zinc-950 hover:bg-green-500 disabled:bg-zinc-700 disabled:text-zinc-500 disabled:cursor-not-allowed">
          {isAnimating ? 'Pause' : 'Start'}
        </button>
        <button onClick={handleReset} className="px-6 py-3 rounded-lg border border-zinc-700 font-bold cursor-pointer transition-colors duration-300 bg-transparent text-white hover:bg-zinc-800">Reset</button>
      </div>

      <div className="bg-zinc-800 p-6 rounded-xl shadow-lg border border-zinc-700 flex flex-col items-center justify-center mt-8 w-full max-w-7xl">
        <h2 className="text-2xl font-semibold text-white">Telnet vs. SSH</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-6 w-full">
          <div className="bg-zinc-700 p-6 rounded-lg border border-zinc-600 flex flex-col items-center text-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-terminal text-green-400">
              <polyline points="4 17 4 13 8 13"/>
              <line x1="12" y1="13" x2="20" y2="13"/>
              <path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z"/>
            </svg>
            <h3 className="text-xl font-bold text-green-400 mt-4 mb-2">Plain Text Data</h3>
            <p className="text-lg text-zinc-400 leading-relaxed">Telnet transmits all data, including login credentials and commands, in <strong>unencrypted plain text</strong>. This is its primary security vulnerability.</p>
          </div>
          <div className="bg-zinc-700 p-6 rounded-lg border border-zinc-600 flex flex-col items-center text-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-network text-green-400">
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
            <h3 className="text-xl font-bold text-green-400 mt-4 mb-2">Client-Server Communication</h3>
            <p className="text-lg text-zinc-400 leading-relaxed">Telnet operates on a <strong>client-server model</strong>, allowing a user to run command-line interface (CLI) programs on a remote machine.</p>
          </div>
          <div className="bg-zinc-700 p-6 rounded-lg border border-zinc-600 flex flex-col items-center text-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shield-off text-green-400">
              <path d="M19 13.5V16l-6 3-6-3v-4"/>
              <path d="M2 3l20 20"/>
              <path d="M20.5 15c-1.5 0-3-2.5-3-2.5V8.5c0-1.1.9-2 2-2h3c.9 0 1.6.6 1.8 1.5"/>
              <path d="m14 14.5-5 5"/>
              <path d="m22 22-2-2"/>
            </svg>
            <h3 className="text-xl font-bold text-green-400 mt-4 mb-2">Modern Replacement: SSH</h3>
            <p className="text-lg text-zinc-400 leading-relaxed">Telnet has been largely superseded by <strong>SSH (Secure Shell)</strong>, which provides the same functionality but with robust encryption for security.</p>
          </div>
        </div>
      </div>
      <style jsx>{`
        .line-container {
          background-image: repeating-linear-gradient(90deg, #4ade80 0, #4ade80 5px, transparent 5px, transparent 10px);
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
