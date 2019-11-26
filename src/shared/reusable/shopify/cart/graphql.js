const CheckoutFragment = `
    id
    webUrl
    subtotalPriceV2 {
      amount
    }
    totalPriceV2 {
      amount
    }
    lineItemsSubtotalPrice {
      amount
    }
    discountApplications(first: 5) {
      edges {
        node {
          ... on DiscountCodeApplication {
            code
          }
        }
      }
    }
    lineItems (first: 80) {
      edges {
        node {
          id
          title
          quantity
          customAttributes {
            key
            value
          }
          discountAllocations {
            allocatedAmount {
              amount
            }
          }
          variant {
            id
            title
            image(maxWidth:500) {
              id
              src
            }
            selectedOptions {
              name
              value
            }
            product {
              id
              productType
              images(first: 1, maxWidth:500) {
                edges {
                  node {
                    id
                    src
                  }
                }
              }
            }
            priceV2 {
              amount
            }
          }
        }
      }
    }
`;

export const createCart = (lineItems) => {
  let lineItemsString = JSON.stringify(lineItems)
  lineItemsString = lineItemsString.replace(/"(\w+)"\s*:/g, '$1:')
  return `
    mutation {
      checkoutCreate(input: {allowPartialAddresses: true, shippingAddress: {city: "West Henrietta", province: "NY", country:"United States"}, lineItems: ${lineItemsString}}) {
        checkoutUserErrors {
          code
          message
          field
        }
        checkout {
          ${CheckoutFragment}
        }
      }
    }
  `;
}

export const replaceCartLineItems = ({checkoutId, lineItems}) => {
  let lineItemsString = JSON.stringify(lineItems)
  lineItemsString = lineItemsString.replace(/"(\w+)"\s*:/g, '$1:')
  return `
    mutation {
      checkoutLineItemsReplace(checkoutId: "${checkoutId}", lineItems: ${lineItemsString}) {
        userErrors {
          code
          message
          field
        }
        checkout {
          ${CheckoutFragment}
        }
      }
    }
  `;
}

export const applyDiscountCode = ({checkoutId, discountCode}) => {
  return `
    mutation {
      checkoutDiscountCodeApplyV2(checkoutId: "${checkoutId}", discountCode: "${discountCode}") {
        checkoutUserErrors {
          code
          message
          field
        }
        checkout {
          ${CheckoutFragment}
        }
      }
    }
  `;
}

export const removeDiscountCode = (checkoutId) => {
  return `
    mutation {
      checkoutDiscountCodeRemove(checkoutId: "${checkoutId}") {
        checkoutUserErrors {
          code
          message
          field
        }
        checkout {
          ${CheckoutFragment}
        }
      }
    }
  `;
}