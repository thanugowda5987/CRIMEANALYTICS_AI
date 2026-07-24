async function predictCrime(){

const district=document.getElementById("district").value;

const crime=document.getElementById("crimeType").value;

const year=document.getElementById("year").value;

const result=document.getElementById("result");

result.innerHTML="Predicting...";

try{

const response=await fetch("http://127.0.0.1:5000/prediction",{

method:"POST",

headers:{

"Content-Type":"application/json"

},

body:JSON.stringify({

district:district,

crime_type:crime,

year:year

})

});

const data=await response.json();

result.innerHTML=`

<b>District :</b> ${district}<br><br>

<b>Crime :</b> ${crime}<br><br>

<b>Prediction :</b> ${data.prediction}<br><br>

<b>Risk Level :</b> ${data.risk}<br><br>

<b>Recommendation :</b> ${data.recommendation}

`;

}

catch(error){

result.innerHTML="Unable to connect to backend server.";

console.log(error);

}

}