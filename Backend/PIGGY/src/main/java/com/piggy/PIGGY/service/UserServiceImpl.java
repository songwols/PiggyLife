package com.piggy.PIGGY.service;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.piggy.PIGGY.dto.SignupDto;
import com.piggy.PIGGY.entity.User;
import com.piggy.PIGGY.repository.UserRepository;
import com.piggy.PIGGY.security.JwtTokenProvider;

@Service
public class UserServiceImpl implements UserService {
	
	@Autowired
	private UserRepository uRepo;

	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@Autowired
	private JwtTokenProvider jwtProvider;
	
	@Override
	public UserDetails loadUserByUsername(String uId) throws UsernameNotFoundException {
		return uRepo.findById(Long.parseLong(uId)).orElseThrow(NoSuchElementException::new);
	}
	
	@Override
	public User signup(SignupDto dto) {
		return uRepo.save(User.builder()
				.email(dto.getEmail())
				.password(passwordEncoder.encode(dto.getPassword()))
				.nickname(dto.getNickname())
				.emailCertify("email_send_require")
				.ranking(1)
				.roles(Collections.singletonList("EMAIL_USER"))
				.build());
	}

	@Override
	public Map<String, Object> signin(String email, String password) {
		
		Map<String, Object> result = new HashMap<>();
		User user = uRepo.findByEmail(email).orElseThrow(NoSuchElementException::new);
		
		if (!passwordEncoder.matches(password, user.getPassword())) {
			result.put("code", -1);
			result.put("massage", "비밀번호가 일치하지 않습니다.");
		} else if (!user.getEmailCertify().equals("Y")){
			result.put("code", -2);
			result.put("massage", "이메일 인증이 되지 않은 회원입니다.");
		} else {
			result.put("token", jwtProvider.createToken(user.getUsername(), user.getRoles()));
			result.put("uId", user.getUId().toString());
			result.put("code", 1);
			result.put("massage", "로그인 되었습니다.");
		}
		
		return result;
	}
	
	@Override
	public boolean emailDuplicateCheck(String email) {
		if(uRepo.findByEmail(email).orElse(null) != null)
			return true;
		else 
			return false;
	}
	
	@Override
	public User findByEmail(String email) {
		return uRepo.findByEmail(email).orElseThrow(NoSuchElementException::new);
	}
	
	@Override
	public User findByNickname(String nickname) {
		return uRepo.findByNickname(nickname).orElseThrow(NoSuchElementException::new);
	}

	@Override
	public List<User> findAll() {
		return uRepo.findAll();
	}
	
	@Override
	public void updateEmail(String email, String massage) {
		uRepo.updateEmail(email, massage);
	}
	
	@Override
	public Boolean checkPassword(Long uId, String password) {
		User user = uRepo.findById(uId).orElseThrow(NoSuchElementException::new);
		if (passwordEncoder.matches(password, user.getPassword()))
			return true;
		return false;
	}

	@Override
	public User updatePassword(Long uId, String password) {
		User user = uRepo.findById(uId).orElseThrow(NoSuchElementException::new);
		user.passwordUpdate(passwordEncoder.encode(password));
		return uRepo.save(user);
	}

	@Override
	public void deleteById(Long uId) {
		uRepo.deleteById(uId);
	}

	@Override
	public User update(SignupDto dto) {
		User user = uRepo.findByEmail(dto.getEmail()).orElseThrow(NoSuchElementException::new);
		user.update(dto.getEmail(), passwordEncoder.encode(dto.getPassword()),dto.getNickname());
		return uRepo.save(user);
	}

	@Override
	public User updateImage(Long uId, String image, String imageName) {
		User user = uRepo.findById(uId).orElseThrow(NoSuchElementException::new);
		user.updateImage(image, imageName);
		return uRepo.save(user);
	}

	@Override
	public User findById(Long uId) {
		return uRepo.findById(uId).orElseThrow(NoSuchElementException::new);
	}
}
