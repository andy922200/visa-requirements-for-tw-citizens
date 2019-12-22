'use strict';
module.exports = (sequelize, DataTypes) => {
  const Continent = sequelize.define('Continent', {
    name: DataTypes.STRING,
    nameEn: DataTypes.STRING
  }, {});
  Continent.associate = function (models) {
    Continent.hasMany(models.Region)
    Continent.hasMany(models.Country)
  };
  return Continent;
};