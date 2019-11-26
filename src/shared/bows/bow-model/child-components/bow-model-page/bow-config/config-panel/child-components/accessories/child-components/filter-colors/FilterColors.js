export const filterColors = (accessoryType, accArray, activeRiserColor) => {

  let accessoryArray = accArray.map(node => {
    return node.node.variants.edges.map( edge => edge );
  });

  const color = activeRiserColor.toLowerCase();

  switch(accessoryType) {
    case "quiver":
      return filterQuivers(accessoryArray, color);

    case "stabilizer":
      return filterStabilizers(accessoryArray, color);

    case "rest":
      return filterRests(accessoryArray, color);

    case "wrist-sling":
      return filterWristSlings(accessoryArray, color);

    default:
      return filterOtherAccessories(accessoryArray, color);
  }
}

const filterQuivers = (accessoryArray, activeRiserColor) => {
  return accessoryArray.map(arr => {
    return arr.filter(accessory => {
      if (accessory) {
        switch(activeRiserColor) {
          case "max-1":
            return ((accessory.node.title === "Ninja Black" && accessory.node.availableForSale) || (accessory.node.title === "Realtree Max-1" && accessory.node.availableForSale) );

          case "snow":
            return ((accessory.node.title === "Ninja Black" && accessory.node.availableForSale) || (accessory.node.title === "Realtree AP Snow" && accessory.node.availableForSale));

          case "xtra":
            return ((accessory.node.title === "Ninja Black" && accessory.node.availableForSale) || (accessory.node.title === "Realtree Xtra" && accessory.node.availableForSale));

          case "edge":
            return ((accessory.node.title === "Ninja Black" && accessory.node.availableForSale) || (accessory.node.title === "Realtree Edge" && accessory.node.availableForSale));

          case "verde":
            return ((accessory.node.title === "Ninja Black" && accessory.node.availableForSale) || (accessory.node.title === "KUIU Verde" && accessory.node.availableForSale));

          case "vias":
            return ((accessory.node.title === "Ninja Black" && accessory.node.availableForSale) || (accessory.node.title === "KUIU Vias" && accessory.node.availableForSale));

          case "break-up country":
            return ((accessory.node.title === "Ninja Black" && accessory.node.availableForSale) || (accessory.node.title === "Mossy Oak Break Up Country" && accessory.node.availableForSale));

          case "mountain country":
            return ((accessory.node.title === "Ninja Black" && accessory.node.availableForSale) || (accessory.node.title === "Mossy Oak Mountain Country" && accessory.node.availableForSale));

          case "ninja black":
            return accessory.node.availableForSale;

          case "hardwoods brown":
            return accessory.node.availableForSale;

          case "olive green":
            return accessory.node.availableForSale;

          default:
            return (accessory.node.title === "Ninja Black" && accessory.node.availableForSale);
        }
      }
    });
  });
};

const filterStabilizers = (accessoryArray, activeRiserColor) => {

  return accessoryArray.map(arr => {
    return arr.filter(accessory => {
      if (accessory) {
        switch(activeRiserColor) {
          case "max-1":
            return ((accessory.node.title === "Ninja Black" && accessory.node.availableForSale) || (accessory.node.title === "Realtree Max-1" && accessory.node.availableForSale));

          case "snow":
            return ((accessory.node.title === "Ninja Black" && accessory.node.availableForSale) || (accessory.node.title === "Realtree AP Snow" && accessory.node.availableForSale));

          case "xtra":
            return ((accessory.node.title === "Ninja Black" && accessory.node.availableForSale) || (accessory.node.title === "Realtree Xtra" && accessory.node.availableForSale));

          case "edge":
            return ((accessory.node.title === "Ninja Black" && accessory.node.availableForSale) || (accessory.node.title === "Realtree Edge" && accessory.node.availableForSale));

          case "verde":
            return ((accessory.node.title === "Ninja Black" && accessory.node.availableForSale) || (accessory.node.title === "KUIU Verde" && accessory.node.availableForSale));

          case "vias":
            return ((accessory.node.title === "Ninja Black" && accessory.node.availableForSale) || (accessory.node.title === "KUIU Vias" && accessory.node.availableForSale));

          case "break-up country":
            return ((accessory.node.title === "Ninja Black" && accessory.node.availableForSale) || (accessory.node.title === "Mossy Oak Break Up Country" && accessory.node.availableForSale));

          case "mountain country":
            return ((accessory.node.title === "Ninja Black" && accessory.node.availableForSale) || (accessory.node.title === "Mossy Oak Mountain Country" && accessory.node.availableForSale));

          case "ninja black":
            return accessory.node.availableForSale;

          case "hardwoods brown":
            return accessory.node.availableForSale;

          case "olive green":
            return accessory.node.availableForSale;

          default:
            return (accessory.node.title === "Ninja Black" && accessory.node.availableForSale);
        }
      }
    });
  });
};

const filterRests = (accessoryArray, activeRiserColor) => {
  return accessoryArray.map(arr => {
    return arr.filter(accessory => {
      if (accessory) {
        switch(activeRiserColor) {
          case "hardwoods brown":
            return ((accessory.node.product.title === "Elite QAD HDX Rest - Sniper Black" ) || (accessory.node.product.title === "Elite QAD HDX Rest - Hardwoods Brown"));

          case "xtra":
            return ((accessory.node.product.title === "Elite QAD HDX Rest - Sniper Black") || (accessory.node.product.title === "Elite QAD HDX Rest - Realtree Xtra"));

          default:
            return accessory.node.product.title === "Elite QAD HDX Rest - Sniper Black";
        }
      }
    });
  }).filter(arr => arr.length > 0);
};


const filterWristSlings = (accessoryArray, activeRiserColor) => {
  return accessoryArray.map(arr => {
    return arr.filter(accessory => {
      if (accessory) {
        switch(activeRiserColor) {
          case "hardwoods brown":
            return ((accessory.node.title === "Black" && accessory.node.availableForSale) || (accessory.node.title === "Brown" && accessory.node.availableForSale));

          case "olive green":
            return ((accessory.node.title === "Black" && accessory.node.availableForSale) || (accessory.node.title === "Green" && accessory.node.availableForSale));

          case "snow":
            return ((accessory.node.title === "Black" && accessory.node.availableForSale) || (accessory.node.title === "White" && accessory.node.availableForSale));

          default:
            return accessory.node.title === "Black" && accessory.node.availableForSale;
        }
      }
    })
  }).filter(arr => arr.length > 0);
};


const filterOtherAccessories = (accessoryArray, activeRiserColor) => {
  return accessoryArray.map(arr => {
    return arr.filter( accessory => {
      if (accessory) {
        return accessory.node.availableForSale;
      }
    })
  }).filter(arr => arr.length > 0);
}
