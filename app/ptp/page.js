'use client';
import React, { useState, useEffect } from 'react';

const stepsData = [
  {
    "title": "Step 1: Sync Message",
    "description": "The Master clock sends a 'Sync' message containing its current timestamp to the Slave clock.",
    "packet": "Sync",
    "sender": "master"
  },
  {
    "title": "Step 2: Follow-Up Message",
    "description": "The Master sends a 'Follow-Up' message with the precise time the Sync message was sent.",
    "packet": "Follow-Up",
    "sender": "master"
  },
  {
    "title": "Step 3: Delay Request",
    "description": "The Slave sends a 'Delay Request' message to the Master to measure network latency.",
    "packet": "Delay Request",
    "sender": "slave"
  },
  {
    "title": "Step 4: Delay Response",
    "description": "The Master sends a 'Delay Response' message, which helps the Slave calculate the time offset and synchronize precisely.",
    "packet": "Delay Response",
    "sender": "master"
  }
];

const ProtocolDevice = ({ label, children }) => {
  const isMaster = label === 'Master';
  const deviceClasses = `relative flex flex-col items-center gap-4 flex-shrink-0 ${isMaster ? 'mr-8' : 'ml-8'}`;
  return (
    <div className={deviceClasses}>
      {children}
      <p className="text-lg text-zinc-200">{label}</p>
    </div>
  );
};

const ApplicationCard = ({ icon, title, description }) => (
    <div className="bg-zinc-700 p-6 rounded-lg border border-zinc-600 flex flex-col items-center text-center">
      {icon}
      <h3 className="text-xl font-bold text-cyan-500 mt-4 mb-2">{title}</h3>
      <p className="text-lg text-zinc-400 leading-relaxed">{description}</p>
    </div>
  );

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
      }, 4000);
    }
    return () => clearTimeout(timer);
  }, [step, isAutomatic]);

  const getPacketAnimationClass = () => {
    if (step === 0) return '';
    const currentStepData = stepsData[step - 1];
    if (!currentStepData) return '';
    
    return currentStepData.sender === 'master' ? 'animate-move-right' : 'animate-move-left';
  };

  const getPacketText = () => {
    if (step > 0 && step <= stepsData.length) {
      return stepsData[step - 1].packet;
    }
    return '';
  };

  const getClockRotation = (isMaster) => {
    if (step === 0) return 'rotate-0';
    const currentStepData = stepsData[step - 1];
    
    if (isMaster) {
      return currentStepData.sender === 'master' ? 'rotate-12' : 'rotate-0';
    } else {
      return currentStepData.sender === 'slave' ? 'rotate-[-12deg]' : 'rotate-0';
    }
  };

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
        <h1 className="text-5xl font-bold text-cyan-500">Precision Time Protocol (PTP)</h1>
        <p className="text-xl text-zinc-400">
          A visualization of how a Master and Slave device synchronize time.
        </p>
      </div>
      <div className="flex flex-col lg:flex-row gap-8 w-full max-w-7xl items-stretch justify-center">
        <div className="bg-zinc-800 p-6 rounded-xl shadow-lg border border-zinc-700 flex flex-col flex-grow items-center justify-center min-h-[500px]">
          <div className="relative flex w-full h-full items-center justify-between">
            
            {/* Master Device */}
            <ProtocolDevice label="Master">
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
            </ProtocolDevice>

            {/* Animation Container */}
            <div className="relative flex-grow h-full flex justify-between items-center mx-16">
              {/* Master Clock Icon */}
              <div className={`absolute left-0 top-1/2 -translate-y-1/2 z-0 text-cyan-500 transition-transform duration-500 ${getClockRotation(true)}`}>
                <svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-16 h-16">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M12 7V12H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>

              {/* Packet to be animated */}
              {step > 0 && step <= stepsData.length && (
                <div key={animationKey} className={`absolute top-1/2 -translate-y-1/2 z-10 w-4 h-4 bg-cyan-500 rounded-full shadow-lg ${getPacketAnimationClass()}`}>
                  <span className="absolute bottom-full mb-2 whitespace-nowrap text-sm text-cyan-500 transform -translate-x-1/2 left-1/2">{getPacketText()}</span>
                </div>
              )}

              {/* Slave Clock Icon */}
              <div className={`absolute right-0 top-1/2 -translate-y-1/2 transition-transform z-0 text-cyan-500 duration-500 ${getClockRotation(false)}`}>
                <svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-16 h-16">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M12 7V12H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>

            {/* Slave Device */}
            <ProtocolDevice label="Slave">
              <div className="flex flex-col gap-2">
                <div className="w-24 h-8 bg-zinc-600 rounded-md border border-zinc-400 shadow-inner relative before:content-[''] before:absolute before:top-1/2 before:left-2 before:-translate-y-1/2 before:w-2 before:h-2 before:rounded-full before:bg-cyan-500 before:shadow-[0_0_5px_#06b6d4]"></div>
                <div className="w-24 h-8 bg-zinc-600 rounded-md border border-zinc-400 shadow-inner relative before:content-[''] before:absolute before:top-1/2 before:left-2 before:-translate-y-1/2 before:w-2 before:h-2 before:rounded-full before:bg-cyan-500 before:shadow-[0_0_5px_#06b6d4]"></div>
                <div className="w-24 h-8 bg-zinc-600 rounded-md border border-zinc-400 shadow-inner relative before:content-[''] before:absolute before:top-1/2 before:left-2 before:-translate-y-1/2 before:w-2 before:h-2 before:rounded-full before:bg-cyan-500 before:shadow-[0_0_5px_#06b6d4]"></div>
              </div>
            </ProtocolDevice>
          </div>
        </div>

        <div className="bg-zinc-800 p-6 rounded-xl shadow-lg border border-zinc-700 w-80 max-h-[500px] overflow-y-auto">
          <div className="text-white">
            {step === 0 && (
              <>
                <h2 className="text-2xl font-semibold mb-4 text-white">Start Visualization</h2>
                <p className="text-lg text-zinc-300">Click the Start button to see how the PTP protocol synchronizes time between a Master and Slave device.</p>
              </>
            )}
            {stepsData.slice(0, step).map((item, index) => (
              <div key={index} className="pb-4 mb-4 border-b border-dashed border-zinc-700 last:border-b-0">
                <h2 className="text-xl font-bold text-white mb-2">{item.title}</h2>
                <p className="text-lg text-zinc-400" dangerouslySetInnerHTML={{ __html: item.description }}></p>
              </div>
            ))}
            {step >= stepsData.length && (
              <div key={stepsData.length} className="pb-4 mb-4 border-b border-dashed border-zinc-700 last:border-b-0">
                <h2 className="text-xl font-bold text-white mb-2">Synchronization Complete</h2>
                <p className="text-lg text-zinc-400">The Slave device has successfully synchronized its clock with the Master, achieving high-precision timing.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-4 mt-6">
        <button onClick={toggleAutomatic} disabled={step >= stepsData.length} className="px-6 py-3 rounded-lg border-none font-bold cursor-pointer transition-colors duration-300 bg-cyan-500 text-zinc-950 hover:bg-cyan-600 disabled:bg-zinc-700 disabled:text-zinc-500 disabled:cursor-not-allowed">
          {isAutomatic ? 'Pause' : 'Start'}
        </button>
        <button onClick={handleReset} className="px-6 py-3 rounded-lg border border-zinc-700 font-bold cursor-pointer transition-colors duration-300 bg-transparent text-white hover:bg-zinc-800">Reset</button>
      </div>
      <div className="mt-12 text-center w-full max-w-7xl">
        <div className="bg-zinc-800 p-6 rounded-xl shadow-lg border border-zinc-700">
          <h2 className="text-2xl font-semibold text-white mb-6">PTP in the Real World</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ApplicationCard
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trending-up text-cyan-500">
                  <path d="m22 2-7 7-4-4-5 5-4-4" />
                  <path d="M14 22v-7h7" />
                </svg>
              }
              title="Financial Trading"
              description="PTP provides the nanosecond-level time synchronization required for high-frequency trading platforms. It ensures all transactions are accurately time-stamped and processed in the correct order."
            />
            <ApplicationCard
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-factory text-cyan-500">
                  <path d="M2 20a2 2 0 0 1-2 2H22a2 2 0 0 1 2-2V4a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h20a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2v-4a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2z" />
                </svg>
              }
              title="Industrial Automation"
              description="In factories and power grids, PTP ensures that different machines and control systems operate with perfect timing. This is critical for processes that require precise coordination and control."
            />
            <ApplicationCard
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-tv-2 text-cyan-500">
                  <rect width="20" height="15" x="2" y="3" rx="2" ry="2" />
                  <path d="m16 19 2 2-2 2" />
                  <path d="m16 19 2 2-2 2" />
                  <path d="m16 19 2 2-2 2" />
                  <path d="M10 19l2 2 2-2" />
                </svg>
              }
              title="Broadcast Media"
              description="PTP is used in live broadcast and professional video production to ensure all cameras, audio mixers, and graphics systems are perfectly synchronized. This eliminates audio/video drift and lag."
            />
          </div>
        </div>
      </div>
      <style jsx>{`
        @keyframes move-packet-right {
          0% {
            left: 0;
            transform: translateX(3rem);
            opacity: 1;
          }
          95% {
            left: 100%;
            transform: translateX(-3rem);
            opacity: 1;
          }
          100% {
            left: 100%;
            transform: translateX(-3rem);
            opacity: 0;
          }
        }
        @keyframes move-packet-left {
          0% {
            left: 100%;
            transform: translateX(-3rem);
            opacity: 1;
          }
          95% {
            left: 0;
            transform: translateX(3rem);
            opacity: 1;
          }
          100% {
            left: 0;
            transform: translateX(3rem);
            opacity: 0;
          }
        }
        
        .animate-move-right {
          animation: move-packet-right 4s linear forwards;
        }
        .animate-move-left {
          animation: move-packet-left 4s linear forwards;
        }
      `}</style>
    </div>
  );
};

export default App;
