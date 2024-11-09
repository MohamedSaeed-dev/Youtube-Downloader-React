import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const PlaylistDownloadForm = () => {
  const [url, setUrl] = useState('');
  const [resolution, setResolution] = useState('best');
  const [loading, setLoading] = useState(false);
  const [fileUrl, setFileUrl] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('https://youtube-downloader-fastapi-1.onrender.com/api/download/playlist', {
        url,
        resolution
      }, { responseType: 'blob' });

      const blob = response.data;
      const fileName = 'playlist_download.zip';
      const fileUrl = URL.createObjectURL(blob);
      setFileUrl(fileUrl);

      const link = document.createElement('a');
      link.href = fileUrl;
      link.download = fileName;
      link.click();
    } catch (error) {
      console.error("Error downloading playlist:", error);
    }
    setLoading(false);
  };

  return (
    <div className="form-container">
      <h3>Download Playlist</h3>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="url">Playlist URL:</label>
          <input
            id="url"
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
            placeholder="Enter playlist URL"
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

        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? "Downloading..." : "Download Playlist"}
        </button>
      </form>
      
      {fileUrl && <p>Download link: <a href={fileUrl} download>Click here to download</a></p>}
    </div>
  );
};

export default PlaylistDownloadForm;
