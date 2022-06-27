let src;
let minSrc;
let index;
let names=document.querySelectorAll("figcaption");
$(".gallery img").click(function (e) {
    $("#etykieta").text( e.target.nextSibling.textContent);
    src=e.target.src;
    minSrc=src;
    src=src.substr(0,src.length-8);
    index=src.substr(src.length-1);

    src+=".jpg";
    $("#big").attr("alt",e.target.alt);
    $("#big").attr("src",src);
    $("#galeria").modal("show");
});
$("#prev").click(function (e) {
    var newIndex=index;
    newIndex--;
    if(newIndex===0)newIndex=6;


    src=src.replace(index+".jpg",newIndex+".jpg");

    minSrc=minSrc.replace(index+"-min.jpg",newIndex+"-min.jpg");

    $("#etykieta").text(names[newIndex-1].textContent);
    $("#big").attr("src",src);
    index=newIndex;
});
$(" #next").click(function (e) {
    var newIndex=index;
    newIndex++;

    newIndex=newIndex%7;
    if(newIndex===0)newIndex++;
    src=src.replace(index+".jpg",newIndex+".jpg");

    minSrc=minSrc.replace(index+"-min.jpg",newIndex+"-min.jpg");

    $("#etykieta").text(names[newIndex-1].textContent);
    $("#big").attr("src",src);
    index=newIndex;
});