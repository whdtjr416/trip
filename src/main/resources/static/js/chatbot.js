// 챗봇 아이콘 클릭 시 대화창 열기/닫기
document.getElementById('chatbot-icon').addEventListener('click', function() {
    const chatbotWindow = document.getElementById('chatbot-window');
    chatbotWindow.style.display = chatbotWindow.style.display === 'none' ? 'flex' : 'none';
});

document.getElementById('close-chatbot').addEventListener('click', function() {
    document.getElementById('chatbot-window').style.display = 'none';
});

// 메시지 전송 기능
document.getElementById('send-message').addEventListener('click', sendMessage);
document.getElementById('user-input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') sendMessage();
});

function sendMessage() {
    const input = document.getElementById('user-input');
    const messages = document.getElementById('chatbot-messages');
    const userText = input.value.trim();

    if (userText === '') return;

    // 사용자 메시지 추가
    const userMessage = document.createElement('div');
    userMessage.className = 'message user';
    userMessage.textContent = userText;
    messages.appendChild(userMessage);

    // 봇 응답 생성
    const botMessage = document.createElement('div');
    botMessage.className = 'message bot';
    botMessage.textContent = getBotResponse(userText);
    messages.appendChild(botMessage);

    // 입력창 초기화 및 스크롤 최하단으로 이동
    input.value = '';
    messages.scrollTop = messages.scrollHeight;
}

// 간단한 규칙 기반 봇 응답 로직
function getBotResponse(userInput) {
    userInput = userInput.toLowerCase();
	
	// 날씨 관련 질문인지 확인하고 처리
	    if (userInput.includes('날씨') || userInput.includes('weather') || userInput.includes('기온') || userInput.includes('습도') || userInput.includes('비') || userInput.includes('맑음') || userInput.includes('흐림')) {
	        return '날씨 정보는 상세 페이지에서 확인해 주세요. 더 구체적인 지역의 날씨 정보를 원하시면 해당 지역 상세 페이지로 이동하시거나, 고객센터에 문의 부탁드립니다. 다른 여행 관련 질문이 있으시면 언제든 말씀해주세요!';
	    }

    
    // 다중 키워드 처리를 위해 응답 우선순위 설정
    // 1. 구체적인 지역 키워드 우선 처리
	if (userInput.includes('방콕')) {
	    return '방콕 여행을 계획 중이시군요! 왓 포 사원, 카오산 거리, 짐 톰슨 하우스를 추천드립니다. 사원 투어나 수상 시장 체험이 궁금하시면 말씀해주세요! 어떤 여행 스타일(허니문, 가족 여행 등)을 원하시나요?';
	} else if (userInput.includes('파타야')) {
	    return '파타야 여행을 계획 중이시군요! 해변에서의 휴양, 워킹 스트리트, 산호섬 투어를 추천드립니다. 해양 스포츠나 밤문화를 즐기고 싶으신가요? 가족 여행인지, 친구들과의 여행인지 알려주시면 더 맞춤 추천 드릴게요!';
	} else if (userInput.includes('치앙마이') || userInput.includes('치앙라이')) {
	    return '치앙마이와 치앙라이 지역은 자연과 전통 문화로 유명합니다. 도이 수텝 사원, 엘리펀트 생추어리 체험, 골든 트라이앵글 투어를 추천드려요. 어떤 활동에 관심이 있으신가요? 힐링 여행을 원하시나요, 아니면 액티비티를 즐기고 싶으신가요?';
	} else if (userInput.includes('푸켓') || userInput.includes('크라비') || userInput.includes('피피섬')) {
	    return '푸켓과 크라비는 아름다운 섬과 해변으로 유명합니다. 피피섬 투어, 스노클링, 럭셔리 리조트를 추천드립니다. 해변 휴양을 원하시나요, 아니면 액티비티를 즐기고 싶으신가요? 허니문이나 가족 여행이신가요?';
	} else if (userInput.includes('태국')) {
	    return '태국 여행을 계획 중이시군요! 방콕, 파타야, 푸켓, 치앙마이 등 매력적인 도시가 많습니다. 어느 지역에 가고 싶으신가요? 여행 스타일(허니문, 배낭여행, 가족 여행 등)이나 관심사를 말씀해 주세요!';
	}
	// 베트남 관련 세부 지역
	else if (userInput.includes('다낭') || userInput.includes('호이안')) {
	    return '다낭과 호이안은 멋진 해변과 전통 마을로 유명합니다. 미케 비치, 바나힐, 호이안 야경 투어를 추천드려요. 휴양과 문화를 동시에 즐기고 싶으신가요? 어떤 동반자와 함께 가시나요(연인, 가족, 친구 등)?';
	} else if (userInput.includes('하노이') || userInput.includes('할롱베이')) {
	    return '하노이와 할롱베이는 베트남의 역사와 자연을 느낄 수 있는 곳입니다. 호안끼엠 호수, 할롱베이 크루즈 투어를 추천드립니다. 문화 탐방이나 자연 경관에 더 관심이 있으신가요? 여행 기간이나 스타일을 알려주시면 더 도와드릴게요!';
	} else if (userInput.includes('호치민') || userInput.includes('달랏') || userInput.includes('메콩')) {
	    return '호치민과 달랏은 도시의 활기와 고원의 여유를 느낄 수 있는 곳입니다. 벤탄 시장, 쿠치 터널, 달랏 꽃밭을 추천드립니다. 도시 탐방과 자연 중 어떤 스타일을 원하시나요? 가족 여행인지, 개인 여행인지 알려주세요!';
	} else if (userInput.includes('베트남')) {
	    return '베트남 여행을 계획 중이시군요! 다낭, 하노이, 호치민, 호이안 등 다양한 매력을 가진 도시가 있습니다. 어느 지역에 관심이 있으신가요? 원하시는 여행 스타일(허니문, 가족 여행, 배낭여행 등)을 알려주세요!';
	}
	// 인도네시아 관련 세부 지역
	else if (userInput.includes('발리') || userInput.includes('우붓')) {
	    return '발리와 우붓은 휴양과 문화 체험을 동시에 즐길 수 있는 곳입니다. 울루와투 사원, 풀빌라 스파, 우붓 몽키 포레스트를 추천드립니다. 허니문이나 힐링 여행이신가요? 어떤 분위기의 숙소를 원하시나요?';
	} else if (userInput.includes('자카르타') || userInput.includes('족자카르타') || userInput.includes('보로부두르') || userInput.includes('프람바난')) {
	    return '자카르타와 족자카르타는 인도네시아의 역사와 문화를 느낄 수 있는 도시입니다. 보로부두르 사원, 프람바난 사원 투어를 추천드립니다. 역사 탐방에 관심이 많으신가요? 함께 가시는 분들은 누구신가요?';
	} else if (userInput.includes('롬복') || userInput.includes('길리')) {
	    return '롬복과 길리 섬은 발리 근처의 숨은 보석 같은 곳입니다. 맑은 바다에서의 스노클링, 길리 섬 해변에서의 휴식을 추천드립니다. 조용한 휴양을 원하시나요? 여행 동반자가 있다면 알려주세요!';
	} else if (userInput.includes('인도네시아')) {
	    return '인도네시아 여행을 계획 중이시군요! 발리, 자카르타, 족자카르타, 롬복 등 다양한 매력을 가진 곳이 많습니다. 어느 지역으로 가고 싶으신가요? 관심사나 여행 스타일(허니문, 가족 여행 등)을 말씀해 주세요!';
	}
	// 말레이시아 관련 세부 지역
	else if (userInput.includes('쿠알라룸푸르') || userInput.includes('페낭') || userInput.includes('조호바루')) {
	    return '말레이시아의 쿠알라룸푸르와 페낭은 도시 탐방과 음식으로 유명합니다. 페트로나스 트윈 타워, 페낭 스트리트 푸드, 조호바루 레고랜드 투어를 추천드립니다. 어떤 스타일의 여행을 원하시나요? 가족 여행인지, 친구들과의 여행인지 알려주세요!';
	} else if (userInput.includes('말레이시아')) {
	    return '말레이시아 여행을 계획 중이시군요! 쿠알라룸푸르, 페낭, 조호바루 등 다양한 매력이 있습니다. 어느 지역에 관심이 있으신가요? 도시 탐방, 음식, 가족 여행 중 어떤 것을 원하시나요? 함께 가시는 분들이 있다면 알려주세요!';
	}
	// 필리핀 관련 세부 지역
	else if (userInput.includes('세부') || userInput.includes('보라카이') || userInput.includes('팔라완') || userInput.includes('엘니도')) {
	    return '필리핀의 세부, 보라카이, 팔라완은 아름다운 해변과 섬 투어로 유명합니다. 스노클링, 다이빙, 해변 휴양을 추천드립니다. 어느 섬에 더 관심이 있으신가요? 허니문인지, 가족 여행인지 알려주시면 더 맞춤 추천 드릴게요!';
	} else if (userInput.includes('마닐라')) {
	    return '마닐라 여행을 계획 중이시군요! 인트라무로스, 리잘 공원, 현대적인 쇼핑몰을 추천드립니다. 도시 탐방과 역사 체험에 관심이 있으신가요? 어떤 동반자와 함께 가시나요?';
	} else if (userInput.includes('필리핀')) {
	    return '필리핀 여행을 계획 중이시군요! 세부, 보라카이, 팔라완, 마닐라 등 아름다운 섬과 도시가 많습니다. 어느 지역에 가고 싶으신가요? 해변 휴양이나 도시 탐방 중 어떤 스타일을 원하시나요? 여행 동반자가 있다면 알려주세요!';
	}
	// 싱가포르 관련
	else if (userInput.includes('싱가포르') || userInput.includes('마리나베이') || userInput.includes('센토사')) {
	    return '싱가포르 여행을 계획 중이시군요! 마리나 베이 샌즈, 가든스 바이 더 베이, 센토사 섬을 추천드립니다. 도시 탐방, 쇼핑, 가족 여행 중 어떤 스타일을 원하시나요? 함께 가시는 분들이 있다면 알려주세요!';
	}
	// 캄보디아 관련
	else if (userInput.includes('캄보디아') || userInput.includes('씨엠립') || userInput.includes('앙코르와트') || userInput.includes('프놈펜')) {
	    return '캄보디아 여행을 계획 중이시군요! 씨엠립의 앙코르와트와 프놈펜의 왕궁은 역사적인 명소로 유명합니다. 역사 탐방 외에 다른 관심사가 있으시면 말씀해주세요! 어떤 여행 스타일을 원하시나요?';
	}
	// 라오스 관련
	else if (userInput.includes('라오스') || userInput.includes('비엔티안') || userInput.includes('루앙프라방') || userInput.includes('방비엥')) {
	    return '라오스 여행을 계획 중이시군요! 비엔티안, 루앙프라방, 방비엥은 평화로운 분위기와 자연으로 유명합니다. 왓 시사켓, 탁발 의식, 카약 체험을 추천드립니다. 조용한 힐링 여행을 원하시나요? 함께 가시는 분들이 있다면 알려주세요!';
	}
	// 미얀마 관련
	else if (userInput.includes('미얀마') || userInput.includes('양곤') || userInput.includes('바간') || userInput.includes('만달레이')) {
	    return '미얀마 여행을 계획 중이시군요! 양곤의 쉐다곤 파고다, 바간의 고대 사원, 만달레이의 왕궁을 추천드립니다. 역사와 종교 문화에 관심이 많으신가요? 어떤 스타일의 여행을 계획 중이신가요?';
	}
	// 브루나이 관련
	else if (userInput.includes('브루나이') || userInput.includes('반다르스리브가완')) {
	    return '브루나이 여행을 계획 중이시군요! 오마르 알리 사이푸디엔 모스크와 캄퐁 아이르 수상 마을을 추천드립니다. 럭셔리 여행이나 이슬람 문화 체험에 관심이 있으신가요? 허니문인지, 다른 스타일인지 알려주세요!';
	}
	// 동티모르 관련
	else if (userInput.includes('동티모르') || userInput.includes('딜리')) {
	    return '동티모르 여행을 계획 중이시군요! 딜리의 크리스토 레이 동상과 아타우로 섬에서의 다이빙을 추천드립니다. 자연과 역사 중 어떤 것에 더 관심이 있으신가요? 함께 가시는 분들이 있다면 알려주세요!';
	}
	// 일반 동남아 여행 관련 키워드
	else if (userInput.includes('동남아') || userInput.includes('동남아시아') || userInput.includes('아세안')) {
	    return '동남아 여행을 계획 중이시군요! 태국, 베트남, 인도네시아, 필리핀, 말레이시아 등 매력적인 나라가 많습니다. 어느 나라나 지역에 관심이 있으신가요? 여행 스타일(허니문, 가족 여행, 배낭여행 등)을 말씀해 주세요!';
	}
	// 기타 주제별 키워드 (지역 외 주제)
	else if (userInput.includes('문의') || userInput.includes('예약') || userInput.includes('상담') || userInput.includes('연락') || userInput.includes('문의사항') || userInput.includes('고객센터') || userInput.includes('전화') || userInput.includes('컨택')) {
	    return '상담 및 예약 문의는 아래 폼을 작성해 주시거나, 고객센터(전화번호: 123-456-7890)로 연락 부탁드립니다. 어떤 상품이나 지역에 대해 문의하시나요?';
	} else if (userInput.includes('안녕') || userInput.includes('하이') || userInput.includes('hello') || userInput.includes('반갑') || userInput.includes('hi') || userInput.includes('좋은') || userInput.includes('인사')) {
	    return '안녕하세요! 단단투어 AI 비서입니다. 동남아 여행에 대해 궁금한 점이 있으시면 언제든 물어보세요! 방콕, 다낭, 발리 등 인기 여행지부터 비용, 일정까지 도와드릴게요!';
	} else if (userInput.includes('여행지') || userInput.includes('추천') || userInput.includes('어디') || userInput.includes('가볼만한') || userInput.includes('좋은곳') || userInput.includes('명소') || userInput.includes('관광지') || userInput.includes('핫플')) {
	    return '동남아 여행지로는 태국의 방콕과 푸켓, 베트남의 다낭, 인도네시아의 발리, 필리핀의 세부를 추천드립니다. 가족 여행, 허니문, 배낭여행 등 원하시는 스타일에 맞춰 추천해 드릴게요. 어떤 여행을 계획 중이신가요?';
	} else if (userInput.includes('비용') || userInput.includes('가격') || userInput.includes('얼마') || userInput.includes('예산') || userInput.includes('비싸') || userInput.includes('저렴') || userInput.includes('경비') || userInput.includes('돈') || userInput.includes('요금')) {
	    return '여행 비용은 목적지, 기간, 숙소 등급에 따라 다릅니다. 예를 들어, 방콕 3박 4일은 약 100만 원~150만 원, 다낭은 120만 원~180만 원 수준입니다. 구체적인 목적지와 일정을 말씀해 주시면 정확한 견적을 안내드리겠습니다!';
	} else if (userInput.includes('코스') || userInput.includes('일정') || userInput.includes('계획') || userInput.includes('스케줄') || userInput.includes('루트') || userInput.includes('여정') || userInput.includes('플랜') || userInput.includes('일정표')) {
	    return '여행 코스는 목적지와 기간에 따라 다양하게 구성할 수 있습니다. 예를 들어, 방콕 3박 4일 코스는 사원 투어, 수상 시장 방문, 현지 음식 체험으로 짜여질 수 있습니다. 원하시는 목적지와 기간을 알려주시면 맞춤 일정을 제안드릴게요!';
	} else if (userInput.includes('음식') || userInput.includes('맛집') || userInput.includes('먹거리') || userInput.includes('현지음식') || userInput.includes('식당') || userInput.includes('요리') || userInput.includes('특산물') || userInput.includes('푸드')) {
	    return '동남아는 다양한 현지 음식으로 유명합니다! 태국의 팟타이와 똠얌꿍, 베트남의 쌀국수와 반미, 인도네시아의 나시고렝을 추천드립니다. 특정 지역의 맛집이나 음식 투어 정보를 원하시면 말씀해주세요!';
	} else if (userInput.includes('허니문') || userInput.includes('신혼여행') || userInput.includes('로맨틱') || userInput.includes('커플')) {
	    return '신혼여행이나 커플 여행을 계획 중이시군요! 로맨틱한 분위기의 발리 풀빌라, 푸켓의 럭셔리 리조트, 다낭의 해변 리조트를 추천드립니다. 어떤 지역에 관심이 있으신가요? 특별한 액티비티나 숙소 스타일을 원하시면 말씀해주세요!';
	} else if (userInput.includes('가족여행') || userInput.includes('아이') || userInput.includes('어린이') || userInput.includes('부모님') || userInput.includes('가족')) {
	    return '가족 여행을 계획 중이시군요! 싱가포르의 센토사 섬, 조호바루의 레고랜드, 세부의 가족 친화 리조트를 추천드립니다. 아이들이 있으시다면 어떤 연령대인지, 부모님과 함께라면 어떤 스타일을 원하시는지 알려주시면 더 맞춤 추천 드릴게요!';
	} else if (userInput.includes('배낭여행') || userInput.includes('백패킹') || userInput.includes('자유여행') || userInput.includes('혼자') || userInput.includes('솔로여행')) {
	    return '배낭여행이나 자유여행을 계획 중이시군요! 방콕의 카오산 거리, 치앙마이의 저렴한 게스트하우스, 베트남 호이안의 배낭여행자 거리를 추천드립니다. 혼자 여행하시는지, 아니면 친구들과 함께인지 알려주시면 더 도와드릴게요!';
	} else if (userInput.includes('힐링') || userInput.includes('휴양') || userInput.includes('휴식') || userInput.includes('조용한') || userInput.includes('여유')) {
	    return '힐링과 휴양 여행을 원하시나요? 발리의 우붓, 롬복의 길리 섬, 푸켓의 한적한 해변을 추천드립니다. 조용한 리조트나 자연 속에서의 휴식을 원하시나요? 원하시는 분위기를 더 말씀해 주시면 좋겠어요!';
	} else if (userInput.includes('럭셔리') || userInput.includes('고급') || userInput.includes('프리미엄') || userInput.includes('5성급') || userInput.includes('호텔')) {
	    return '럭셔리 여행을 계획 중이시군요! 싱가포르의 마리나 베이 샌즈, 발리의 고급 풀빌라, 푸켓의 5성급 리조트를 추천드립니다. 특별한 스파나 프라이빗 서비스를 원하시나요? 더 구체적인 희망 사항을 알려주세요!';
	} else if (userInput.includes('액티비티') || userInput.includes('모험') || userInput.includes('스포츠') || userInput.includes('다이빙') || userInput.includes('스노클링')) {
	    return '액티비티와 모험을 즐기는 여행을 원하시나요? 필리핀 팔라완의 다이빙, 파타야의 해양 스포츠, 치앙마이의 정글 트레킹을 추천드립니다. 어떤 종류의 액티비티에 관심이 있으신가요? 함께 가시는 분들이 있다면 알려주세요!';
	} else if (userInput.includes('문화') || userInput.includes('역사') || userInput.includes('전통') || userInput.includes('사원') || userInput.includes('유적')) {
	    return '문화와 역사 탐방 여행을 원하시나요? 캄보디아의 앙코르와트, 미얀마의 바간 사원, 족자카르타의 보로부두르를 추천드립니다. 특정 나라의 역사나 전통에 더 관심이 있으신가요? 궁금한 점을 더 말씀해 주세요!';
	} else if (userInput.includes('쇼핑') || userInput.includes('시장') || userInput.includes('면세점') || userInput.includes('쇼핑몰') || userInput.includes('기념품')) {
	    return '쇼핑을 즐기는 여행을 계획 중이시군요! 방콕의 짜뚜짝 시장, 싱가포르의 오차드 로드, 쿠알라룸푸르의 부킷 빈탕을 추천드립니다. 특정 물건이나 브랜드를 찾으시나요? 원하시는 쇼핑 스타일을 알려주세요!';
	} else if (userInput.includes('밤문화') || userInput.includes('클럽') || userInput.includes('바') || userInput.includes('파티') || userInput.includes('나이트라이프')) {
	    return '밤문화를 즐기는 여행을 원하시나요? 방콕의 카오산 거리, 파타야의 워킹 스트리트, 발리의 쿠타 비치를 추천드립니다. 클럽이나 바 중 어떤 분위기를 선호하시나요? 함께 가시는 분들이 있다면 알려주세요!';
	} else {
	    return '죄송해요, 잘 이해하지 못했어요. 동남아 여행지(방콕, 다낭, 발리 등)나 예약 문의에 대해 더 구체적으로 질문해 주시면 도와드릴게요!';
	}

	
}
