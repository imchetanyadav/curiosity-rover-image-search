import React, { useState } from "react";
import Head from "next/head";
import { withRouter } from "next/router";
import axios from "axios";
import CuriositySearchForm from "../components/CuriositySearchForm";
import CuriosityImageResult from "../components/CuriosityImageResult";

const IndexPage = props => {
  const [selectedCamera, updateSelectedCamera] = useState();
  const [sol, updateSol] = useState("");
  const [images, updateImages] = useState([]);
  const [isFetchingImages, updateIsFetchingImages] = useState(false);

  const handleCameraChange = selectedCamera => {
    updateSelectedCamera(selectedCamera);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    updateIsFetchingImages(true);
    const response = await axios.get(
      `/getImages?sol=${sol}&camera=${selectedCamera.value}`
    );
    updateImages(
      response.data.length === 0
        ? response.data
        : response.data.map(img => ({
            ...img,
            source: { regular: img.img_src }
          }))
    );
    updateIsFetchingImages(false);
  };
  
  return (
    <div className="root">
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Curiosity Rover Image Search</title>
        <link
          href="https://fonts.googleapis.com/css?family=Space+Mono:400,700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div id="search-section">
        <h1>MARS</h1>
        <p>Search images captured by Curiosity</p>
        <CuriositySearchForm
          selectedCamera={selectedCamera}
          sol={sol}
          handleSolChange={updateSol}
          handleCameraChange={handleCameraChange}
          handleSubmit={handleSubmit}
          isFetchingImages={isFetchingImages}
        />
      </div>
      <div id="image-section">
        <CuriosityImageResult images={images} />
      </div>
      <style jsx global>{`
        * {
          font-family: "Space Mono", monospace;
        }
        body {
          margin: 0;
          padding: 0;
          background-color: #000;
        }
        canvas {
          position: fixed;
          top: 0;
          left: 0;
          z-index: -100;
        }
      `}</style>
      <style jsx>{`
        .root {
          font-family: sans-serif;
          line-height: 1.33rem;
          margin: 0;
        }
        #search-section {
          position: fixed;
          top: 50%;
          left: 50%;
          color: #fff;
          transform: translate(-50%, -50%);
          text-align: center;
          z-index: -1;
          min-width: 300px;
        }
        #search-section h1 {
          font-size: 5em;
        }
        #image-section {
          color: #fff;
          z-index: 100;
          margin-top: 90vh;
          margin-bottom: 10vh;
        }
      `}</style>
      <script src="/static/three.min.js" />
      <script src="/static/threex.planets.js" />
      <script src="/static/planets.js" />
    </div>
  );
};

export default withRouter(IndexPage);
