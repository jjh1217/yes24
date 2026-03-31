//popup - 열기
    $(document).on('click', '.popup_open', function(){
        const dataType = $(this).data('type');
        let popupTit = '';

        switch(dataType){
            case 'client':
                popupTit = '고객사';
            break;
            case 'sales':
                popupTit = '영업처';
            break;
        }

        let popupHtml = `<div class="popup_wrap">
                            <section class="popup_box">
                                <div class="popup_tit">
                                    <h2>${popupTit} 검색</h2>
                                    <button type="button" class="popup_close"></button>
                                </div>
                                <div class="popup_content">
                                    <form action="#">
                                        <fieldset class="form_field">
                                            <legend>${popupTit} 검색</legend>
                                            <div class="form_row p_0">
                                                <div class="form_item w_auto fx_full">
                                                    <input type="text" placeholder="${popupTit}명을 입력하세요.">
                                                </div>
                                                <button type="button" class="btn fill_dark">검색</button>
                                            </div>
                                        </fieldset>
                                    </form>
                                    <div class="table_box no_hover ">
                                        <table class="wn_auto">
                                            <caption>${popupTit} 목록</caption>
                                            <colgroup>
                                                <col class="w_80">
                                                <col>
                                                <col>
                                                <col class="w_100">
                                            </colgroup>
                                            <thead>
                                                <tr>
                                                    <th>NO.</th>
                                                    <th>${popupTit} 구분</th>
                                                    <th>${popupTit}명</th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>10</td>
                                                    <td>총판</td>
                                                    <td>성균관대학교</td>
                                                    <td><button type="button" class="btn fill_blue sm">선택</button></td>
                                                </tr>
                                                <tr>
                                                    <td>9</td>
                                                    <td>대리점</td>
                                                    <td>고양이미디어</td>
                                                    <td><button type="button" class="btn fill_blue sm">선택</button></td>
                                                </tr>
                                                <tr>
                                                    <td>8</td>
                                                    <td>총판</td>
                                                    <td>영업처</td>
                                                    <td><button type="button" class="btn fill_blue sm">선택</button></td>
                                                </tr>
                                                <tr>
                                                    <td>7</td>
                                                    <td>대리점</td>
                                                    <td>그린벨트미디어</td>
                                                    <td><button type="button" class="btn fill_blue sm">선택</button></td>
                                                </tr>
                                                <tr>
                                                    <td>6</td>
                                                    <td>본사</td>
                                                    <td>블루콘텐츠</td>
                                                    <td><button type="button" class="btn fill_blue sm">선택</button></td>
                                                </tr>
                                                <tr>
                                                    <td>5</td>
                                                    <td>총판</td>
                                                    <td>고려대학교</td>
                                                    <td><button type="button" class="btn fill_blue sm">선택</button></td>
                                                </tr>
                                                <tr>
                                                    <td>4</td>
                                                    <td>대리점점</td>
                                                    <td>하늘미디어</td>
                                                    <td><button type="button" class="btn fill_blue sm">선택</button></td>
                                                </tr>
                                                <tr>
                                                    <td>3</td>
                                                    <td>본사</td>
                                                    <td>서울대학교</td>
                                                    <td><button type="button" class="btn fill_blue sm">선택</button></td>
                                                </tr>
                                                <tr>
                                                    <td>2</td>
                                                    <td>본사</td>
                                                    <td>오로라스튜디오</td>
                                                    <td><button type="button" class="btn fill_blue sm">선택</button></td>
                                                </tr>
                                                <tr>
                                                    <td>1</td>
                                                    <td>대리점점</td>
                                                    <td>국민대학교</td>
                                                    <td><button type="button" class="btn fill_blue sm">선택</button></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <ol class="page_box jc_center pb_0">
                                        <li class="item"><a href="#" class="arrow prev">이전</a></li>
                                        <li class="item"><a href="#" class="active">1</a></li>
                                        <li class="item"><a href="#">2</a></li>
                                        <li class="item"><a href="#">3</a></li>
                                        <li class="item"><a href="#">4</a></li>
                                        <li class="item"><a href="#">5</a></li>
                                        <li class="item"><a href="#">6</a></li>
                                        <li class="item"><a href="#">7</a></li>
                                        <li class="item"><a href="#">8</a></li>
                                        <li class="item"><a href="#">9</a></li>
                                        <li class="item"><a href="#">10</a></li>
                                        <li class="item"><a href="#" class="arrow next">다음</a></li>
                                    </ol>
                                </div>
                            </section>
                        </div>`
        $('body').append(popupHtml);
        $('.popup_wrap').fadeIn(200);
    });

    //popup - 닫기
    $(document).on('click', '.popup_close, .popup_wrap table td .btn.sm', function(){
        $(this).closest('.popup_wrap').fadeOut(200, function(){
            $(this).closest('.popup_wrap').remove();
        });
    });