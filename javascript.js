 const header = document.querySelector("header h2");
 const medieurl = "https://babushka-dd8a.restdb.io/media/";
 const myHeaders = {

     "x-apikey": "600ec2fb1346a1524ff12de4"
 }
 document.addEventListener("DOMContentLoaded", start)
 let retter;
 let filter = "ja";


 // første funktion der kaldes efter DOM er loaded
 function start() {
     const filterKnapper = document.querySelectorAll("nav button");
     filterKnapper.forEach(knap => knap.addEventListener("click", filtrerRetter));
     loadJSON();
 }

 //Eventlistner tilknyttet til knapperne der vælger hvad for et filter der er aktivt
 function filtrerRetter() {
     filter = this.dataset.kategori; //sat variabel "filter" til værdien af data-troende på den knap der er klikket på
     document.querySelector(".valgt").classList.remove("valgt"); //fjern klassen valgt fra en knap
     this.classList.add("valgt") //marker den knap der er klikket på

     visRetter(); // kald funktionen visRetter efter det nye filter er sat
     header.textContent = this.textContent;
 }

 async function loadJSON() {
     const JSONData = await fetch("https://babushka-dd8a.restdb.io/rest/menu", {
         headers: myHeaders
     });
     retter = await JSONData.json();
     console.log("retter", retter);
     visRetter();
 }

 //funktion der viser personer i liste view
 function visRetter() {

     const dest = document.querySelector("#liste"); // container til articles med en person
     const skabelon = document.querySelector("template").content; // select indhold af html skabelon (article)
     dest.textContent = ""; //ryd container inden nyt loop
     retter.forEach(ret => {
         console.log("kategori", ret.kategori);
         // loop igennem json (personer)
         //tjek hvilken tro personen har og sammenlign med aktuelt filter eller vis alle, hvis filter har værdien "alle"
         if (filter == ret.kategori || filter == "alle") {
             const klon = skabelon.cloneNode(true);
             klon.querySelector(".navn").textContent = ret.navn + " ";
             klon.querySelector(".profil-billede").src = medieurl + ret.billede;
             klon.querySelector(".pris").textContent = ret.pris + ",-";
             //når man klikker på person article kalder Vis detaljer (singleview)
             klon.querySelector(".ret").addEventListener("click", () => visDetaljer(ret));
             dest.appendChild(klon);

         }

     })
 }

 function visDetaljer(retten) {
     //her navigerer vi med location.href hen til en side vi ikke har lavet endnu. vi sender urlParametret id med, og det får vædien af hvem._id.
     location.href = `single_view.html?id=${retten._id}`;
 }
