package com.coafor.proiect;

import com.coafor.proiect.model.Account;
import com.coafor.proiect.model.User;
import com.coafor.proiect.repository.AccountRepository;
import com.coafor.proiect.repository.UserRepository;
import com.coafor.proiect.service.AccountService;
import com.coafor.proiect.service.UserService;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.context.SpringBootTest;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
class ProiectApplicationTests {

	@Autowired
	private AccountService accountService;

	@Test
	@Order(3)
	public void addClientAccount(){
		Account account=accountService.addClientAccount("bia","bia","Bia",
				"Bia",22,"0766543276","simonb@yahoo.com");

		assertThat(account.getUser().getFirstName()).isEqualTo("Bia");
	}

	@Test
	@Order(2)
	public void getAllAccounts(){
		Iterable<Account> accounts=accountService.findAll();

		assertThat(accounts).hasSize(3);
	}

	@Test
	@Order(4)
	public void updateClientAccount(){
		Account account=accountService.findByUsername("client");
		Account updatedAccount=accountService.updateUsername(account,"clientclient");
		assertThat(updatedAccount.getUsername()).isEqualTo("clientclient");
	}

	@Test
	@Order(1)
	public void deleteAccount(){
		Account account=accountService.findByUsername("bia");
		accountService.deleteAccount(account);
		Account deletedAccount=accountService.findByUsername("bia");
		assertThat(deletedAccount).isNull();
	}
}
