const { DataTypes } = require ('sequelize');

module.exports = (sequelize) => {
    sequelize.define('learningPath', {
        mainImage: {
            type: DataTypes.STRING,
            allowNull: false,   
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        mainColor: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }, {
        timestamps: false
    })
}