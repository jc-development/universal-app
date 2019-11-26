export const getProductByHandle = (productHandle) => {
  return `
    query {
      productByHandle(handle: "${productHandle}") {
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
      }
    } 
  `;
};

// OLD QUERY FOR BOWS FROM OUTLET
// export const getProductsByTags = (tags) => {
//   return `
//     query {
//       shop {
//         products (first:250, query:"${tags}") {
//           edges {
//           	node {
//           		id
//               handle
//               title
//               tags
//               description
//               images (first: 250, maxWidth:500) {
//                 edges {
//                   node {
//                     id
//                     altText
//                     src
//                   }
//                 }
//               }
//               variants(first: 250) {
//                 edges {
//                   node {
//                     id
//                     availableForSale
//                     image(maxWidth:500) {
//                       id
//                       src
//                       altText
//                     }
//                     selectedOptions {
//                       name
//                       value
//                     }
//                     compareAtPrice
//                     price
//                     sku
//                     title
//                   }
//                 }
//               }
//           	}
//           }
//         }
//       }
//     }
//   `;
// };