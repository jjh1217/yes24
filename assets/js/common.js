$(function(){
    $('header').load('../../inclube/header.html');
    $('aside').load('../../inclube/aside.html', function(){
        $.getJSON('../../assets/js/menu.json', function(menuData){
            menuInit(menuData);
        });
    });
    $('.table_box').load('../../inclube/table.html');
    $('.page_btw').load('../../inclube/page.html');

    //menu active 함수
    function menuInit(menuData){
        const currentPath = window.location.pathname.split("/").pop();
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

    //confirm - 열기
    $(document).on('click', '.confirm_open', function(){
        $('.confirm_wrap').fadeIn(200);
    });

    //confirm - 닫기
    $(document).on('click', '.confirm_close', function(){
        $(this).closest('.confirm_wrap').fadeOut(200);
    });

    //confirm - textarea 입력 시 버튼 활성화/비활성화
    $(document).on('input', '.confirm_box > textarea', function(){
        const $btn = $(this).closest('.confirm_box').find('.btn_confirm');
        $btn.toggleClass('off', $.trim($(this).val()) === '');
    });

    //popup - 열기
    $(document).on('click', '.popup_open', function(){
        $('.popup_box').fadeIn(200);
    });

    //popup - 닫기
    $(document).on('click', '.popup_close', function(){
        $(this).closest('.popup_box').fadeOut(200);
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
    $(document).on('click', '.tab_box .item', function(e) {
        e.preventDefault();
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
                e.preventDefault();
                $tabs.removeClass('active').attr('aria-selected', 'false');
                $(this).addClass('active').attr('aria-selected', 'true');
            break;
        }
    });

    //input - 숫자만 입력 가능
    $(document).on('input', '.numOnly > input[type="text"]', function() {
        $(this).val($(this).val().replace(/[^0-9]/g, ''));
    });

    //select - 전체 닫기
    function closeAllSelect() {
        $('.select_box').removeClass('open');
        $('.select_box .val').attr('aria-expanded', 'false');
        $('.select_box .options').attr('aria-hidden', 'true');
    }

    //select - selected 값 설정 및 placeholder 설정
    $('.select_box').each(function(){
        const $val = $(this).find('.val');
        const $selected = $(this).find('[role="option"][aria-selected="true"]');
        if ($selected.length) {
            $val.text($selected.text()).removeClass('c_gray8');
        } 
        else if ($(this).data('placeholder')) {
            $val.text($(this).data('placeholder')).addClass('c_gray8');
        }
        $(this).find('.options').attr('aria-hidden', 'true');
    });

    //select - 열기
    function openSelect($box, moveFocus = false) {
        if ($box.hasClass('dsb')) return;
        closeAllSelect();
        $box.addClass('open');
        const $btn = $box.find('.val');
        $btn.attr('aria-expanded', 'true');
        $box.find('.options').attr('aria-hidden', 'false');
        if (moveFocus) {
            const $selected = $box.find('[role="option"][aria-selected="true"]');
            const $target = $selected.length ? $selected : $box.find('[role="option"]').first();
            $target.focus();
        }
    }

    //select - toggle
    $(document).on('click', '.select_box .val', function(e){
        e.stopPropagation();
        const $selectBox = $(this).closest('.select_box');
        if ($selectBox.hasClass('dsb')) return;
        $selectBox.hasClass('open') ? closeAllSelect() : openSelect($selectBox);
    });

    //select - 옵션 선택 함수 (마우스)
    function selectOption($option) {
        const $selectBox = $option.closest('.select_box');
        const $selectVal = $selectBox.find('.val');
        $selectBox.find('[role="option"]').attr('aria-selected', 'false').attr('tabindex', -1);
        $option.attr('aria-selected', 'true').attr('tabindex', 0);
        $selectVal.text($option.text()).removeClass('c_gray8');
        $selectBox.trigger('option:selected', [$option.text(), $option]);
        closeAllSelect();
        $selectVal.focus();
    }

    //select - 옵션 선택 (마우스)
    $(document).on('click', '.select_box .options > li[role="option"]', function(e){
        e.stopPropagation();
        selectOption($(this));
    });

    //select - 버튼 키보드 제어
    $(document).on('keydown', '.select_box .val', function(e){
        const $selectBox = $(this).closest('.select_box');
        switch (e.key) {
            case 'Tab':
                closeAllSelect();
            break;
            case 'ArrowDown':
            case 'Enter':
            case ' ':
                e.preventDefault();
                openSelect($selectBox, true);
            break;
            case 'Escape':
                closeAllSelect();
            break;
        }
    });

    //select - 옵션 키보드 제어
    $(document).on('keydown', '.select_box .options > li[role="option"]', function(e){
        const $options = $(this).closest('.select_box').find('[role="option"]');
        let index = $options.index(this);
        switch (e.key) {
            case 'Tab':
                closeAllSelect();
            break;
            case 'ArrowDown':
                e.preventDefault();
                index = (index + 1) % $options.length;
                $options.eq(index).focus();
            break;
            case 'ArrowUp':
                e.preventDefault();
                index = (index - 1 + $options.length) % $options.length;
                $options.eq(index).focus();
            break;
            case 'Enter':
            case ' ':
                e.preventDefault();
                selectOption($(this));
            break;
            case 'Escape':
                e.preventDefault();
                closeAllSelect();
                $(this).closest('.select_box').find('.val').focus();
            break;
        }
    });

    //table - all check 
    $(document).on('change', '.tb_chk input[type="checkbox"]', function () {
        if ($(this).closest('.tb_chk').hasClass('all_chk')) {
            $('tbody .tb_chk input[type="checkbox"]').prop('checked', $(this).prop('checked'));
        } else {
            $('.all_chk input[type="checkbox"]')
            .prop(
                'checked',
                $('tbody .tb_chk input[type="checkbox"]').length ===
                $('tbody .tb_chk input[type="checkbox"]:checked').length
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

        //select - 닫기
        closeAllSelect();
    });
});