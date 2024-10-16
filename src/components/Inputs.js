import React, { useEffect, useState } from "react";

export default function Inputs() {
  const [memesData, setMemes] = useState([]);
  const [inputData, setData] = useState({
    topText: "",
    bottomText: "",
    memeUrl: "",
  });

  useEffect(() => {
    async function getMemes() {
      const res = await fetch("https://api.imgflip.com/get_memes");
      const memes = await res.json();
      setMemes(memes.data.memes);
    }

    getMemes();
  }, []);

  function HandleChange(event) {
    const { name, value } = event.target;
    setData((prev) => {
      return { ...prev, [name]: value };
    });
  }

  function generateMeme() {
    console.log(memesData);
    const randomNumber = Math.floor(Math.random() * memesData.length);
    const randomImage = memesData[randomNumber].url;
    console.log(randomImage);

    setData((prev) => {
      return { ...prev, memeUrl: randomImage };
    });
  }

  return (
    <div className="form">
      <div className="input-el">
        <input
          type="text"
          placeholder="Top Text"
          name="topText"
          onChange={HandleChange}
          value={inputData.topText}
        />
        <input
          type="text"
          placeholder="Bottom Text"
          name="bottomText"
          onChange={HandleChange}
          value={inputData.bottomText}
        />
      </div>

      <button onClick={generateMeme}>Get a new meme image </button>
      <div className="meme">
        <img src={inputData.memeUrl} className="meme--image" />
        <h1 className="meme--text top">{inputData.topText}</h1>
        <h1 className="meme--text bottom">{inputData.bottomText}</h1>
      </div>
    </div>
  );
}
