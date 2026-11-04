const products = [
 {id:1,name:"Wireless Headphones",cat:"Electronics",price:1800,emoji:"🎧",condition:"Like new",seller:"Aarav",place:"Ludhiana",bg:"#e8e5f5"},
 {id:2,name:"Classic Denim Jacket",cat:"Fashion",price:950,emoji:"🧥",condition:"Good",seller:"Mehak",place:"Ludhiana",bg:"#dcebf0"},
 {id:3,name:"Minimal Desk Chair",cat:"Home",price:2400,emoji:"🪑",condition:"Very good",seller:"Rohan",place:"Chandigarh",bg:"#f1e5d7"},
 {id:4,name:"The Alchemist",cat:"Books",price:220,emoji:"📚",condition:"Good",seller:"Simran",place:"Ludhiana",bg:"#e8edda"},
 {id:5,name:"City Bicycle",cat:"Sports",price:3200,emoji:"🚲",condition:"Very good",seller:"Kabir",place:"Jalandhar",bg:"#dcebe2"},
 {id:6,name:"Smart Watch",cat:"Electronics",price:1500,emoji:"⌚",condition:"Like new",seller:"Isha",place:"Ludhiana",bg:"#e5e8ed"},
 {id:7,name:"Everyday Sneakers",cat:"Fashion",price:700,emoji:"👟",condition:"Good",seller:"Dev",place:"Amritsar",bg:"#f0e4e0"},
 {id:8,name:"Gaming Controller",cat:"Electronics",price:1100,emoji:"🎮",condition:"Very good",seller:"Arjun",place:"Patiala",bg:"#e6e2f1"}
];
let activeCat="All";
const grid=document.getElementById("productGrid");
const money=n=>"₹"+Number(n).toLocaleString("en-IN");
function render(){
 let list=products.filter(p=>(activeCat==="All"||p.cat===activeCat)&&(`${p.name} ${p.cat} ${p.place}`).toLowerCase().includes(document.getElementById("searchInput").value.toLowerCase()));
 const sort=document.getElementById("sortSelect").value;
 if(sort==="low")list.sort((a,b)=>a.price-b.price); if(sort==="high")list.sort((a,b)=>b.price-a.price);
 grid.innerHTML=list.length?list.map(p=>`<article class="product-card">
  <div class="product-image" style="background:${p.bg}"><span class="condition">${p.condition}</span><button class="heart" aria-label="Save item" onclick="saveItem(${p.id},this)">♡</button>${p.emoji}</div>
  <div class="product-info"><div class="category">${p.cat}</div><h3>${p.name}</h3><div class="price-row"><span class="price">${money(p.price)}</span><span class="location">⌖ ${p.place}</span></div><div class="card-bottom"><span class="seller">Seller: ${p.seller}</span><button class="view-btn" onclick="contactSeller('${p.name.replace(/'/g,"\\'")}')">View item ↗</button></div></div>
 </article>`).join(""):'<div class="empty">No items found. Try another search or category.</div>';
}
function saveItem(id,btn){btn.textContent=btn.textContent==="♡"?"♥":"♡";showToast(btn.textContent==="♥"?"Saved to your favourites":"Removed from favourites")}
function contactSeller(name){showToast("Demo listing: "+name+" · Contact feature can be connected to a backend")}
function showToast(message){const t=document.getElementById("toast");t.textContent=message;t.classList.add("show");setTimeout(()=>t.classList.remove("show"),2500)}
document.getElementById("chips").addEventListener("click",e=>{if(!e.target.matches(".chip"))return;document.querySelectorAll(".chip").forEach(c=>c.classList.remove("active"));e.target.classList.add("active");activeCat=e.target.dataset.cat;render()});
document.getElementById("searchInput").addEventListener("input",render);document.getElementById("sortSelect").addEventListener("change",render);
const modal=document.getElementById("sellModal");function openModal(){modal.classList.add("show")}function closeModal(){modal.classList.remove("show")}
["openSell","heroSell","bannerSell"].forEach(id=>document.getElementById(id).addEventListener("click",openModal));document.getElementById("closeSell").addEventListener("click",closeModal);
modal.addEventListener("click",e=>{if(e.target===modal)closeModal()});
document.getElementById("sellForm").addEventListener("submit",e=>{e.preventDefault();const name=document.getElementById("itemName").value.trim(),price=Number(document.getElementById("itemPrice").value),cat=document.getElementById("itemCategory").value,emoji=document.getElementById("itemEmoji").value;if(!name||price<=0)return;products.unshift({id:Date.now(),name,cat,price,emoji,condition:"Pre-owned",seller:"You",place:"Ludhiana",bg:"#e5efdc"});activeCat="All";document.querySelectorAll(".chip").forEach(c=>c.classList.toggle("active",c.dataset.cat==="All"));e.target.reset();closeModal();render();document.querySelector("#explore").scrollIntoView({behavior:"smooth"});showToast("Your item has been added to the demo marketplace!")});
render();
