package ee.riina.proovitoo2.controller;

import ee.riina.proovitoo2.entity.Parent;
import ee.riina.proovitoo2.repository.ParentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173/")
@RestController
public class ParentController {

    @Autowired
    ParentRepository parentRepository;

    @PostMapping("/parent")
    public List<Parent> addOneParent(@RequestBody Parent parent) {
        parentRepository.save(parent);
        return parentRepository.findAll();
    }

    @GetMapping("/parent/{id}")
    public Parent getParent(@PathVariable Long id) {
        return parentRepository.findById(id).orElseThrow();
    }

    @GetMapping("/parent")
    public List<Parent> getParents() {
        return parentRepository.findAll();
    }

}
