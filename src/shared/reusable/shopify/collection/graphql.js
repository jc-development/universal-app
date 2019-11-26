const ProductFragment = `
  id
  handle
  title
  tags
  availableForSale
  description
  descriptionHtml
  priceRange {
    minVariantPrice {
      amount
    }
    maxVariantPrice {
      amount
    }
  }
  images(first: 100) {
    edges {
      node {
        id
        altText
        originalSrc
        transformedSrc(maxWidth: 500)
      }
    }
  }
  options(first: 100) {
    id
    name
    values
  }
  variants(first: 100) {
    edges {
      node {
        id
        title
        sku
        availableForSale
        priceV2 {
          amount
        }
        compareAtPriceV2 {
          amount
        }
        image {
          id
          altText
          originalSrc
          transformedSrc(maxWidth: 500)
        }
        selectedOptions {
          name
          value
        }
      }
    }
  }
`;

export const getAllCollections = () => {
  return `
    query {
      collections(first: 100) {
        edges {
          node {
            id
            handle
            title
            description
            image {
              id
              altText
              originalSrc
              transformedSrc(maxWidth: 500)
            }
          }
        }
      }
    }
  `;
};

export const getAllCollectionsWithProducts = () => {
  return `
    query {
      collections(first: 100) {
        edges {
          node {
            id
            handle
            title
            description
            image {
              id
              altText
              originalSrc
              transformedSrc(maxWidth: 500)
            }
            products(first: 100) {
              edges {
                node {
                  ${ProductFragment}
                }
              }
            }
          }
        }
      }
    }
  `;
};

export const getCollectionByHandleWithProducts = (collectionHandle) => {
  return `
    query {
      collectionByHandle(handle: "${collectionHandle}") {
        id
        handle
        title
        description
        image {
          id
          altText
          originalSrc
          transformedSrc(maxWidth: 500)
        }
        products(first: 100) {
          edges {
            node {
              ${ProductFragment}
            }
          }
        }
      }
    }
  `;
};

export const getApparelCollectionsWithProducts = () => {
  return `
    query {
      collections(first: 11, query: "title:'Men T-Shirts' OR title:'Men Polo Shirts' OR title:'Men Hoodies & Jackets' OR title:'Men Pullovers' OR title:'Women T-Shirts' OR title:'Women Tank Top Shirts' OR title:'Women Hoodies & Jackets' OR title:'Shooter Shirts' OR title:'Hats' OR title:'Knit Caps'") {
        edges {
          node {
            id
            handle
            title
            description
            image {
              id
              altText
              originalSrc
              transformedSrc(maxWidth: 500)
            }
            products(first: 100) {
              edges {
                node {
                  ${ProductFragment}
                }
              }
            }
          }
        }
      }
    }
  `;
};

export const getAccessoriesCollectionsWithProducts = () => {
  return `
    query {
      collections(first: 12, query: "title:'Arrows' OR title:'Bow Case' OR title:'Bow Strings' OR title:'Draw Stop Assembly' OR title:'O-Rings' OR title:'Quiver' OR title:'Release' OR title:'Rest' OR title:'Sling' OR title:'Stabilizer' OR title:'Small Gifts'") {
        edges {
          node {
            id
            handle
            title
            description
            image {
              id
              altText
              originalSrc
              transformedSrc(maxWidth: 500)
            }
            products(first: 100) {
              edges {
                node {
                  ${ProductFragment}
                }
              }
            }
          }
        }
      }
    }
  `;
};

export const getFeaturedCollectionsWithProducts = () => {
  return `
    query {
      collections(first: 3, query: "title:'Featured Apparel' OR title:'Featured Accessories'") {
        edges {
          node {
            id
            handle
            title
            description
            image {
              id
              altText
              originalSrc
              transformedSrc(maxWidth: 500)
            }
            products(first: 100) {
              edges {
                node {
                  ${ProductFragment}
                }
              }
            }
          }
        }
      }
    }
  `;
};