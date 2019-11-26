import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import MainNav from './../main-nav/MainNav';
import MainFooter from './../main-footer/MainFooter';
import * as Routes from './routes';
import './../assets/css/reset.css';
import './../assets/css/global.css';

import fontawesome from '@fortawesome/fontawesome'


const Fragment = React.Fragment;

const App = () => (
  <Fragment>
    <MainNav />
    <main id="main-content">
      <Switch>
        <Route exact path='/' component={Routes.HomePage} />

        <Route exact path='/elite-bows' component={Routes.BowsListIndex} />
        <Route exact path='/elite-bows/compare-all-bows' component={Routes.BowsListCompare} />
        <Route path='/elite-bows/:model(valor|ritual|victory|revol|rezult|kure|echelon)' component={Routes.BowModel} />

        <Route exact path='/store' component={Routes.StoreIndex} />
        <Route exact path='/store/:collection(accessories|apparel)' component={Routes.StoreCollection} />
        <Route exact path='/store/:collection(accessories|apparel)/:category' component={Routes.StoreCollectionCategory} />
        <Route exact path='/store/:collection(accessories|apparel)/:category/:product' component={Routes.StoreProduct} />
        <Route exact path='/elite-hunt-guarantee' component={Routes.EliteHuntGuarantee} />
        <Route exact path='/elite-archery-financing' component={Routes.EliteKlarnaFinancing} />
        <Route exact path='/partners' component={Routes.Partners} />
        <Route exact path='/technical-manuals-spec-sheets' component={Routes.TechManualSpecSheets} />
        <Route exact path='/bow-press-compatibility' component={Routes.BowPressCompatibility} />
        <Route exact path='/patents' component={Routes.Patents} />
        <Route exact path='/privacy-policy' component={Routes.PrivacyPolicy} />
        <Route exact path='/contact-us' component={Routes.ContactUs} />
        <Route exact path='/warranty-registration' component={Routes.WarrantyRegistration} />
        <Route exact path='/contingency-program' component={Routes.ContingencyProgram} />
        <Route exact path='/become-a-dealer' component={Routes.BecomeADealer} />
        <Route exact path='/dealer-locator' component={Routes.DealerLocator} />
        <Route exact path='/cart' component={Routes.Cart} />


        <Route exact path='*' component={Routes.Error404} />
      </Switch>
    </main>
    <MainFooter />
  </Fragment>
);

export default App;
