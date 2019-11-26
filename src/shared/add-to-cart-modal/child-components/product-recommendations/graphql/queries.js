export const getProductRecommendationsQuery = (productId) => {
  return `
    query{
      productRecommendations(productId:"${productId}") {
        id
        title
        handle
        tags
        productType
        collections(first: 4) {
          edges {
            node {
              id
              handle
            }
          }
        }
        images (first: 1, maxWidth:500) {
          edges {
            node {
              id
              altText
              src
            }
          }
        }
      }
    }
  `;
};