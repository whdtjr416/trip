document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault(); // 폼 제출 막기

    // 폼 데이터 수집
    const formData = new FormData(this);

    // AJAX 요청으로 데이터 전송
    fetch('/contact', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        console.log('Response status:', response.status); // 상태 코드 로그 추가
        if (response.ok || response.redirected) { // 리다이렉트 또는 성공 상태 코드 확인
            return "success";
        } else {
            return response.text();
        }
    })
    .then(result => {
        if (result === 'success') {
            // 폼 숨기기 및 성공 메시지 표시
            document.getElementById('contactForm').style.display = 'none';
            document.getElementById('contact-success').style.display = 'block';
        } else {
            alert('문의 접수 중 오류가 발생했습니다. 다시 시도해주세요. (응답: ' + result + ')');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('문의 접수 중 오류가 발생했습니다. 다시 시도해주세요.');
    });
});

document.getElementById('confirmBtn').addEventListener('click', function() {
    window.location.reload(); // 새로고침
});

