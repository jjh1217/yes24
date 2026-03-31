$(function(){
    //confirm - 열기
    $(document).on('click', '.confirm_open', function(){
        const dataType = $(this).data('type');
        let confirmTxt = '';
        let confirmBtn = '';
        let addTemplates = '';

        const btnTemplates = {
            okMove: `<button type="button" class="btn fill_gray confirm_close">취소</button>
                        <a href="javascript:history.back()" class="btn fill_blue">확인</a>`,
            okClose: `<button type="button" class="btn fill_gray confirm_close">취소</button>
                        <button type="button" class="btn fill_blue confirm_close">확인</button>`,                    
            okOnly: `<button type="button" class="btn fill_blue confirm_close">확인</button>`,
            loginMove: `<a href="../../account_login.html" class="btn fill_blue">확인</a>`
        };
        
        switch(dataType){
            case 'logout':
                confirmTxt = '로그아웃 하시겠습니까?<br>확인 버튼을 누르시면 로그인 페이지로 이동합니다.';
                confirmBtn = `<button type="button" class="btn fill_gray confirm_close">취소</button>
                            <a href="../../account_login.html" class="btn fill_blue">확인</a>`;
            break;
            case 'cancel':
                confirmTxt = '작업을 <span class="t_md c_red">취소</span>하시겠습니까?<br>취소하면 이전 페이지로 이동합니다.';
                confirmBtn = btnTemplates.okMove;
            break;
            case 'insert':
                confirmTxt = '<span class="t_md c_primary">등록</span>하시겠습니까?<br>등록 후에도 수정 작업이 가능합니다.';
                confirmBtn = btnTemplates.okMove;
            break;
            case 'update':
                confirmTxt = '<span class="t_md c_primary">수정</span>하시겠습니까?<br>수정 내용은 즉시 반영됩니다.';
                confirmBtn = btnTemplates.okMove;
            break;
            case 'delete':
                confirmTxt = '정말 <span class="t_md c_red">삭제</span>하시겠습니까?<br>삭제된 데이터는 복구할 수 없습니다.';
                confirmBtn = btnTemplates.okMove;
            break;
            case 'excel':
                confirmTxt = '개인정보가 포함된 액셀 다운로드입니다.<br>다운로드 목적을 선택해 주세요.';
                confirmBtn = btnTemplates.okClose;
                addTemplates = `<div class="select_box w_280 m_auto mb_30">
                                    <button type="button" class="val" aria-haspopup="listbox" aria-expanded="false" aria-label="엑셀 다운로드 목적 선택">01. 마케팅 활용</button>
                                    <ul class="options" role="listbox">
                                        <li role="option" aria-selected="true" tabindex="0">01. 마케팅 활용</li>
                                        <li role="option" aria-selected="false" tabindex="-1">02. 제3자 제공</li>
                                        <li role="option" aria-selected="false" tabindex="-1">02. 사용현황조회</li>
                                        <li role="option" aria-selected="false" tabindex="-1">03. 보안점검</li>
                                        <li role="option" aria-selected="false" tabindex="-1">99. 기타</li>
                                    </ul>
                                </div>`;
            break;
            case 'authNum_get':
                confirmTxt = '입력하신 이메일로 인증번호를 발송 하였습니다.<br>메일에서 확인 후 인증번호를 입력해주세요.';
                confirmBtn = btnTemplates.okOnly;
            break;
            case 'authNum_chk':
                confirmTxt = '인증번호가 확인 되었습니다.';
                confirmBtn = btnTemplates.okOnly;
            break;
            case 'pwFind':
                confirmTxt = '인증된 이메일로 비밀번호를 발송 하였습니다.<br>메일에서 확인 후 로그인해주세요.';
                confirmBtn = btnTemplates.loginMove;
            break;
            case 'pwChange':
                confirmTxt = '비밀번호가 변경 되었습니다.<br>변경된 비밀번호로 로그인해주세요.';
                confirmBtn = btnTemplates.loginMove;
            break;
            case 'selfAuth':
                confirmTxt = '본인 인증이 확인 되어 휴면 계정이 해지 되었습니다.<br>다시 로그인해주세요.';
                confirmBtn = btnTemplates.loginMove;
            break;
            case 'pdfDownload':
                confirmTxt = 'PDF 다운로드를 진행 하시겠습니까?<br>데이터에 따라 시간이 소요될 수 있습니다.';
                confirmBtn = btnTemplates.okClose;
            break;
        }

        let confirmHtml = `<div class="confirm_wrap">
                                <section class="confirm_box">
                                    <p class="confirm_txt">${confirmTxt}</p>
                                    ${addTemplates}
                                    <div class="btn_box">${confirmBtn}</div>
                                </section>
                            </div>`
        $('body').append(confirmHtml);
        $('.confirm_wrap').fadeIn(200);
    });

    //confirm - 닫기
    $(document).on('click', '.confirm_close', function(){
        $(this).closest('.confirm_wrap').fadeOut(200, function(){
            $(this).closest('.confirm_wrap').remove();
        });
    });
});