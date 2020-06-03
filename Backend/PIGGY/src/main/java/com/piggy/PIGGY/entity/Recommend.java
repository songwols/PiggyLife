package com.piggy.PIGGY.entity;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.PrimaryKeyJoinColumn;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@JsonIdentityInfo(generator = ObjectIdGenerators.IntSequenceGenerator.class)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Entity
public class Recommend{

    @Id
    @Column
    private long uId;

    @OneToOne
    @PrimaryKeyJoinColumn(name="u_id", referencedColumnName="recommend")
    private User user;
	
	@Column
	private String stores;
	
	@Column
	private LocalDateTime updateTimeAt;
	
}
