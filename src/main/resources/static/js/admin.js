document.addEventListener('DOMContentLoaded', function() {
    // 모든 확인 버튼에 이벤트 리스너 추가
    const confirmButtons = document.querySelectorAll('.confirm-btn');
    confirmButtons.forEach(button => {
        button.addEventListener('click', function() {
            const row = button.closest('tr');
            const statusCell = row.querySelector('.status');
            const inquiryId = row.getAttribute('data-id');
            let completedInquiries = JSON.parse(localStorage.getItem('completedInquiries') || '[]');

            if (statusCell.textContent === '미확인') {
                // 상태를 "완료"로 변경
                statusCell.textContent = '완료';
                statusCell.style.color = 'green';
                statusCell.style.fontWeight = 'bold';
                button.textContent = '되돌리기';
                button.style.backgroundColor = '#f0ad4e';
                button.style.cursor = 'pointer';

                // 로컬 스토리지에 추가
                if (!completedInquiries.includes(inquiryId)) {
                    completedInquiries.push(inquiryId);
                    localStorage.setItem('completedInquiries', JSON.stringify(completedInquiries));
                }
            } else {
                // 상태를 "미확인"으로 되돌리기
                statusCell.textContent = '미확인';
                statusCell.style.color = '';
                statusCell.style.fontWeight = '';
                button.textContent = '확인';
                button.style.backgroundColor = '';
                button.style.cursor = 'pointer';

                // 로컬 스토리지에서 제거
                completedInquiries = completedInquiries.filter(id => id !== inquiryId);
                localStorage.setItem('completedInquiries', JSON.stringify(completedInquiries));
            }
        });
    });

    // 페이지 로드 시 로컬 스토리지에서 완료된 문의 상태 복원
    const completedInquiries = JSON.parse(localStorage.getItem('completedInquiries') || '[]');
    const rows = document.querySelectorAll('#inquiryTable tbody tr[data-id]');
    rows.forEach(row => {
        const inquiryId = row.getAttribute('data-id');
        const statusCell = row.querySelector('.status');
        const button = row.querySelector('.confirm-btn');

        if (completedInquiries.includes(inquiryId)) {
            statusCell.textContent = '완료';
            statusCell.style.color = 'green';
            statusCell.style.fontWeight = 'bold';
            button.textContent = '되돌리기';
            button.style.backgroundColor = '#f0ad4e';
            button.style.cursor = 'pointer';
        } else {
            statusCell.textContent = '미확인';
            statusCell.style.color = '';
            statusCell.style.fontWeight = '';
            button.textContent = '확인';
            button.style.backgroundColor = '';
            button.style.cursor = 'pointer';
        }
    });
});
