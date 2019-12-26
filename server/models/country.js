'use strict';
module.exports = (sequelize, DataTypes) => {
  const Country = sequelize.define('Country', {
    name: DataTypes.STRING,
    nameEn: DataTypes.STRING,
    ContinentId: DataTypes.INTEGER,
    RegionId: DataTypes.INTEGER,
    CategoryId: DataTypes.INTEGER,
    days: DataTypes.INTEGER,
    remark: DataTypes.STRING
  }, {});
  Country.associate = function (models) {
    Country.belongsTo(models.Continent)
    Country.belongsTo(models.Region)
    Country.belongsTo(models.Category)
  };
  return Country;
};