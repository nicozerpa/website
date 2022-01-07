/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import "../styles/fonts.scss";
import "../styles/main.scss";
import "../styles/jscode.scss";

import React from "react";

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp;