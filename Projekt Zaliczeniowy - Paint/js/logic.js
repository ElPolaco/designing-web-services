var canvas=document.getElementById("kanwa");
var ctx=canvas.getContext("2d");
ctx.strokeStyle=document.getElementById("kolor").value;
ctx.fillStyle=document.getElementById("kolor").value;
let x=null,y=null;
let beforeX=null,beforeY=null;
let cursorX=null,cursorY=null;
var rysuje=false;
let ksztalt="kolo";
var wypelnianie=false;
var gumka=false;
var dodajeTekst=false;
var size=document.getElementById("size");
var r=size.value;
var tekst=null,rozmiar;
ctx.canvas.width=document.querySelector(".plotno").clientWidth;
ctx.canvas.height=document.querySelector(".plotno").clientHeight;

var cursor=document.createElement("div");
cursor.id="cursor";
document.querySelector(".plotno").appendChild(cursor);


window.addEventListener("resize",(e) =>{
    let a=canvas.toDataURL();
    let img=new Image();
    img.src=a;
    ctx.canvas.width=document.querySelector(".plotno").clientWidth;
    ctx.canvas.height=document.querySelector(".plotno").clientHeight;
    img.onload=function(){
        ctx.drawImage(img,0,0,ctx.canvas.width,ctx.canvas.height);
    };
    ctx.strokeStyle=document.getElementById("kolor").value;
    ctx.fillStyle=document.getElementById("kolor").value;
});
canvas.addEventListener("mousedown",(e)=>{

       if(!wypelnianie && !dodajeTekst)rysuje = true;


});
canvas.addEventListener("click",(e)=>{
    if(dodajeTekst){
        ctx.font=rozmiar+"px sans-serif";
        ctx.fillText(tekst,e.offsetX,e.offsetY);
        tekst=null;
        dodajeTekst=false;
        document.getElementById("write").checked=false;
    }
   else if(wypelnianie){
        ctx.fillRect(0,0,ctx.canvas.width,ctx.canvas.height);
    }
   else if(!gumka) {
       x = e.offsetX;
       y = e.offsetY;
       draw(x, y);
   }else if(gumka){
       ctx.clearRect(x-r,y-r,2*r,2*r);
   }
});
canvas.addEventListener("mouseup",(e)=>{
    rysuje=false;
});
canvas.addEventListener("mouseout",(e)=>{
    rysuje=false;
    cursor.style.display="none";
});
canvas.addEventListener("mousemove",(e)=>{

   x=e.offsetX;
   y=e.offsetY;
    document.getElementById("dsc").textContent=e.offsetX+" "+e.offsetY;
   drawCursor();
   if(rysuje && !gumka){ uzupelnij();draw(x,y);}
    if(rysuje && gumka) ctx.clearRect(x-r,y-r,2*r,2*r);
   beforeX=x;
   beforeY=y;
});

//NARZĘDZIA DLA UŻYTKOWNIKA

size.addEventListener("change",(e)=>{ //ROZMIAR PĘDZLA
    r=size.value;
});

document.getElementById("clear").addEventListener("click",(e)=>{//WYCZYŚĆ PŁÓTNO
    ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
});

document.getElementById("kolor").addEventListener("change",(e)=>{
    ctx.strokeStyle=e.target.value;
    ctx.fillStyle=e.target.value;
});
document.getElementById("shape").addEventListener("change",(e)=>{
    ksztalt=document.getElementById("shape").value;
});
document.getElementById("erase").addEventListener("click",(e)=>{
   gumka=e.target.checked;
   if(gumka){document.getElementById("shape").value="kwadrat"; ksztalt="kwadrat"; wypelnianie=false; cursor.innerHTML="";  cursor.style.border = "1px solid gray";document.getElementById("fillcolor").checked=false; }
});
document.getElementById("fillcolor").addEventListener("click",(e)=>{
    if(!wypelnianie) {
        wypelnianie = true;
        cursor.innerHTML = "<i class=\"fas fa-fill-drip\"></i>";

        document.getElementById("erase").checked=false;
        gumka=false;
        cursor.style.border = "none";
    }else{
        cursor.innerHTML = "";
        cursor.style.border = "1px solid gray";
        wypelnianie=false;
    }
});
document.getElementById("write").addEventListener("click",(e)=>{
   tekst=prompt("Podaj tekst, który zostanie dodany");
   if(tekst!=null){
       dodajeTekst=true;
       rozmiar=prompt("Prosze podać rozmiar czcionki(w px): ","16");
       if(rozmiar==null)rozmiar=16;
       alert("Proszę, po zamknięciu tego okienka wybrać(kliknąć) miejsce - początek tekstu");
   }
});
document.getElementById("download").addEventListener("click",(e)=>{
    var link=document.createElement("a");
    link.href=canvas.toDataURL("image/png");
    link.download="photo.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});

//FUNKCJE
function draw(x,y) {//PĘDZEL
    ctx.beginPath();
    ctx.moveTo(x,y);
   if(ksztalt==="kolo") {
       ctx.arc(x, y, r, 0, Math.PI * 2, false);
       ctx.fill();
   }else if(ksztalt==="kwadrat"){
       ctx.fillRect(x-r,y-r,r*2,r*2);
   }
    ctx.closePath();
}
function drawCursor() {//KURSOR
    cursorX=(y-r);
    cursorY=(x-r);
    cursor.style.display="block";
    cursor.style.width=2*r+"px";
    cursor.style.height=2*r+"px";
    if(ksztalt==="kolo"){
        cursor.style.borderRadius="100%";
    }else if(ksztalt==="kwadrat"){
        cursor.style.borderRadius="0%";
    }
    cursor.style.top=cursorX+"px";
    cursor.style.left=cursorY+"px";
}
function uzupelnij(){//UZUPEŁNIANIE LINII
    if(beforeX!=null && beforeY!=null){
        ctx.beginPath();
        ctx.lineWidth=2*r;
        ctx.moveTo(beforeX,beforeY);
        ctx.lineTo(x,y);
        ctx.stroke();
        ctx.closePath();
    }
}