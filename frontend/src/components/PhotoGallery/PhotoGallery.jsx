import React, { useState, useEffect, useRef, useCallback } from "react";
import { PhotoCard } from "./PhotoCard";
import { Loader2, AlertCircle, ArrowUp, RefreshCw, CheckCircle2 } from "lucide-react";

const PICSUM_BASE_URL = "https://picsum.photos/v2/list";
const PAGE_LIMIT = 10;

export const PhotoGallery = () => {
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [likesMap, setLikesMap] = useState({});

  const observerRef = useRef(null);
  const sentinelRef = useRef(null);
  const isFetchingRef = useRef(false);

  // Fetch photos from Picsum API
  const fetchPhotos = useCallback(async (pageNum) => {
    if (isFetchingRef.current) return;
    isFetchingRef.current = true;
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${PICSUM_BASE_URL}?page=${pageNum}&limit=${PAGE_LIMIT}`);
      if (!response.ok) {
        throw new Error(`Failed to load photos: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();

      if (!Array.isArray(data) || data.length === 0) {
        setHasMore(false);
      } else {
        setPhotos((prev) => {
          // Avoid duplicate items
          const existingIds = new Set(prev.map((p) => p.id));
          const newUnique = data.filter((p) => !existingIds.has(p.id));
          return [...prev, ...newUnique];
        });
      }
    } catch (err) {
      console.error("[PhotoGallery] Error fetching photos:", err);
      setError(err.message || "Failed to load photos from Picsum");
    } finally {
      setLoading(false);
      isFetchingRef.current = false;
    }
  }, []);

  // Initial load
  useEffect(() => {
    fetchPhotos(1);
  }, [fetchPhotos]);

  // Infinite scroll IntersectionObserver
  useEffect(() => {
    if (loading || !hasMore) return;

    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting && hasMore && !isFetchingRef.current) {
          setPage((prevPage) => {
            const nextPage = prevPage + 1;
            fetchPhotos(nextPage);
            return nextPage;
          });
        }
      },
      {
        root: null,
        rootMargin: "250px",
        threshold: 0.1,
      }
    );

    const currentSentinel = sentinelRef.current;
    if (currentSentinel) {
      observerRef.current.observe(currentSentinel);
    }

    return () => {
      if (observerRef.current && currentSentinel) {
        observerRef.current.unobserve(currentSentinel);
      }
    };
  }, [loading, hasMore, fetchPhotos]);

  // Handle like button click
  const handleLike = (photoId) => {
    setLikesMap((prev) => ({
      ...prev,
      [photoId]: (prev[photoId] || 0) + 1,
    }));
  };

  const handleReset = () => {
    setPhotos([]);
    setPage(1);
    setHasMore(true);
    setLikesMap({});
    fetchPhotos(1);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-8 py-8">
      {/* Title Header matching photo-gallery.png */}
      <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-slate-900 tracking-tight">
            Photo gallery
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-2">
            Infinite scroll implementation powered by Picsum Photos JSON API feed
          </p>
        </div>

        {/* Toolbar & stats */}
        <div className="flex items-center gap-3">
          <span className="text-xs font-medium text-slate-500 bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-full">
            {photos.length} photos loaded • Page {page}
          </span>
          <button
            type="button"
            onClick={handleReset}
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-blue-600 bg-white border border-slate-200 px-3 py-1.5 rounded-full hover:border-blue-300 transition-colors shadow-2xs cursor-pointer"
            title="Reset to page 1"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>
      </header>

      {/* 1-column layout list of photos */}
      <div className="space-y-6">
        {photos.map((photo) => (
          <PhotoCard
            key={photo.id}
            photo={photo}
            likes={likesMap[photo.id] || 0}
            onLike={handleLike}
          />
        ))}
      </div>

      {/* Sentinel & Loading Indicator */}
      <div ref={sentinelRef} className="py-10 text-center">
        {loading && (
          <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-white border border-slate-200 rounded-full shadow-sm text-sm text-slate-600 animate-fade-in">
            <Loader2 className="w-4 h-4 text-blue-600 animate-spin" />
            <span>Loading page {page + 1}...</span>
          </div>
        )}

        {error && (
          <div className="max-w-md mx-auto p-4 bg-red-50 border border-red-200 rounded-2xl text-center text-red-700 text-sm">
            <AlertCircle className="w-6 h-6 text-red-500 mx-auto mb-2" />
            <p className="font-semibold">{error}</p>
            <button
              type="button"
              onClick={() => fetchPhotos(page)}
              className="mt-3 px-4 py-1.5 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg text-xs transition-colors shadow-xs"
            >
              Try Again
            </button>
          </div>
        )}

        {!hasMore && photos.length > 0 && (
          <div className="flex flex-col items-center justify-center gap-2 text-slate-400 py-6">
            <CheckCircle2 className="w-6 h-6 text-emerald-500" />
            <p className="text-sm font-semibold text-slate-600">All photos loaded!</p>
            <p className="text-xs text-slate-400">Reached the end of the Picsum catalogue.</p>
          </div>
        )}
      </div>

      {/* Floating Back to Top Button */}
      {photos.length > 10 && (
        <button
          type="button"
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all active:scale-95 z-50 flex items-center justify-center cursor-pointer"
          title="Scroll back to top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};
