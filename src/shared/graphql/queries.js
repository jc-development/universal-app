export const getAllBowsQuery = () => {
  return `
    {
      bows {
        placement
        modelYear
        msrp
        name,
        modelNameUrl
        bowListImagePath
        techSpecs {
          axleToAxle
          brace
          weight
          stringLength
          cableLength
          centerShot
          speedRating
          letOff
          useTypes {
            icon
          }
        }
      }
    }
  `;
};

export const getBowModelQuery = (modelName) => {
  return `
    {
      bow(name:"${modelName}") {
        id
        modelYear
        name
        skuCode
        msrp
        modelNameUrl
        axleToAxle
        speedRating
        useTypes
        useTypeIcons
        elevatorPitch
        captionHeader
        caption
        features {
          title
          content
        }
        featureImages {
          source
          caption
        }
        limbType
        brace
        weight
        stringLength
        cableLength
        centerShot
        peakWeights
        drawLengths
        speedRating
        riserColors {
          colorFamily
          colorName
          skuCode
          swatchUrl
          patternName
          colorType
        }
        limbColors {
          colorFamily
          colorName
          skuCode
          swatchUrl
          patternName
          colorType
        }
        bowModelHeroVideoBg
        bowModelHeroVideoMobileBg
        bowModelHeroVideoPosterBg
        handOrientations
      }
    }
  `;
};

export const getIndependentEchelonsQuery = () => {
  // start here to get what you need. look in graphiql for how to structure query
  return `
    {
      independentEchelons {
        id
        name
        skuCode
        independentMsrp
        modelNameUrl
        axleToAxle
        speedRating
        useTypeIcons
        independentCaption
        handOrientations
        limbType
        brace
        weight
        stringLength
        cableLength
        centerShot
        peakWeights
        drawLengths
        speedRating
        riserColors {
          colorFamily
          colorName
          skuCode
          patternName
          swatchUrl
          colorType
        }
        limbColors {
          colorFamily
          colorName
          skuCode
          swatchUrl
          patternName
          colorType
        }
        independenceBowImages {
          name
          thumb
          large
        }
      }
    }
  `;
};
