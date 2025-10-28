'use client';
import React, { useState, useEffect } from 'react';

const stepsData = [
  {
    "title": "Step 1: Client Hello",
    "description": "The client initiates a connection with the server and proposes a list of cryptographic algorithms for encryption and authentication. 🔐",
    "packet": "Client Hello"
  },
  {
    "title": "Step 2: Server Hello",
    "description": "The server responds, selecting the strongest available encryption algorithm and sending its public key to the client for verification. 🤝",
    "packet": "Server Hello"
  },
  {
    "title": "Step 3: Authentication",
    "description": "The client uses the server's public key to verify its authenticity and then sends its own credentials (e.g., username/password or public key) in an encrypted format. ✨",
    "packet": "Authentication"
  },
  {
    "title": "Step 4: Session Established",
    "description": "The server validates the client's credentials, and a secure, encrypted channel is established. Now, file transfers can begin safely. 🎉",
    "packet": "Session Established"
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
    if (step === 1 || step === 3) {
      return 'animate-fly-right';
    } else if (step === 2 || step === 4) {
      return 'animate-fly-left';
    }
    return '';
  };
  
  const isLockTraveling = (isClient) => {
    if (isClient) {
      return step === 1 || step === 3;
    } else {
      return step === 2 || step === 4;
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
      <h3 className="text-xl font-bold text-green-500 mt-4 mb-2">{title}</h3>
      <p className="text-lg text-zinc-400 leading-relaxed">{description}</p>
    </div>
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-zinc-950 font-['Inter']">
      <div className="absolute top-4 left-4">
        <button
          onClick={handleGoBack}
          className="flex items-center space-x-2 text-green-500 hover:text-green-400 transition-colors duration-300"
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
        <h1 className="text-5xl font-bold text-green-500">SFTP Handshake</h1>
        <p className="text-xl text-zinc-400">
          A visualization of how a client and server establish a secure connection.
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
              {/* Client Lock Icon (if applicable) */}
              <div className={`absolute left-0 top-1/2 -translate-y-1/2 z-0 text-green-500 transition-transform duration-500 ${isLockTraveling(true) ? 'rotate-[30deg]' : 'rotate-0'}`}>
                <svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-16 h-16" style={{ transform: 'scaleX(-1)' }}>
                  <path d="M16 11.5V6.5C16 4.01472 13.9853 2 11.5 2C9.01472 2 7 4.01472 7 6.5V7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  <rect x="3" y="11" width="18" height="11" rx="2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 16C12 16.5523 11.5523 17 11 17C10.4477 17 10 16.5523 10 16C10 15.4477 10.4477 15 11 15C11.5523 15 12 15.4477 12 16Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>

              {/* Packets */}
              {step > 0 && step <= stepsData.length && (
                <div key={animationKey} className={`absolute w-4 h-4 bg-green-500 rounded-full shadow-lg z-10 ${getPacketAnimationClass()}`}>
                  <span className="absolute bottom-full mb-2 whitespace-nowrap text-sm text-green-500 transform -translate-x-1/2 left-1/2">{getPacketText()}</span>
                </div>
              )}

              {/* Server Lock Icon (if applicable) */}
              <div className={`absolute right-0 top-1/2 -translate-y-1/2 transition-transform z-0 text-green-500 duration-500 ${isLockTraveling(false) ? 'rotate-[30deg]' : 'rotate-0'}`}>
                <svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-16 h-16">
                  <path d="M16 11.5V6.5C16 4.01472 13.9853 2 11.5 2C9.01472 2 7 4.01472 7 6.5V7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  <rect x="3" y="11" width="18" height="11" rx="2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 16C12 16.5523 11.5523 17 11 17C10.4477 17 10 16.5523 10 16C10 15.4477 10.4477 15 11 15C11.5523 15 12 15.4477 12 16Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>

            {/* Server Device */}
            <div className="relative flex flex-col items-center gap-4 flex-shrink-0">
              <div className="flex flex-col gap-2">
                <div className="w-24 h-8 bg-zinc-600 rounded-md border border-zinc-400 shadow-inner relative before:content-[''] before:absolute before:top-1/2 before:left-2 before:-translate-y-1/2 before:w-2 before:h-2 before:rounded-full before:bg-green-500 before:shadow-[0_0_5px_#22c55e]"></div>
                <div className="w-24 h-8 bg-zinc-600 rounded-md border border-zinc-400 shadow-inner relative before:content-[''] before:absolute before:top-1/2 before:left-2 before:-translate-y-1/2 before:w-2 before:h-2 before:rounded-full before:bg-green-500 before:shadow-[0_0_5px_#22c55e]"></div>
                <div className="w-24 h-8 bg-zinc-600 rounded-md border border-zinc-400 shadow-inner relative before:content-[''] before:absolute before:top-1/2 before:left-2 before:-translate-y-1/2 before:w-2 before:h-2 before:rounded-full before:bg-green-500 before:shadow-[0_0_5px_#22c55e]"></div>
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
                <p className="text-lg text-zinc-300">Click the Start button to see the SFTP handshake in action.</p>
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
                <p className="text-lg text-zinc-400">The SFTP connection is now open, and both the client and server can begin to securely exchange data.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-4 mt-6">
        <button onClick={toggleAutomatic} disabled={step >= stepsData.length} className="px-6 py-3 rounded-lg border-none font-bold cursor-pointer transition-colors duration-300 bg-green-500 text-zinc-950 hover:bg-green-400 disabled:bg-zinc-700 disabled:text-zinc-500 disabled:cursor-not-allowed">
          {isAutomatic ? 'Pause' : 'Start'}
        </button>
        <button onClick={handleReset} className="px-6 py-3 rounded-lg border border-zinc-700 font-bold cursor-pointer transition-colors duration-300 bg-transparent text-white hover:bg-zinc-800">Reset</button>
      </div>
      <div className="mt-12 text-center w-full max-w-7xl">
        <div className="bg-zinc-800 p-6 rounded-xl shadow-lg border border-zinc-700">
          <h2 className="text-2xl font-semibold text-white mb-6">SFTP in the Real World</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ApplicationCard
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file-lock text-green-500">
                  <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                  <path d="M14 2v6h6" />
                  <rect x="5" y="10" width="10" height="8" rx="1" />
                  <path d="M8.5 10a2.5 2.5 0 0 1 5 0" />
                </svg>
              }
              title="Secure File Transfer"
              description="SFTP is the standard for transferring sensitive data such as financial records, medical information, or legal documents. Its robust encryption ensures the data is protected from unauthorized access."
            />
            <ApplicationCard
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-server text-green-500">
                  <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
                  <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
                  <line x1="6" y1="6" x2="6" y2="6" />
                  <line x1="6" y1="18" x2="6" y2="18" />
                </svg>
              }
              title="Remote Management"
              description="Developers and system administrators use SFTP to securely access and manage files on remote servers. The encrypted connection prevents man-in-the-middle attacks and data leaks."
            />
            <ApplicationCard
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-folder-sync text-green-500">
                  <path d="M10 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4" />
                  <path d="m14 10 2 2 2-2" />
                  <path d="M16 12v5" />
                  <path d="M20 16-18 14" />
                  <path d="m18 18 2 2-2 2" />
                  <path d="M16 20v-5" />
                </svg>
              }
              title="Data Synchronization"
              description="SFTP is often used in automated scripts and applications to securely sync files between different servers. This is crucial for backups and maintaining consistent data across distributed systems."
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
