package com.piggy.PIGGY.controller;

import java.io.UnsupportedEncodingException;

import javax.mail.MessagingException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.piggy.PIGGY.dto.SignupDto;
import com.piggy.PIGGY.entity.User;
import com.piggy.PIGGY.mail.MailUtils;
import com.piggy.PIGGY.mail.TempKey;
import com.piggy.PIGGY.service.UserService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@RestController
@Api(tags = { "Sign" }, description = "Sign 정보 REST API")
@RequestMapping(value = "/sign")
@CrossOrigin(origins = "*")
public class SignRestController {
	
	@Autowired
	private UserService uService;
	
	@Autowired
	private JavaMailSender mailSender;

	@ApiOperation(value = "회원가입")
	@PostMapping("/signup")
	public ResponseEntity<Object> signup(@RequestBody SignupDto input) {
		try {
			if (uService.emailDuplicateCheck(input.getEmail())) 
				return new ResponseEntity<Object>("중복된 이메일 입니다.", HttpStatus.ACCEPTED);

			String authkey = new TempKey().getKey(8, false);
			MailUtils sendMail;
			try {
				sendMail = new MailUtils(mailSender);
				sendMail.setTo(input.getEmail());
				sendMail.setSubject("[Piggy] 회원가입 이메일 인증");
				sendMail.setText(new StringBuffer().append("<h1>[이메일 인증]</h1>")
						.append("<p>인증번호.</p>")
						.append(authkey).toString());
//						.append("<p>아래 링크를 클릭하시면 이메일 인증이 완료됩니다.</p>")
//						.append("<a href='http://localhost:8090/Piggy/sign/Confirm?email=").append(input.getEmail())
//						.append("&authkey=").append(authkey).append("' target='_blenk'>이메일 인증 확인</a>").toString());
				sendMail.setFrom("noreply@Piggy.com", "Piggy Master");
				sendMail.send();
			} catch (MessagingException | UnsupportedEncodingException e) {
				e.printStackTrace();
			}

			User user = uService.singup(input, authkey);
			return new ResponseEntity<Object>(user, HttpStatus.CREATED);
		} catch (Exception e) {
			throw e;
		}
	}
	
	@ApiOperation(value = "로그인")
	@PostMapping("/signin")
	public ResponseEntity<Object> signin(@RequestParam String email, @RequestParam String password) {
		try {
			return new ResponseEntity<Object>(uService.signin(email, password), HttpStatus.OK);
		} catch (Exception e) {
			throw e;
		}
	}
	
	@ApiOperation(value = "이메일 중복 검사")
	@GetMapping(value = "/checkEmail")
	public ResponseEntity<Object> checkDuplicateEmail(@RequestParam String email) {
		if (uService.emailDuplicateCheck(email)) {
			return new ResponseEntity<Object>("중복된 이메일 입니다.", HttpStatus.ACCEPTED);
		} else {
			return new ResponseEntity<Object>("사용 가능한 이메일 입니다.", HttpStatus.OK);
		}
	}
	
	@ApiOperation(value = "이메일 인증")
	@GetMapping(value = "/EmailConfirm")
	public ResponseEntity<Object> emailConfirm(@RequestParam String email, @RequestParam String authkey)
			throws Exception {
		User user = uService.findByEmail(email);
		if (user != null) {
			if (user.getEmailCertify() == "Y") {
				return new ResponseEntity<Object>("이미 인증이 완료되었습니다.", HttpStatus.OK);
			}
			if (user.getEmailCertify().equals(authkey)) {
				uService.updateEmail(email);
				return new ResponseEntity<Object>("인증이 완료되었습니다.", HttpStatus.OK);
			} else
				return new ResponseEntity<Object>("인증 실패", HttpStatus.ACCEPTED);
		}
		return new ResponseEntity<Object>("회원정보를 찾지 못했습니다..", HttpStatus.ACCEPTED);
	}
}
