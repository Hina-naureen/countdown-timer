"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image"; // Importing Image from Next.js

const Countdown = () => {
  const [duration, setDuration] = useState<number | string>(""); // User input for duration
  const [timeLeft, setTimeLeft] = useState<number>(0); // Time remaining
  const [isRunning, setIsRunning] = useState<boolean>(false); // Timer running state
  const [isPaused, setIsPaused] = useState<boolean>(false); // Timer paused state
  const [isFlashing, setIsFlashing] = useState<boolean>(false); // Flashing effect toggle

  const audioRef = useRef<HTMLAudioElement | null>(null); // Audio reference for alert

  const handleStart = () => {
    if (timeLeft > 0) {
      setIsRunning(true);
      setIsPaused(false);
      setIsFlashing(true); // Activate flashing effect when starting
    }
  };

  const handlePause = () => {
    if (isRunning) {
      setIsPaused(true);
      setIsRunning(false);
    }
  };

  const handleReset = () => {
    setIsRunning(false);
    setIsPaused(false);
    setIsFlashing(false); // Remove flashing effect on reset
    setTimeLeft(Number(duration) || 0);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  const handleSetDuration = () => {
    if (typeof duration === "number" && duration > 0) {
      setTimeLeft(duration);
      setIsRunning(false);
      setIsPaused(false);
      setIsFlashing(false); // Reset flashing effect when setting new duration
    } else {
      alert("10");
    }
  };

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    if (isRunning && !isPaused && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timer!);
            audioRef.current?.play(); // Play audio when timer ends
            setIsFlashing(false); // Stop flashing when timer ends
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isRunning, isPaused, timeLeft]);

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-400 via-pink-500 to-indigo-500"
    >
      {/* Timer Card */}
      <div className="relative z-10 w-full max-w-lg p-8 bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl">
        {/* Logo */}
        <div className="text-center mb-6">
          <Image
            src="/sufi-guidance.jpg" // Replace with the correct path
            alt="Logo"
            width={80}
            height={80}
            className="mx-auto rounded-full border-4 border-white shadow-lg"
          />
        </div>

        {/* Title */}
        <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
          SUFI GUIDANCE™ TIMED MEDITATION
        </h1>

        {/* Duration Input */}
        <div className="flex items-center gap-4 mb-6">
          <input
            type="number"
            placeholder="Enter seconds"
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value) || "")}
            className="flex-1 px-4 py-3 rounded-full bg-gray-100 text-gray-700 shadow-inner focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            onClick={handleSetDuration}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full shadow-lg hover:opacity-90 transition"
          >
            Set
          </button>
        </div>

        {/* Timer Display */}
        <div
          className={`text-6xl font-bold text-center py-6 rounded-full shadow-xl bg-white/50 ${
            isFlashing ? "flashing" : ""
          }`}
          style={isFlashing ? { animation: "flash 1s infinite alternate" } : {}}
        >
          {formatTime(timeLeft)}
        </div>

        {/* Control Buttons */}
        <div className="flex justify-around mt-6">
          <button
            onClick={handleStart}
            className="px-6 py-3 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 transition"
          >
            Start
          </button>
          <button
            onClick={handlePause}
            className="px-6 py-3 bg-yellow-500 text-white rounded-full shadow-lg hover:bg-yellow-600 transition"
          >
            Pause
          </button>
          <button
            onClick={handleReset}
            className="px-6 py-3 bg-red-500 text-white rounded-full shadow-lg hover:bg-red-600 transition"
          >
            Reset
          </button>
        </div>

        {/* YouTube Link */}
        <div className="mt-8 text-center">
          <a
            href="https://youtu.be/_1Yc-uhNItA?si=RJ7bi5pIpvqMlsRI" // Replace with your channel link
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 text-white bg-gradient-to-r from-red-400 to-yellow-400 rounded-full shadow-lg hover:opacity-80 transition"
          >
            Visit Our YouTube Channel
          </a>
        </div>
      </div>

      {/* Audio for Timer End */}
      <audio
        ref={audioRef}
        src="/twirling-intime-lenovo-k8-note-alarm-tone-41440.mp3" // Ensure this file is in the public folder
      />
    </div>
  );
};

export default Countdown;
