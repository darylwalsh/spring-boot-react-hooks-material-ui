package com.llminol.cardatabse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.llminol.cardatabse.domain.Car;
import com.llminol.cardatabse.domain.CarRepository;
import com.llminol.cardatabse.domain.Owner;
import com.llminol.cardatabse.domain.OwnerRepository;
import com.llminol.cardatabse.domain.User;
import com.llminol.cardatabse.domain.UserRepository;

@SpringBootApplication
public class CardatabseApplication {
	  @Autowired 
      private CarRepository repository;

	  @Autowired 
      private OwnerRepository orepository;
	  
	  @Autowired	
	  private UserRepository urepository;	
		

      public static void main(String[] args) {
        SpringApplication.run(CardatabseApplication.class, args);
      }

      @Bean

      CommandLineRunner runner(){
        return args -> {
          // Save demo data to database
        	Owner owner1 = new Owner("John" , "Johnson");
			Owner owner2 = new Owner("Mary" , "Robinson");
			orepository.save(owner1);
			orepository.save(owner2);	
			repository.save(new Car("Ford", "Mustang", "Red", "ADF-1121", 2017, 59000, owner1));
			repository.save(new Car("Nissan", "Leaf", "White", "SSJ-3002", 2014, 29000, owner2));
			repository.save(new Car("Toyota", "Prius", "Silver", "KKO-0212", 2018, 39000, owner2));
			urepository.save(new User("user", "$2y$12$97ej1wotuF88C7.txO.jEugdTzjl1jNyqaaD4b9jNW1FKy2IdiD92", "USER"));
			urepository.save(new User("admin", "$2a$04$KNLUwOWHVQZVpXyMBNc7JOzbLiBjb9Tk9bP7KNcPI12ICuvzXQQKG", "ADMIN"));

        };
      } 
    }

