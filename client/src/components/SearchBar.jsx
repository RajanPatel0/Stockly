import React, { useState, useEffect, useRef } from "react";
import { FaSearch, FaCamera, FaTimes, FaMicrophone } from "react-icons/fa";

export default function SearchBar({ value = "", setValue, enableVoice = false }) {
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef(null);

  useEffect(() => {
    if (!("webkitSpeechRecognition" in window)) return;
    const SpeechRecognition = window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.lang = "en-IN";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event) => {
      const speechResult = event.results[0][0].transcript;
      setValue(speechResult);
      setListening(false);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      setListening(false);
    };

    recognition.onend = () => {
      setListening(false);
    };

    recognitionRef.current = recognition;
  }, [setValue]);

  const handleVoiceSearch = () => {
    if (recognitionRef.current) {
      setListening(true);
      recognitionRef.current.start();
    }
  };

  return (
    <div className="w-full flex justify-center pt-6 px-4 relative z-10">
      {/* Glowing background behind bar */}
      <div className="absolute inset-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute w-[150%] h-[150%] bg-gradient-to-r from-purple-500 via-indigo-500 to-cyan-500 opacity-10 blur-3xl animate-pulse" />
      </div>

      <div className="w-full md:w-2/3 lg:w-1/2 flex items-center bg-[#1c1c3c] rounded-full shadow-lg shadow-indigo-700/40 px-4 py-3 backdrop-blur-sm">
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Search for products..."
          className="flex-1 px-4 py-2 bg-transparent text-white placeholder-gray-400 focus:outline-none text-base"
          autoFocus
        />
        <div className="flex items-center space-x-4 text-xl text-white">
          <button
            className="hover:text-cyan-400 transition-transform transform hover:scale-110"
            title="Search"
          >
            <FaSearch />
          </button>
          <button
            className="hover:text-purple-400 transition-transform transform hover:scale-110"
            title="Lens/Camera"
          >
            <FaCamera />
          </button>
          {enableVoice && (
            <button
              onClick={handleVoiceSearch}
              className={`transition-transform transform hover:scale-110 ${listening ? "text-red-500 animate-pulse" : "hover:text-green-400"}`}
              title="Voice Search"
            >
              <FaMicrophone />
            </button>
          )}
          {value && (
            <button
              onClick={() => setValue("")}
              className="hover:text-pink-400 transition-transform transform hover:scale-110"
              title="Clear"
            >
              <FaTimes />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
