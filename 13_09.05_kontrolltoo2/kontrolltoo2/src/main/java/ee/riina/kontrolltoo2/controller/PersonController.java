package ee.riina.kontrolltoo2.controller;

import ee.riina.kontrolltoo2.entity.Comment;
import ee.riina.kontrolltoo2.entity.Person;
import ee.riina.kontrolltoo2.repository.CommentRepository;
import ee.riina.kontrolltoo2.repository.PersonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/persons")
@CrossOrigin(origins = "http://localhost:5173/")

public class PersonController {

    @Autowired
    private PersonRepository personRepository;

    @Autowired
    private CommentRepository commentRepository;

    // Kõigi isikute saamine
    @GetMapping
    public List<Person> getAllPersons() {
        return personRepository.findAll();
    }

    // Ühe isiku saamine ID järgi
    @GetMapping("/{id}")
    public Person getPersonById(@PathVariable Long id) {
        return personRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Person not found with id: " + id));
    }

    @PostMapping
    public Person addPerson(@RequestBody Person person) {
        return personRepository.save(person);
    }

    @GetMapping("/{id}/comments")
    public List<Comment> getCommentsByPerson(@PathVariable Long id) {
        return commentRepository.findByPersonId(id);
    }
}