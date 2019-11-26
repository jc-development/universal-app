export const getAllBowAccessoriesQuery = () => {
  return `
    query {
      shop {
        collectionByHandle(handle: "bow-builder-accessories") {
          description
          handle
          id
          title
          image(maxWidth: 500) {
            altText
            id
            src
          }
          products(first: 250) {
            edges {
              node {
                id
                handle
                title
                tags
                images(first: 250, maxWidth: 500) {
                  edges {
                    node {
                      id
                      altText
                      src
                    }
                  }
                }
                options(first: 250) {
                  id
                  name
                  values
                }
                variants(first: 250) {
                  edges {
                    node {
                      id
                      availableForSale
                      image(maxWidth: 500) {
                        id
                        src
                        altText
                      }
                      selectedOptions {
                        name
                        value
                      }
                      compareAtPrice
                      price
                      sku
                      title
                      product {
                        title
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `;
};
