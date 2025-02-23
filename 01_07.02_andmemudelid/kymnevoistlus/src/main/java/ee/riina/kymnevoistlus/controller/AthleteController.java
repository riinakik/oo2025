package ee.riina.kymnevoistlus.controller;

import ee.riina.kymnevoistlus.entity.Athlete;
import ee.riina.kymnevoistlus.entity.Event;
import ee.riina.kymnevoistlus.repository.AthleteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
public class AthleteController {

    @Autowired
    AthleteRepository athleteRepository;
    //http:localhost:8080/athletes
    @GetMapping("athletes")
    public List<Athlete> getAthletes() {
        return athleteRepository.findAll();
    }

    @PostMapping("athletes")
    public List<Athlete> addAthlete(@RequestBody Athlete athlete) {
        Optional<Athlete> duplicateAthlete = athleteRepository.findByName(athlete.getName());

        //Kontroll, et uut sportlast ei saadetaks ID-ga
        if (athlete.getId() != null){
            throw  new RuntimeException("ERROR_CANNOT_ADD_WITH_ID");
        }

        // Sportlase nimi peab olema esitatud
        if (athlete.getName() == null || athlete.getName().trim().isEmpty()) {
            throw new RuntimeException("ERROR_MISSING_REQUIRED_FIELD: Event name is missing");
        }

        // Sportlast ei saa topelt lisada
        if (duplicateAthlete.isPresent()) {
            throw new RuntimeException("ERROR_DUPLICATE_EVENT");
        }
        athleteRepository.save(athlete);
        return athleteRepository.findAll();
    }

}
