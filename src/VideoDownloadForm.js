import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const VideoDownloadForm = () => {
  const [url, setUrl] = useState('');
  const [resolution, setResolution] = useState('best');
  const [videoOnly, setVideoOnly] = useState(false);
  const [audioOnly, setAudioOnly] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fileUrl, setFileUrl] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('https://youtube-downloader-fastapi.onrender.com/api/download/video', {
        url,
        resolution,
        video_only: videoOnly,
        audio_only: audioOnly
      }, { responseType: 'blob' });

      const contentDisposition = response.headers['content-disposition'];
      let fileName = "downloaded_video.mp4";
      if (contentDisposition && contentDisposition.includes('filename=')) {
        fileName = contentDisposition.split('filename=')[1].replace(/"/g, '');
      }

      const blob = response.data;
      const fileUrl = URL.createObjectURL(blob);
      setFileUrl(fileUrl);

      const link = document.createElement('a');
      link.href = fileUrl;
      link.download = fileName;
      link.click();
    } catch (error) {
      console.error("Error downloading video:", error);
    }
    setLoading(false);
  };

  return (
    <div className="form-container">
      <h3>Download Video</h3>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="url">Video URL:</label>
          <input
            id="url"
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
            placeholder="Enter video URL"
          />
        </div>

        <div className="input-group">
          <label htmlFor="resolution">Resolution:</label>
          <select
            id="resolution"
            value={resolution}
            onChange={(e) => setResolution(e.target.value)}
          >
            {['best', '144p', '240p', '360p', '480p', '720p', '1080p', '1440p', '2160p'].map((res) => (
              <option key={res} value={res}>{res}</option>
            ))}
          </select>
        </div>

        <div className="checkbox-group">
          <label>Video Only:</label>
          <input
            type="checkbox"
            checked={videoOnly}
            onChange={() => setVideoOnly(!videoOnly)}
          />
        </div>

        <div className="checkbox-group">
          <label>Audio Only:</label>
          <input
            type="checkbox"
            checked={audioOnly}
            onChange={() => setAudioOnly(!audioOnly)}
          />
        </div>

        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? "Downloading..." : "Download"}
        </button>
      </form>

      {fileUrl && <p>Download link: <a href={fileUrl} download>Click here to download</a></p>}
    </div>
  );
};

export default VideoDownloadForm;
