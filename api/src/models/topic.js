const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('topic', {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        mainImage: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isUrl: true
            }
        },
        color: {
            type: DataTypes.STRING,
            allowNull: false
        },
        famousApps: {
            type: DataTypes.STRING,
            allowNull: false
        },
        jobOpenings: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        averageSalary: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        timestamps: false
    }
    )
}; 