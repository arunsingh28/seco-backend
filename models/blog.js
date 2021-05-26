'use strict'

module.exports = (sequelize, DataType) => {
    const Blog = sequelize.define("blog", {
        
        id: {
            type: DataType.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        title: {
            type: DataType.STRING,
            allowNull: false,
        },
        summary: {
            type: DataType.TEXT('long'),
            allowNull: false,
        },
        url: {
            type: DataType.STRING,
            allowNull: false,
        },
        draft: {
            type: DataType.BOOLEAN,
            default: false,
        },
        category: { 
            type: DataType.JSON, 
            get: function() {
                return JSON.parse(this.getDataValue('category'));
            }, 
            set: function(val) {
                return this.setDataValue('category', JSON.stringify(val));
            }
        },
    })
    return Blog
}

