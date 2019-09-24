"use strict";
module.exports = (sequelize, DataTypes) => {
  const Courses = sequelize.define(
    "Courses",
    {
      name: DataTypes.STRING
    },
    {}
  );
  Courses.associate = function(models) {
    // associations can be defined here
  };
  return Courses;
};
