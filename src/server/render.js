import serialize from 'serialize-javascript';

const createTitle = (preloadedState, url) => {

  /* url is /elite-bows/* */
  if ( url.match(/\/elite-bows\/*/) ) {
    // get the chars after the last '/' char, and check to see if it matches preloadedState.bowModel.name
    const bowFromUrl = url.substr(12); // get all the chars after /elite-bows/
    // console.log('bowFromUrl: ', bowFromUrl);
    if (bowFromUrl === preloadedState.customerConfiguredBowModel.modelNameUrl && preloadedState.customerConfiguredBowModel.name !== '') {
      return `The Elite ${preloadedState.bowModel.name} Bow - ${preloadedState.bowModel.captionHeader} - Elite Archery: Makers of The World's Most Shootable Bows: KURE, REZULT, Valor, Ritual 35, Ritual 30, Ritual 33, Revol XL, Victory X, Echelon 37, Echelon 39. Elite Archery sells archery accessories and apparel.`;
    } else {
      return `Elite Archery: Makers of The World's Most Shootable Bows: KURE, REZULT, Valor, Ritual 35, Ritual 30, Ritual 33, Revol XL, Victory X, Echelon 37, Echelon 39. Elite Archery sells archery accesories and apparel. Elite Archery sells archery accessories and apparel.`
    }
  }
  else if (url.match(/\/store/)) {
    const storeDirUrl = url.substr(6);
    if (storeDirUrl === '' || storeDirUrl === '/') {
      return `The Elite Archery Store sells the best archery equipment: Sights, Releases, Arrows, Quivers, Rests, Hats, Shirts, Hoodies, Pullovers and more for the Target Archer and Hunter.`
    }
    else if (storeDirUrl === '/accessories') {
      return `The Elite Archery Accessories Store sells the best archery accessories: Elite Stabilizers, Elite Bow Sights, Elite Slings, Elite Quivers, Elite Releases, Elite Rests, Elite O-Rings, Elite Draw Stop Assembly, Elite Bow Case, Elite Arrows, Elite Bow Strings, and Elite Small Gifts for the Target Archer and Hunter.`;
    }
    else if (storeDirUrl === '/apparel') {
      return `The Elite Archery Apparel Store sells the best clothing for the hunter and archer: Elite Shooter Shirts, Elite Women Hoodies & Jackets, Elite Knit Caps, Elite Hats, Elite Women T-Shirts, Elite Women Tank Top Shirts, Elite Mens Pullovers, Elite Men Polo Shirts, Elite Men Hoodies & Jackets, Elite Men T-Shirts.`;
    }
    else {
      return `The Elite Archery Store sells the best archery equipment: Sights, Releases, Arrows, Quivers, Rests, Hats, Shirts, Hoodies, Pullovers and more for the Target Archer and Hunter.`;
    }
  }
  else {
    return `Elite Archery: Makers of The World's Most Shootable Bows: KURE, REZULT, Valor, Ritual 35, Ritual 30, Ritual 33, Revol XL, Victory X, Echelon 37, Echelon 39. Elite Archery sells archery accesories and apparel. The Elite Archery Store sells top quality Sights, Releases, Arrows, Quivers, Rests, Hats, Shirts, Hoodies, Pullovers and more for the Target Archer and Hunter.`
  }
}

export const renderHeader = (preloadedState, url) => {
  return `
    <!DOCTYPE html>
    <html lang="en" xmlns:fb="http://ogp.me/ns/fb#">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1.0, user-scalable=no, shrink-to-fit=no">
        <meta property="og:url" content="https://www.elitearchery.com/" />
        <meta property="og:title" content="Elite Archery - Makes the World's Most Shootable Bows: KURE, REZULT, Valor, Ritual 35, Ritual 30, Ritual 33, Revol XL, Victory X, Echelon 37, Echelon 39" />
        <meta property="og:image" content="https://s3.amazonaws.com/elite-website/images/favicon/favicon.ico" />
        <meta property="fb:pages" content="101761618135" />
        <meta name="google-site-verification" content="V0JWlnbgDiQ2vuoUpst8ydN7ZcggAxLEzughi0Neey8" />
        <meta name="p:domain_verify" content="c8cd29cd15fe967379d1bc0dc0ddbcf0"/>
        <meta name="description" content="Elite Archery: Makers of The World's Most Shootable Bows: KURE, REZULT, Valor, Ritual 35, Ritual 30, Ritual 33, Revol XL, Victory X, Echelon 37, Echelon 39. Elite Archery sells archery accesories and apparel. Elite Archery sells archery accessories and apparel." />
        <link rel="shortcut icon" href="https://s3.amazonaws.com/elite-website/images/favicon/favicon.ico"/>
        <link rel="apple-touch-icon" href="https://s3.amazonaws.com/elite-website/images/favicon/apple-touch-icon-57x57.png" />
        <link rel="apple-touch-icon" sizes="72x72" href="https://s3.amazonaws.com/elite-website/images/favicon/apple-touch-icon-72x72.png" />
        <link rel="apple-touch-icon" sizes="114x114" href="https://s3.amazonaws.com/elite-website/images/favicon/apple-touch-icon-114x114.png" />
        <link rel="apple-touch-icon" sizes="144x144" href="https://s3.amazonaws.com/elite-website/images/favicon/apple-touch-icon-144x144.png" />
        <title>${createTitle(preloadedState, url)}</title>
        <link rel="stylesheet" type="text/css" href="/assets/stylesheet.css">
        <script>
          (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
          (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
          m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
          })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
          ga('create', 'UA-32457046-1', 'auto');
          ga('send', 'pageview');
        </script>
      </head>
      <body>
        <div id="root">
  `;
};

// Elite Archery - Makes the World's Most Shootable Bows: KURE, REZULT, Valor, Ritual 35, Ritual 30, Ritual 33, Revol XL, Victory X, Echelon 37, Echelon 39

export const renderFooter = (loadableState, preloadedState) => (`
  </div>
  <script src="https://www.klarnapayments.com/assets/upstream.js"></script>
  <script>
    window.__PRELOADED_STATE__ = ${serialize(preloadedState).replace(/</g, '\\u003c')}
  </script>
  <script src="/assets/vendor.js"></script>
  <script src="/assets/client.js"></script>
  ${loadableState.getScriptTag()}
  <!-- Begin Inspectlet Embed Code -->

  <!-- Facebook Pixel Code -->
  <script>
  !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
  n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
  document,'script','https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', '131482707230932'); // Insert your pixel ID here.
  fbq('track', 'PageView');
  </script>
  <noscript><img height="1" width="1" style="display:none"
  src="https://www.facebook.com/tr?id=131482707230932&ev=PageView&noscript=1"
  /></noscript>
  <!-- DO NOT MODIFY -->
  <!-- End Facebook Pixel Code -->
  <!-- Start of HubSpot Embed Code -->
  <script type="text/javascript" id="hs-script-loader" async defer src="//js.hs-scripts.com/3928428.js"></script>
  <!-- End of HubSpot Embed Code -->
`);
