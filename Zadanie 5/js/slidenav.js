$("document").ready(function (e) {
    $("nav").slideUp(0.5);
    visible=false;
});
let visible=false;
$(window).scroll(function (e) {

    if(window.scrollY>window.innerHeight-250 && !visible){
        $("nav").slideDown();
        visible=true;
    }else if(window.scrollY<=window.innerHeight-250 && visible){
        $("nav").slideUp();
        visible=false;
    }
});