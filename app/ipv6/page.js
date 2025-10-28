"use client";
import React, { useState } from 'react';

// --- Field Data Structure with Descriptions ---
const IPv6_FIELDS = [
  // Row 1: 32 bits (Version, Traffic Class, Flow Label)
  { id: 'version', label: "Version (4)", bits: 4, colSpan: 'col-span-2', className: "bg-teal-800/70", desc: "Always set to 6 (binary 0110) to identify the packet as <strong>IP Version 6</strong>.", row: 1 },
  { id: 'trafficClass', label: "Traffic Class (8)", bits: 8, colSpan: 'col-span-3', className: "bg-zinc-700", desc: "Similar to the ToS field in IPv4, this is used for <strong>Quality of Service (QoS)</strong>, prioritizing packets for real-time traffic like voice or video.", row: 1 },
  { id: 'flowLabel', label: "Flow Label (20)", bits: 20, colSpan: 'col-span-7', className: "bg-teal-800/70", desc: "A new field used by a source to label sequences of packets that require special handling by routers, like belonging to the same <strong>data flow or session</strong>.", row: 1 },

  // Row 2: 32 bits (Payload Length, Next Header, Hop Limit)
  { id: 'payloadLength', label: "Payload Length (16)", bits: 16, colSpan: 'col-span-6', className: "bg-zinc-700", desc: "The length of the rest of the packet <strong>following the 40-byte fixed header</strong>. This includes any Extension Headers and the Upper-Layer PDU.", row: 2 },
  { id: 'nextHeader', label: "Next Header (8)", bits: 8, colSpan: 'col-span-3', className: "bg-teal-800/70", desc: "Identifies the type of the <strong>next header</strong> that immediately follows the Fixed Header. This could be an Extension Header, TCP, UDP, or ICMPv6.", row: 2 },
  { id: 'hopLimit', label: "Hop Limit (8)", bits: 8, colSpan: 'col-span-3', className: "bg-zinc-700", desc: "Functions exactly like TTL in IPv4: a counter that <strong>decrements by 1 at every router hop</strong>. If it hits zero, the packet is discarded to prevent network loops.", row: 2 },

  // Row 3, 4, 5, 6: 128 bits (Source Address)
  { id: 'sourceAddress', label: "Source Address (128)", bits: 128, colSpan: 'col-span-12', className: "bg-teal-800/70", desc: 'The <strong>128-bit IPv6 address</strong> of the computer or device that originated the packet.', row: 3, rows: 4, fullRow: true }, // Covers rows 3-6

  // Row 7, 8, 9, 10: 128 bits (Destination Address)
  { id: 'destinationAddress', label: "Destination Address (128)", bits: 128, colSpan: 'col-span-12', className: "bg-zinc-700", desc: 'The <strong>128-bit IPv6 address</strong> of the final intended recipient of the packet.', row: 7, rows: 4, fullRow: true }, // Covers rows 7-10
];


// --- Static Component for Individual Header Field ---
const IPv6Field = ({ bits, label, colSpan, className, onClick, rows, fullRow }) => {
  const heightClass = fullRow ? `h-${rows * 10}` : `h-20`; // Adjusted to use Tailwind height classes
  const addressClass = fullRow ? 'text-2xl font-mono' : 'text-sm';
  const labelText = label.replace(/\s*\([\d]+\)\s*/g, '');

  return (
    <div
      onClick={onClick}
      className={`${colSpan} ${className} p-2 rounded-md border border-cyan-400/50 flex flex-col items-center justify-center text-center shadow-lg transition-all duration-300 cursor-pointer hover:scale-[1.01] hover:bg-teal-900/80 ${heightClass}`}
      style={{ minHeight: fullRow ? `${rows * 3.5}rem` : '5rem' }} // Custom height for addresses
    >
      <div className={`font-semibold text-white/90 ${addressClass}`}>{labelText}</div>
      <div className="text-xs text-cyan-400 mt-1">{bits} Bits</div>
    </div>
  );
};

// --- Modal Component (Reused from IPv4) ---
const FieldModal = ({ field, onClose }) => {
  if (!field) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm transition-opacity">
      <div className="bg-zinc-800 w-full max-w-md rounded-xl shadow-2xl p-6 border-t-4 border-cyan-400 transform transition-transform scale-100">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-2xl font-bold text-cyan-400">{field.label.replace(/\s*\([\d]+\)\s*/g, '')}</h2>
          <button onClick={onClose} className="text-zinc-400 hover:text-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <p className="text-lg text-zinc-300 mb-4" dangerouslySetInnerHTML={{ __html: field.desc }}></p>
        <div className="text-sm text-zinc-500 border-t border-zinc-700 pt-3">
          Size: <span className="text-cyan-400 font-mono">{field.bits} Bits</span>
        </div>
      </div>
    </div>
  );
};

// --- Main IPv6 Visualization Component ---
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
  
  // Group fields by starting row for rendering
  const rows = IPv6_FIELDS.reduce((acc, field) => {
    // Only process fields that start a row
    if (field.fullRow || field.row === 1 || field.row === 2) {
      acc[field.row] = acc[field.row] || [];
      acc[field.row].push(field);
    }
    return acc;
  }, {});
  
  return (
    <div className="flex flex-col items-center min-h-screen p-8 bg-zinc-950 font-['Inter']">
      
      {/* Back Button */}
      <div className="absolute top-4 left-4">
        <button
          onClick={handleGoBack}
          className="flex items-center space-x-2 text-cyan-400 hover:text-cyan-300 transition-colors duration-300"
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
        <h1 className="text-5xl font-bold text-cyan-400">IPv6 Fixed Header Structure</h1>
        <p className="text-xl text-zinc-400">
          A visual breakdown of the mandatory 40-byte (320-bit) header. Click any field for details.
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
        
        {/* --- IPv6 Header Grid Container (32 bits wide, 12 columns total) --- */}
        <div className="flex flex-col gap-3">
          
          {Object.keys(rows).map(rowKey => {
            const rowFields = rows[rowKey];
            
            // For the 32-bit fields (Rows 1 & 2)
            if (rowKey === '1' || rowKey === '2') {
              return (
                <div key={rowKey} className="grid grid-cols-12 gap-1 h-20">
                  {rowFields.map(field => (
                    <IPv6Field
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
            }

            // For the 128-bit fields (Source/Destination Addresses)
            if (rowKey === '3' || rowKey === '7') {
              const field = rowFields[0]; // There should only be one field per address block
              return (
                <div 
                  key={field.id} 
                  className="grid grid-cols-12 gap-1"
                  style={{ minHeight: `${field.rows * 3.5}rem` }} // Apply height container
                >
                  <IPv6Field
                    bits={field.bits}
                    label={field.label}
                    colSpan={field.colSpan}
                    className={field.className}
                    onClick={() => openModal(field)}
                    rows={field.rows}
                    fullRow={true}
                  />
                </div>
              );
            }
            return null; // Should not happen
          })}
          
        </div>
        {/* --- End Header Grid --- */}
        
        {/* Extension Headers Row */}
        <div className="grid grid-cols-12 gap-1 h-16 mt-6">
            <div className="col-span-12 bg-zinc-600/70 p-2 rounded-md border-2 border-dashed border-cyan-400 text-center text-xl font-bold text-cyan-400 cursor-pointer hover:bg-teal-900/80 transition-colors"
                 onClick={() => openModal({label: "Extension Headers", desc: "Unlike IPv4, optional information is placed here, after the fixed header. These headers allow IPv6 to be easily extended with new features like routing or security (IPsec).", bits: "Variable"})}>
              EXTENSION HEADERS (Optional, Variable Length)
            </div>
        </div>
        
        {/* Data Payload Row */}
        <div className="grid grid-cols-12 gap-1 h-16 mt-4">
            <div className="col-span-12 bg-zinc-600 p-2 rounded-md border-2 border-dashed border-zinc-500 text-center text-xl font-bold text-cyan-400">
              DATA PAYLOAD (TCP/UDP Segment, ICMPv6 Message, etc.)
            </div>
          </div>
      </div>
      
      {/* Field Description Modal */}
      <FieldModal field={selectedField} onClose={closeModal} />
    </div>
  );
};

export default App;
