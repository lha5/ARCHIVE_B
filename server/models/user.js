module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    'user',
    {
      email: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
      },
      name: {
        type: DataTypes.STRING(15),
        allowNull: true,
      },
      password: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      provider: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      provider_id: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      admin: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false,
      },
      token: {
        type: DataTypes.STRING(250),
        allowNull: true,
      },
      connected_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      image: {
        type: DataTypes.STRING(500),
        allowNull: true,
      },
    },
    {
      timestamps: true,
      paranoid: true,
    }
  );
};
