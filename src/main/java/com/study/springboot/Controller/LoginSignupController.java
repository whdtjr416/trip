package com.study.springboot.Controller;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.HashMap;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import com.study.springboot.model.User;
import com.study.springboot.service.UserService;
import org.springframework.security.core.Authentication;

@Controller
public class LoginSignupController {

    @Autowired
    private UserService userService;

    @GetMapping("/login")
    public String loginPage(@RequestParam(value = "error", required = false) String error, Model model) {
        if (error != null) {
            model.addAttribute("error", "아이디 또는 비밀번호가 잘못되었습니다.");
        }
        return "login";
    }

    @GetMapping("/signup")
    public String signupPage() {
        return "signup";
    }

    @PostMapping("/signup")
    @ResponseBody
    public Map<String, Object> signup(@RequestParam("username") String username,
                                      @RequestParam("password") String password,
                                      @RequestParam("confirmPassword") String confirmPassword,
                                      @RequestParam("emailId") String emailId,
                                      @RequestParam("emailDomain") String emailDomain,
                                      @RequestParam("birthdate") String birthdate) {
        Map<String, Object> response = new HashMap<>();
        
        if (!password.equals(confirmPassword)) {
            response.put("success", false);
            response.put("error", "비밀번호가 일치하지 않습니다.");
            return response;
        }

        String email = emailId + "@" + emailDomain;

        if (userService.isUsernameTaken(username)) {
            response.put("success", false);
            response.put("error", "이미 사용 중인 아이디입니다.");
            return response;
        }

        if (userService.isEmailTaken(email)) {
            response.put("success", false);
            response.put("error", "이미 사용 중인 이메일입니다.");
            return response;
        }

        LocalDate parsedBirthdate;
        try {
            parsedBirthdate = LocalDate.parse(birthdate, DateTimeFormatter.ofPattern("yyyy-MM-dd"));
        } catch (DateTimeParseException e) {
            response.put("success", false);
            response.put("error", "유효하지 않은 생년월일 형식입니다. (예: 1990-01-01)");
            return response;
        }

        User user = new User();
        user.setUsername(username);
        user.setPassword(password);
        user.setEmail(email);
        user.setBirthdate(parsedBirthdate);
        user.setRole("USER");

        userService.registerUser(user);

        response.put("success", true);
        response.put("message", "회원가입이 완료되었습니다. 로그인해주세요.");
        return response;
    }

    @GetMapping("/checkUsername")
    @ResponseBody
    public String checkUsername(@RequestParam("username") String username) {
        if (userService.isUsernameTaken(username)) {
            return "이미 사용 중인 아이디입니다.";
        } else {
            return "사용 가능한 아이디입니다.";
        }
    }

    // 마이페이지 조회
    @GetMapping("/mypage")
    public String mypage(Model model, Authentication authentication) {
        String username = authentication.getName();
        User user = userService.findByUsername(username).orElse(null);
        if (user == null) {
            return "redirect:/login";
        }
        model.addAttribute("user", user);
        return "mypage";
    }

    // 개인정보 수정
    @PostMapping("/mypage/update")
    public String updateProfile(
        @RequestParam(name = "email") String email, 
        @RequestParam(name = "password", required = false) String password, 
        Authentication authentication, 
        Model model
    ) {
        String username = authentication.getName();
        User user = userService.findByUsername(username).orElse(null);
        if (user == null) {
            return "redirect:/login";
        }
        user.setEmail(email);
        if (password != null && !password.isEmpty()) {
            userService.updatePassword(user, password);
        }
        userService.updateUser(user);
        model.addAttribute("message", "개인정보가 성공적으로 수정되었습니다!");
        model.addAttribute("user", user);
        return "mypage";
    }
}
