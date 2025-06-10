document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.querySelector('.login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const username = loginForm.querySelector('input[name="username"]').value.trim();
            const password = loginForm.querySelector('input[name="password"]').value.trim();
            
            // 입력값 유효성 검사
            if (!username || !password) {
                alert('아이디와 비밀번호를 모두 입력해주세요.');
                return;
            }
            
            // 서버로 보낼 데이터
            const data = {
                username: username,
                password: password
            };
            
            // AJAX 요청 (fetch API 사용)
            fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: new URLSearchParams(data)
            })
            .then(response => {
                if (response.redirected) {
                    window.location.href = response.url; // 서버에서 리다이렉트 처리
                } else {
                    return response.text();
                }
            })
            .then(error => {
                if (error) {
                    alert(error || '로그인에 실패했습니다. 아이디 또는 비밀번호를 확인해주세요.');
                }
            })
            .catch(err => {
                alert('서버 오류가 발생했습니다. 나중에 다시 시도해주세요.');
                console.error('Error:', err);
            });
        });
    }
});
