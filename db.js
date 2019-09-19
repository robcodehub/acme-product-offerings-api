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
Company.hasMany(Offering);
Product.hasMany(Offering);

Product.belongsTo(Company);
Offering.belongsTo(Company);
Offering.belongsTo(Product);

// const mapPromise = (items, model)=> {
//   return Promise.all(items.map( item => model.create(item)));
// };

const syncAndSeed = async ()=> {
  await conn.sync({ force: true });
  const companies = [
    { name: 'CBS'},
    { name: 'NBC'},
    { name: 'Blockbuster'}
  ];

  const [CBS, NBC, Blockbuster] = await Promise.all(companies.map( company => Company.create(company)));

  const products = [
    { name: 'Commercials', suggestedPrice: 2},
    { name: 'WebAds', suggestedPrice: 1.53},
    { name: 'Bloatware', suggestedPrice: 0.73}
  ];

  const [Commercials, WebAds, Bloatware] = await Promise.all(products.map( product => Product.create(product)));

  const offerings = [
    { name: 'Commercials1', price: 3, productId: Commercials.id, companyId: CBS.id},
    { name: 'WebAds1', price: 2, productId: WebAds.id, companyId: CBS.id},
    { name: 'Bloatwares1', price: 1, productId: Bloatware.id, companyId: NBC.id},
  ];

  const [Commercials1, WebAds1, Bloatware1] = await Promise.all(offerings.map( offering => Offering.create(offering)));
};



 module.exports = {
    syncAndSeed,
    models: {
      Company,
      Product,
      Offering
    }
 }
