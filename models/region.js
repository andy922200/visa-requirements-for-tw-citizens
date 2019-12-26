'use strict';
module.exports = (sequelize, DataTypes) => {
  const Region = sequelize.define('Region', {
    name: DataTypes.STRING,
    nameEn: DataTypes.STRING,
    continentId: DataTypes.INTEGER
  }, {});
  Region.associate = function (models) {
    Region.belongsTo(models.Continent)
    Region.hasMany(models.Country)
  };
  return Region;
};