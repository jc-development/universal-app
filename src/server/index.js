import express from 'express';
import React from 'react';
import { renderToNodeStream } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { getLoadableState } from 'loadable-components/server';
import { Provider } from 'react-redux';

import App from './../shared/app';
import configureStore from './store';
import { renderHeader, renderFooter } from './render';
import rootSagas from './../shared/app/rootSagas';
const bodyParser = require('body-parser');
import axios from 'axios';
const expressStaticGzip = require("express-static-gzip");

// required for hubspot form submission
const querystring = require('querystring');
const cookieParser = require('cookie-parser')

const app = express();

const forceSsl =  (req, res, next) => {
   if (req.headers['x-forwarded-proto'] !== 'https' && process.env.NODE_ENV === 'production') {
       return res.redirect(301,['https://', req.hostname, req.url].join(''));
   }
   return next();
};

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(cookieParser())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// app.use(forceSsl);

app.use( '/assets', expressStaticGzip('./dist') );

app.post('/api/email-customer-service', (req, res) => {
  axios.post('https://elite-bow-leads.herokuapp.com/create-customer-lead', {
    customerName: req.body.customerName,
    customerEmail: req.body.customerEmail,
    customerPhone: req.body.customerPhone,
    customerComments: req.body.customerComments,
    bowModel: req.body.bowModel,
    // riserColorFamily: req.body.riserColorFamily,
    riserColor: req.body.riserColor,
    // limbColorFamily: req.body.limbColorFamily,
    limbColor: req.body.limbColor,
    drawLength: req.body.drawLength,
    drawWeight: req.body.drawWeight,
    handOrientation: req.body.handOrientation,
  })
  .then((response) => {
     // console.log('response: ', response)
  }).catch(function(err) {
     // console.log('error: ', err);
  });
});

app.post('/api/post-interested-dealer', (req, res) => {
  const postData = querystring.stringify({
        firstname: req.body.firstName,
        lastname: req.body.lastName,
        email: req.body.email,
        phone: req.body.phone,
        company: req.body.companyName,
        address: req.body.streetAddress,
        city: req.body.city,
        state: req.body.state,
        zip: req.body.zip,
        country: req.body.country,
        hs_context: JSON.stringify({
           hutk: req.cookies.hubspotutk,
           ipAddress: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
           pageUrl: "https://www.elitearchery.com/become-a-dealer",
           pageName: "Elite Archery - Become A Dealer"
        })
      })
  const headerData = 	{
      headers: {
  		'Content-Type': 'application/x-www-form-urlencoded',
  		'Content-Length': postData.length
  	}
  }

  axios.post('https://forms.hubspot.com/uploads/form/v2/3928428/3c99fc16-2eff-4d9e-bd64-a092388614dc', postData, headerData).then((response) => {
    // console.log('response: ', response)
  }).catch((err) => {
    // console.log('error: ', err);
  })

  axios.post('https://interested-becoming-tog-dealer.herokuapp.com/api/create_interested_dealer', req.body).then((response) => {
  // console.log('response: ', response)
  }).catch((err) => {
    // console.log('error: ', err);
  })

  res.end();
});

app.post('/api/warranty-registration', (req, res) => {
  console.log('req.body: ', req.body)
  const data = req.body.warranty_registration
  axios.post('https://tog-warranty-backend.herokuapp.com/api/warranty_registrations/create', {warranty_registration: data})
  .then((response) => {
    //  console.log('response: ', response)
     res.send(JSON.stringify({success: response.data}))
  }).catch(function(err) {
    //  console.log('error: ', err);
     res.send(JSON.stringify({error: err.response.data}))
  });
});

// landing page for international signup
app.get('/worldwide',  (req, res) =>  {
  res.redirect(301,'https://info.elitearchery.com/worldwide-dealer-sign-up');
});

app.get('/warranty/registration',  (req, res) =>  {
  res.redirect(301,'https://www.elitearchery.com/warranty-registration');
});


app.get('/robots.txt', function (req, res) {
    res.type('text/plain');
    res.send("User-agent: *\nDisallow: /cart\nDisallow: /military-discount");
});


app.get('/api/get-riser-color/', (req, res) => {
  // console.log('req.query: ', req.query[0]);
  const urlForImg = req.query[0];

  axios.get(urlForImg, { responseType: 'arraybuffer' }).then((axiosResponse) => {

    const image = `data:${axiosResponse.headers['content-type']};base64,${Buffer.from(String.fromCharCode(...new Uint8Array(axiosResponse.data)), 'binary').toString('base64')}`
    // console.log('image bas64: ', image)
    res.status(200).send(image);
    // next();
  })
  .catch((err) => {
    console.log('error: ', err);
  });
});

app.get('/api/get-limb-color/', (req, res) => {
  // console.log('req.query: ', req.query[0]);
  const urlForImg = req.query[0];

  axios.get(urlForImg, { responseType: 'arraybuffer' }).then((axiosResponse) => {

    const image = `data:${axiosResponse.headers['content-type']};base64,${Buffer.from(String.fromCharCode(...new Uint8Array(axiosResponse.data)), 'binary').toString('base64')}`
    // console.log('image bas64: ', image)
    res.status(200).send(image);
    // next();
  })
  .catch((err) => {
    console.log('error: ', err);
  });
});



app.get('*.js', function (req, res, next) {
  req.url = req.url + '.gz';
  res.set('Content-Encoding', 'gzip');
  next();
});

app.get( '*', async (req, res) => {
  const url = req.url;

  const store = configureStore();
  const context = {};

  const appWithRouter = (
    <Provider store={store}>
      <StaticRouter location={req.url} context={context}>
        <App />
      </StaticRouter>
    </Provider>
  );

  if (context.url) {
    res.redirect(context.url);
    return;
  }

  let loadableState = {};

  store.runSaga(rootSagas).done.then( () => {
    const preloadedState = store.getState();

    // console.log('url index.js: ', url);

    res.status(200).write(renderHeader(preloadedState, url));

    const htmlStream = renderToNodeStream(appWithRouter);
    htmlStream.pipe(res, { end: false });
    htmlStream.on('end', () => {
      res.write(renderFooter(loadableState, preloadedState));
      return res.send();
    })
  });

  // Trigger sagas for component to runSaga
  loadableState = await getLoadableState(appWithRouter);

  // dispatch a close event so sagas stop listening after they're resolved
  store.close();

} );

app.listen(process.env.PORT || 8080, () => console.log('Server listening.'));
