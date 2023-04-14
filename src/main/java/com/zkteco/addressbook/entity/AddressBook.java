package com.zkteco.addressbook.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AddressBook {
	@Id
	private String id;
	private String firstName;
	private String lastName;
	private String age;
	private String phone;
	private String email;
	private String relation;
	private String street;
	private String city;
	private String country;
	private String createdDate;
	private String updatedDate;
}
