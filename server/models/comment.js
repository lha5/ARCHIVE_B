module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    'comment',
    {
      content: {
        type: DataTypes.TEXT
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
