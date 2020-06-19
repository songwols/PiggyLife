package com.piggy.PIGGY.entity;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@ToString
@Getter
@Entity
public class User implements UserDetails {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long uId;
	
	@OneToOne(mappedBy="user", cascade=CascadeType.ALL)
	private UserRecommend uRecommend;
	
	@OneToOne(mappedBy="user", cascade=CascadeType.ALL)
	private AreaRecommend aRecommend;

	@Column(nullable = false, unique = true)
	private String email;

	@Column(nullable = false)
	private String password;

	@Column(nullable = false)
	private String nickname;

	@Column(nullable=false, columnDefinition = "int default 0")
	private Integer ranking;

	@Column
	private String image;
	
	@Column
	private String imageName;
	
	@Column
	private String emailCertify;
	
//	@Column(columnDefinition="tinyint(1) default 1")
	@Column(nullable = false)
	private Boolean superuser;
	
	@OneToMany(mappedBy = "user", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	private List<UserRequest> requests = new ArrayList<>();
	
	@OneToMany(mappedBy = "user", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	private List<Post> feeds = new ArrayList<>();

	@Builder
	public User(String email, String password, String nickname, String image, String emailCertify, Integer ranking, Boolean superuser, List<String> roles) {
		this.email = email;
		this.password = password;
		this.nickname = nickname;
		this.image = image;
		this.roles = roles;
		this.emailCertify = emailCertify; 
		this.ranking = ranking;
		this.superuser = superuser;
	}
	
	public void passwordUpdate(String password) {
		this.password = password;
	}

	// user detail method
	@ElementCollection(fetch = FetchType.EAGER)
	private List<String> roles = new ArrayList<>();

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return this.roles.stream().map(SimpleGrantedAuthority::new).collect(Collectors.toList());
	}

	@Override
	public String getUsername() {
		return this.getUId().toString();
	}

	@JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
	@Override
	public boolean isEnabled() {
		return true;
	}
	
	public void update(String nickname, String image) {
		this.nickname = nickname;
		this.image = image;
	}
	
	public void update(String email, String password, String nickname) {
		this.email = email;
		this.password = password;
		this.nickname = nickname;
	}
	
	public void updateImage(String image, String imageName) {
		this.image = image;
		this.imageName = imageName;
	}

}
