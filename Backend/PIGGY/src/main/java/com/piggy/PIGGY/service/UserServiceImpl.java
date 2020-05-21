package com.piggy.PIGGY.service;

import java.util.List;
import java.util.NoSuchElementException;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.piggy.PIGGY.dto.SignupDto;
import com.piggy.PIGGY.entity.User;
import com.piggy.PIGGY.repository.UserRepository;

@Service
public class UserServiceImpl implements UserDetailsService, UserService{
	
	@Autowired
	private UserRepository uRepo;
	
	@Override
	public UserDetails loadUserByUsername(String uId) throws UsernameNotFoundException {
		return uRepo.findById(Long.parseLong(uId)).orElseThrow(NoSuchElementException::new);
	}
	
	@Override
	public User singup(SignupDto dto) {
		
		return uRepo.save(User.builder()
				.email(dto.getEmail())
				.password(dto.getPassword())
				.nickname(dto.getNickname())
//				.emailCertify(authkey)
//				.roles(Collections.singletonList("EMAIL_USER"))
				.build());
	}

	@Override
	public User signin(String email, String password) {
		User user = uRepo.findByEmail(email).orElseThrow(NoSuchElementException::new);
		return user;
	}
	
	@Override
	public boolean emailDuplicateCheck(String email) {
		if(uRepo.findByEmail(email).orElse(null) != null)
			return true;
		else 
			return false;
	}
	
	@Override
	public User findById(Long uId) {
		return uRepo.findById(uId).orElseThrow(NoSuchElementException::new);
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
	public void deleteById(Long uId) {
		uRepo.deleteById(uId);
	}
	
}
