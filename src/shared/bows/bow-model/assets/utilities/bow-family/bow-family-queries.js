export const getBowFamilyQuery = (familyName) => {
  return `
    {
      bowFamily(name:"${familyName}") {
      name
      overview {
        h1
        h2
        h3
      }
      headerVideo
      headerVideoPoster
      highlights
      compareModels {
       backgroundImage
        bows {
          bowImage
          axleToAxle
          massWeight
          fps
        }
      }
      dualVideos
      performance {
        header
        p
        fps
        drawWeight
        drawLength
        massWeight
      }
      seriesSlider {
        image
        caption
      }
      aboutCam {
        h3
        description
        video
      }
      shopAccessoriesImage
      beautyImageGallery
      bows {
        name
        placement
        modelYear,
        skuCode
        msrp
        modelNameUrl
        cadPath
        limbType
        logo
        techSpecs {
          axleToAxle
          brace
          weight
          stringLength
          cableLength
          centerShot
          letOff
          peakWeights
          drawLengths
          speedRating
          useTypes {
            name
            icon
            caption
            description
            image
          }
          finishes {
            riser {
              brands {
                name
                type
                finishes {
                  color {
                    colorName
                    skuCode
                    swatchUrl
                    patternName
                  }
                  image
                }
              }
            }
            limbs {
              brands {
                name
                type
                finishes {
                  color {
                    colorName
                    skuCode
                    swatchUrl
                    patternName
                  }
                }
              }
            }
          }
          mods {
            name
            speed
          }
        }
      }
    }
  }
  `;
};
