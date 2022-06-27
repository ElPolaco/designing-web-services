var a=new XMLHttpRequest();
var b=new XMLHttpRequest();
var lon,lat;
var url_current="http://api.openweathermap.org/data/2.5/weather?q={city name}&appid=3d0cef7c68c55374425f62631b3e0aeb&lang=pl&units=metric";
var url;
var url_extended="https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude=current&appid=3d0cef7c68c55374425f62631b3e0aeb&lang=pl&units=metric";
var url_all="https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&appid=3d0cef7c68c55374425f62631b3e0aeb&lang=pl&units=metric";
var bylo_powtarzane=false;
var result,result2;

function wypiszPogode() {
    var cityName=null;
    if (bylo_powtarzane){//Użytkownik skorzystał z lokalizacji
        $("#aktualna").html("<img src=\"http://openweathermap.org/img/w/"+result2.current.weather[0].icon+".png\"  style=\"width: 100px; height: 100px;\" alt=\"Ikona\">\n" +
            "                     <h2>"+result2.lat+" "+result2.lon+"("+new Date(result2.current.dt*1000).toLocaleDateString("pl-PL",{ day: 'numeric', month: 'long', year: 'numeric', hour:'numeric',minute:'2-digit',second:'2-digit'})+")</h2><h3>"+result2.current.weather[0].description+"</h3><h4>Temperatura: "+Math.floor(result2.current.temp)+"°C</h4><h5>Temperatura odczuwalna: "+Math.floor(result2.current.feels_like)+"°C</h5><h4>Ciśnienie: "+result2.current.pressure+"hPa</h4><h4>Wiatr: "+result2.current.wind_speed+"m/s <i class=\"fas fa-arrow-up\" style=\"transform: rotate("+result2.current.wind_deg+"deg)\"></i></h4><h4>Zachmurzenie: "+result2.current.clouds+"%</h4><h4>Wilgotność: "+result2.current.humidity+"%</h4>");
    }else{//Wszystko przebiegło "normalnie"
            $("#aktualna").html("<img src=\"http://openweathermap.org/img/w/"+result.weather[0].icon+".png\"  style=\"width: 100px; height: 100px;\" alt=\"Ikona\">\n" +
                "                     <h2>"+result.name+"("+new Date(result.dt*1000).toLocaleDateString("pl-PL",{ day: 'numeric', month: 'long', year: 'numeric', hour:'numeric',minute:'2-digit',second:'2-digit'})+")</h2><h3>"+result.weather[0].description+"</h3><h4>Temperatura: "+Math.floor(result.main.temp)+"°C</h4><h5>Temperatura odczuwalna: "+Math.floor(result.main.feels_like)+"°C</h5><h4>Ciśnienie: "+result.main.pressure+"hPa</h4><h4>Wiatr: "+result.wind.speed+"m/s <i class=\"fas fa-arrow-up\" style=\"transform: rotate("+result.wind.deg+"deg)\"></i></h4><h4>Zachmurzenie: "+result.clouds.all+"%</h4><h4>Wilgotność: "+result.main.humidity+"%</h4>");
            cityName=result.name;
    }
    var godzinowa,tygodniowa;
    if(cityName!=null || cityName!=undefined) {
        godzinowa = "<div class=\"list-group-item\"><h1>Pogoda dla miasta " + cityName+ " na najbliższe 48 godzin:</h1></div>";
       tygodniowa = "<div class=\"list-group-item\"><h1>Pogoda dla miasta " + cityName + " na najbliższy tydzień:</h1></div>";
    }else{
        godzinowa = "<div class=\"list-group-item\"><h1>Pogoda dla twojej lokalizacji na najbliższe 48 godzin:</h1></div>";
        tygodniowa = "<div class=\"list-group-item\"><h1>Pogoda dla twojej lokalizacji na najbliższy tydzień:</h1></div>";
    }
    for (let i=0;i<48;i++) {
        godzinowa+= "  <div class=\"list-group-item\">\n" +
            "                            <div class=\"media\">\n" +
            "                                <img src=\"http://openweathermap.org/img/w/"+result2.hourly[i].weather[0].icon+".png\" class=\"mr-2\" alt=\"Ikona\" style=\"width: 64px;height: 64px;\">\n" +
            "                                <div class=\"media-body\"><h4 class=\"mt-0\">"+new Date(result2.hourly[i].dt*1000).toLocaleDateString("pl-PL",{ day: 'numeric', month: 'long', year: 'numeric', hour:'numeric',minute:'2-digit'})+"</h4><p>Temperatura: "+Math.round(result2.hourly[i].temp)+"°C Ciśnienie:"+ result2.hourly[i].pressure+" hPa Wilgotność powietrza:"+ result2.hourly[i].humidity+"% Wiatr: "+ result2.hourly[i].wind_speed+" m/s <i style=\"transform: rotate("+ result2.hourly[i].wind_deg+"deg)\" class=\"fas fa-arrow-up\"></i></p></div>\n" +
            "                            </div>\n" +
            "                        </div>";
    }
    $("#godzinowa .list-group").html(godzinowa);

    for(let i=0;i<8;i++){
        tygodniowa+="<div class=\"list-group-item\">\n" +
            "                                <div class=\"media\">\n" +
            "                                    <img src=\"http://openweathermap.org/img/w/"+result2.daily[i].weather[0].icon+".png\" class=\"mr-3\" alt=\"Ikona\">\n" +
            "                                    <div class=\"media-body\">\n" +
            "                                        <h4 class=\"mt-0\">"+new Date(result2.daily[i].dt*1000).toLocaleDateString("pl-PL",{ day: 'numeric', month: 'long', year: 'numeric'})+"</h4>\n" +
            "                                        <h6>"+result2.daily[i].weather[0].description+"</h6>\n" +
            "                                        <p>Temperatura w dzień: "+Math.round(result2.daily[i].temp.day)+"°C Temperatura w nocy: "+Math.round(result2.daily[i].temp.night)+"°C Ciśnienie:"+ result2.daily[i].pressure+" hPa Wilgotność powietrza:"+ result2.daily[i].humidity+"% Wiatr: "+ result2.daily[i].wind_speed+" m/s <i style=\"transform: rotate("+ result2.daily[i].wind_deg+"deg)\" class=\"fas fa-arrow-up\"></i></p>\n" +
            "                                        <small>Wschód słońca: "+new Date(result2.daily[i].sunrise*1000).toTimeString()+" Zachód słońca:"+new Date(result2.daily[i].sunset*1000).toTimeString()+"</small>\n" +
            "                                    </div>\n" +
            "                                </div>\n" +
            "                            </div>";
    }
    $("#tydzien .list-group").html(tygodniowa);

    bylo_powtarzane=false;
}

b.onreadystatechange=function () {
    if(this.readyState===4 && this.status===200){
        result2=JSON.parse(this.responseText);
      //  document.querySelector("#feedback").innerHTML+=this.responseText;
        wypiszPogode();
    }
};

function retry(position) {
   lat=position.coords.latitude;
   lon=position.coords.longitude;
   url=url_all;
   bylo_powtarzane=true;
   get_extended();
}
function find_by_location(){
    if(window.navigator.geolocation){
        window.navigator.geolocation.getCurrentPosition(retry);
    }
    else{
        alert("Nie jesteśmy w stanie pobrać danych.");
    }
}
a.onreadystatechange=function(){
    if(this.readyState===4&&this.status===404){
       if( confirm("Nie znaleziono miejscowości. Chcesz użyć swojej lokalizacji?")){
            if(window.navigator.geolocation){
                window.navigator.geolocation.getCurrentPosition(retry);
            }
            else{
                alert("Nie jesteśmy w stanie pobrać danych.");
            }
       }else{
           alert("Nie jesteśmy w stanie pobrać danych.");
       }
    }
    if(this.readyState===4 && this.status===200){
       result=JSON.parse(this.responseText);
       var abc="";
       var date;
       lon=result.coord.lon;
       lat=result.coord.lat;
        url=url_extended;
        get_extended();

    }
};
function get_extended() {
    url=url.replace("{lat}",lat);
    url=url.replace("{lon}",lon);
    b.open("GET",url,true);
    b.send(null);
}
function send() {
        if( document.querySelector("#q").value!=="") {
            a.open("GET", url_current.replace("{city name}", document.querySelector("#q").value), true);
            a.send(null);
        }
}