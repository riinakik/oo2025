package ee.riina.veebipood.controller;

import ee.riina.veebipood.entity.Person;
import ee.riina.veebipood.repository.PersonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173/")
@RestController
public class PersonController {

    @Autowired
    PersonRepository personRepository;

    //id ja parool
    //todo peab saatma emaili ja parooli
    //todo tagastada korralik mudel front endile mitte boolean

    @PostMapping("login")
    public boolean login(@RequestBody Person person) {
        if (person.getId() == null) {
            throw new RuntimeException("ERROR_EMAIL_MISSING");
        }
        if (person.getPassword() == null || person.getPassword().isBlank()) {
            throw new RuntimeException("ERROR_PASSWORD_MISSING");
        }

        Person dbPerson = personRepository.findById(person.getId()).orElseThrow();
        if (dbPerson.getPassword(). equals(person.getPassword())) {
            return true;
        } else {
            return false;
        }
    }

    //todo: ei tagasta pärast signupi listi inimestest
    @PostMapping("signup")
    public List<Person> signup(@RequestBody Person person) {
        //viga on {}email == null || email: ""....email is blank
        if (person.getEmail().isBlank()) {
            throw new RuntimeException("ERROR_EMAIL_MISSING");
        }
        if (person.getPassword() == null || person.getPassword().isBlank()) {
            throw new RuntimeException("ERROR_PASSWORD_MISSING");
        }

       personRepository.save(person);
       return personRepository.findAll();
    }
}
