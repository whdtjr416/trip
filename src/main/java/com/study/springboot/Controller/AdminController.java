package com.study.springboot.Controller;

import com.study.springboot.model.Inquiry;
import com.study.springboot.model.User;
import com.study.springboot.service.InquiryService;
import com.study.springboot.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
@RequestMapping("/admin")
@PreAuthorize("hasRole('ADMIN')") // 관리자 권한이 있는 사용자만 접근 가능
public class AdminController {

    @Autowired
    private UserService userService;

    @Autowired
    private InquiryService inquiryService;

    @GetMapping
    public String adminPage(Model model) {
        List<User> users = userService.getAllUsers();
        List<Inquiry> inquiries = inquiryService.getAllInquiries();
        model.addAttribute("users", users);
        model.addAttribute("inquiries", inquiries);
        return "admin"; // admin.html 템플릿 반환
    }

    // 회원 삭제 요청 처리
    @PostMapping("/deleteUser/{id}")
    public String deleteUser(@PathVariable("id") Long id) {
        userService.deleteUser(id);
        return "redirect:/admin";
    }
    
 // 문의 내역 삭제 요청 처리
    @PostMapping("/deleteInquiry/{id}")
    public String deleteInquiry(@PathVariable("id") Long id) {
        inquiryService.deleteInquiry(id);
        return "redirect:/admin";
    }
}
