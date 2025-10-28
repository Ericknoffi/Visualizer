'use client';
import React, { useState, useEffect } from 'react';

const stepsData = [
  {
    "title": "Step 1: Synchronize (SYN)",
    "description": "One friend sends a message: 'Hey bro, you free to talk?' 📩 This is the client sending a SYN packet.",
    "packet": "SYN"
  },
  {
    "title": "Step 2: Acknowledge (SYN + ACK)",
    "description": "The other friend replies: 'Yeah, I’m here! Wanna chat?' 🙌 This is the server sending a SYN + ACK back.",
    "packet": "SYN + ACK"
  },
  {
    "title": "Step 3: Establish (ACK)",
    "description": "The first friend confirms: 'Cool, let’s talk then!' 🎉 That’s the client sending an ACK, and now both friends are ready to chat.",
    "packet": "ACK"
  }
];

const App = () => {
  const [step, setStep] = useState(0);
  const [animationKey, setAnimationKey] = useState(0);
  const [isAutomatic, setIsAutomatic] = useState(false);

  const runNextStep = () => {
    if (step < stepsData.length) {
      setStep(prevStep => prevStep + 1);
      setAnimationKey(prevKey => prevKey + 1);
    }
  };

  const toggleAutomatic = () => {
    setIsAutomatic(!isAutomatic);
  };

  const handleReset = () => {
    setStep(0);
    setAnimationKey(0);
    setIsAutomatic(false);
  };
  
  const handleGoBack = () => {
    window.location.href = '/';
  };

  useEffect(() => {
    let timer;
    if (isAutomatic && step < stepsData.length) {
      timer = setTimeout(() => {
        runNextStep();
      }, 2000);
    }
    return () => clearTimeout(timer);
  }, [step, isAutomatic]);

  const getPacketAnimationClass = () => {
    switch (step) {
      case 1:
      case 3:
        return 'animate-fly-right';
      case 2:
        return 'animate-fly-left';
      default:
        return '';
    }
  };
  
  const isCannonFiring = (isClient) => {
    if (isClient) {
      return step === 1 || step === 3;
    } else {
      return step === 2;
    }
  };

  const getPacketText = () => {
    if (step > 0 && step <= stepsData.length) {
      return stepsData[step - 1].packet;
    }
    return '';
  };
  
  const ApplicationCard = ({ icon, title, description }) => (
    <div className="bg-zinc-700 p-6 rounded-lg border border-zinc-600 flex flex-col items-center text-center">
      {icon}
      <h3 className="text-xl font-bold text-blue-500 mt-4 mb-2">{title}</h3>
      <p className="text-lg text-zinc-400 leading-relaxed">{description}</p>
    </div>
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-zinc-950 font-['Inter']">
      <div className="absolute top-4 left-4">
        <button
          onClick={handleGoBack}
          className="flex items-center space-x-2 text-blue-500 hover:text-blue-400 transition-colors duration-300"
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
        <h1 className="text-5xl font-bold text-blue-500">TCP Three-Way Handshake</h1>
        <p className="text-xl text-zinc-400">
          A visualization of how a client and server establish a connection.
        </p>
      </div>
      <div className="flex flex-col lg:flex-row gap-8 w-full max-w-7xl items-stretch justify-center">
        <div className="bg-zinc-800 p-6 rounded-xl shadow-lg border border-zinc-700 flex flex-col flex-grow items-center justify-center min-h-[500px]">
          <div className="relative flex w-full h-full items-center justify-between">
            
            {/* Client Device */}
            <div className="relative flex flex-col items-center gap-4 flex-shrink-0">
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

            {/* Animation Container */}
            <div className="relative flex flex-grow h-full justify-between items-center mx-16">
              {/* Client Cannon */}
              <div className={`absolute left-0 top-1/2 -translate-y-1/2 z-0 transition-transform duration-500 ${isCannonFiring(true) ? 'rotate-[30deg]' : 'rotate-0'}`}>
                <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" 
                  viewBox="0 0 297 297" className="w-16 h-16 text-blue-500" fill="currentColor" style={{ transform: 'scaleX(-1)' }}> 
                  <g> 
                    <path d="M253.972,56.097L21.387,44.913c-4.726-0.227-8.935,3.086-9.803,7.762L0.16,114.354c-0.865,4.676,1.856,9.271,6.372,10.759 
                      l118.525,39.05l-9.814,37.563h-11.111c-5.249,0-9.505,4.256-9.505,9.505v31.364c0,5.249,4.256,9.504,9.505,9.504H229.59 
                      c5.249,0,9.505-4.255,9.505-9.504V211.23c0-5.249-4.256-9.505-9.505-9.505h-12.645l-3.259-8.362l14.004,4.613 
                      c3.744,1.096,7.568,0.128,7.568,0.128c31.863-8.02,55.057-31.352,60.529-60.888c5.471-29.536-7.827-59.627-34.703-78.529 
                      C261.085,58.687,258.087,56.51,253.972,56.097z M28.764,64.299L244.43,74.668l-18.997,102.551l-205.07-67.565L28.764,64.299z 
                      M201.593,214.68c1.423,3.65,4.939,6.054,8.855,6.054h9.637v12.355H113.636v-12.355h8.946c4.323,0,8.103-2.918,9.195-7.102 
                      l11.368-43.51l47.134,15.528L201.593,214.68z M277.096,133.754c-3.228,17.427-14.952,32.038-31.778,40.484l16.609-89.666 
                      C274.612,98.486,280.324,116.327,277.096,133.754z"/> 
                    <circle cx="166.861" cy="195.547" r="9.505"/> 
                  </g> 
                </svg>
              </div>

              {/* Packets */}
              {step > 0 && step < 4 && (
                <div key={animationKey} className={`absolute w-4 h-4 bg-blue-500 rounded-full shadow-lg z-10 ${getPacketAnimationClass()}`}>
                  <span className="absolute bottom-full mb-2 whitespace-nowrap text-sm text-blue-500 transform -translate-x-1/2 left-1/2">{getPacketText()}</span>
                </div>
              )}

              {/* Server Cannon */}
              <div className={`absolute right-0 top-1/2 -translate-y-1/2 transition-transform duration-500 ${isCannonFiring(false) ? 'rotate-[-30deg]' : 'rotate-0'}`}>
                <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" 
                  viewBox="0 0 297 297" className="w-16 h-16 text-blue-500" fill="currentColor"> 
                  <g> 
                    <path d="M253.972,56.097L21.387,44.913c-4.726-0.227-8.935,3.086-9.803,7.762L0.16,114.354c-0.865,4.676,1.856,9.271,6.372,10.759 
                      l118.525,39.05l-9.814,37.563h-11.111c-5.249,0-9.505,4.256-9.505,9.505v31.364c0,5.249,4.256,9.504,9.505,9.504H229.59 
                      c5.249,0,9.505-4.255,9.505-9.504V211.23c0-5.249-4.256-9.505-9.505-9.505h-12.645l-3.259-8.362l14.004,4.613 
                      c3.744,1.096,7.568,0.128,7.568,0.128c31.863-8.02,55.057-31.352,60.529-60.888c5.471-29.536-7.827-59.627-34.703-78.529 
                      C261.085,58.687,258.087,56.51,253.972,56.097z M28.764,64.299L244.43,74.668l-18.997,102.551l-205.07-67.565L28.764,64.299z 
                      M201.593,214.68c1.423,3.65,4.939,6.054,8.855,6.054h9.637v12.355H113.636v-12.355h8.946c4.323,0,8.103-2.918,9.195-7.102 
                      l11.368-43.51l47.134,15.528L201.593,214.68z M277.096,133.754c-3.228,17.427-14.952,32.038-31.778,40.484l16.609-89.666 
                      C274.612,98.486,280.324,116.327,277.096,133.754z"/> 
                    <circle cx="166.861" cy="195.547" r="9.505"/> 
                  </g> 
                </svg>
              </div>
            </div>

            {/* Server Device */}
            <div className="relative flex flex-col items-center gap-4 flex-shrink-0">
              <div className="flex flex-col gap-2">
                <div className="w-24 h-8 bg-zinc-600 rounded-md border border-zinc-400 shadow-inner relative before:content-[''] before:absolute before:top-1/2 before:left-2 before:-translate-y-1/2 before:w-2 before:h-2 before:rounded-full before:bg-blue-500 before:shadow-[0_0_5px_#3b82f6]"></div>
                <div className="w-24 h-8 bg-zinc-600 rounded-md border border-zinc-400 shadow-inner relative before:content-[''] before:absolute before:top-1/2 before:left-2 before:-translate-y-1/2 before:w-2 before:h-2 before:rounded-full before:bg-blue-500 before:shadow-[0_0_5px_#3b82f6]"></div>
                <div className="w-24 h-8 bg-zinc-600 rounded-md border border-zinc-400 shadow-inner relative before:content-[''] before:absolute before:top-1/2 before:left-2 before:-translate-y-1/2 before:w-2 before:h-2 before:rounded-full before:bg-blue-500 before:shadow-[0_0_5px_#3b82f6]"></div>
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
                <p className="text-lg text-zinc-300">Click the Next Step button to see the TCP three-way handshake in action.</p>
              </>
            )}
            {stepsData.slice(0, step).map((item, index) => (
              <div key={index} className="pb-4 mb-4 border-b border-dashed border-zinc-700 last:border-b-0">
                <h2 className="text-xl font-bold text-white mb-2">{item.title}</h2>
                <p className="text-lg text-zinc-400" dangerouslySetInnerHTML={{ __html: item.description }}></p>
              </div>
            ))}
            {step >= stepsData.length + 1 && (
              <div className="pb-4 mb-4 border-b border-dashed border-zinc-700 last:border-b-0">
                <h2 className="text-xl font-bold text-white mb-2">Connection Established</h2>
                <p className="text-lg text-zinc-400">The TCP connection is now open, and both the client and server can begin to exchange data.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-4 mt-6">
        <button onClick={toggleAutomatic} disabled={step >= stepsData.length} className="px-6 py-3 rounded-lg border-none font-bold cursor-pointer transition-colors duration-300 bg-blue-500 text-zinc-950 hover:bg-blue-400 disabled:bg-zinc-700 disabled:text-zinc-500 disabled:cursor-not-allowed">
          {isAutomatic ? 'Pause' : 'Start'}
        </button>
        <button onClick={handleReset} className="px-6 py-3 rounded-lg border border-zinc-700 font-bold cursor-pointer transition-colors duration-300 bg-transparent text-white hover:bg-zinc-800">Reset</button>
      </div>
      <div className="mt-12 text-center w-full max-w-7xl">
        <div className="bg-zinc-800 p-6 rounded-xl shadow-lg border border-zinc-700">
          <h2 className="text-2xl font-semibold text-white mb-6">TCP in the Real World</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ApplicationCard
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail text-blue-500">
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              }
              title="Email Services (SMTP/POP3)"
              description="Email protocols like SMTP and POP3 rely on TCP to ensure that every part of a message, including attachments, is delivered correctly and in the right order. Lost data is automatically resent."
            />
            <ApplicationCard
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-globe text-blue-500">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                  <path d="M2 12h20" />
                </svg>
              }
              title="Web Browsing (HTTP/HTTPS)"
              description="When you browse the web, TCP ensures that the server's response (HTML, CSS, images, etc.) is fully and correctly assembled by your browser. This guarantees the page loads exactly as intended."
            />
            <ApplicationCard
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file-text text-blue-500">
                  <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L15 2z" />
                  <path d="M14 2v6h6" />
                  <path d="M10 12H8" />
                  <path d="M16 12H8" />
                  <path d="M16 16H8" />
                </svg>
              }
              title="File Transfer (FTP/SFTP)"
              description="For file transfers, TCP's reliability is crucial. It ensures that the entire file, without any missing parts, is successfully sent to the destination. TCP handles packet loss and reordering automatically."
            />
          </div>
        </div>
      </div>
      <style jsx>{`
        @keyframes fly-right {
          0% {
            left: 0%;
            transform: translateX(4rem) translateY(0);
          }
          50% {
            left: 50%;
            transform: translateX(0) translateY(-80px);
          }
          100% {
            left: 100%;
            transform: translateX(-4rem) translateY(0);
          }
        }
        @keyframes fly-left {
          0% {
            left: 100%;
            transform: translateX(-4rem) translateY(0);
          }
          50% {
            left: 50%;
            transform: translateX(0) translateY(-80px);
          }
          100% {
            left: 0%;
            transform: translateX(4rem) translateY(0);
          }
        }
        
        .animate-fly-right {
          animation: fly-right 2s ease-in-out forwards;
        }
        .animate-fly-left {
          animation: fly-left 2s ease-in-out forwards;
        }
      `}</style>
    </div>
  );
};

export default App;
