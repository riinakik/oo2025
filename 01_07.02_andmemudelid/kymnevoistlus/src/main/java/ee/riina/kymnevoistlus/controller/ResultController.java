package ee.riina.kymnevoistlus.controller;

import ee.riina.kymnevoistlus.entity.Result;
import ee.riina.kymnevoistlus.repository.ResultRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class ResultController {

    @Autowired
    ResultRepository resultRepository;
    //http://localhost:8080/results
    @GetMapping("results")
    public List<Result> getResults() {
        return resultRepository.findAll();
    }

    @PostMapping("results")
    public List<Result> addResult(@RequestBody Result result) {
        resultRepository.save(result);
        return resultRepository.findAll();
    }
}
