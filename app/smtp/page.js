'use client';
import React, { useState, useEffect } from 'react';

const stepsData = [
  {
    "title": "Step 1: Session Greeting",
    "description": "Your computer greets the mail server to start the conversation.",
    "packetText": "HELO",
    "sender": "client"
  },
  {
    "title": "Step 2: Server Acknowledgment",
    "description": "The server replies, confirming it is ready to receive your commands.",
    "packetText": "250 OK",
    "sender": "server"
  },
  {
    "title": "Step 3: Sender and Recipient",
    "description": "Your computer tells the server who the email is from and who it's for.",
    "packetText": "MAIL FROM / RCPT TO",
    "sender": "client"
  },
  {
    "title": "Step 4: Command Acknowledgment",
    "description": "The server confirms that it has accepted the sender and recipient information.",
    "packetText": "250 OK",
    "sender": "server"
  },
  {
    "title": "Step 5: Message Transfer",
    "description": "The email message itself is sent from your computer to the server.",
    "packetText": "Email Data",
    "sender": "client"
  },
  {
    "title": "Step 6: Transfer Complete",
    "description": "The server confirms the message is received, and your computer closes the connection.",
    "packetText": "QUIT",
    "sender": "client"
  }
];

const ProtocolDevice = ({ label, children }) => {
  const isClient = label === 'Client';
  const deviceClasses = `relative flex flex-col items-center gap-4 flex-shrink-0 ${isClient ? 'mr-8' : 'ml-8'}`;
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
      <h3 className="text-xl font-bold text-yellow-500 mt-4 mb-2">{title}</h3>
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
      }, 2000);
    }
    return () => clearTimeout(timer);
  }, [step, isAutomatic]);

  const getPacketAnimationClass = () => {
    if (step === 0) return '';
    const currentStepData = stepsData[step - 1];
    if (!currentStepData) return '';
    
    return currentStepData.sender === 'client' ? 'animate-move-right' : 'animate-move-left';
  };

  const getPacketText = () => {
    if (step > 0 && step <= stepsData.length) {
      return stepsData[step - 1].packetText;
    }
    return '';
  };

  const isGunFiring = (isClient) => {
    const currentStepData = stepsData[step - 1];
    if (!currentStepData) return false;

    if (isClient) {
      return currentStepData.sender === 'client';
    } else {
      return currentStepData.sender === 'server';
    }
  };

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
        <h1 className="text-5xl font-bold text-yellow-400">Simple Mail Transfer Protocol (SMTP)</h1>
        <p className="text-xl text-zinc-400">
          A visualization of how an email is sent from client to server.
        </p>
      </div>
      <div className="flex flex-col lg:flex-row gap-8 w-full max-w-7xl items-stretch justify-center">
        <div className="bg-zinc-800 p-6 rounded-xl shadow-lg border border-zinc-700 flex flex-col flex-grow items-center justify-center min-h-[500px]">
          <div className="relative flex w-full h-full items-center justify-between">
            
            {/* Client Device */}
            <ProtocolDevice label="Client">
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
              {/* Client Gun SVG */}
              {isGunFiring(true) && (
                <div key={`client-gun-${animationKey}`} className={`absolute left-0 top-1/2 transform -translate-y-1/2 z-0 `}>
                  <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 491.565 491.565" className="w-20 h-20 text-yellow-400" fill="currentColor" style={{ transform: 'scaleX(-1) rotate(15deg)' }}>
                    <g>
                      <g>
                        <path d="M406.686,170.655c-23.596,2.854-66.692-2.1-50.453-26.881c7.576-4.412,15.119-7.908,18.537-7.908
                          c6.779,0,12.275-5.496,12.275-12.275c0-6.781-5.496-12.277-12.275-12.277c-10.022,0-22.739,6.27-32.242,11.971
                          c-7.827-3.873-12.575-15.551-12.575-15.551H42.008L20.465,87.669v18.016H0v66.506h148.291c22.467,0,57.717,12.479,60.912,46.105
                          c-0.357,2.428-0.598,4.885-0.598,7.391c0,33.115,32.107,60.057,71.57,60.057c22.572,0,42.738-8.812,55.867-22.547
                          c0.785-0.821,1.498-1.684,2.229-2.543l0.006,0.031c0,0,0.031-0.066,0.044-0.084C359.17,183.95,406.686,170.655,406.686,170.655z
                          M248.482,128.704h58.316c4.447,0,8.059,3.607,8.059,8.057c0,4.447-3.61,8.057-8.059,8.057h-58.316
                          c-4.449,0-8.057-3.609-8.057-8.057C240.426,132.312,244.033,128.704,248.482,128.704z M248.482,155.56h58.316
                          c4.447,0,8.059,3.609,8.059,8.057c0,4.449-3.61,8.057-8.057,8.057h-58.316c-4.449,0-8.057-3.607-8.057-8.057
                          C240.426,159.169,244.033,155.56,248.482,155.56z M280.176,258.31c-23.924,0-44.139-14.938-44.139-32.623
                          c0-17.684,20.215-32.629,44.139-32.629c5.924,0,11.619,0.922,16.84,2.57c-5.508,12.529-15.322,28.943-25.256,30.143
                          c-5.047,0.611-8.645,5.203-8.033,10.252c0.564,4.67,4.537,8.1,9.131,8.1c0.371,0,0.744-0.021,1.121-0.066
                          c19.674-2.387,32.875-25.299,39.295-39.65c6.822,5.768,11.043,13.23,11.043,21.281C324.316,243.372,304.102,258.31,280.176,258.31
                          z"/>
                        <path d="M416.4,180.366c-54.221,16.883-64.455,83.389-64.455,83.389c21.648,2.373,25.58,78.783,25.58,78.783
                          c-7.266,38.59,60.994,89.309,93.615,17.897C515.594,263.128,431.916,183.327,416.4,180.366z"/>
                      </g>
                    </g>
                  </svg>
                </div>
              )}
            
              {/* Packet to be animated */}
              {step > 0 && step <= stepsData.length && (
                <div key={animationKey} className={`absolute top-1/2 -translate-y-1/2 z-10 w-4 h-4 bg-yellow-400 rounded-full shadow-lg ${getPacketAnimationClass()}`}>
                  <span className="absolute bottom-full mb-2 whitespace-nowrap text-sm text-yellow-400 transform -translate-x-1/2 left-1/2">{getPacketText()}</span>
                </div>
              )}
            
              {/* Server Gun SVG */}
              {isGunFiring(false) && (
                <div key={`server-gun-${animationKey}`} className={`absolute right-0 top-1/2 transform -translate-y-1/2 z-0 `}>
                  <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 491.565 491.565" className="w-20 h-20 text-yellow-400" fill="currentColor" style={{ transform: 'rotate(-15deg)' }}>
                    <g>
                      <g>
                        <path d="M406.686,170.655c-23.596,2.854-66.692-2.1-50.453-26.881c7.576-4.412,15.119-7.908,18.537-7.908
                          c6.779,0,12.275-5.496,12.275-12.275c0-6.781-5.496-12.277-12.275-12.277c-10.022,0-22.739,6.27-32.242,11.971
                          c-7.827-3.873-12.575-15.551-12.575-15.551H42.008L20.465,87.669v18.016H0v66.506h148.291c22.467,0,57.717,12.479,60.912,46.105
                          c-0.357,2.428-0.598,4.885-0.598,7.391c0,33.115,32.107,60.057,71.57,60.057c22.572,0,42.738-8.812,55.867-22.547
                          c0.785-0.821,1.498-1.684,2.229-2.543l0.006,0.031c0,0,0.031-0.066,0.044-0.084C359.17,183.95,406.686,170.655,406.686,170.655z
                          M248.482,128.704h58.316c4.447,0,8.059,3.607,8.059,8.057c0,4.447-3.61,8.057-8.059,8.057h-58.316
                          c-4.449,0-8.057-3.609-8.057-8.057C240.426,132.312,244.033,128.704,248.482,128.704z M248.482,155.56h58.316
                          c4.447,0,8.059,3.609,8.059,8.057c0,4.449-3.61,8.057-8.057,8.057h-58.316c-4.449,0-8.057-3.607-8.057-8.057
                          C240.426,159.169,244.033,155.56,248.482,155.56z M280.176,258.31c-23.924,0-44.139-14.938-44.139-32.623
                          c0-17.684,20.215-32.629,44.139-32.629c5.924,0,11.619,0.922,16.84,2.57c-5.508,12.529-15.322,28.943-25.256,30.143
                          c-5.047,0.611-8.645,5.203-8.033,10.252c0.564,4.67,4.537,8.1,9.131,8.1c0.371,0,0.744-0.021,1.121-0.066
                          c19.674-2.387,32.875-25.299,39.295-39.65c6.822,5.768,11.043,13.23,11.043,21.281C324.316,243.372,304.102,258.31,280.176,258.31
                          z"/>
                        <path d="M416.4,180.366c-54.221,16.883-64.455,83.389-64.455,83.389c21.648,2.373,25.58,78.783,25.58,78.783
                          c-7.266,38.59,60.994,89.309,93.615,17.897C515.594,263.128,431.916,183.327,416.4,180.366z"/>
                      </g>
                    </g>
                  </svg>
                </div>
              )}
            </div>

            {/* Server Device */}
            <ProtocolDevice label="Server">
              <div className="flex flex-col gap-2">
                <div className="w-24 h-8 bg-zinc-600 rounded-md border border-zinc-400 shadow-inner relative before:content-[''] before:absolute before:top-1/2 before:left-2 before:-translate-y-1/2 before:w-2 before:h-2 before:rounded-full before:bg-yellow-400 before:shadow-[0_0_5px_#facc15]"></div>
                <div className="w-24 h-8 bg-zinc-600 rounded-md border border-zinc-400 shadow-inner relative before:content-[''] before:absolute before:top-1/2 before:left-2 before:-translate-y-1/2 before:w-2 before:h-2 before:rounded-full before:bg-yellow-400 before:shadow-[0_0_5px_#facc15]"></div>
                <div className="w-24 h-8 bg-zinc-600 rounded-md border border-zinc-400 shadow-inner relative before:content-[''] before:absolute before:top-1/2 before:left-2 before:-translate-y-1/2 before:w-2 before:h-2 before:rounded-full before:bg-yellow-400 before:shadow-[0_0_5px_#facc15]"></div>
              </div>
            </ProtocolDevice>
          </div>
        </div>

        <div className="bg-zinc-800 p-6 rounded-xl shadow-lg border border-zinc-700 w-80 max-h-[500px] overflow-y-auto">
          <div className="text-white">
            {step === 0 && (
              <>
                <h2 className="text-2xl font-semibold mb-4 text-white">Start Visualization</h2>
                <p className="text-lg text-zinc-300">Click the Next Step button to see how an email is sent using SMTP.</p>
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
                <h2 className="text-xl font-bold text-white mb-2">Transfer Complete</h2>
                <p className="text-lg text-zinc-400">The entire email has been transferred from your computer to the server, and the connection is closed.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-4 mt-6">
        <button onClick={toggleAutomatic} disabled={step >= stepsData.length} className="px-6 py-3 rounded-lg border-none font-bold cursor-pointer transition-colors duration-300 bg-yellow-400 text-zinc-950 hover:bg-yellow-500 disabled:bg-zinc-700 disabled:text-zinc-500 disabled:cursor-not-allowed">
          {isAutomatic ? 'Pause' : 'Start'}
        </button>
        <button onClick={handleReset} className="px-6 py-3 rounded-lg border border-zinc-700 font-bold cursor-pointer transition-colors duration-300 bg-transparent text-white hover:bg-zinc-800">Reset</button>
      </div>
      <div className="mt-12 text-center w-full max-w-7xl">
        <div className="bg-zinc-800 p-6 rounded-xl shadow-lg border border-zinc-700">
          <h2 className="text-2xl font-semibold text-white mb-6">SMTP in the Real World</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ApplicationCard
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail-open text-yellow-500">
                  <path d="M22 7.5V11L12 18 2 11V7.5L12 1L22 7.5z" />
                  <path d="M2 11l10 7 10-7" />
                  <path d="M12 11h.01" />
                  <path d="M12 11v8" />
                </svg>
              }
              title="Email Delivery"
              description="SMTP is the primary protocol for sending and relaying emails between mail servers. When you click 'send,' your email client uses SMTP to push the message to an outgoing mail server."
            />
            <ApplicationCard
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-cloud-upload text-yellow-500">
                  <path d="M12 16v-8" />
                  <path d="m16 12-4-4-4 4" />
                  <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                  <path d="M2 12h20" />
                  <path d="M5 20h14a2 2 0 0 0 2-2v-5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2z" />
                </svg>
              }
              title="Mail Server Communication"
              description="Mail servers use SMTP to communicate with each other. For example, if you send an email from a Gmail account to a Yahoo account, the Gmail server uses SMTP to send the email to the Yahoo server."
            />
            <ApplicationCard
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-credit-card text-yellow-500">
                  <rect width="20" height="14" x="2" y="5" rx="2" />
                  <line x1="2" x2="22" y1="10" y2="10" />
                </svg>
              }
              title="Transactional Emails"
              description="SMTP is used to send automated emails like order confirmations, password resets, and account notifications. These emails are critical for business operations and rely on SMTP's reliability."
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
          animation: move-packet-right 2s linear forwards;
        }
        .animate-move-left {
          animation: move-packet-left 2s linear forwards;
        }
      `}</style>
    </div>
  );
};

export default App;
