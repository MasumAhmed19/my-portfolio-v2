'use client'

import React, { useRef, useEffect } from 'react'

interface VideoPlayerProps {
  src: string
  autoPlay?: boolean
  loop?: boolean
  muted?: boolean
  controls?: boolean
  playbackRate?: number
  className?: string
  poster?: string
  disableFallback?: boolean
}

const VideoPlayer = ({
  src,
  autoPlay = false,
  loop = false,
  muted = false,
  controls = false,
  playbackRate = 1,
  className = '',
  poster,
  disableFallback = false,
}: VideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (videoRef.current && playbackRate !== 1) {
      videoRef.current.playbackRate = playbackRate
    }
  }, [playbackRate])

  return (
    <video
      ref={videoRef}
      src={src}
      poster={poster}
      autoPlay={autoPlay}
      loop={loop}
      muted={muted}
      controls={controls}
      playsInline
      className={className}
    >
      {!disableFallback && (
        <p className="text-muted-foreground">
          Your browser doesn&apos;t support HTML5 video. Here is a{' '}
          <a
            href={src}
            className="text-primary hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            link to the video
          </a>{' '}
          instead.
        </p>
      )}
    </video>
  )
}

export default VideoPlayer