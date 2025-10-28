"use client";
import React, { useState } from 'react';

// --- Field Data Structure with Descriptions ---
const IPv4_FIELDS = [
  // Row 1: 32 bits (Version, IHL, TOS, Total Length)
  { id: 'version', label: "Version", bits: 4, colSpan: 'col-span-2', className: "bg-yellow-800/70", desc: "This simply tells a router that the packet uses <strong>IP Version 4</strong> (binary 0100).", row: 1 },
  { id: 'ihl', label: "IHL (Header Length)", bits: 4, colSpan: 'col-span-1', className: "bg-yellow-800/70", desc: "The length of the header itself, measured in <strong>4-byte blocks</strong>. It tells the receiving device exactly where the data payload begins. The minimum standard value is 5 (20 bytes).", row: 1 },
  { id: 'tos', label: "Type of Service (ToS)/DSCP", bits: 8, colSpan: 'col-span-3', className: "bg-zinc-700", desc: "A set of bits used to request a certain <strong>Quality of Service (QoS)</strong>, prioritizing the packet's delivery based on factors like speed (low delay) or reliability.", row: 1 },
  { id: 'totalLength', label: "Total Length", bits: 16, colSpan: 'col-span-6', className: "bg-yellow-800/70", desc: "The <strong>total size of the entire IP packet</strong> (header and data) measured in bytes. This field determines how much data must be read to process the entire packet.", row: 1 },

  // Row 2: 32 bits (Identification, Flags, Fragment Offset)
  { id: 'id', label: "Identification", bits: 16, colSpan: 'col-span-6', className: "bg-zinc-700", desc: "A <strong>unique number</strong> assigned to a packet (datagram). If the packet is split into fragments, every fragment keeps this same ID so the destination can reassemble them correctly.", row: 2 },
  { id: 'flags', label: "Flags (3)", bits: 3, colSpan: 'col-span-1', className: "bg-yellow-800/70", desc: 'Control flags that tell a router if the packet <strong>can be fragmented</strong> or if <strong>more fragments</strong> are still following this one. Important for controlling packet splitting.', row: 2 },
  { id: 'fragOffset', label: "Fragment Offset (13)", bits: 13, colSpan: 'col-span-5', className: "bg-zinc-700", desc: "Specifies the <strong>starting position of this fragment's data</strong> within the original, unfragmented packet. It helps the receiver put the pieces back in order.", row: 2 },

  // Row 3: 32 bits (TTL, Protocol, Header Checksum)
  { id: 'ttl', label: "Time to Live (TTL)", bits: 8, colSpan: 'col-span-3', className: "bg-yellow-800/70", desc: "A counter that <strong>decrements by 1 every time the packet passes through a router</strong>. If the count hits zero, the packet is destroyed to prevent infinite network loops.", row: 3 },
  { id: 'protocol', label: "Protocol", bits: 8, colSpan: 'col-span-3', className: "bg-zinc-700", desc: "Indicates the <strong>next protocol</strong> that should handle the data payload (e.g., 6 for TCP, 17 for UDP, 1 for ICMP). It tells the operating system which service gets the data.", row: 3 },
  { id: 'checksum', label: "Header Checksum", bits: 16, colSpan: 'col-span-6', className: "bg-yellow-800/70", desc: "A simple value used to check for <strong>errors only in the header</strong> data. Since the TTL changes at every hop, the checksum must be recalculated by every router.", row: 3 },

  // Row 4: 32 bits (Source Address)
  { id: 'source', label: "Source Address", bits: 32, colSpan: 'col-span-12', className: "bg-yellow-800/70", desc: 'The <strong>32-bit IPv4 address</strong> of the computer or device that originally sent the packet.', row: 4 },

  // Row 5: 32 bits (Destination Address)
  { id: 'destination', label: "Destination Address", bits: 32, colSpan: 'col-span-12', className: "bg-zinc-700", desc: 'The <strong>32-bit IPv4 address</strong> of the computer or device that is the final intended recipient of the packet.', row: 5 },

  // Row 6: 32 bits (Options & Padding - Variable)
  { id: 'options', label: "Options (Variable) + Padding", bits: 32, colSpan: 'col-span-12', className: "bg-zinc-600/70", desc: 'An optional space for network testing or security features (rarely used today). Padding ensures the header remains a multiple of 4 bytes.', row: 6 },
];


// --- Static Component for Individual Header Field ---
const IPv4Field = ({ bits, label, colSpan, className, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`${colSpan} ${className} p-2 rounded-md border border-yellow-500/50 flex flex-col items-center justify-center text-center shadow-lg transition-all duration-300 cursor-pointer hover:scale-[1.01] hover:bg-yellow-900/80`}
    >
      <div className="text-sm font-semibold text-white/90">{label.replace(/\s*\([\d]+\)\s*/g, '')}</div>
      <div className="text-xs text-yellow-300 mt-1">{bits} Bits</div>
    </div>
  );
};

// --- Modal Component ---
const FieldModal = ({ field, onClose }) => {
  if (!field) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm transition-opacity">
      <div className="bg-zinc-800 w-full max-w-md rounded-xl shadow-2xl p-6 border-t-4 border-yellow-400 transform transition-transform scale-100">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-2xl font-bold text-yellow-400">{field.label.replace(/\s*\([\d]+\)\s*/g, '')}</h2>
          <button onClick={onClose} className="text-zinc-400 hover:text-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <p className="text-lg text-zinc-300 mb-4" dangerouslySetInnerHTML={{ __html: field.desc }}></p>
        <div className="text-sm text-zinc-500 border-t border-zinc-700 pt-3">
          Size: <span className="text-yellow-300 font-mono">{field.bits} Bits</span>
        </div>
      </div>
    </div>
  );
};

// --- Main IPv4 Visualization Component ---
const App = () => {
  const [selectedField, setSelectedField] = useState(null);

  const handleGoBack = () => {
    window.location.href = '/';
  };

  const openModal = (fieldData) => {
    setSelectedField(fieldData);
  };

  const closeModal = () => {
    setSelectedField(null);
  };
  
  // Group fields by row for rendering
  const rows = IPv4_FIELDS.reduce((acc, field) => {
    if (!acc[field.row]) {
      acc[field.row] = [];
    }
    acc[field.row].push(field);
    return acc;
  }, {});
  
  return (
    <div className="flex flex-col items-center min-h-screen p-8 bg-zinc-950 font-['Inter']">
      <script src="https://cdn.tailwindcss.com"></script>
      
      {/* Back Button */}
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
      
      {/* Title */}
      <div className="text-center mb-8">
        <h1 className="text-5xl font-bold text-yellow-400">IPv4 Packet Header Structure</h1>
        <p className="text-xl text-zinc-400">
          A visual breakdown of the mandatory 20-byte (160-bit) header. Click any field for details.
        </p>
      </div>

      {/* Main Visualization Container */}
      <div className="w-full max-w-5xl bg-zinc-900 p-8 rounded-xl shadow-2xl border border-zinc-700">
        
        {/* Bit Ruler (32 bits) */}
        <div className="flex justify-between text-zinc-500 mb-4 text-xs">
          <span>0 Bits</span>
          <span>8 Bits</span>
          <span>16 Bits</span>
          <span>24 Bits</span>
          <span>31 Bits</span>
        </div>
        
        {/* --- IPv4 Header Grid Container (32 bits wide, 12 columns total) --- */}
        <div className="flex flex-col gap-3">
          
          {Object.keys(rows).map(rowKey => {
            const rowFields = rows[rowKey];
            
            return (
              <div key={rowKey} className={`grid grid-cols-12 gap-1 ${rowKey < 6 ? 'h-20' : 'h-16'}`}>
                {rowFields.map(field => (
                  <IPv4Field
                    key={field.id}
                    bits={field.bits}
                    label={field.label}
                    colSpan={field.colSpan}
                    className={field.className}
                    onClick={() => openModal(field)}
                  />
                ))}
              </div>
            );
          })}
          
        </div>
        {/* --- End Header Grid --- */}
        
        {/* Data Payload Row (manually placed as it's not a header field) */}
        <div className="grid grid-cols-12 gap-1 h-16 mt-4">
            <div className="col-span-12 bg-zinc-600 p-2 rounded-md border-2 border-dashed border-zinc-500 text-center text-xl font-bold text-yellow-400">
              DATA PAYLOAD (TCP/UDP Segment, ICMP Message, etc.)
            </div>
          </div>
      </div>
      
      {/* Field Description Modal */}
      <FieldModal field={selectedField} onClose={closeModal} />
    </div>
  );
};

export default App;
