package com.zkteco.addressbook.controller;

import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.zkteco.addressbook.dto.AddressBookDto;
import com.zkteco.addressbook.entity.AddressBook;
import com.zkteco.addressbook.entity.Result;
import com.zkteco.addressbook.service.AddressBookService;

@CrossOrigin("*")
@RestController
@RequestMapping("/addressBook")
public class AddressBookController {
	
	@Autowired
	private AddressBookService addService;
	
	@Autowired
	private ModelMapper mapper;
	
	private final Logger logger=LoggerFactory.getLogger(AddressBookController.class);
	
	//Method to save a single contact
	@PostMapping("/")
	public Result save(@RequestBody AddressBookDto addDto) {
		logger.info("Inside save of AddressBookController");
		AddressBook add=this.mapper.map(addDto, AddressBook.class);
		return addService.save(add);
	}
	
	//Method to fetch a contact using Id
	@GetMapping("/{id}")
	public Result getById(@PathVariable("id") String id) {
		logger.info("Inside getById of AddressBookController");
		return addService.getById(id);
	}
	
	//Method to fetch all the contacts from the database
	@GetMapping("/")
	public Result getAll() {
		logger.info("Inside getAll of AddressBookController");
		return addService.getAll();
	}
	
	//Method to update a contact using its Id
	@PutMapping("/{id}")
	public Result updateById(@RequestBody AddressBookDto addDto,@PathVariable("id")String id) {
		logger.info("Inside updateById of AddressBookController");
		AddressBook add=this.mapper.map(addDto, AddressBook.class);
		return addService.updateById(add, id);
	}
	
	//Method to delete a contact using its Id
	@DeleteMapping("/{id}")
	public Result deleteById(@PathVariable("id") String id) {
		logger.info("Inside deleteById of AddressBookController");
		return addService.deleteById(id);
	}
	

}
