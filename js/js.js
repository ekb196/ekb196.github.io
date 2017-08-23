// mobile nav
$(function(){
    $(".nav-toggle").on("click", function (e){
        e.preventDefault();
        var menuButton = $(e.currentTarget).children();
        if(menuButton.hasClass("nav-toggle__button")){
            menuButton.removeClass("nav-toggle__button").addClass("nav-toggle__button_close");
            $(".topline__nav").addClass("topline__nav_active");
            $("body").css({"height": "100vh", "overflow": "hidden"});
        }else{
            menuButton.removeClass("nav-toggle__button_close").addClass("nav-toggle__button");
            $(".topline__nav").removeClass("topline__nav_active");
            $("body").css({"height": "auto", "overflow": "scroll"});
        }
    });
});

// menu acco

// $(f

$(function(){
    $(".menu-list__item").on("click", function(e){
        e.preventDefault();

        var item = $(e.currentTarget),
            itemSiblings = $(e.currentTarget).siblings(),
            activeClass = "menu-list__item_active",
            popup = item.children(".menu-list__popup"),
            popupSiblings = itemSiblings.children(".menu-list__popup"),
            popupWidth;

        if(window.innerWidth>768){
            popupWidth = 560;
        } else if(window.innerWidth>480){
            popupWidth = window.innerWidth - $(".menu-list__type").width()*3;
        } else{
            popupWidth = window.innerWidth - $(".menu-list__type").width();
        }
        
        $(".popup-content").width(popupWidth-60);
            
        
        function closeMenu(){
            item.removeClass(activeClass);
            popup.width(0); 
            itemSiblings.children(".menu-list__type").removeClass("menu-list__type_hidden");
        }

        function openMenu(){
            item.addClass(activeClass);
            itemSiblings.removeClass(activeClass);
            popup.width(popupWidth);
            popupSiblings.width(0);
            itemSiblings.children(".menu-list__type").addClass("menu-list__type_hidden");
        }
        
        item.hasClass(activeClass) ? closeMenu() : openMenu();
            
    });
});


// team acco
$(function(){
    $(".team-member__item").on("click", function(e){
        e.preventDefault();
        var item = $(e.currentTarget),
            itemSiblings = item.siblings(),
            active = "team-member__item_active",
            wrapper = ".team-member__card-wrapper",
            wrapperEl = item.children(wrapper),
            card = item.find(".team-member__card");
            
        item.hasClass(active) ? 
            (item.removeClass(active), wrapperEl.height(0)) :
                (item.addClass(active), wrapperEl.height($(card).height()),
                    itemSiblings.removeClass(active), itemSiblings.children(wrapper).height(0));
    })
});


// SLIDER
$(function(){
    
    var flag = true;

    function moveSlide(itemsList, slideNum, direction){

        var active = $(itemsList).find(".active"),
            next = itemsList.children().eq(slideNum),
            transform;
        
        flag = false;
        switch (direction){
            case "horizontal":
                transform = "translateX(";
                break;
            case "vertical":
                transform = "translateY(";
                break;
        };
        if(slideNum != -1){
            itemsList.css({"transform":transform+-slideNum*100+"%"});
            next.addClass("active").siblings().removeClass("active");
            $(itemsList).bind("transitionend", function(){flag = true;}); 
        }else{flag = true};
             
    };

    //BURGERS SLIDER
    $(".slider__controls").on("click", function(e){
        
        e.preventDefault();

        var button = $(e.currentTarget),
            slider = button.closest(".slider"),
            itemsList = slider.find(".slider__list"),
            items = itemsList.find(".slider__item"),
            active = items.filter(".active"),
            nextItem, edgeItem, slideNum;

        if (button.hasClass("slider__controls_right")){
            nextItem = active.next();
            edgeItem = items.first();
        }

        if (button.hasClass("slider__controls_left")){
            nextItem = active.prev();
            edgeItem = items.last();
        }

        slideNum = nextItem.length ? nextItem.index() : edgeItem.index();

        if (flag == true) moveSlide (itemsList, slideNum, "horizontal") // передаем переменные из обработчиков событий + направление слайдера.
    });


    //ONEPAGESCROLL
    $('.wrapper').on("wheel", function (e) {

        var deltaY = e.originalEvent.deltaY,
            direction = deltaY < 0 ? 'up' : 'down',
            itemsList = $(".maincontent"),
            items = itemsList.find("section"),
            active = items.filter(".active"),
            nextItem, slideNum;

        if (direction == "down"){
            nextItem = active.next();
        }

        if (direction == "up"){
            nextItem = active.prev();
        }

        slideNum = nextItem.index();

        if (flag == true) moveSlide (itemsList, slideNum, "vertical");
            
    });
        
});



// ya map

    ymaps.ready(init);
    var myMap;

    function init(){
        var zoomSize;
        (window.innerWidth<768) ? zoomSize = 10 : zoomSize = 12;

        myMap = new ymaps.Map("map", {
            center: [59.93, 30.35],
			zoom: zoomSize,
			controls: []
        });
        
        myMap.behaviors.disable('scrollZoom');
        if(window.innerWidth<768) myMap.behaviors.disable('drag');

		var coords = [
			[59.890441651424574,30.315672543076538],
			[59.97276137697629,30.310522701767965],
			[59.946765155076044,30.38682618382363],
			[59.915785728842906,30.497738387774955]
		],
			myCollection = new ymaps.GeoObjectCollection({}, {
				iconLayout: 'default#image',
				iconImageHref: 'img/icons/map-marker.png',
				iconImageSize: [46, 57],
				iconImageOffset: [-26, -52]
			});

		for (var i = 0; i < coords.length; i++) {
			myCollection.add(new ymaps.Placemark(coords[i]));
        }

        myMap.geoObjects.add(myCollection);
    };
	


//     // SLIDER
// $(function(){
    
//     var flag = true;

//     function moveSlide(itemsList, slideNum, direction){

//         var active = $(itemsList).find(".active"),
//             next = itemsList.children().eq(slideNum);
        
//         flag = false;
//         switch (direction){
//             case "horizontal":
//                 itemsList.css({"transform":"translateX("+-slideNum*100+"%"});
//                 break;
//             case "vertical":
//                 itemsList.css({"transform":"translateY("+-slideNum*100+"%"});
//                 break;
//         };
//         next.addClass("active").siblings().removeClass("active")
//         $(itemsList).bind("transitionend", function(){flag = true}); 
          
//     };

//     //BURGERS SLIDER
//     $(".slider__controls").on("click", function(e){
        
//         e.preventDefault();

//         var button = $(e.currentTarget),
//             slider = button.closest(".slider"),
//             itemsList = slider.find(".slider__list"),
//             items = itemsList.find(".slider__item"),
//             active = items.filter(".active"),
//             nextItem, edgeItem, slideNum;

//         if (button.hasClass("slider__controls_right")){
//             nextItem = active.next();
//             edgeItem = items.first();
//         }

//         if (button.hasClass("slider__controls_left")){
//             nextItem = active.prev();
//             edgeItem = items.last();
//         }

//         slideNum = nextItem.length ? nextItem.index() : edgeItem.index();

//         if (flag == true) moveSlide (itemsList, slideNum, "horizontal") // передаем переменные из обработчиков событий + направление слайдера.
//     });


//     //ONEPAGESCROLL
//     $('.wrapper').on("wheel", function (e) {

//         var deltaY = e.originalEvent.deltaY,
//             direction = deltaY < 0 ? 'up' : 'down',
//             itemsList = $(".maincontent"),
//             items = itemsList.find("section"),
//             active = items.filter(".active"),
//             nextItem, edgeItem, slideNum;

//         if (direction == "down"){
//             nextItem = active.next();
//             edgeItem = items.last();
//         }

//         if (direction == "up"){
//             nextItem = active.prev();
//             edgeItem = items.first();
//         }

//         slideNum = nextItem.length ? nextItem.index() : edgeItem.index();

//         if (flag == true) moveSlide (itemsList, slideNum, "vertical");
            
//     });
      
// });