import React from "react";

function Hero() {
  return (
    <div className="relative h-112 overflow-hidden">
      <img
        src="/image.png"
        className="h-full w-full object-cover object-center"
        alt="Hero background"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 text-center text-white">
        <h1 className="text-5xl font-bold mb-4 shadow-2xl">
          Stories Worth Sharing
        </h1>
        <p className="text-lg max-w-xl">
          Thoughts, lessons, and ideas from everyday moments — one post at a
          time.
        </p>
      </div>
    </div>
  );
}

export default Hero;
