package com.zkteco.addressbook.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.zkteco.addressbook.entity.AddressBook;

@Repository
public interface AddressBookRepository extends JpaRepository<AddressBook, String> {
	public AddressBook findByPhone(String phone);
	public AddressBook findByEmail(String email);
	public AddressBook findByFirstName(String name);
}
