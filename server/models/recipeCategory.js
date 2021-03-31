module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    'recipe_category',
    {
      category_name: {
        type: DataTypes.STRING(100)
      }
    },
    {
      timestamps: true
    }
  );
};
