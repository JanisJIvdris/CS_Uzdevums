module.exports = (sequelize, DataTypes) => {
  const Audit = sequelize.define("Audit", {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    action: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    entity: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    timestamp: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  });
  return Audit;
};
