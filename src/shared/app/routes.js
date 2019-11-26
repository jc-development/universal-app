import loadable from 'loadable-components';

export const HomePage = loadable( () => import('./../home/HomePage') );

export const BowsListIndex = loadable( () => import('./../bows/bows-list-index/BowsListIndex') );

export const BowsListCompare = loadable( () => import('./../bows/bows-list-compare/BowsListCompare') );

export const BowModel = loadable( () => import('./../bows/bow-model/BowModel') );

export const BowDesign = loadable( () => import('./../bows/bow-model/design/DesignWrapper') );

export const BowModelOverview = loadable( () => import('./../bows/bow-model/BowModelOverview') );
export const TechSpecs = loadable( () => import('./../bows/bow-model/TechSpecs') );
export const BuyBow = loadable( () => import('./../bows/bow-model/BuyBow') );

export const StoreIndex = loadable( () => import('./../store/store-index/StoreIndex') );

export const StoreCollection = loadable( () => import('./../store/store-collection/StoreCollection') );

export const StoreCollectionCategory = loadable( () => import('./../store/store-collection-category/StoreCollectionCategory') );

export const StoreProduct = loadable( () => import('./../store/store-product/StoreProduct') );

export const EliteHuntGuarantee = loadable( () => import('./../elite-hunt-guarantee/EliteHuntGuarantee') );

export const EliteKlarnaFinancing = loadable( () => import('./../elite-klarna-financing/EliteKlarnaFinancing') );

export const Partners = loadable( () => import('./../partners/Partners') );

export const TechManualSpecSheets = loadable( () => import('./../tech-manual-spec-sheets/TechManualSpecSheets') );

export const BowPressCompatibility = loadable( () => import('./../bow-press-compatibility/BowPressCompatibility') );

export const Patents = loadable( () => import('./../patents/Patents') );

export const PrivacyPolicy = loadable( () => import('./../privacy-policy/PrivacyPolicy') );

export const ContactUs = loadable( () => import('./../contact-us/ContactUs') );

export const WarrantyRegistration = loadable( () => import('./../warranty-registration/WarrantyRegistration') );

export const ContingencyProgram = loadable( () => import('./../contingency-program/ContingencyProgram') );

// export const JoinTheMovement = loadable( () => import('./../join-the-movement/JoinTheMovement') );

export const BecomeADealer = loadable( () => import('./../become-a-dealer/BecomeADealer') );

export const DealerLocator = loadable( () => import('./../dealer-locator/DealerLocator') );

export const Cart = loadable( () => import('./../cart/Cart') );

export const Error404 = loadable( () => import('./../error-404/Error404') );
