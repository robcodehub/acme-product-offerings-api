 const Sequelize = require('sequelize');
 const { STRING, UUID, UUIDV4, DECIMAL } = Sequelize;

 const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/product_offerings_db');

const uuidDefinition = {
  type: UUID,
  primaryKey: true,
  defaultValue: UUIDV4
}

const Company = conn.define('company', {
  id: uuidDefinition,
  name: {
    type: STRING,
    allowNull: false,
  }
})

const Offering = conn.define('offering', {
  id: uuidDefinition,
  name: {
    type: STRING,
    allowNull: false,
  },
  price: DECIMAL
})

const Product = conn.define('product', {
  id: uuidDefinition,
  name: {
    type: STRING,
    allowNull: false,
  },
  suggestedPrice: DECIMAL
})

Company.hasMany(Product);
Offering.hasMany(Company);

Product.belongsTo(Company);
Company.belongsTo(Offering);

Offering.hasMany(Product);
Product.belongsTo(Offering);

// const mapPromise = (items, model)=> {
//   return Promise.all(items.map( item => model.create(item)));
// };

const syncAndSeed = async ()=> {
  await conn.sync({ force: true });

}



 module.exports = {
    syncAndSeed,
    models: {
      Company,
      Product,
      Offering
    }
 }
