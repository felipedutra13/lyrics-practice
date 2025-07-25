const lyricsPlaceHolder = `We're no strangers to love
You know the rules and so do I
A full commitment's what I'm thinkin' of
You wouldn't get this from any other guy
I just wanna tell you how I'm feeling
Gotta make you understand
Never gonna give you up, never gonna let you down
Never gonna run around and desert you
Never gonna make you cry, never gonna say goodbye
Never gonna tell a lie and hurt you
We've known each other for so long
Your heart's been aching, but you're too shy to say it
Inside, we both know what's been going on
We know the game and we're gonna play it
And if you ask me how I'm feeling
Don't tell me you're too blind to see
Never gonna give you up, never gonna let you down
Never gonna run around and desert you
Never gonna make you cry, never gonna say goodbye
Never gonna tell a lie and hurt you
Never gonna give you up, never gonna let you down
Never gonna run around and desert you
Never gonna make you cry, never gonna say goodbye
Never gonna tell a lie and hurt you
We've known each other for so long
Your heart's been aching, but you're too shy to say it
Inside, we both know what's been going on
We know the game and we're gonna play it
I just wanna tell you how I'm feeling
Gotta make you understand
Never gonna give you up, never gonna let you down
Never gonna run around and desert you
Never gonna make you cry, never gonna say goodbye
Never gonna tell a lie and hurt you
Never gonna give you up, never gonna let you down
Never gonna run around and desert you
Never gonna make you cry, never gonna say goodbye
Never gonna tell a lie and hurt you
Never gonna give you up, never gonna let you down
Never gonna run around and desert you
Never gonna make you cry, never gonna say goodbye
Never gonna tell a lie and hurt you`;

import { useEffect, useState, useRef } from 'react'

function normalizeLyrics(lyrics) {
  return lyrics
    .split('')
    .map(char => {
      const isLetter = /^[a-zA-Z]$/.test(char);
      return {
        char,
        isLetter,
        visible: isLetter ? false : true
      };
    })
}

function updateIndexToNextLetter(lyrics, index) {
  let isLetter = false;
  do {
    index.current++;

    let nextChar = lyrics[index.current];

    isLetter = /^[a-zA-Z]$/.test(nextChar.char);
  } while(!isLetter);
}

function Lyrics() {
    const [lyrics, setLyrics] = useState(normalizeLyrics(lyricsPlaceHolder));
    
    let currentIndex = useRef(0);

    useEffect(() => {
        const handleKeyDown = (event) => {
          if (lyrics[currentIndex.current].char.toLowerCase() == event.key.toLowerCase()) {
            const updatedLyrics = [...lyrics];
            updatedLyrics[currentIndex.current].visible = true;
            setLyrics(updatedLyrics);
            updateIndexToNextLetter(lyrics, currentIndex);
          } else {
            console.log(`correct: ${lyrics[currentIndex.current].char.toLowerCase()} | pressed: ${event.key.toLowerCase()}`)
          }
        };
    
        window.addEventListener('keydown', handleKeyDown);
    
        return () => {
          window.removeEventListener('keydown', handleKeyDown);
        };
      }, []);

    return (
        <>
            {lyrics.map((entry, index) => (
              <span key={index}>
                {entry.visible ? entry.char : '_'}
              </span>
            ))} 
        </>
    )
};

export default Lyrics;