
let ipSpan = document.querySelector(".ip-adress"); 
let clickME = document.querySelector(".button"); 

window.addEventListener("load", getIPAddress);

async function getIPAddress() {
  try{ 
    const entPoint = "https://api.ipify.org?format=json";
    const response = await fetch(entPoint);
    const result = await response.json();
    console.log(result.ip);
    showIPADD(result.ip);
    return result.ip;  
    // localStorage.setItem("ip", result.ip); 
  }
  catch(e){ 
    console.error(e); 
  }
}
function showIPADD(data){ 
    ipSpan.innerHTML = data; 
}

clickME.addEventListener("click", async()=>{ 
  const ip = await getIPAddress();
    if (ip) {
        window.location.href = `secondPage.html?ip=${ip}`;
    } 
}); 
