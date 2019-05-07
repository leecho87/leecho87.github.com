'use strict';
(function($, Handlebars){
    if (!$) {
        alert('오류가 발생했습니다.');
        throw new Error('"jQuery" is required'); // jQuery 가 없음을 오류로 알림
    }
    if (!Handlebars) {
        alert('오류가 발생했습니다.');
        throw new Error('"handlebars" is required'); // Handlebars 가 없음을 오류로 알림
    }

    var projectViewButton = $('.dev__project-button');
    var headerMenu = $('.header__menu-link');
    var mobileHeaderToggle = $('.header__mobile');

    // addEvent
    projectViewButton.bind('click', quickMove)
    headerMenu.bind('click', menuMove)
    mobileHeaderToggle.bind('click', menuToggle)

    function quickMove(e){
        e.preventDefault();
        var listPoint = document.querySelector('.introduce--work').offsetTop;
        $('html,body').stop().animate({scrollTop : listPoint},200)
    }
    function menuMove(e){
        e.preventDefault();
        var targetID = e.target.dataset.id;
        var section = $('.introduce');
        $('html,body').stop().animate({
            scrollTop : section[targetID].offsetTop
        },200)
    }
    function menuToggle(e){
        e.preventDefault();
        mobileHeaderToggle.next().toggle();
    }

    // work list 그리기
    var workListField = $('.work__list');
    var workListSource = $('#work-template').html();
    var workTemplate = Handlebars.compile(workListSource);

    $.ajax({
        url : './src/js/work.js',
        method : 'GET',
        dataType : 'json',
        success : function(data){
            var template = workTemplate(data);
            workListField.html(template);
        },
        error : function(error){
            console.log('error', error)
        }
    });

})(jQuery,Handlebars);