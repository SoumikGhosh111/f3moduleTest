// const ip = localStorage.getItem("ip"); 
const urlParams = new URLSearchParams(window.location.search);
const ip = urlParams.get('ip');
console.log(ip); 
let ipAdd = document.querySelector(".ipAddress"); 
ipAdd.innerHTML = ip; 
let latLong = document.querySelector(".section-1-inner-lat-long");
let cityReg = document.querySelector(".section-1-inner-city-region"); 
let orgHost = document.querySelector(".section-1-inner-organization-hostname");  
let map = document.querySelector(".mapper-class"); 
let info = document.querySelector(".information-section-information"); 
let timezone = document.querySelector(".timezone"); 
let dAndT = document.querySelector(".dateAndTime"); 
let pincode  = document.querySelector(".pin"); 
let message = document.querySelector(".message"); 
let displayBox = document.querySelector(".cards"); 
let searchInput = document.querySelector(".searchbox input"); 

window.addEventListener("load", getIpData); 
async function getIpData(){ 
    try{ 
        const endPoint = `https://ipapi.co/${ip}/json/`; 
        const response = await fetch(endPoint); 
        const result = await response.json(); 
        console.log(result); 
        renderDetails(result); 
        renderMapperClass(result.latitude, result.longitude); 
        fetchCurrentTime(result.timezone, result.postal); 
        getNearestPostOffices(result.postal); 
    }
    catch(e){ 
        console.error("Error: ", e); 
        alert('Error fetching IP information: ' + error.message);
    }
}

async function getNearestPostOffices(data){ 
    try{ 
        const endPoint = `https://api.postalpincode.in/pincode/${data}`; 
        const response = await fetch(endPoint); 
        const result = await response.json(); 
        console.log(result); 
        renderMessage(result[0].Message);
        displayPostOfficesNearYou(result[0].PostOffice);
        filterPostOffices(result[0].PostOffice);   
    }
    catch(e){ 
        alert('No post offices found for this pincode.');
    }
}
function renderDetails(data){ 
    latLong.innerHTML = `
        <p style="color:#b8bccc86;" >Lat: <span style="color: #B8BCCC;">${data.latitude}</span></p> 
        <p style="color:#b8bccc86">Long: <span style="color: #B8BCCC;">${data.longitude}</span></p>
    `
    cityReg.innerHTML = `
        <p style="color:#b8bccc86">City: <span style="color: #B8BCCC;">${data.city}</span></p>
        <p style="color:#b8bccc86">Region: <span style="color: #B8BCCC;">${data.region}</span></p>
    `
    orgHost.innerHTML = `
        <p style="color:#b8bccc86">Organization: <span style="color: #B8BCCC;">${data.org}</span></p>
        <p style="color:#b8bccc86">Hostname: <span style="color: #B8BCCC;">${data.network} </span></p>
    `
}

function renderMapperClass(lat, long){ 
    map.innerHTML = `
    <iframe src="https://maps.google.com/maps?q=${lat},${long}&output=embed" width="1390px" height="677px" frameborder="0" style="border:0"></iframe>`
}

function fetchCurrentTime(data, pin){
   
    let DateAndTime = new Date().toLocaleString("en-US", data)

    timezone.innerHTML = `${data}`; 
    dAndT.innerHTML = `${DateAndTime}`; 
    pincode.innerHTML = `${pin}`; 
}

function renderMessage(data){ 
   message.innerHTML = `${data}`; 
}
function displayPostOfficesNearYou(data){ 
    displayBox.innerHTML = ""; 
     let cardsCard = document.createElement("div"); 
     cardsCard.className = "cards-card"; 
     data.forEach(postoffice => {
        let cardsCard = document.createElement("div"); 
        cardsCard.className = "cards-card";
        cardsCard.innerHTML = `
        <div class="item"><span class="name">${postoffice.Name}</span></div>
        <div class="item"><span class="branch">${postoffice.BranchType}</span></div>
        <div class="item"><span class="delivery">${postoffice.DeliveryStatus}</span></div>
        <div class="item"><span class="district">${postoffice.District}</span></div>
        <div class="item"><span class="division">${postoffice.Division}</span></div>
        `

        displayBox.appendChild(cardsCard); 
     });
}


function filterPostOffices(data){ 
   
    searchInput.addEventListener("input", ()=>{ 
       const query = searchInput.value.toLowerCase(); 
       const filtered = data.filter(offices => offices.Name.toLowerCase().includes(query) || offices.BranchType.toLowerCase().includes(query)); 
       displayPostOfficesNearYou(filtered); 
    })
}