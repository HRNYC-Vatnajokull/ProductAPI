const {
  getStyles,
  getProducts,
  getRelated,
  getProductList,
} = require("../model");

module.exports = {
  stylesController: async (productId) => {
    let response = await getStyles(productId);
    // console.log(Object.keys(results));
    //note: everything below can be made into a shaper function
    let results = [];
    let styleItem = {};
    let skusObj = {};
    let photoObj = {};
    let currentStyle;
    let currentPhotoUrl;
    //shape data
    response.rows.forEach((qItem, index) => {
      if (currentStyle !== qItem.id && index !== 0) {
        styleItem.skus = skusObj;
        skusObj = {};
        if (styleItem.photos) {
          styleItem.photos.push({ ...photoObj });
        }
        photoObj = {};
        results.push({ ...styleItem });
        styleItem = {};
      }
      styleItem["style_id"] = qItem.id;
      styleItem["name"] = qItem.name;
      styleItem["original_price"] = qItem.original_price;
      styleItem["sale_price"] = qItem.sale_price;
      styleItem["default?"] = qItem.default_style;
      if (currentPhotoUrl !== qItem.url && photoObj.url) {
        if (!styleItem.photos) {
          styleItem.photos = [];
        }
        styleItem.photos.push({ ...photoObj });
      }
      photoObj.thumbnail_url = qItem.thumbnail_url;
      photoObj.url = qItem.url;
      skusObj[qItem.size] = qItem.quanitity;
      currentStyle = qItem.id;
      currentPhotoUrl = qItem.url;
    });
    styleItem.skus = skusObj;
    if (styleItem.photos) {
      styleItem.photos.push({ ...photoObj });
    }
    results.push({ ...styleItem });

    let product_id = "" + response.rows[0].product_id;
    console.log({ product_id, results });
    return { product_id, results };
  },

  productController: async (productId) => {
    let response = await getProducts(productId);
    let results = response.rows.reduce((acc, item) => {
      let feature = item.feature;
      let value = item.value;
      item.features = acc.features
        ? [...acc.features, { feature, value }]
        : [{ feature, value }];
      delete item.feature, item.value;
      return item;
    }, {});
    console.log(results);

    return results;
  },

  relatedController: async (productId) => {
    let response = await getRelated(productId);
    return response.rows.map((item) => {
      return item.related_product_id;
    });
  },

  productListController: async (count, page) => {
    let response = await getProductList(count, page);
    return response.rows;
  },
};

// module.exports.stylesController(2);
// module.exports.productController(2);
// module.exports.relatedController(1);

// {
//     "id": 1,
//     "name": "Camo Onesie",
//     "slogan": "Blend in to your crowd",
//     "description": "The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.",
//     "category": "Jackets",
//     "default_price": "140",
//     "features": [
//       {
//         "feature": "Buttons",
//         "value": "Brass"
//       }
//     ]
//   }
