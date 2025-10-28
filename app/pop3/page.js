"use client";
import React, { useState, useEffect, useRef } from "react";

const stepsData = [
  {
    title: "Step 1: Authorization",
    description:
      "Your computer calls a pizza shop (server) at Counter 110 (POP3) and gives a username and password, like showing ID to order.",
    packetText: "USER / PASS",
    sender: "client",
  },
  {
    title: "Step 2: Server Acknowledgment",
    description:
      "The server acknowledges the authorization, allowing your computer to proceed with commands.",
    packetText: "+OK",
    sender: "server",
  },
  {
    title: "Step 3: Transaction",
    description:
      "After ID check at Counter 110, your computer orders emails with commands like ‘RETR,’ like asking for a specific pizza.",
    packetText: "RETR",
    sender: "client",
  },
  {
    title: "Step 4: Message Data",
    description: "The server sends the message data back to your computer.",
    packetText: "DATA",
    sender: "server",
  },
  {
    title: "Step 5: Update",
    description:
      "Your computer says ‘QUIT’ at Counter 110 to end the order, removing the emails from the shop, like taking the pizza away.",
    packetText: "QUIT",
    sender: "client",
  },
  {
    title: "Step 6: Messages Retrieved",
    description:
      "Emails are on your computer and gone from the shop, like having your pizza delivered and the shop’s copy cleared.",
    packetText: "+OK",
    sender: "server",
  },
];

const ProtocolDevice = ({ label, children }) => {
  const isClient = label === "Client";
  const deviceClasses = `relative flex flex-col items-center gap-4 flex-shrink-0 ${
    isClient ? "mr-12" : "ml-12"
  }`;
  return (
    <div className={deviceClasses}>
      {children}
      <p className="text-lg text-zinc-200">{label}</p>
    </div>
  );
};

const HeartSVG = ({ transformStyle }) => (
  <svg
    width="48"
    height="48"
    viewBox="0 0 36 36"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    aria-hidden="true"
    role="img"
    className={`w-12 h-12 text-fuchsia-500 opacity-100`}
    preserveAspectRatio="xMidYMid meet"
    style={{ transform: transformStyle }}
  >
    <path
      fill="#DD2E44"
      d="M23.106 5.971C17.615.48 8.384-.521 3.307 4.557C-1.77 9.634-.77 18.865 4.721 24.356c3.554 3.554 7.785 4.323 11.707 3.058l-.015.013l.13-.052c.264-.088.527-.179.788-.284a24.449 24.449 0 0 1 2.942-.806c1.848-.38 3.541 1.606 4.955 3.021c1.414 1.414 4.242 5.657 4.949 6.364c.707.707 1.414 0 2.122-.707l.707-.707l.707-.707c.707-.708 1.414-1.415.707-2.122c-.707-.707-4.95-3.535-6.364-4.949c-1.414-1.414-3.4-3.107-3.021-4.955a24.32 24.32 0 0 1 .653-2.481c1.974-4.222 1.537-8.952-2.582-13.071z"
    ></path>
    <path
      fill="#D99E82"
      d="M15.564 27.655c.289-.07.578-.149.864-.241l-.015.013l.13-.052c.264-.088.527-.179.788-.284a24.449 24.449 0 0 1 2.942-.806c1.848-.38 3.541 1.606 4.955 3.021c1.414 1.414 4.242 5.657 4.949 6.364c.707.707 1.414 0 2.122-.707l.707-.707l.707-.707c.707-.708 1.414-1.415.707-2.122c-.707-.707-4.95-3.535-6.364-4.949c-1.414-1.414-3.4-3.107-3.021-4.955a24.32 24.32 0 0 1 .653-2.481c.357-.764.633-1.543.824-2.334L15.564 27.655z"
    ></path>
    <path
      fill="#FFCC4D"
      d="M20.277 22.942l1.414-1.414l12.022 12.021l-1.414 1.414z"
    ></path>
  </svg>
);

const App = () => {
  const [step, setStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const animationTimeoutRef = useRef(null);
  const packetKeyRef = useRef(0);

  useEffect(() => {
    if (isAnimating) {
      if (step <= stepsData.length) {
        animationTimeoutRef.current = setTimeout(() => {
          setStep((prevStep) => prevStep + 1);
          packetKeyRef.current++;
        }, 3000); // 3 seconds delay for slow animation
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
        packetKeyRef.current = 1;
      }
      setIsAnimating(true);
    }
  };

  const handleReset = () => {
    setIsAnimating(false);
    clearTimeout(animationTimeoutRef.current);
    setStep(0);
    packetKeyRef.current = 0;
  };

  const handleGoBack = () => {
    window.location.href = "/";
  };

  const getPacketAnimationClass = () => {
    if (step === 0) return "";
    const currentStepData = stepsData[step - 1];
    if (!currentStepData) return "";

    return currentStepData.sender === "client"
      ? "animate-bounce-right"
      : "animate-bounce-left";
  };

  const getPacketText = () => {
    if (step > 0 && step <= stepsData.length) {
      return stepsData[step - 1].packetText;
    }
    return "";
  };

  const isAnimatingStep = step > 0 && step <= stepsData.length;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-zinc-950 font-['Inter']">
      <div className="absolute top-4 left-4">
        <button
          onClick={handleGoBack}
          className="flex items-center space-x-2 text-fuchsia-500 hover:text-fuchsia-400 transition-colors duration-300"
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
        <h1 className="text-5xl font-bold text-fuchsia-500">
          Post Office Protocol (POP3)
        </h1>
        <p className="text-xl text-zinc-400">
          A visualization of how an email client downloads messages from a server.
        </p>
      </div>
      <div className="flex flex-col lg:flex-row gap-8 w-full max-w-7xl items-stretch justify-center">
        <div className="bg-zinc-800 p-6 rounded-xl shadow-lg border border-zinc-700 flex flex-col flex-grow items-center justify-center min-h-[500px]">
          <div className="relative flex w-full h-full items-center justify-between">
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

            <div className="relative flex-grow h-full flex justify-between items-center mx-16">
              <div className="relative">
                <HeartSVG transformStyle="" />
              </div>

              {isAnimatingStep && (
                <div
                  key={packetKeyRef.current}
                  className={`absolute z-10 w-4 h-4 bg-fuchsia-500 rounded-full shadow-lg ${getPacketAnimationClass()}`}
                >
                  <span className="absolute bottom-full mb-2 whitespace-nowrap text-sm font-bold text-fuchsia-500 transform -translate-x-1/2 left-1/2">
                    {getPacketText()}
                  </span>
                </div>
              )}

              <div className="relative">
                <HeartSVG transformStyle="scaleX(-1)" />
              </div>
            </div>

            <ProtocolDevice label="Server">
              <div className="flex flex-col gap-2">
                <div className="w-24 h-8 bg-zinc-600 rounded-md border border-zinc-400 shadow-inner relative before:content-[''] before:absolute before:top-1/2 before:left-2 before:-translate-y-1/2 before:w-2 before:h-2 before:rounded-full before:bg-fuchsia-500 before:shadow-[0_0_5px_#d946ef]"></div>
                <div className="w-24 h-8 bg-zinc-600 rounded-md border border-zinc-400 shadow-inner relative before:content-[''] before:absolute before:top-1/2 before:left-2 before:-translate-y-1/2 before:w-2 before:h-2 before:rounded-full before:bg-fuchsia-500 before:shadow-[0_0_5px_#d946ef]"></div>
                <div className="w-24 h-8 bg-zinc-600 rounded-md border border-zinc-400 shadow-inner relative before:content-[''] before:absolute before:top-1/2 before:left-2 before:-translate-y-1/2 before:w-2 before:h-2 before:rounded-full before:bg-fuchsia-500 before:shadow-[0_0_5px_#d946ef]"></div>
              </div>
            </ProtocolDevice>
          </div>
        </div>

        <div className="bg-zinc-800 p-6 rounded-xl shadow-lg border border-zinc-700 w-80 max-h-[500px] overflow-y-auto">
          <div className="text-white">
            {step === 0 && (
              <>
                <h2 className="text-2xl font-semibold mb-4 text-white">
                  Start Visualization
                </h2>
                <p className="text-lg text-zinc-300">
                  Click the Start button to see how an email is sent using POP3.
                </p>
              </>
            )}
            {stepsData.slice(0, step).map((item, index) => (
              <div
                key={index}
                className="pb-4 mb-4 border-b border-dashed border-zinc-700 last:border-b-0"
              >
                <h2 className="text-xl font-bold text-white mb-2">
                  {item.title}
                </h2>
                <p
                  className="text-lg text-zinc-400"
                  dangerouslySetInnerHTML={{ __html: item.description }}
                ></p>
              </div>
            ))}
            {step >= stepsData.length && (
              <div
                key={stepsData.length}
                className="pb-4 mb-4 border-b border-dashed border-zinc-700 last:border-b-0"
              >
                <h2 className="text-xl font-bold text-white mb-2">
                  Transfer Complete
                </h2>
                <p className="text-lg text-zinc-400">
                  The entire email has been transferred from your computer to the server, and the connection is closed.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-4 mt-6">
        <button
          onClick={handleToggleAnimation}
          disabled={step >= stepsData.length}
          className="px-6 py-3 rounded-lg border-none font-bold cursor-pointer transition-colors duration-300 bg-fuchsia-500 text-zinc-950 hover:bg-fuchsia-600 disabled:bg-zinc-700 disabled:text-zinc-500 disabled:cursor-not-allowed"
        >
          {isAnimating ? "Pause" : "Start"}
        </button>
        <button
          onClick={handleReset}
          className="px-6 py-3 rounded-lg border border-zinc-700 font-bold cursor-pointer transition-colors duration-300 bg-transparent text-white hover:bg-zinc-800"
        >
          Reset
        </button>
      </div>
      <div className="bg-zinc-800 p-6 rounded-xl shadow-lg border border-zinc-700 flex flex-col items-center justify-center mt-8 w-full max-w-7xl">
        <h2 className="text-2xl font-semibold text-white">
          POP3 Applications & Alternatives
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-6 w-full">
          <div className="bg-zinc-700 p-6 rounded-lg border border-zinc-600 flex flex-col items-center text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-mail-open text-fuchsia-500"
            >
              <path d="M22 7.5V11L14 7.5L22 7.5Z" />
              <path d="M22 16.5V13L14 16.5L22 16.5Z" />
              <path d="M2 13V16.5L10 13L2 13Z" />
              <path d="M2 11V7.5L10 11L2 11Z" />
              <path d="m5 12 7 3 7-3" />
              <path d="M12 7V16.5" />
            </svg>
            <h3 className="text-xl font-bold text-fuchsia-500 mt-4 mb-2">
              Email Clients
            </h3>
            <p className="text-lg text-zinc-400 leading-relaxed">
              POP3 is used by email clients to retrieve messages from a mail
              server. It&#39;s an older protocol that is now mostly replaced by
              IMAP.
            </p>
          </div>
          <div className="bg-zinc-700 p-6 rounded-lg border border-zinc-600 flex flex-col items-center text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-inbox text-fuchsia-500"
            >
              <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
              <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
            </svg>
            <h3 className="text-xl font-bold text-fuchsia-500 mt-4 mb-2">
              IMAP (Modern Alternative)
            </h3>
            <p className="text-lg text-zinc-400 leading-relaxed">
              Unlike POP3, IMAP keeps messages on the server, allowing multiple
              devices to access and synchronize a single mailbox. This is the
              standard for most modern email services.
            </p>
          </div>
          <div className="bg-zinc-700 p-6 rounded-lg border border-zinc-600 flex flex-col items-center text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-mail-minus text-fuchsia-500"
            >
              <path d="M22 7.5V11L12 16.5L2 11V7.5Z" />
              <path d="M12 7V16.5" />
              <path d="m22 7.5-10 5-10-5" />
              <path d="M22 19H12" />
            </svg>
            <h3 className="text-xl font-bold text-fuchsia-500 mt-4 mb-2">
              Email Archiving
            </h3>
            <p className="text-lg text-zinc-400 leading-relaxed">
              Some older email archiving systems use POP3 to download and back
              up messages from a server, ensuring a local copy exists after the
              server&#39;s copy has been deleted.
            </p>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes bounce-right {
          0% {
            left: 0%;
            transform: translateX(4rem) translateY(0);
            opacity: 1;
          }
          50% {
            left: 50%;
            transform: translateX(0) translateY(-80px);
          }
          100% {
            left: 100%;
            transform: translateX(-4rem) translateY(0);
            opacity: 1;
          }
        }
        @keyframes bounce-left {
          0% {
            left: 100%;
            transform: translateX(-4rem) translateY(0);
            opacity: 1;
          }
          50% {
            left: 50%;
            transform: translateX(0) translateY(-80px);
          }
          100% {
            left: 0;
            transform: translateX(4rem) translateY(0);
            opacity: 1;
          }
        }

        .animate-bounce-right {
          animation: bounce-right 3s ease-in-out forwards;
        }
        .animate-bounce-left {
          animation: bounce-left 3s ease-in-out forwards;
        }
      `}</style>
    </div>
  );
};

export default App;
