package com.study.springboot.Controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {

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
}
