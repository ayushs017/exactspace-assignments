import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import confetti from "canvas-confetti";

export const PhotoCard = ({ photo, likes = 0, onLike }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Picsum download_url is e.g. "https://picsum.photos/id/0/5000/3333"
  // To keep loading blazing fast and crisp, we can use a sensible thumbnail URL or fallback to download_url
  const optimizedUrl = photo.id
    ? `https://picsum.photos/id/${photo.id}/600/400`
    : photo.download_url;

  const handleLike = (e) => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 250);

    // Trigger subtle mini-confetti
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 12,
      spread: 40,
      origin: { x, y },
      colors: ["#2563eb", "#60a5fa", "#38bdf8"],
      disableForReducedMotion: true,
      scalar: 0.6,
    });

    onLike(photo.id);
  };

  return (
    <article className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 py-4 transition-all duration-200">
      {/* Photo Container */}
      <div className="relative w-full sm:w-[280px] md:w-[320px] aspect-[3/2] flex-shrink-0 bg-slate-200 rounded-lg overflow-hidden shadow-xs border border-slate-200/80">
        {/* Skeleton Shimmer */}
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 animate-pulse" />
        )}

        {imageError ? (
          <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-slate-100 text-slate-400 text-xs text-center">
            <span>Image unavailable</span>
          </div>
        ) : (
          <img
            src={optimizedUrl}
            alt={`Photo by ${photo.author}`}
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
            className={`w-full h-full object-cover transition-opacity duration-300 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
          />
        )}
      </div>

      {/* Details matching photo-gallery.png layout: "Author: [Author Name] [Thumbs Up Icon] [Count]" */}
      <div className="flex items-center gap-3 sm:gap-4 flex-wrap text-slate-800 text-base md:text-lg">
        <span className="font-serif font-medium text-slate-900 tracking-tight">
          Author: {photo.author}
        </span>

        {/* FontAwesome Thumbs Up Icon with Count */}
        <button
          type="button"
          onClick={handleLike}
          title="Like this photo"
          aria-label={`Like photo by ${photo.author}, currently ${likes} likes`}
          className="inline-flex items-center gap-2 text-[#0066FF] hover:text-blue-700 active:scale-95 transition-transform cursor-pointer focus:outline-none"
        >
          <FontAwesomeIcon
            icon={faThumbsUp}
            className={`text-2xl transition-transform ${
              isAnimating ? "scale-130 rotate-[-12deg]" : "hover:scale-110"
            }`}
          />
          <span className="font-bold text-lg tabular-nums text-slate-800 select-none">
            {likes}
          </span>
        </button>
      </div>
    </article>
  );
};
