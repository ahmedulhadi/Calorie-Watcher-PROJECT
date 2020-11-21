module.exports.getBMI = function (weight, height) {
  bmiResult = "";
  let bmi = 703 * (weight / (height * height));
  if (bmi < 18.5) {
    bmiResult = "Luckly, You are Underweight";
  } else if (bmi < 25) {
    bmiResult = "Congrats, Your weight is Normal Now";
  } else if (bmi < 30) {
    bmiResult = "Oops, You are already Overweight";
  } else {
    bmiResult = "OMG, You are already Obese. Health Alert";
  }
  return bmiResult;
};

module.exports.calculateBMI = function (weight, height) {
  bmiResult = "";
  let bmi = 703 * (weight / (height * height));
  return bmi.toFixed(2);
};

module.exports.getBMIClass = function (weight, height) {
  bmiResult = "";
  let bmi = 703 * (weight / (height * height));
  return getBMIClass(bmi);
};

function getBMIClass(bmi) {
  if (bmi < 16) {
    return "Severe Thinness";
  } else if (bmi < 17) {
    return "Moderate Thinness	";
  } else if (bmi < 18.5) {
    return "Mild Thinness";
  } else if (bmi < 25) {
    return "Normal";
  } else if (bmi < 30) {
    return "Overweight";
  } else if (bmi < 35) {
    return "Obese Class I";
  } else if (bmi < 40) {
    return "Obese Class II";
  } else if (bmi >= 40) {
    return "Obese Class III";
  }
}
