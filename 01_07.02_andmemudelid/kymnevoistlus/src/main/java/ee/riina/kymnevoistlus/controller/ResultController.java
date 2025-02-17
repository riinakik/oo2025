
package ee.riina.kymnevoistlus.controller;

import ee.riina.kymnevoistlus.entity.Athlete;
import ee.riina.kymnevoistlus.entity.Event;
import ee.riina.kymnevoistlus.entity.Result;
import ee.riina.kymnevoistlus.repository.AthleteRepository;
import ee.riina.kymnevoistlus.repository.EventRepository;
import ee.riina.kymnevoistlus.repository.ResultRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class ResultController {

    @Autowired
    private ResultRepository resultRepository;

    @Autowired
    private AthleteRepository athleteRepository;

    @Autowired
    private EventRepository eventRepository;

    // GET päring, mis tagastab kõik tulemused
    @GetMapping("results")
    public List<Result> getResults() {
        return resultRepository.findAll();
    }

    // POST päring tulemuse lisamiseks, mis arvutab ka punktid
    @PostMapping("results")
    public List<Result> addResult(@RequestBody Result result) {
        Optional<Athlete> athleteOpt = athleteRepository.findById(result.getAthlete().getId());
        Optional<Event> eventOpt = eventRepository.findById(result.getEvent().getId());

        if (athleteOpt.isPresent() && eventOpt.isPresent()) {
            Athlete athlete = athleteOpt.get();
            Event event = eventOpt.get();

            // Kasuta staatilist meetodit otse klassi nimega
            int calculatedScore = DecathlonScoring.calculateScore(event.getName(), result.getResult());
            result.setScore(calculatedScore);

            // Seosta sportlane ja ala tulemusega
            result.setAthlete(athlete);
            result.setEvent(event);

            resultRepository.save(result);
        }

        return resultRepository.findAll();
    }
}
