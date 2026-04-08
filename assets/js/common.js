$(function(){
    //include - 로컬 환경에서만 사용
    $('header').load('../../inclube/header.html');
    $('aside').load('../../inclube/aside.html', function(){
        $.getJSON('../../assets/js/menu.json', function(menuData){
            menuInit(menuData);
        });
    });
    $('.table_box').each(function() {
        if ($(this).closest('.popup_wrap').length > 0 || $(this).find('.no_sc').length > 0) return;
        $(this).load('../../inclube/table.html');
    });
    $('.page_btw').load('../../inclube/page.html');

    //js 호출 - 로컬 환경에서만 사용
    $.getScript('../../assets/js/confirm.js');
    $.getScript('../../assets/js/popup.js');
    $.getScript('../../assets/js/select.js');

    //menu - active 함수
    function menuInit(menuData){
        let currentPath = window.location.pathname.split("/").pop();
        if (!currentPath.endsWith('.html')) {
            currentPath += '.html';
        }
        let currentMenu = null;
        let activePageUrl = currentPath;

        //menu 및 현재 page 찾기
        for(const menu of menuData.menu){
            const page = menu.pages.find(p => p.url === currentPath);
            if(page){
                currentMenu = menu;
                if(page.parent) activePageUrl = page.parent;
                break;
            }
        }
        if(!currentMenu) return;

        //gnb - active
        $('.gnb li a.item').removeClass('active');
        currentMenu.pages.forEach(p => $('.gnb li a.item[href$="' + p.url + '"]').addClass('active'));

        //menuSub - 생성
        if(currentMenu.icon !== "ico_dashboard"){
            const menuSubHtml = `<nav class="menuSub" aria-label="서브 메뉴">
                                    <h2>${currentMenu.title}</h2>
                                    <ul class="lnb"></ul>
                                </nav>`;
            $('aside .menu').after(menuSubHtml);

            // lnb - 생성 (parent 없는 페이지만)
            const lnbHtml = currentMenu.pages
                .filter(p => !p.parent)
                .map(p => `<li><a href="../${p.url}" class="item ${p.url === activePageUrl ? 'active' : ''}">${p.name}</a></li>`)
                .join('');
            $('aside .menuSub .lnb').html(lnbHtml);
        }
    }

    //menu - hover (펼치기)
    $(document).on('mouseenter', '.menu', function() {
        if (!$(this).hasClass('open')) {
            $(this).css({
                width: '190px',
                padding: '15px 20px',
                boxShadow: '6px 0 8px 0 rgba(0, 0, 0, 0.15)'
            });
            $(this).find('.item > span').removeClass('vis_hidden');
        }
    });

    //menu - blur (접기)
    $(document).on('mouseleave', '.menu', function() {
        if (!$(this).hasClass('open')) {
            $(this).css({
                width: '70px',
                padding: '15px',
                boxShadow: 'none'
            });
            $(this).find('.item > span').addClass('vis_hidden');
        }
    });

    //menu - open toggle
    $(document).on('click', '.menu .ico_hamburger', function() {
        const $menu = $(this).closest('.menu');
        const $aside = $(this).closest('aside');
        $menu.toggleClass('open')
        if ($menu.hasClass('open')) {
            $aside.css('padding-left', '190px');
            $menu.css({
                width: '190px',
                padding: '15px 20px',
                boxShadow: 'none'
            });
            $menu.find('.item > span').removeClass('vis_hidden');
        } else {
            $aside.css('padding-left', '70px');
            $menu.css({
                width: '70px',
                padding: '15px'
            });
            $menu.find('.item > span').addClass('vis_hidden');
        }
    });

    //alarm - 열기 & 닫기
    $(document).on('click', 'header .ico_alarm_header', function(){
        $(this).toggleClass('open');
        if($(this).hasClass('open')) {
            $('.alarm_box').fadeIn(200);
        } else{
            $('.alarm_box').fadeOut(200);
        }
    });

    //user - 열기 & 닫기
    $(document).on('click', 'header .ico_admin_header', function(){
        $(this).toggleClass('open');
        if($(this).hasClass('open')) {
            $('.user_stats').fadeIn(200);
        } else{
            $('.user_stats').fadeOut(200);
        }
    });

    //tab - 클릭
    $(document).on('click', '.tab_box .item', function() {
        $(this).closest('.tab_box').find('.item').removeClass('active').attr('aria-selected', 'false');
        $(this).addClass('active').attr('aria-selected', 'true');
        $(this).focus();
    });

    //tab - 키보드 제어
    $(document).on('keydown', '.tab_box .item', function(e) {
        var $tabs = $(this).closest('.tab_box').find('.item');
        var tabIdx = $tabs.index(this);
        var lastIdx = $tabs.length - 1;
        switch (e.key) {
            case 'ArrowRight':
            case 'ArrowDown':
                e.preventDefault();
                tabIdx = tabIdx === lastIdx ? 0 : tabIdx + 1;
                $tabs.eq(tabIdx).focus();
            break;

            case 'ArrowLeft':
            case 'ArrowUp':
                e.preventDefault();
                tabIdx = tabIdx === 0 ? lastIdx : tabIdx - 1;
                $tabs.eq(tabIdx).focus();
            break;

            case 'Home':
                e.preventDefault();
                $tabs.eq(0).focus();
            break;

            case 'End':
                e.preventDefault();
                $tabs.eq(lastIdx).focus();
            break;

            case 'Enter':
            case ' ':
                $tabs.removeClass('active').attr('aria-selected', 'false');
                $(this).addClass('active').attr('aria-selected', 'true');
            break;
        }
    });

    //input - 숫자만 입력 가능
    $(document).on('input', '.numOnly > input[type="text"]', function() {
        $(this).val($(this).val().replace(/[^0-9]/g, ''));
    });

    //table - all check 
    $(document).on('change', '.chk_bs input[type="checkbox"]', function () {
        if ($(this).closest('.chk_bs').hasClass('chk_all')) {
            $('.chk_bsBox .chk_bs input[type="checkbox"]').prop('checked', $(this).prop('checked'));
        } else {
            $('.chk_all input[type="checkbox"]')
            .prop(
                'checked',
                $('.chk_bsBox .chk_bs input[type="checkbox"]').length ===
                $('.chk_bsBox .chk_bs input[type="checkbox"]:checked').length
            );
        }
    });

    //table - href 이동(추후 삭제)
    $(document).on('click', '.table_box tbody tr', function () {
        const t_href = $(this).closest('.table_box').data('href');
        if (t_href) {
            window.location.href = t_href + ".html";
        } else {return;}
    });

    //datepicker - 초기 설정
    const today = new Date();
    const oneWeekAgo = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);

    // 한글 로케일 적용
    $(".datepicker").datepicker({
        dateFormat: "yy.mm.dd",
        showAnim: "slideDown",
        changeMonth: true,
        changeYear: true,
        showButtonPanel: true,
        showMonthAfterYear: true,
        monthNames: ["1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월"],
        monthNamesShort: ["1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월"],
        dayNamesMin: ["일","월","화","수","목","금","토"],
        yearRange: (today.getFullYear() - 5) + ":" + today.getFullYear()
    });

    // 시작 / 종료 날짜 기본 설정
    $(".form_item > .datepicker").each(function(index){
        $(this).datepicker("setDate", index === 0 ? oneWeekAgo : today);
    });

    //외부 영역 클릭 시
    $(document).on('click', function (e) {
        //alarm - 닫기
        if (!$(e.target).closest('.ico_alarm_header, .alarm_box').length) {
            $('.ico_alarm_header').removeClass('open');
            $('.alarm_box').stop(true, true).fadeOut(200);
        }

        //user - 닫기
        if (!$(e.target).closest('.ico_admin_header, .user_stats').length) {
            $('.ico_admin_header').removeClass('open');
            $('.user_stats').stop(true, true).fadeOut(200);
        }

        //select - 내부 클릭 시 동작 없음
        if ($(e.target).closest('.select_box').length) return;

        //select - 닫기
        closeAllSelect();
    });
});