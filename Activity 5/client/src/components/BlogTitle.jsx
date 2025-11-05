import React from "react";

function BlogTitle({ title, description, image }) {
  return (
    <div className="relative h-112 overflow-hidden">
      <img
        src={image || "/image.png"}
        className="h-full w-full object-cover object-center"
        alt={title || "Blog background"}
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 text-center text-white px-4">
        <h1 className="text-5xl font-bold mb-4 drop-shadow-2xl">{title}</h1>
        {description && (
          <p className="text-lg max-w-xl drop-shadow-lg">{description}</p>
        )}
      </div>
    </div>
  );
}

export default BlogTitle;
