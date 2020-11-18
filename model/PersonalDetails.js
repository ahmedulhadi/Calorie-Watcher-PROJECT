let personalDetails = {
  email: null,
  gender: null,
  startDate: null,
  initialWeight: null,
  initialHeight: null,

  setEmail: function (email) {
    this.email = email;
  },
  getEmail: function () {
    return this.email;
  },
  setGender: function (gender) {
    this.gender = gender;
  },
  getGender: function () {
    return this.gender;
  },
  setStartDate: function (startDate) {
    this.startDate = startDate;
  },
  getStartDate: function () {
    return this.startDate;
  },
  setInitialWeight: function (initialWeight) {
    this.initialWeight = initialWeight;
  },
  getInitialWeight: function () {
    return this.initialWeight;
  },
  setInitialHeight: function (initialHeight) {
    this.initialHeight = initialHeight;
  },
  getInitialHeight: function () {
    return this.initialHeight;
  },
};

module.exports = personalDetails;
