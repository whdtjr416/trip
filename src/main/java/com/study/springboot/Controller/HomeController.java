package com.study.springboot.Controller;

import com.study.springboot.model.Inquiry;
import com.study.springboot.service.InquiryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
public class HomeController {

    @Autowired
    private InquiryService inquiryService;

    @GetMapping("/")
    public String home() {
        return "index"; // templates/index.html
    }

    @GetMapping("/thailand-detail")
    public String thailandDetail() {
        return "thailand-detail"; // templates/thailand-detail.html
    }

    @GetMapping("/danang-detail")
    public String danangDetail() {
        return "danang-detail"; // templates/danang-detail.html
    }

    @GetMapping("/bali-detail")
    public String baliDetail() {
        return "bali-detail"; // templates/bali-detail.html
    }
    
    @PostMapping("/contact")
    public String submitContactForm(@ModelAttribute Inquiry inquiry) {
        inquiryService.saveInquiry(inquiry);
        return "redirect:/#contact"; // 제출 후 리다이렉트
    }
}
