// Display logged-in user
document.getElementById("username").innerHTML =
localStorage.getItem("username") || "Officer";

// Logout
function logout(){

localStorage.clear();

window.location.href="login.html";

}

// Load Dashboard Data
async function loadDashboard(){

try{

// ---------------- Crime Records ----------------

const response = await fetch("http://127.0.0.1:5000/crime");

const crimes = await response.json();

// Statistics

document.getElementById("firCount").innerHTML =
crimes.length;

document.getElementById("crimeCount").innerHTML =
crimes.length;

document.getElementById("predictionCount").innerHTML =
15;

document.getElementById("hotspotCount").innerHTML =
5;

// Table

let table="";

crimes.forEach(crime=>{

table+=`

<tr>

<td>${crime.id}</td>

<td>${crime.type}</td>

<td>${crime.location}</td>

<td>${crime.status}</td>

</tr>

`;

});

document.getElementById("crimeTable").innerHTML=table;

}

catch(error){

document.getElementById("crimeTable").innerHTML=`

<tr>

<td colspan="4">

Unable to connect to backend.

</td>

</tr>

`;

console.log(error);

}

}

loadDashboard();