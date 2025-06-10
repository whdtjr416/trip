document.addEventListener('DOMContentLoaded', function() {
    const signupForm = document.querySelector('form[action="/signup"]');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const emailIdInput = document.getElementById('emailId');
    const emailDomainInput = document.getElementById('emailDomain');
    const birthdateInput = document.getElementById('birthdate');
    const usernameCheckMessage = document.getElementById('usernameCheckMessage');
    const passwordMatchMessage = document.getElementById('passwordMatchMessage');
    const usernameCheckedInput = document.getElementById('usernameChecked');

    // 아이디 중복 확인 함수
    window.checkUsername = function() {
        const username = usernameInput.value.trim();
        if (!username) {
            usernameCheckMessage.textContent = '아이디를 입력해주세요.';
            usernameCheckMessage.style.color = 'red';
            return;
        }

        fetch(`/checkUsername?username=${encodeURIComponent(username)}`)
        .then(response => response.text())
        .then(result => {
            usernameCheckMessage.textContent = result;
            if (result === '사용 가능한 아이디입니다.') {
                usernameCheckMessage.style.color = 'green';
                usernameCheckedInput.value = 'true';
            } else {
                usernameCheckMessage.style.color = 'red';
                usernameCheckedInput.value = 'false';
            }
        })
        .catch(err => {
            usernameCheckMessage.textContent = '중복 확인 중 오류가 발생했습니다.';
            usernameCheckMessage.style.color = 'red';
            console.error('Error:', err);
        });
    };

    // 이메일 도메인 선택 함수
    window.updateEmailDomain = function(selectElement) {
        const selectedValue = selectElement.value;
        if (selectedValue === 'custom') {
            emailDomainInput.value = '';
            emailDomainInput.readOnly = false;
            emailDomainInput.focus();
        } else {
            emailDomainInput.value = selectedValue;
            emailDomainInput.readOnly = true;
        }
    };

    // 비밀번호 일치 여부 실시간 확인
    if (confirmPasswordInput) {
        confirmPasswordInput.addEventListener('input', function() {
            const password = passwordInput.value;
            const confirmPassword = confirmPasswordInput.value;
            if (password === confirmPassword && password !== '') {
                passwordMatchMessage.textContent = '비밀번호가 일치합니다.';
                passwordMatchMessage.style.color = 'green';
            } else if (confirmPassword !== '') {
                passwordMatchMessage.textContent = '비밀번호가 일치하지 않습니다.';
                passwordMatchMessage.style.color = 'red';
            } else {
                passwordMatchMessage.textContent = '';
            }
        });
    }

    // 회원가입 폼 제출 처리
    if (signupForm) {
        signupForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const username = usernameInput.value.trim();
            const password = passwordInput.value.trim();
            const confirmPassword = confirmPasswordInput.value.trim();
            const emailId = emailIdInput.value.trim();
            const emailDomain = emailDomainInput.value.trim();
            const birthdate = birthdateInput.value.trim();

            // 유효성 검사
            if (!username || !password || !confirmPassword || !emailId || !emailDomain || !birthdate) {
                alert('모든 필드를 입력해주세요.');
                return;
            }

            if (password !== confirmPassword) {
                alert('비밀번호가 일치하지 않습니다.');
                return;
            }

            if (usernameCheckedInput.value !== 'true') {
                alert('아이디 중복 확인을 완료해주세요.');
                return;
            }

            // 서버로 보낼 데이터
            const data = {
                username: username,
                password: password,
                confirmPassword: confirmPassword,
                emailId: emailId,
                emailDomain: emailDomain,
                birthdate: birthdate
            };

            // AJAX 요청 (fetch API 사용)
            fetch('/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: new URLSearchParams(data)
            })
            .then(response => response.json())
            .then(result => {
                if (result.success) {
                    alert(result.message || '회원가입이 완료되었습니다.');
                    window.location.href = '/login';
                } else {
                    alert(result.error || '회원가입에 실패했습니다. 입력 정보를 확인해주세요.');
                }
            })
            .catch(err => {
                alert('서버 오류가 발생했습니다. 나중에 다시 시도해주세요.');
                console.error('Error:', err);
            });
        });
    }
});
