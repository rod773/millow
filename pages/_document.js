import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" href="/logo.svg" type="image/svg+xml" />
        <meta name="theme-color" content="#6C63FF" />
        <meta name="description" content="Millow is a real estate NFT marketplace built on Ethereum. Search, explore, and buy tokenized properties using blockchain technology." />
        <meta name="keywords" content="real estate, NFT, blockchain, Ethereum, property, tokenized, marketplace, millow, web3" />
        <meta name="author" content="Millow" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://millow-rod773.vercel.app/" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content="Millow — Real Estate NFT Marketplace" />
        <meta property="og:description" content="Search, explore, and buy tokenized real estate properties on the Ethereum blockchain." />
        <meta property="og:url" content="https://millow-rod773.vercel.app/" />
        <meta property="og:image" content="/logo512.png" />
        <meta property="og:site_name" content="Millow" />
        <meta property="og:locale" content="en_US" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Millow — Real Estate NFT Marketplace" />
        <meta name="twitter:description" content="Search, explore, and buy tokenized real estate properties on the Ethereum blockchain." />
        <meta name="twitter:image" content="/logo512.png" />

        <link rel="apple-touch-icon" href="/logo192.png" />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <body>
        <Main />
        <script
          dangerouslySetInnerHTML={{
            __html: `
            (function() {
              function isExt(e) {
                var s = (e && e.error && e.error.stack) || (e && e.reason && e.reason.stack);
                return s && s.indexOf('chrome-extension://') !== -1;
              }
              window.addEventListener('error', function(e) {
                if (isExt(e)) { e.stopImmediatePropagation(); e.preventDefault(); }
              });
              window.addEventListener('unhandledrejection', function(e) {
                if (isExt(e)) { e.stopImmediatePropagation(); e.preventDefault(); }
              });
            })();
            `,
          }}
        />
        <NextScript />
      </body>
    </Html>
  )
}
