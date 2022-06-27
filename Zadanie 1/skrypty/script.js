// Tymczasowo pliki przechowamy w tablicy stworzonej "z ręki", później spróbujemy załadować je z serwera
const folder_grafiki = "./gfx/";
const pliki = ['BabyYoda.jpg', 'Chrupek1.jpg', 'Krotka1.jpg', 'KrotkaChillout.jpg', 'KrotkaZzipowana.jpg', 'Kwiat.jpg'];

// Funkcje pomocnicze
function zaladujZdjecia()
{
    var kodPolaroida = '<div class="polaroid"> \
                        <div class="photo"> \
                            <img src="{{SRC}}" alt="{{ALT}}" /> \
                        </div> \
                        <div class="desc"> \
                            <p> {{ALT}} </p> \
                        </div> \
                        <div class="buts">\
                        <button class="ciemniej">Ciemniej</button><button class="jasniej">Jaśniej</button>\
                        </div>\
                    </div>';

    for ( var zdjecie of pliki ) 
    {
        var sciezka_pliku = folder_grafiki + zdjecie;
        var opis = zdjecie.split('.')[0];
        var polaroid = kodPolaroida.replace('{{SRC}}', sciezka_pliku);
        polaroid = polaroid.replace(new RegExp('{{ALT}}', 'g'), opis); 
        document.querySelector('main').innerHTML += (polaroid);
    }
}

function obrocZdjecia()
{
    var polaroidy = document.querySelectorAll('.polaroid');

    for ( var polaroid of polaroidy )
    {
        var rotacja = (Math.random() - 0.5) * 30;
        polaroid.style.transform = "rotate(" + rotacja + "deg)";
    }
}

// Wyowłanie funkcji
zaladujZdjecia();
obrocZdjecia();

// reakcja na zdarzenia
document.addEventListener("mouseover", (e) => {
    if ( e.target.className === "polaroid" )
    {
        e.target.style.zIndex = "100";
        if(e.target.style.transform !== "rotate(360deg) scale(1.5)") {
            e.target.style.transform = "rotate(0deg) scale(1.5)";
        }

        //Obrót o 360 stopni

        e.target.addEventListener("click",wykonajObrot);

    }
    else if ( e.target.closest('.polaroid') && e.target.closest('.polaroid').contains(e.target) )
    {
        if(e.target.closest(".polaroid").style.transform !== "rotate(360deg) scale(1.5)") {
            e.target.closest('.polaroid').style.transform = "rotate(0deg) scale(1.5)";
            e.target.closest('.polaroid').style.zIndex = "100";
        }
        e.target.addEventListener("click",wykonajObrot);

    }

});

document.addEventListener("mouseout", (e) => {
    var rotacja = (Math.random() - 0.5) * 30;
    if (e.relatedTarget.closest('.polaroid') && e.relatedTarget.closest('.polaroid').contains(e.target)){

    } else if ( e.target.className === "polaroid" )
    {

        e.target.style.transform = "rotate(" + rotacja + "deg)";
        e.target.style.zIndex = "0";
        e.target.removeEventListener("click",wykonajObrot,false);
    }
    else if ( e.target.closest('.polaroid') && e.target.closest('.polaroid').contains(e.target) )
    {
        e.target.closest('.polaroid').style.transform = "rotate(" + rotacja + "deg)";
        e.target.closest('.polaroid').style.zIndex = "0";
        e.target.closest('.polaroid').removeEventListener("click",wykonajObrot,false);
    }
});
document.addEventListener("click",(e)=>{
        if(e.target.className==="jasniej"){
            e.target.closest(".polaroid").style.backgroundColor="#FFE";
        }
        else if(e.target.className==="ciemniej"){
            e.target.closest(".polaroid").style.backgroundColor="#eeeeee";
        }

});
function wykonajObrot(event){
  if(event.target.id!=="ciemniej" || event.target.id!=="jasniej") {

        event.target.closest(".polaroid").style.transform = "rotate(360deg) scale(1.5)";

  }

}

document.querySelector('main').style.animationPlayState = "running";

document.querySelector('main').addEventListener("click", (e) => 
{
    if ( e.target.style.animationPlayState == "running" )
    {
        e.target.style.animationPlayState = "paused";
    }
    else
    {
        e.target.style.animationPlayState = "running";
    }
});


