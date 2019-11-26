export const getAllStoreCollectionsQuery = () => {
  return `
    query {
      shop {
        collections(first:250) {
          edges {
            node {
              description
              handle
              id
              image(maxWidth:500) {
                altText
                id
                src
              }
              title
            }
          }
        }
      }
    }
  `;
};

export const getStoreCollectionsWithProductsQuery = () => {
  return `
    query {
      shop {
        collections(first:250) {
          edges {
            node {
              description
              handle
              id
              image(maxWidth:500) {
                altText
                id
                src
              }
              title
              products (first:250) {
                edges {
                  node {
                    id
                    handle
                    title
                    tags
                    description
                    descriptionHtml
                    images (first: 250, maxWidth:500) {
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
                          image(maxWidth:500) {
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
    }
  `;
};

export const getStoreCollectionsWithProductsByHandleQuery = (collectionHandle) => {
  return `
    query {
      shop {
        collectionByHandle(handle: "${collectionHandle}") {
              description
              handle
              id
              title
              image(maxWidth:500) {
                altText
                id
                src
              }
          		products (first:25) {
          		  edges {
          		    node {
          		      id
                    handle
                    title
                    tags
                    description
                    descriptionHtml
                    images (first: 25, maxWidth:500) {
                      edges {
                        node {
                          id
                          altText
                          src
                        }
                      }
                    }
                    options(first: 25) {
                      id
                      name
                      values
                    }
                    variants(first: 25) {
                      edges {
                        node {
                          id
                          availableForSale
                          image(maxWidth:500) {
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

export const getStoreProductByHandleQuery = (productHandle) => {
  return `
    query {
      shop {
        productByHandle(handle: "${productHandle}") {
          availableForSale
          description
          descriptionHtml
          handle
          id
          title
          tags
          images(first: 250, maxWidth:500) {
            edges {
              node {
                id
                src
                altText
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
                image(maxWidth:500) {
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
              }
            }
          }
        }
      }
    }
  `;
};

export const getProductsByTagsQuery = (tags) => {
  return `
    query {
      shop {
        products (first:250, query:"${tags}") {
          edges {
          	node {
          		id
              handle
              title
              tags
              description
              images (first: 250, maxWidth:500) {
                edges {
                  node {
                    id
                    altText
                    src
                  }
                }
              }
              variants(first: 250) {
                edges {
                  node {
                    id
                    availableForSale
                    image(maxWidth:500) {
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
