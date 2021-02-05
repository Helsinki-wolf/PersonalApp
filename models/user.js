'use strict';
const {
  Model
} = require('sequelize');

const{ hashPassword } = require('../helpers/bcrypt')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Name cannot be empty"
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: {
          args: true,
          msg: "invalid email format"
        }
      },
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [6],
          msg: "password at least 6 character"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate: (user, options) => {
        user.password = hashPassword(user.password)
      }
    }
  });
  return User;
};