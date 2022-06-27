$("a").click(function (e) {
    e.preventDefault();
    var hash=this.hash;
    $("html,body").animate({scrollTop:$(hash).offset().top-50},800,function () {
        window.location.hash=hash;
        window.scrollTo(0,$(hash).offset().top-50);
    });
});