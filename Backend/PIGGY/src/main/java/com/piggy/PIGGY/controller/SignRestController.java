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

	@ApiOperation(value = "회원가입, (인증 이메일까지 동시에 보냄)")
	@PostMapping("/signup")
	public ResponseEntity<Object> signup(@RequestBody SignupDto input) {
		try {
			if (uService.emailDuplicateCheck(input.getEmail())) 
				return new ResponseEntity<Object>("중복된 이메일 입니다.", HttpStatus.ACCEPTED);

			User user = uService.singup(input);
			emailSend(input.getEmail());
			return new ResponseEntity<Object>(user, HttpStatus.CREATED);
		} catch (Exception e) {
			throw e;
		}
	}
	
	@ApiOperation(value = "이메일 인증 보내기")
	@PostMapping("/emailSend")
	public ResponseEntity<Object> emailSend(@RequestParam String email) {
		try {
			String authkey = new TempKey().getKey(8, false);
			MailUtils sendMail;
			try {
				sendMail = new MailUtils(mailSender);
				sendMail.setTo(email);
				sendMail.setSubject("[Piggy] 회원가입 이메일 인증");
				sendMail.setText(new StringBuffer().append("<h1>[이메일 인증]</h1>")
						.append("<p>인증번호.</p>")
						.append(authkey).toString());
				sendMail.setFrom("noreply@Piggy.com", "Piggy Master");
				sendMail.send();
			} catch (MessagingException | UnsupportedEncodingException e) {
				e.printStackTrace();
			}
			uService.updateEmail(email, authkey);
			
			return new ResponseEntity<Object>("이메일을 성공적으로 보냈습니다.", HttpStatus.OK);
		} catch (Exception e) {
			throw e;
		}
	}
	
	@ApiOperation(value = "로그인")
	@GetMapping("/signin")
	public ResponseEntity<Object> signin(@RequestParam String email, @RequestParam String password) {
		try {
			System.out.println(email + " : " + password);
			return new ResponseEntity<Object>(uService.signin(email, password), HttpStatus.OK);
		} catch (Exception e) {
			throw e;
		}
	}
	
	@ApiOperation(value = "이메일 중복 검사")
	@GetMapping(value = "/checkDuplicateEmail")
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
			if (user.getEmailCertify().equals("Y")) {
				return new ResponseEntity<Object>("이미 인증이 완료되었습니다.", HttpStatus.OK);
			}
			if (user.getEmailCertify().equals(authkey)) {
				uService.updateEmail(email, "Y");
				return new ResponseEntity<Object>("인증이 완료되었습니다.", HttpStatus.OK);
			} else
				return new ResponseEntity<Object>("인증 실패, 코드가 다릅니다.", HttpStatus.ACCEPTED);
		}
		return new ResponseEntity<Object>("회원정보를 찾지 못했습니다..", HttpStatus.ACCEPTED);
	}
}
