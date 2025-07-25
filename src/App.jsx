import { useState } from 'react';
import './App.css';
import VideoPlayer from './components/VideoPlayer';
import Lyrics from './components/Lyrics';

function App() {
  return (
    <>
      <div>
        <div>
          {/* <VideoPlayer></VideoPlayer> */}
        </div>
        <div>
          <Lyrics></Lyrics>
        </div>
      </div>
    </>
  )
}

export default App
