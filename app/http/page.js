"use client";
import React, { useState, useEffect, useRef } from 'react';

const stepsData = [
  {
    "title": "Step 1: TCP Handshake",
    "description": "The first Pac-Man represents your computer initiating the connection (TCP Handshake) to the server. It moves left to right, starting the request and eating the dots."
  },
  {
    "title": "Step 2: HTTP Request",
    "description": "The first Pac-Man disappears as a second one appears to represent the full HTTP request being sent to the server, continuing the left-to-right journey and eating the dots."
  },
  {
    "title": "Step 3: HTTP Response",
    "description": "The second Pac-Man disappears. A new pink ghost appears at the server, flips, and begins its journey back to the client. This represents the server sending a confirmation response back to the client and eating the dots."
  },
  {
    "title": "Step 4: Data Transfer",
    "description": "The ghosts represent the data packets, or 'cake slices,' being sent from the server back to your computer (client). The red ghost starts from the left, and the orange ghost starts from the right, moving towards each other."
  },
  {
    "title": "Step 5: Transfer Complete",
    "description": "The animation ends as the order is complete. The connection is closed or kept open for future requests."
  }
];

const Pacman = ({ left, opacity, scaleX, title }) => (
  <div className="w-12 h-12 absolute z-10 -mt-8" style={{ left: `calc(${left}% - 24px)`, opacity, transition: 'left 0.25s linear' }}>
    <div className="absolute top-[-24px] left-1/2 -translate-x-1/2 text-xs font-bold text-white bg-zinc-700 rounded-full px-2 py-1 transition-opacity duration-200">{title}</div>
    <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
      viewBox="0 0 52 52" className="w-12 h-12 text-yellow-400" xmlSpace="preserve">
      <g style={{ transform: `scaleX(${scaleX})` }}>
        <path style={{fill:'#F0C419'}} d="M44.385,44.385c-10.154,10.154-26.616,10.154-36.77,0s-10.154-26.616,0-36.77s26.616-10.154,36.77,0
          L26,26L44.385,44.385z"/>
        <circle style={{fill:'#556080'}} cx="23" cy="12" r="3"/>
      </g>
    </svg>
  </div>
);

const Ghost = ({ left, opacity, color, marginTop = 0, title }) => (
  <div className="w-12 h-12 absolute z-10 -mt-8" style={{ left: `calc(${left}% - 24px)`, opacity, transition: 'left 0.25s linear', marginTop }}>
    <div className="absolute top-[-24px] left-1/2 -translate-x-1/2 text-xs font-bold text-white bg-zinc-700 rounded-full px-2 py-1 transition-opacity duration-200">{title}</div>
    <svg viewBox="-0.5 0 17 17" version="1.1" xmlns="http://www.w3.org/2000/svg" className="si-glyph si-glyph-ghost">
      <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <path d="M0.00769043108,7.91000014 L0.0242138699,16.0045776 L2.02069092,12.9996337 L3.99890137,16.0045775 L6.06207276,12.9996337 L8.02052344,16.0045775 L10.0800781,12.9996337 L12.0108032,16.0045775 L14.0491943,12.9996337 L16.0045601,16.0045776 L15.9880367,7.91000014 C15.9890367,3.56000014 12.363,0.031 7.986,0.031 C3.609,0.031 0.00769043108,3.55900014 0.00769043108,7.91000014 Z M4.516,8.094 C3.651,8.094 2.951,7.395 2.951,6.532 C2.951,5.669 3.651,4.969 4.516,4.969 C5.381,4.969 6.081,5.67 6.081,6.532 C6.081,7.394 5.381,8.094 4.516,8.094 L4.516,8.094 Z M11.51,8.066 C10.633,8.066 9.922,7.359 9.922,6.487 C9.922,5.614 10.633,4.906 11.51,4.906 C12.388,4.906 13.098,5.614 13.098,6.487 C13.098,7.359 12.388,8.066 11.51,8.066 L11.51,8.066 Z" style={{ fill: color }} className="si-glyph-fill"></path>
      </g>
    </svg>
  </div>
);


const App = () => {
  const [step, setStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const animationTimeoutRef = useRef(null);
  const totalSteps = 40; // Total steps for all phases

  useEffect(() => {
    if (isAnimating) {
      const delay = (step === 10 || step === 20 || step === 30 || step === 40) ? 1000 : 250;
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

  const dotCount = 10;
  const dots = Array.from({ length: dotCount }, (_, i) => {
    let eaten = false;
    // Step 1: Dots are eaten progressively
    if (step > 0 && step <= 10) {
      eaten = i < step;
    } 
    // Step 2: No dots are eaten. They are all visible.
    else if (step > 10 && step <= 20) {
      eaten = i < (step - 10);
    }
    // Step 3-4: Dots are invisible
    else if (step > 20) {
      eaten = true;
    }
    
    const opacity = (step === 0 || eaten) ? 0 : 1;
    
    return (
      <div 
        key={i} 
        className="w-2 h-2 rounded-full bg-yellow-400 transition-opacity duration-200"
        style={{
          position: 'absolute',
          left: `${(i / (dotCount - 1)) * 100}%`,
          transform: 'translateX(-50%)',
          opacity: opacity,
        }}
      ></div>
    );
  });

  const pacman1Left = step > 0 && step <= 10 ? (step / 9) * 85 : 0;
  const pacman1Opacity = step > 0 && step <= 10 ? 1 : 0;
  const pacman1ScaleX = 1;
  const pacman1Title = "TCP Handshake";
  
  const pacman2Left = step > 10 && step <= 20 ? ((step - 10) / 9) * 85 : 0;
  const pacman2Opacity = step > 10 && step <= 20 ? 1 : 0;
  const pacman2ScaleX = 1;
  const pacman2Title = "HTTP Request";
  
  const pacman3Left = step > 20 && step <= 30 ? (1 - ((step - 20) / 9)) * 85 : 100;
  const pacman3Opacity = step > 20 && step <= 30 ? 1 : 0;
  const pacman3ScaleX = -1;
  const pacman3Title = "HTTP Response";

  const redGhostLeft = step > 30 && step <= 40 ? ((step - 30) / 9) * 100 : 0;
  const redGhostOpacity = step > 30 && step <= 40 ? 1 : 0;
  const redGhostTitle = "ACK packets";

  const orangeGhostLeft = step > 30 && step <= 40 ? (1 - ((step - 30) / 9)) * 100 : 100;
  const orangeGhostOpacity = step > 30 && step <= 40 ? 1 : 0;
  const orangeGhostTitle = "Data packets";

  const getVisibleStepIndex = () => {
    if (step <= 10) return 0;
    if (step <= 20) return 1;
    if (step <= 30) return 2;
    if (step <= 40) return 3;
    return 4;
  };
  
  const visibleStepIndex = getVisibleStepIndex();
  const visibleSteps = stepsData.slice(0, visibleStepIndex + 1);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-zinc-950 font-['Inter']">
      <div className="absolute top-4 left-4">
        <button
          onClick={handleGoBack}
          className="flex items-center space-x-2 text-red-500 hover:text-red-400 transition-colors duration-300"
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
        <h1 className="text-5xl font-bold text-red-500">Hypertext Transfer Protocol (HTTP)</h1>
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
            
            {/* Animation Container */}
            <div className="flex-grow flex items-center justify-center relative">
              <div className="absolute inset-x-0 h-4 flex items-center justify-center z-0 -mt-10">
                {dots}
              </div>
              {/* Pac-Man Icons */}
              {step > 0 && step <= 10 && <Pacman left={pacman1Left} opacity={pacman1Opacity} scaleX={pacman1ScaleX} title={pacman1Title} />}
              {step > 10 && step <= 20 && <Pacman left={pacman2Left} opacity={pacman2Opacity} scaleX={pacman2ScaleX} title={pacman2Title} />}
              
              {/* Ghost for Step 3 */}
              {step > 20 && step <= 30 && <Ghost left={pacman3Left} opacity={pacman3Opacity} color="#ff69b4" title={pacman3Title} />}
              
              {/* Ghost Icons for Step 4 */}
              {step > 30 && step <= 40 && <Ghost left={redGhostLeft} opacity={redGhostOpacity} color="#ef4444" title={redGhostTitle} />}
              {step > 30 && step <= 40 && <Ghost left={orangeGhostLeft} opacity={orangeGhostOpacity} color="#f97316" marginTop="48px" title={orangeGhostTitle} />}
            </div>

            {/* Server Device */}
            <div className="flex flex-col items-center gap-4 flex-shrink-0">
              <div className="flex flex-col gap-2">
                <div className="w-24 h-8 bg-zinc-600 rounded-md border border-zinc-400 shadow-inner relative before:content-[''] before:absolute before:top-1/2 before:left-2 before:-translate-y-1/2 before:w-2 before:h-2 before:rounded-full before:bg-red-500 before:shadow-[0_0_5px_#ef4444]"></div>
                <div className="w-24 h-8 bg-zinc-600 rounded-md border border-zinc-400 shadow-inner relative before:content-[''] before:absolute before:top-1/2 before:left-2 before:-translate-y-1/2 before:w-2 before:h-2 before:rounded-full before:bg-red-500 before:shadow-[0_0_5px_#ef4444]"></div>
                <div className="w-24 h-8 bg-zinc-600 rounded-md border border-zinc-400 shadow-inner relative before:content-[''] before:absolute before:top-1/2 before:left-2 before:-translate-y-1/2 before:w-2 before:h-2 before:rounded-full before:bg-red-500 before:shadow-[0_0_5px_#ef4444]"></div>
              </div>
              <p className="text-lg text-zinc-200">Server</p>
            </div>
          </div>
        </div>

        <div className="bg-zinc-800 p-6 rounded-xl shadow-lg border border-zinc-700 w-80 max-h-[500px] overflow-y-auto">
          <div className="text-white">
            {visibleSteps.map((item, index) => (
              <div key={index} className="pb-4 mb-4 border-b border-dashed border-zinc-700 last:border-b-0">
                <h2 className="text-xl font-bold text-white mb-2">{item.title}</h2>
                <p className="text-lg text-zinc-400 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex justify-center gap-4 mt-6">
        <button onClick={handleToggleAnimation} disabled={step >= totalSteps && !isAnimating} className="px-6 py-3 rounded-lg border-none font-bold cursor-pointer transition-colors duration-300 bg-red-500 text-zinc-950 hover:bg-red-600 disabled:bg-zinc-700 disabled:text-zinc-500 disabled:cursor-not-allowed">
          {isAnimating ? 'Pause' : 'Start'}
        </button>
        <button onClick={handleReset} className="px-6 py-3 rounded-lg border border-zinc-700 font-bold cursor-pointer transition-colors duration-300 bg-transparent text-white hover:bg-zinc-800">Reset</button>
      </div>

      <div className="bg-zinc-800 p-6 rounded-xl shadow-lg border border-zinc-700 flex flex-col items-center justify-center mt-8 w-full max-w-7xl">
        <h2 className="text-2xl font-semibold text-white">HTTP Features & Alternatives</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-6 w-full">
          <div className="bg-zinc-700 p-6 rounded-lg border border-zinc-600 flex flex-col items-center text-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-network text-red-500">
              <rect x="2" y="2" width="20" height="8" rx="2" ry="2"/>
              <rect x="7" y="14" width="10" height="8" rx="2" ry="2"/>
              <line x1="12" y1="10" x2="12" y2="14"/>
            </svg>
            <h3 className="text-xl font-bold text-red-500 mt-4 mb-2">Stateless Protocol</h3>
            <p className="text-lg text-zinc-400 leading-relaxed">HTTP is stateless, meaning each request is independent of previous ones. This simplifies the server design but requires cookies or session tokens to manage user state.</p>
          </div>
          <div className="bg-zinc-700 p-6 rounded-lg border border-zinc-600 flex flex-col items-center text-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-lock text-red-500">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
            <h3 className="text-xl font-bold text-red-500 mt-4 mb-2">HTTPS (Secure HTTP)</h3>
            <p className="text-lg text-zinc-400 leading-relaxed">HTTPS adds a layer of SSL/TLS encryption, securing the communication between the client and server. This is the standard for modern web browsing.</p>
          </div>
          <div className="bg-zinc-700 p-6 rounded-lg border border-zinc-600 flex flex-col items-center text-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-clock text-red-500">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12 6 12 12 16 14"/>
            </svg>
            <h3 className="text-xl font-bold text-red-500 mt-4 mb-2">Caching</h3>
            <p className="text-lg text-zinc-400 leading-relaxed">HTTP supports caching, which allows clients and proxies to store copies of frequently requested resources. This significantly reduces latency and server load.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
