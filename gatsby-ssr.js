import React from 'react'

const CONFIG = {
  clientKey: '83f3b3196d1f2328eaa7906e73704b7c',
}

export const onRenderBody = ({ setPostBodyComponents }) => {
  setPostBodyComponents([
    <script
      key="cronitor-rum-src"
      async
      src="https://rum.cronitor.io/script.js"
    />,
    <script
      key="cronitor-rum-code"
      dangerouslySetInnerHTML={{
        __html: `
          window.cronitor = window.cronitor || function() { (window.cronitor.q = window.cronitor.q || []).push(arguments); };
          cronitor('config', ${JSON.stringify(CONFIG)});
        `,
      }}
    />,
  ])
}
