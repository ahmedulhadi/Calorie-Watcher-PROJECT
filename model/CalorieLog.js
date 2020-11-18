var calorieLog = {
  email: null,
  date: null,
  weight: null,
  height: null,

  setEmail: function (email) {
    this.email = email;
  },
  getEmail: function () {
    return this.email;
  },
  setDate: function (date) {
    this.date = date;
  },
  getDate: function () {
    return this.date;
  },
  setWeight: function (weight) {
    this.weight = weight;
  },
  getWeight: function () {
    return this.weight;
  },
  setHeight: function (height) {
    this.height = height;
  },
  getHeight: function () {
    return this.height;
  },
};

module.exports = calorieLog;
