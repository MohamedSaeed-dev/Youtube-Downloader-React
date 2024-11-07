import React from 'react';
import VideoDownloadForm from './VideoDownloadForm';
import PlaylistDownloadForm from './PlaylistDownloadForm';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="app-header">
        <h1>YouTube Video & Playlist Downloader</h1>
      </header>
      <main className="main-content">
        <VideoDownloadForm />
        <PlaylistDownloadForm />
      </main>
    </div>
  );
}

export default App;
