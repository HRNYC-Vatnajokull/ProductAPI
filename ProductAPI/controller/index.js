const { getStyles, getProducts, getRelated } = require("../model");

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
        styleItem.photos.push({ ...photoObj });
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

      //   if (!styleItem.photos && photoObj.url) {
      //     styleItem.photos = [{ ...photoObj }];
      //   }
      photoObj.thumbnail_url = qItem.thumbnail_url;
      photoObj.url = qItem.url;
      skusObj[qItem.size] = qItem.quanitity;
      currentStyle = qItem.id;
      currentPhotoUrl = qItem.url;
    });
    //push the last result
    styleItem.skus = skusObj;
    styleItem.photos.push({ ...photoObj });
    results.push({ ...styleItem });

    let product_id = response.rows[0].product_id;

    console.log(JSON.stringify({ product_id, results }, null, 2));
  },

  productController: async () => {
    let results = await getProducts();
  },

  relatedController: async () => {
    let results = await getRelated();
  },
};

module.exports.stylesController(1);

// {
//   "product_id": "1",
//   "results": [
//     {
//       "style_id": 1,
//       "name": "Forest Green & Black",
//       "original_price": "140",
//       "sale_price": "0",
//       "default?": 1,
//       "photos": [
//         {
//           "thumbnail_url": "https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
//           "url": "https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80"
//         },
//         {
//           "thumbnail_url": "https://images.unsplash.com/photo-1534011546717-407bced4d25c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
//           "url": "https://images.unsplash.com/photo-1534011546717-407bced4d25c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2734&q=80"
//         },
//         {
//           "thumbnail_url": "https://images.unsplash.com/photo-1549831243-a69a0b3d39e0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
//           "url": "https://images.unsplash.com/photo-1549831243-a69a0b3d39e0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2775&q=80"
//         },
//         {
//           "thumbnail_url": "https://images.unsplash.com/photo-1527522883525-97119bfce82d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
//           "url": "https://images.unsplash.com/photo-1527522883525-97119bfce82d?ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80"
//         },
//         {
//           "thumbnail_url": "https://images.unsplash.com/photo-1556648202-80e751c133da?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
//           "url": "https://images.unsplash.com/photo-1556648202-80e751c133da?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80"
//         },
//         {
//           "thumbnail_url": "https://images.unsplash.com/photo-1532543491484-63e29b3c1f5d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
//           "url": "https://images.unsplash.com/photo-1532543491484-63e29b3c1f5d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80"
//         }
//       ],
//       "skus": {
//         "XS": 8,
//         "S": 16,
//         "M": 17,
//         "L": 10,
//         "XL": 15
//       }
//     },
