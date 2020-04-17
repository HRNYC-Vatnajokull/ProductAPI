let db = require("../postGresConnect");

module.exports = {
  getProductList: async (count = 5, page = 1) => {
    try {
      return await db.query(
        `SELECT * FROM products LIMIT ${count} OFFSET ${(page - 1) * count}`
      );
    } catch (err) {
      console.log(err);
    }
  },

  getProducts: async (productId) => {
    try {
      return await db.query(`SELECT p.id, p.name, p. slogan, p.description, p.category, 
      p.default_price, fs.feature, fs.value 
      FROM products AS p 
      LEFT JOIN features_join AS f 
      ON p.id = f.product_id
      LEFT JOIN feature_set as fs
      ON f.feature_set_id = fs.id
      WHERE p.id = ${productId}`);
    } catch (err) {
      console.log(err);
    }
  },

  getStyles: async (productId) => {
    try {
      return await db.query(`SELECT s.product_id, s.id, s.name, s.default_style, s.original_price, s.sale_price,
      p.thumbnail_url, p.url, sk.size,sk.quanitity
      FROM styles AS s
      left JOIN photos AS p 
      ON s.id = p.style_id 
      left JOIN skus AS sk
      ON s.id = sk.styleid
      WHERE s.product_id = ${productId}`);
    } catch (err) {
      console.log(err);
    }
  },

  getRelated: async (productId) => {
    try {
      return await db.query(
        `Select related_product_id from related_products where current_product_id = ${productId}`
      );
    } catch (err) {
      console.log(err);
    }
  },
};
