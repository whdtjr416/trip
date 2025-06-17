package com.study.springboot.Controller;

import com.study.springboot.dto.WeatherDTO;
import com.study.springboot.model.Inquiry;
import com.study.springboot.service.InquiryService;
import com.study.springboot.service.WeatherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class HomeController {

    @Autowired
    private InquiryService inquiryService;

    @Autowired
    private WeatherService weatherService;

    @GetMapping("/")
    public String home(Model model) {
        // 기본적으로 방콕의 날씨를 홈페이지에 표시
        WeatherDTO weather = weatherService.getWeather("Bangkok");
        model.addAttribute("weather", weather);
        return "index"; // templates/index.html
    }

    @GetMapping("/thailand-detail")
    public String thailandDetail(Model model) {
        // 태국 방콕의 날씨를 표시
        WeatherDTO weather = weatherService.getWeather("Bangkok");
        model.addAttribute("weather", weather);
        return "thailand-detail"; // templates/thailand-detail.html
    }

    @GetMapping("/danang-detail")
    public String danangDetail(Model model) {
        // 베트남 다낭의 날씨를 표시
        WeatherDTO weather = weatherService.getWeather("Da Nang");
        model.addAttribute("weather", weather);
        return "danang-detail"; // templates/danang-detail.html
    }

    @GetMapping("/bali-detail")
    public String baliDetail(Model model) {
        // 인도네시아 발리의 날씨를 표시 (발리 근처 도시로 검색)
        WeatherDTO weather = weatherService.getWeather("Denpasar");
        model.addAttribute("weather", weather);
        return "bali-detail"; // templates/bali-detail.html
    }
    
    @PostMapping("/contact")
    public String submitContactForm(@ModelAttribute Inquiry inquiry) {
        inquiryService.saveInquiry(inquiry);
        return "redirect:/#contact"; // 제출 후 리다이렉트
    }
    
    // AI 여행 비서 챗봇 API 엔드포인트 추가
    @PostMapping("/api/chatbot")
    @ResponseBody
    public String getChatbotResponse(@RequestBody String userMessage) {
        // JS에서 응답 로직을 처리하므로 서버에서는 단순히 요청을 수신하고 응답을 반환
        return "서버에서 메시지를 수신했습니다. 응답 로직은 클라이언트에서 처리됩니다.";
    }
}
