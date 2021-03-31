module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    'hashtag',
    {
      content: {
        type: DataTypes.STRING(50)
      }
    },
    {
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
      timestamps: true,
      paranoid: true,
    }
  );
};
