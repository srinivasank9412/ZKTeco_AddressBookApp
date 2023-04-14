package com.zkteco.addressbook.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AddressBookDto {
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

