package com.zkteco.addressbook.service.impl;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Objects;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.zkteco.addressbook.dto.AddressBookDto;
import com.zkteco.addressbook.entity.AddressBook;
import com.zkteco.addressbook.entity.Result;
import com.zkteco.addressbook.repository.AddressBookRepository;
import com.zkteco.addressbook.service.AddressBookService;

@Service
public class AddressBookServiceImpl implements AddressBookService {

	@Autowired
	private AddressBookRepository addressRepo;

	@Autowired
	private ModelMapper mapper;

	private final Logger logger = LoggerFactory.getLogger(AddressBookServiceImpl.class);


	@Override
	public Result save(AddressBook add) {
		logger.info("Inside save of AddressBookServiceImpl");
		Date date = new Date();
		// Setting the date format
		SimpleDateFormat formatter = new SimpleDateFormat("yyyy-M-dd hh:mm:ss");
		// To ensure Id is Unique
		if (addressRepo.findById(add.getId()).isPresent()) {
			return new Result("ABEID001", "Id already registered", "[]");
		}
		// To validate Email
		if (isEmailValidAtAdd(add.getEmail())) {
			return new Result("ABEE001", "Email already registered", "[]");
		}
		// To ensure phone number is unique
		if (isPhoneValidAtAdd(add.getPhone())) {
			return new Result("ABEP001", "Phone number already present", "[]");
		}
		add.setCreatedDate(formatter.format(date));
		AddressBookDto addDto = this.mapper.map(addressRepo.save(add), AddressBookDto.class);
		return new Result("ABI001", "Contact saved successfully", addDto);

	}

	@Override
	public Result getById(String id) {
		logger.info("Inside getById of AddressBookServiceImpl");
		Optional<AddressBook> addDb = addressRepo.findById(id);
		if (addDb.isEmpty()) {
			return new Result("ABEINP001", "Contact with Id not present", "[]");
		}
		AddressBookDto addDto = this.mapper.map(addDb.get(), AddressBookDto.class);
		return new Result("ABI002", "Contact fetched successfully", addDto);
	}

	@Override
	public Result getByName(String name) {
		logger.info("Inside getByName of AddressBookServiceImpl");
		AddressBook addDb = addressRepo.findByFirstName(name);
		if (addDb == null) {
			return new Result("ABENNP001", "Contact with the specified name not present", "[]");
		}
		AddressBookDto addDto = this.mapper.map(addDb, AddressBookDto.class);
		return new Result("ABI002", "Contact fetched successfully", addDto);
	}

	@Override
	public Result deleteById(String id) {
		logger.info("Inside deleteById of AddressBookServiceImpl");
		Optional<AddressBook> addDb = addressRepo.findById(id);
		if (addDb.isEmpty()) {
			return new Result("ABENP001", "Contact not present", "[]");
		}
		addressRepo.deleteById(id);
		return new Result("ABI003", "Contact deleted successfully", "[]");
	}

	@Override
	public Result getAll() {
		logger.info("Inside getAll of AddressBookServiceImpl");
		return new Result("ABI004", "Contacts fetched successfully", addressRepo.findAll());
	}

	@Override
	public Result updateById(AddressBook addr, String id) {
		logger.info("Inside updateById of AddressBookServiceImpl");
		Date date = new Date();
		SimpleDateFormat formatter = new SimpleDateFormat("yyyy-M-dd hh:mm:ss");
		if (addressRepo.findById(id).isEmpty()) {
			return new Result("ABENP001", "Contact not present", "[]");
		} else {

			AddressBook addDb = addressRepo.findById(id).get();
			addDb.setFirstName(addr.getFirstName());

			if (Objects.nonNull(addr.getLastName())) {
				addDb.setLastName(addr.getLastName());
			}
			if (isEmailValidAtUpdate(addr)) {
				return new Result("ABEE001", "Email already registered", "[]");
			}
			addDb.setEmail(addr.getEmail());

			if (isPhoneValidAtUpdate(addr)) {
				return new Result("ABEP001", "Phone number already registered", "[]");
			}
			addDb.setPhone(addr.getPhone());

			if (Objects.nonNull(addr.getAge())) {
				addDb.setAge(addr.getAge());
			}
			if (Objects.nonNull(addr.getRelation())) {
				addDb.setRelation(addr.getRelation());
			}
			if (Objects.nonNull(addr.getStreet())) {
				addDb.setStreet(addr.getStreet());
			}
			addDb.setCity(addr.getCity());
			addDb.setCountry(addr.getCountry());
			addDb.setUpdatedDate(formatter.format(date));
			AddressBookDto addDto = this.mapper.map(addressRepo.save(addDb), AddressBookDto.class);
			return new Result("ABI005", "Contact updated successfully", addDto);
		}

	}

	// Validating Phone at POST
	public boolean isPhoneValidAtAdd(String phone) {
		logger.info("Inside isPhoneValidAtAdd of AddressBookServiceImpl");
		return (addressRepo.findByPhone(phone) != null);
	}

	// Validating Phone at PUT
	public boolean isPhoneValidAtUpdate(AddressBook address) {
		logger.info("Inside isPhoneValidAtUpdate of AddressBookServiceImpl");
		return (addressRepo.findByPhone(address.getPhone()) != null
				&& !addressRepo.findByPhone(address.getPhone()).getId().equals(address.getId()));
	}

	// Validating Email at POST
	public boolean isEmailValidAtAdd(String email) {
		logger.info("Inside isEmailValidAtAdd of AddressBookServiceImpl");
		return (addressRepo.findByEmail(email) != null);
	}

	// Validating Email at PUT
	public boolean isEmailValidAtUpdate(AddressBook address) {
		logger.info("Inside isEmailValidAtUpdate of AddressBookServiceImpl");
		return (addressRepo.findByEmail(address.getEmail()) != null
				&& !addressRepo.findByEmail(address.getEmail()).getId().equals(address.getId()));
	}
}
