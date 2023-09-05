const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "Drivers",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      forename: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [3, 10],
            msg: "Que el nombre del heroe debe contener entre 3 y 10 caracteres",
          },
        },
      },
      lastname: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [3, 10],
            msg: "Que el Apellido del heroe debe contener entre 3 y 10 caracteres",
          },
        },
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      image_url: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      nationality: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      dob: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    { freezeTableName: true, timestamps: false }
  );
};
