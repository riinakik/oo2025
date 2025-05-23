
package ee.riina.kymnevoistlus.controller;

import ee.riina.kymnevoistlus.entity.Athlete;
import ee.riina.kymnevoistlus.entity.Event;
import ee.riina.kymnevoistlus.entity.Result;
import ee.riina.kymnevoistlus.repository.AthleteRepository;
import ee.riina.kymnevoistlus.repository.EventRepository;
import ee.riina.kymnevoistlus.repository.ResultRepository;

import ee.riina.kymnevoistlus.scoring.DecathlonScoring;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin (origins = "http://localhost:5173/")
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

    @GetMapping("results/{id}")
    public Result getResult(@PathVariable Long id) {
        return resultRepository.findById(id).orElseThrow();
    }

    // POST päring tulemuse lisamiseks, mis arvutab ka punktid
    @PostMapping("results")
    public List<Result> addResult(@RequestBody Result result) {

        Optional<Athlete> athleteOpt = athleteRepository.findById(result.getAthlete().getId());
        Optional<Event> eventOpt = eventRepository.findById(result.getEvent().getId());

        // Ei saa lisada ID
        // (ID peaks olema null, kuna see genereeritakse andmebaasis automaatselt)
        if (result.getId() != null) {
            throw new RuntimeException("ERROR_CANNOT_ADD_WITH_ID");
        }

        // Kontroll, et tulemuse väärtus oleks positiivne
        if (result.getResult() < 0) {
            throw new RuntimeException("ERROR_RESULT_MUST_BE_POSITIVE");
        }

        // Kui sportlast ei leitud
        if (!athleteOpt.isPresent()) {
            throw new RuntimeException("ERROR_ATHLETE_NOT_FOUND");
        }

        // Kui võistlust ei leita
        if (!eventOpt.isPresent()) {
            throw new RuntimeException("ERROR_EVENT_NOT_FOUND");
        }

        // Kontroll, et vastus sisaldab sportlase andmeid ja et sportlase ID on määratud.
        if (result.getAthlete() == null || result.getAthlete().getId() == null) {
            throw new RuntimeException("ERROR_MISSING_REQUIRED_FIELD: Athlete ID is missing");
        }

        // Kontrolli, et vastus sisaldab võistluse andmeid ja et võistluse ID on määratud.
        if (result.getEvent() == null || result.getEvent().getId() == null) {
            throw new RuntimeException("ERROR_MISSING_REQUIRED_FIELD: Event ID is missing");
        }

        //Kui on olemas sportlase ja võistluse andmed
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

    @DeleteMapping("results/{id}")
    public List<Result> deleteResult(@PathVariable Long id) {
        resultRepository.deleteById(id);
        return resultRepository.findAll();
    }

    @PutMapping("results")
    public Result updateResult(@RequestBody Result result) {
        Optional<Athlete> athleteOpt = athleteRepository.findById(result.getAthlete().getId());
        Optional<Event> eventOpt = eventRepository.findById(result.getEvent().getId());

        if (!athleteOpt.isPresent()) {
            throw new RuntimeException("ERROR_ATHLETE_NOT_FOUND");
        }

        if (!eventOpt.isPresent()) {
            throw new RuntimeException("ERROR_EVENT_NOT_FOUND");
        }

        if (result.getId() == null) {
            throw new RuntimeException("ERROR_MISSING_ID");
        }

        if (result.getResult() < 0) {
            throw new RuntimeException("ERROR_RESULT_MUST_BE_POSITIVE");
        }

        Athlete athlete = athleteOpt.get();
        Event event = eventOpt.get();

        int calculatedScore = DecathlonScoring.calculateScore(event.getName(), result.getResult());
        result.setScore(calculatedScore);
        result.setAthlete(athlete);
        result.setEvent(event);

        return resultRepository.save(result);
    }

}
