package com.zkteco.addressbook.service;

import com.zkteco.addressbook.entity.AddressBook;
import com.zkteco.addressbook.entity.Result;

public interface AddressBookService {
	public Result save(AddressBook add);
	public Result getById(String id);
	public Result getByName(String name);
	public Result updateById(AddressBook add,String id);
	public Result deleteById(String id);
	public Result getAll();
}
