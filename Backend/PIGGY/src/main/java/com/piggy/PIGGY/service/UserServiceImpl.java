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
	public User singup(SignupDto dto, String authkey) {
		return uRepo.save(User.builder()
				.email(dto.getEmail())
				.password(passwordEncoder.encode(dto.getPassword()))
				.nickname(dto.getNickname())
				.image(dto.getImage())
				.emailCertify(authkey)
				.ranking(1)
				.roles(Collections.singletonList("EMAIL_USER"))
				.build());
	}

	@Override
	public Map<String, String> signin(String email, String password) {
		
		Map<String, String> result = new HashMap<>();
		User user = uRepo.findByEmail(email).orElseThrow(NoSuchElementException::new);
		if (!passwordEncoder.matches(password, user.getPassword())) {
			result.put("massage", "비밀번호가 일치하지 않습니다.");
		} else {
			result.put("token", jwtProvider.createToken(user.getUsername(), user.getRoles()));
			result.put("uId", user.getUId().toString());
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
	public void updateEmail(String email) {
		uRepo.updateEmail(email);
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
	
}
