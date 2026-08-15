Put your video file here, named exactly:

  message.mp4

The site expects it at /public/video/message.mp4 (referenced in
components/VideoSection.tsx as "/video/message.mp4").

Tips:
- MP4 (H.264 video + AAC audio) has the best browser compatibility.
- Compress it first if it's large — under ~100MB keeps the repo and
  deploys fast. HandBrake (free) or ffmpeg both work well:
    ffmpeg -i input.mov -vcodec libx264 -crf 23 -acodec aac message.mp4
- If your video is portrait or square rather than 16:9, adjust the
  "aspect-video" class in components/VideoSection.tsx to match
  (e.g. "aspect-[9/16]" or "aspect-square"), or the video will be
  cropped by object-cover.
- If the file ends up larger than ~100MB, consider Git LFS, or
  hosting it externally (e.g. Vercel Blob, Mux, Cloudflare Stream)
  and pointing the src at that URL instead.

Delete this file once your video is in place — it's not referenced
by the app.
