module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    'image',
    {
      src: {
        type: DataTypes.TEXT
      }
    },
    {
      timestamps: true,
      paranoid: true,
    }
  );
};
