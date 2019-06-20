import React from "react";
import Head from "next/head";
import { withRouter } from "next/router";

const IndexPage = props => (
  <div className="root">
    <Head>
      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>Curiosity Rover Image Search</title>
    </Head>
    <style jsx>{`
      .root {
        font-family: sans-serif;
        line-height: 1.33rem;
        margin-top: 8vh;
      }
      @media (min-width: 600px) {
        .root {
          margin-left: 21vw;
          margin-right: 21vw;
        }
      }
    `}</style>
    <p>Search for image</p>
  </div>
);

export default withRouter(IndexPage);
