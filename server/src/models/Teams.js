const { DataTypes } = require("sequelize");


module.exports = (sequelize) => {
  sequelize.define(
    "Teams",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      teams: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { freezeTableName: true, timestamps: false }
  );
};
