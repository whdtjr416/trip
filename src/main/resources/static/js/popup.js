document.addEventListener('DOMContentLoaded', function() {
    // 로컬 스토리지에서 팝업 숨김 정보 초기화 (스프링부트 재시작 시 팝업이 항상 표시되도록)
    localStorage.removeItem('popupHiddenUntil');

    // 팝업 HTML을 동적으로 생성
    const popupContainer = document.createElement('div');
    popupContainer.id = 'popupOverlay';
    popupContainer.className = 'popup-overlay';
    popupContainer.innerHTML = `
        <div id="popup" class="popup">
            <button id="closePopupX" class="popup-close-x" aria-label="팝업 닫기">✕</button>
            <h2>단단투어 특별 이벤트!</h2>
            <div class="event-badge">한정 기간 특가</div>
            <p class="main-offer">지금 예약 시 <span class="highlight">동남아 여행 10% 추가 할인</span> 혜택!</p>
            <div class="offer-details">
                <p>🎉 태국, 베트남, 발리 인기 여행지 대상</p>
                <p>⏰ 이벤트 기간: ~2025.06.30까지</p>
                <p>💎 5명 이상 단체 예약 시 추가 혜택 제공!</p>
            </div>
            <a href="#contact" class="cta-button" id="ctaButton">지금 상담 예약하기</a>
            <div class="popup-actions">
                <label for="dontShowAgain">
                    <input type="checkbox" id="dontShowAgain" name="dontShowAgain">
                    24시간 동안 보지 않기
                </label>
                <button id="closePopup" class="close-btn">닫기</button>
            </div>
        </div>
    `;
    document.body.appendChild(popupContainer);

    // 팝업 관련 요소 가져오기
    const popupOverlay = document.getElementById('popupOverlay');
    const closePopupBtn = document.getElementById('closePopup');
    const closePopupXBtn = document.getElementById('closePopupX');
    const dontShowAgainCheckbox = document.getElementById('dontShowAgain');
    const ctaButton = document.getElementById('ctaButton');

    // 요소가 존재하지 않으면 실행 중지
    if (!popupOverlay || !closePopupBtn || !closePopupXBtn || !dontShowAgainCheckbox || !ctaButton) {
        console.error('팝업 요소를 찾을 수 없습니다.');
        return;
    }

    // 팝업 닫기 함수
    function closePopup() {
        popupOverlay.style.display = 'none';
        popupOverlay.remove(); // DOM에서 완전히 제거

        // "24시간 동안 보지 않기" 체크박스가 선택되어 있으면 로컬 스토리지에 저장
        if (dontShowAgainCheckbox.checked) {
            const currentTime = new Date().getTime();
            const hideUntil = currentTime + (24 * 60 * 60 * 1000); // 24시간 후 시간(밀리초)
            localStorage.setItem('popupHiddenUntil', hideUntil.toString());
        }
    }

    // 닫기 버튼 및 X 버튼 클릭 이벤트 리스너 추가
    closePopupBtn.addEventListener('click', closePopup);
    closePopupXBtn.addEventListener('click', closePopup);

    // 오버레이 클릭 시 팝업 닫기 (팝업 외부 클릭 시 닫힘)
    popupOverlay.addEventListener('click', function(event) {
        if (event.target === popupOverlay) {
            closePopup();
        }
    });

    // CTA 버튼 클릭 시 팝업 닫고 상담 섹션으로 스크롤 이동
    ctaButton.addEventListener('click', function(event) {
        event.preventDefault();
        closePopup();
        document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
    });

    // 팝업 표시
    popupOverlay.style.display = 'block';
});
