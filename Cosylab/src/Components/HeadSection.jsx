import React from 'react';
import { Helmet } from 'react-helmet-async';

const HeadSection = () => {
  return (
    <Helmet>
      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>Complex Systems Lab IIIT Delhi Prof Ganesh Bagler</title>
      <link rel="icon" type="image/x-icon" href="assets/images/cosylab_logo.png" />

      <link
        href="http://fonts.googleapis.com/css?family=Raleway:400,500,300,700"
        rel="stylesheet"
        type="text/css"
      />
      <link
        href="http://fonts.googleapis.com/css?family=Crimson+Text:400,600"
        rel="stylesheet"
        type="text/css"
      />
      <link
        href="http://fonts.googleapis.com/css?family=Open+Sans:400,300,600"
        rel="stylesheet"
        type="text/css"
      />

      <link rel="stylesheet" href="assets/css/bootstrap.min.css" />
      <link rel="stylesheet" href="assets/css/style.css" />
      <link rel="stylesheet" href="assets/css/animate.css" />
      <link rel="stylesheet" href="assets/css/font-awesome.min.css" />
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.css"
      />
      <link rel="stylesheet" href="assets/css/et-line-font/style.css" />
      <link rel="stylesheet" href="assets/css/bxslider/jquery.bxslider.css" />
      <link rel="stylesheet" href="assets/css/owl-carousel/owl.carousel.css" />
      <link rel="stylesheet" href="assets/css/owl-carousel/owl.theme.css" />
      <link rel="stylesheet" href="assets/css/owl-carousel/owl.transitions.css" />
      <link rel="stylesheet" href="assets/css/magnific-popup/magnific-popup.css" />
      <link href="https://unpkg.com/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet" />
      <link href="https://cdn.datatables.net/1.10.19/css/jquery.dataTables.min.css" rel="stylesheet" />
      <link
        href="https://cdn.datatables.net/responsive/2.2.3/css/responsive.dataTables.min.css"
        rel="stylesheet"
      />

      <script async src="https://www.googletagmanager.com/gtag/js?id=G-NNQ5D2R217"></script>
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-NNQ5D2R217');
          `,
        }}
      />
    </Helmet>
  );
};

export default HeadSection;
