'use strict';
module.exports = (sequelize, DataTypes) => {
  const lists = sequelize.define('lists', {
    name: DataTypes.STRING,
     description: DataTypes.STRING,
    done: DataTypes.BOOLEAN,
    datetime: DataTypes.DATE,
    
  }, {});
  lists.associate = function(models) {
    lists.belongsTo(models.user);
    // associations can be defined here
  };
  return lists;
};