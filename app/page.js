"use client";
import React, { useState } from "react";

// Reusable ProtocolCard component
const ProtocolCard = ({ href, title, description, gradientFrom, gradientTo, protocolType }) => {
  // SVG icon for each card
  const getIcon = (type) => {
    switch (type) {
      case 'tcp':
        return (
          <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
            viewBox="0 0 297 297" style={{ enableBackground: 'new 0 0 297 297' }} xmlSpace="preserve"
            className="w-14 h-14">
            <g fill="currentColor">
              <path d="M92.574,206.426c0,9.758,7.939,17.697,17.698,17.697s17.697-7.939,17.697-17.697c0-9.759-7.938-17.697-17.697-17.697
                S92.574,196.667,92.574,206.426z M112.014,206.426c0,0.96-0.781,1.741-1.741,1.741c-0.961,0-1.742-0.781-1.742-1.741
                c0-0.961,0.781-1.742,1.742-1.742C111.232,204.684,112.014,205.465,112.014,206.426z" />
              <path d="M296.484,135.412l-37.61-111.111c-1.721-5.084-7.236-7.814-12.321-6.09c-5.085,1.721-7.812,7.237-6.09,12.322l2.678,7.909
                L81.982,79.057c-2.121-16.275-13.898-36.42-41.429-36.42c-5.368,0-9.72,4.353-9.72,9.72c0,5.367,4.351,9.72,9.72,9.72
                c9.378,0,15.457,3.24,19.131,10.196c2.535,4.799,3.078,9.872,3.192,11.599l-11.793,2.972c-0.241,0.063-0.481,0.133-0.718,0.211
                C11.753,100.017-9.116,141.978,3.847,180.59c6.79,20.225,21.704,35.984,40.382,44.168l-3.151,5.458
                c-7.007,12.135-7.868,24.561-2.365,34.093c5.503,9.53,16.695,14.997,30.708,14.997l81.056-0.001
                c14.012,0,25.205-5.467,30.707-14.997c5.503-9.531,4.642-21.958-2.365-34.093l-20.039-34.708l117.05-60.491l2.244,6.629
                c1.372,4.052,5.152,6.605,9.205,6.605c1.032,0,2.084-0.166,3.117-0.516C295.48,146.013,298.206,140.497,296.484,135.412z
                M164.349,254.588c-1.936,3.354-6.993,5.277-13.873,5.277l-81.056,0.001c-6.881,0-11.938-1.924-13.873-5.277
                c-1.938-3.355-1.075-8.696,2.365-14.654l40.528-70.194c3.439-5.958,7.634-9.376,11.508-9.376c3.873,0,8.067,3.418,11.507,9.376
                l40.527,70.193C165.423,245.893,166.285,251.234,164.349,254.588z M138.29,160.021c-7.006-12.135-17.337-19.095-28.342-19.095
                c-11.006,0-21.337,6.96-28.343,19.095l-27.572,47.756c-14.694-5.751-26.515-17.754-31.758-33.373
                c-9.514-28.339,5.701-59.123,33.937-68.806l102.816-25.911l27.154,79.776l-37.134,19.192L138.29,160.021z M203.646,150.439
                L177.94,74.921l71.3-17.969l20.003,59.585L203.646,150.439z" />
            </g>
          </svg>
        );
      case 'udp':
        return (
          <svg width="297" height="297" viewBox="0 0 192 192" xmlns="http://www.w3.org/2000/svg" fill="none" className="w-14 h-14">
            <path fill="currentColor" fillRule="evenodd" d="M55.087 40H83c13.807 0 25 11.193 25 25S96.807 90 83 90H52c-.335 0-.668-.007-1-.02V158a6 6 0 0 0 6 6h9a6 6 0 0 0 6-6v-18a6 6 0 0 1 6-6h24a6 6 0 0 1 6 6v18a6 6 0 0 0 6 6h9a6 6 0 0 0 6-6V54c0-14.36-11.641-26-26-26H77c-9.205 0-17.292 4.783-21.913 12ZM39 86.358C31.804 81.97 27 74.046 27 65c0-9.746 5.576-18.189 13.712-22.313C45.528 27.225 59.952 16 77 16h26c16.043 0 29.764 9.942 35.338 24H147c9.941 0 18 8.059 18 18v65c0 9.941-8.059 18-18 18h-6v17c0 9.941-8.059 18-18 18h-9c-9.941 0-18-8.059-18-18v-12H84v12c0 9.941-8.059 18-18 18h-9c-9.941 0-18-8.059-18-18V86.358ZM141 129h6a6 6 0 0 0 6-6V58a6 6 0 0 0-6-6h-6.052c.035.662.052 1.33.052 2v75ZM52 52c-7.18 0-13 5.82-13 13s5.82 13 13 13h31c7.18 0 13-5.82 13-13s-5.82-13-13-13H52Z" clipRule="evenodd" />
          </svg>
        );
      case 'ftp':
        return (
          <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
            width="462px" height="462px" viewBox="0 0 462 462" style={{ enableBackground: 'new 0 0 462 462' }} xmlSpace="preserve" className="w-14 h-14">
            <g fill="currentColor">
              <g>
                <polygon points="291,58.296 291,41.796 171,41.796 171,58.296 0,58.296 0,98.296 211,98.296 211,158.624 251,158.624 251,98.296 462,98.296 462,58.296" />
                <path d="M86.488,168.392l-23.896,23.896v204.02l23.896,23.896h289.023l23.896-23.896v-204.02l-23.896-23.896H86.488z
                  M215.727,295.296H95.437v-87.641l8.745-8.745h111.545V295.296z M366.562,295.296H246.273v-96.386h111.545l8.744,8.745V295.296z" />
              </g>
            </g>
          </svg>
        );
      case 'smtp':
        return (
          <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
            width="484.017px" height="484.017px" viewBox="0 0 484.017 484.017" style={{ enableBackground: 'new 0 0 484.017 484.017' }}
            xmlSpace="preserve" className="w-14 h-14">
            <g fill="currentColor">
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
                  z" />
                <path d="M416.4,180.366c-54.221,16.883-64.455,83.389-64.455,83.389c21.648,2.373,25.58,78.783,25.58,78.783
                  c-7.266,38.59,60.994,89.309,93.615,17.897C515.594,263.128,431.916,183.327,416.4,180.366z" />
              </g>
            </g>
          </svg>
        );
      case 'pop3':
        return (
          <svg version="1.1" id="Icons" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 32 32" xmlSpace="preserve" className="w-14 h-14">
            <style type="text/css">
              {`.st0{fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;}`}
            </style>
            <path className="st0" d="M19.5,7C15.4,2.9,8.6,3.1,4.8,7.5c-3.6,4.2-3,10.5,1,14.3c3.7,3.5,6.5,4,9,3c2.2-0.9,4.6-0.4,6.2,1.3l3.1,3.5
              c0.3,0.4,1,0.4,1.3,0l2.5-2.5c0.4-0.4,0.4-1,0-1.3l-3.4-3c-1.8-1.6-2.2-4-1.4-6.2C24,13.9,23.5,11,19.5,7z" />
            <line className="st0" x1="9.8" y1="24.5" x2="22.7" y2="11.5" />
            <circle className="st0" cx="27" cy="5" r="3" />
          </svg>
        );
      case 'http':
        return (
          <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
            viewBox="0 0 52 52" style={{ enableBackground: 'new 0 0 52 52' }} xmlSpace="preserve" className="w-14 h-14">
            <path fill="currentColor" d="M44.385,44.385c-10.154,10.154-26.616,10.154-36.77,0s-10.154-26.616,0-36.77s26.616-10.154,36.77,0
              L26,26L44.385,44.385z" />
            <circle fill="black" cx="23" cy="12" r="3" />
          </svg>
        );
      case 'https':
        return (
          <svg width="800px" height="800px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-14 h-14">
            <path fillRule="evenodd" clipRule="evenodd" d="M8.61 3l5.74 1.53L15 5v6.74l-.37.48-6.13 1.69-6.14-1.69-.36-.48V5l.61-.47L8.34 3h.27zm-.09 1l-4 1 .55.2 3.43.9 3-.81.95-.29-3.93-1zM3 11.36l5 1.37V7L3 5.66v5.7zM9 7v5.73l5-1.37V5.63l-2.02.553V8.75l-1 .26V6.457L9 7z" />
          </svg>
        );
      case 'dns':
        return (
          <svg fill="currentColor" width="800px" height="800px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-14 h-14">
            <path d="M20,9.5962912 L20,19.5 C20,19.7761424 19.7761424,20 19.5,20 L4.5,20 C4.22385763,20 4,19.7761424 4,19.5 L4,9.5962912 L2.03576165,4.68569534 C1.90438878,4.35726314 2.1462677,4 2.5,4 L12.5,4 C12.7044523,4 12.8883067,4.12447547 12.9642383,4.31430466 L14.5,8.1537088 L16.0357617,4.31430466 C16.1116933,4.12447547 16.2955477,4 16.5,4 L21.5,4 C21.8537323,4 22.0956112,4.35726314 21.9642383,4.68569534 L20,9.5962912 L20,9.5962912 Z M15,10 L15,19 L19,19 L19,10 L15,10 Z M14,10 L5,10 L5,19 L14,19 L14,10 Z M4.83851648,9 L13.7614835,9 L12.1614835,5 L3.23851648,5 L4.83851648,9 Z M19.1614835,9 L20.7614835,5 L16.8385165,5 L15.2385165,9 L19.1614835,9 Z M13,15.5 L13,17.5 C13,17.7761424 12.7761424,18 12.5,18 L9.5,18 C9.22385763,18 9,17.7761424 9,17.5 L9,15.5 C9,15.2238576 9.22385763,15 9.5,15 L12.5,15 C12.7761424,15 13,15.2238576 13,15.5 Z M12,16 L10,16 L10,17 L12,17 L12,16 Z" />
          </svg>
        );
      case 'icmp':
        return (
          <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 470 470" xmlnsXlink="http://www.w3.org/1999/xlink" enableBackground="new 0 0 470 470" className="w-14 h-14">
            <g fill="currentColor">
              <path d="m360.089,156.639h-32.76v-149.139c0-4.142-3.357-7.5-7.5-7.5h-60c-4.143,0-7.5,3.358-7.5,7.5s3.357,7.5 7.5,7.5h22.5v69.139c0,12.737-10.652,25.023-23.261,26.828l-109.961,15.748c-3.693,0.529-6.437,3.693-6.437,7.424v22.5h-32.76c-25.86,0-46.898,21.039-46.898,46.898v238.963c0,15.164 12.337,27.5 27.5,27.5h288.975c15.163,0 27.5-12.336 27.5-27.5v-238.963c5.68434e-14-25.859-21.038-46.898-46.898-46.898zm-202.418-15.997l103.524-14.826c19.924-2.853 36.134-21.549 36.134-41.677v-69.139h15v141.639h-154.658v-15.997zm-47.76,30.997h62.76v22.541c0,4.142 3.357,7.5 7.5,7.5s7.5-3.358 7.5-7.5v-22.541h94.658v22.541c0,4.142 3.357,7.5 7.5,7.5s7.5-3.358 7.5-7.5v-22.541h62.76c17.589,0 31.898,14.31 31.898,31.898v13.144h-102.148c-0.02,0-109.658,0-109.658,0-0.02,0-102.168,0-102.168,0v-13.144c2.84217e-14-17.588 14.309-31.898 31.898-31.898zm77.76,190.145v-130.103h94.658v130.104h-94.658zm191.816,93.215h-288.974c-6.893,0-12.5-5.607-12.5-12.5v-210.819h94.658v130.104h-72.158c-4.143,0-7.5,3.358-7.5,7.5s3.357,7.5 7.5,7.5h268.975c4.143,0 7.5-3.358 7.5-7.5s-3.357-7.5-7.5-7.5h-72.158v-130.104h94.658v210.819c-0.001,6.893-5.608,12.5-12.501,12.5z" />
              <path d="m349.828,15h49.659c4.143,0 7.5-3.358 7.5-7.5s-3.357-7.5-7.5-7.5h-49.659c-4.143,0-7.5,3.358-7.5,7.5s3.358,7.5 7.5,7.5z" />
              <path d="M70.513,15h159.316c4.143,0,7.5-3.358,7.5-7.5s-3.357-7.5-7.5-7.5H70.513c-4.143,0-7.5,3.358-7.5,7.5S66.37,15,70.513,15z" />
            </g>
          </svg>
        );
      case 'imap':
        return (
          <svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-14 h-14">
            <path d="M10 13H14M19 9V20H5V9M19 9H5M19 9C19.5523 9 20 8.55228 20 8V5C20 4.44772 19.5523 4 19 4H5C4.44772 4 4 4.44772 4 5V8C4 8.55228 4.44772 9 5 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        );
      case 'sftp':
        return (
          <svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-14 h-14">
            <path d="M16 11.5V6.5C16 4.01472 13.9853 2 11.5 2C9.01472 2 7 4.01472 7 6.5V7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <rect x="3" y="11" width="18" height="11" rx="2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M12 16C12 16.5523 11.5523 17 11 17C10.4477 17 10 16.5523 10 16C10 15.4477 10.4477 15 11 15C11.5523 15 12 15.4477 12 16Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        );
      case 'ptp':
        return (
          <svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-14 h-14">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
            <path d="M12 7V12H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        );
      case 'ssh':
        return (
          <svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-14 h-14">
            <path d="M16 11.5V6.5C16 4.01472 13.9853 2 11.5 2C9.01472 2 7 4.01472 7 6.5V7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <rect x="3" y="11" width="18" height="11" rx="2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M12 16C12 16.5523 11.5523 17 11 17C10.4477 17 10 16.5523 10 16C10 15.4477 10.4477 15 11 15C11.5523 15 12 15.4477 12 16Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        );
      case 'ipv4':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-14 h-14">
            <rect x="2" y="8" width="4" height="8" rx="1"/>
            <rect x="7" y="8" width="4" height="8" rx="1"/>
            <rect x="12" y="8" width="4" height="8" rx="1"/>
            <rect x="17" y="8" width="4" height="8" rx="1"/>
            <text x="11.5" y="14" fontSize="6" fontWeight="bold" fill="currentColor" textAnchor="middle">4</text>
          </svg>
        );
      case 'ipv6':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-14 h-14">
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
            <text x="12" y="12" fontSize="6" fontWeight="bold" fill="currentColor" textAnchor="middle">6</text>
          </svg>
        );
      case 'telnet':
        return (
          <svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-14 h-14">
            <path d="M4 7V17C4 18.6569 5.34315 20 7 20H17C18.6569 20 20 18.6569 20 17V7C20 5.34315 18.6569 4 17 4H7C5.34315 4 4 5.34315 4 7Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M8 9L12 13L8 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M15 17H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        );
      default:
        return null;
    }
  };

  const icon = getIcon(protocolType);
  
  // FIX: Removed dynamic class generation and replaced with dynamic inline style
  // We use gradientTo for the color effect
  const iconStyle = {
    color: 'white', // Initial color
    transition: 'color 0.3s',
  };
  
  const hoverStyle = {
    '--hover-color': gradientTo, // Define CSS variable for hover effect
  };

  return (
    <div className="group relative" style={hoverStyle}>
      <a href={href} className="block">
        <div className="relative z-10 flex flex-col items-center justify-center w-72 h-48 p-6 bg-black border border-white rounded-xl transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl hover:shadow-white/10">
          {icon && (
            // Apply the custom style for color change on hover
            <div className={`text-white/[0.15] group-hover:text-[color:var(--hover-color)] group-hover:opacity-100 transition-colors mb-4`}>
              {icon}
            </div>
          )}
          <h2 className={`text-xl font-bold text-white z-10 ${!title ? "text-zinc-400" : ""}`}>{title}</h2>
          {description && (
            <p className="mt-2 text-white opacity-70 text-base text-center z-10">
              {description}
            </p>
          )}
        </div>
      </a>
      <div
        className="absolute inset-0 z-0 rounded-xl blur-3xl opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100"
        style={{ background: `linear-gradient(to bottom right, ${gradientFrom}, ${gradientTo})` }}
      ></div>
    </div>
  );
};

const App = () => {
  const [currentPage, setCurrentPage] = useState(0);

  const protocols = [
    { href: "/tcp", title: "TCP", description: "A step-by-step visualization of the TCP handshake.", gradientFrom: "#2196f3", gradientTo: "#1976d2", protocolType: "tcp" },
    { href: "/udp", title: "UDP", description: "A step-by-step visualization of the UDP protocol.", gradientFrom: "#22d3ee", gradientTo: "#06b6d4", protocolType: "udp" },
    { href: "/ftp", title: "FTP", description: "A step-by-step visualization of the FTP protocol.", gradientFrom: "#ffc107", gradientTo: "#ff0", protocolType: "ftp" },
    { href: "/smtp", title: "SMTP", description: "A step-by-step visualization of the SMTP protocol.", gradientFrom: "#ffc107", gradientTo: "#ffa000", protocolType: "smtp" },
    { href: "/pop3", title: "POP3", description: "A step-by-step visualization of the POP3 protocol.", gradientFrom: "#f0f", gradientTo: "#8b5cf6", protocolType: "pop3" },
    { href: "/http", title: "HTTP", description: "A step-by-step visualization of the HTTP protocol.", gradientFrom: "#ffc107", gradientTo: "#ff0", protocolType: "http" },
    { href: "/https", title: "HTTPS", description: "A step-by-step visualization of the HTTPS protocol.", gradientFrom: "#bdbdbd", gradientTo: "#D4D4D8", protocolType: "https" },
    { href: "/dns", title: "DNS", description: "A step-by-step visualization of the DNS protocol.", gradientFrom: "#3b82f6", gradientTo: "#2563eb", protocolType: "dns" },
    { href: "/icmp", title: "ICMP", description: "A step-by-step visualization of the ICMP protocol.", gradientFrom: "#6366F1", gradientTo: "#6366F1", protocolType: "icmp" },
    { href: "/imap", title: "IMAP", description: "A step-by-step visualization of the IMAP protocol.", gradientFrom: "#84CC16", gradientTo: "#84CC16", protocolType: "imap" },
    { href: "/sftp", title: "SFTP", description: "A step-by-step visualization of the SFTP protocol.", gradientFrom: "#A0522D", gradientTo: "#8B4513", protocolType: "sftp" },
    { href: "/ptp", title: "PTP", description: "A step-by-step visualization of the PTP protocol.", gradientFrom: "#00CED1", gradientTo: "#48D1CC", protocolType: "ptp" },
    { href: "/ssh", title: "SSH", description: "A step-by-step visualization of the SSH protocol.", gradientFrom: "#4b5563", gradientTo: "#374151", protocolType: "ssh" },
    { href: "/ipv4", title: "IPv4", description: "A step-by-step visualization of the IPv4 protocol.", gradientFrom: "#ef4444", gradientTo: "#dc2626", protocolType: "ipv4" },
    { href: "/ipv6", title: "IPv6", description: "A step-by-step visualization of the IPv6 protocol.", gradientFrom: "#10b981", gradientTo: "#059669", protocolType: "ipv6" },
    { href: "/telnet", title: "Telnet", description: "A step-by-step visualization of the Telnet protocol.", gradientFrom: "#f59e0b", gradientTo: "#d97706", protocolType: "telnet" },
    // Blank Cards with white spotlight for the second page
    { href: "#", title: "P", description: "", gradientFrom: "#e5e7eb", gradientTo: "#f3f4f6", protocolType: null },
    { href: "#", title: "R", description: "", gradientFrom: "#e5e7eb", gradientTo: "#f3f4f6", protocolType: null },
    { href: "#", title: "O", description: "", gradientFrom: "#e5e7eb", gradientTo: "#f3f4f6", protocolType: null },
    { href: "#", title: "T", description: "", gradientFrom: "#e5e7eb", gradientTo: "#f3f4f6", protocolType: null },
    { href: "#", title: "O", description: "", gradientFrom: "#e5e7eb", gradientTo: "#f3f4f6", protocolType: null },
    { href: "#", title: "C", description: "", gradientFrom: "#e5e7eb", gradientTo: "#f3f4f6", protocolType: null },
    { href: "#", title: "O", description: "", gradientFrom: "#e5e7eb", gradientTo: "#f3f4f6", protocolType: null },
    { href: "#", title: "L", description: "", gradientFrom: "#e5e7eb", gradientTo: "#f3f4f6", protocolType: null },
  ];

  const cardsPerPage = 12;
  const totalPages = Math.ceil(protocols.length / cardsPerPage);

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-black font-['Inter']">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">Networking Protocols Visualized</h1>
      </div>
      <div className="relative w-full max-w-7xl overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentPage * 100}%)` }}
        >
          {Array.from({ length: totalPages }).map((_, pageIndex) => (
            <div
              key={pageIndex}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 flex-shrink-0 w-full p-2"
            >
              {protocols
                .slice(pageIndex * cardsPerPage, (pageIndex + 1) * cardsPerPage)
                .map((protocol, index) => (
                  <ProtocolCard
                    key={index}
                    href={protocol.href}
                    title={protocol.title}
                    description={protocol.description}
                    gradientFrom={protocol.gradientFrom}
                    gradientTo={protocol.gradientTo}
                    protocolType={protocol.protocolType}
                  />
                ))}
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center items-center gap-4 mt-6">
        <button onClick={handlePrevPage} disabled={currentPage === 0} className="p-2 rounded-full text-white bg-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
        </button>
        <div className="flex gap-2">
          {Array.from({ length: totalPages }).map((_, index) => (
            <span key={index} className={`h-2 w-2 rounded-full transition-colors duration-300 ${currentPage === index ? 'bg-white' : 'bg-zinc-700'}`}></span>
          ))}
        </div>
        <button onClick={handleNextPage} disabled={currentPage === totalPages - 1} className="p-2 rounded-full text-white bg-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>
    </div>
  );
};

export default App;
