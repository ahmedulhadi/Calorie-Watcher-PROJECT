function bmi(weight, het) {
    bmiResult = "";
    document.getElementById("bmi").innerHTML = "";
    weight = document.getElementById("weight").value;
    height =  document.getElementById("height").value;
    console.log(weight, height)
    let bmi = 703*(weight / (height*height));
    console.log("Your BMI is"+ bmi)
    if(bmi < 18.5){
        bmiResult= "Luckly, You are Underweight";
    }else if (bmi < 25){
        bmiResult = "Congrats, Your weight is Normal Now";
    }else if (bmi < 30){
        bmiResult = "Oops, You are already Overweight";
    }else{
        bmiResult = "Health Alert. It looks like you are already overweight. It is ok, We can fix that :)";
    }

    document.getElementById("bmi").innerHTML = bmiResult;

  }
  