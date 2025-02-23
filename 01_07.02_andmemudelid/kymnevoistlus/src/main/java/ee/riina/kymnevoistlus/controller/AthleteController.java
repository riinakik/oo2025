package ee.riina.kymnevoistlus.controller;

import ee.riina.kymnevoistlus.dto.AthletePointsDTO;
import ee.riina.kymnevoistlus.entity.Athlete;
import ee.riina.kymnevoistlus.entity.Result;
import ee.riina.kymnevoistlus.repository.ResultRepository;
import ee.riina.kymnevoistlus.repository.AthleteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
public class AthleteController {

    @Autowired
    private ResultRepository resultRepository;

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


    // Uus endpoint: Ühe sportlase kogupunktide pärimine
    @GetMapping("athletes/{id}/totalPoints")
    public int getAthleteTotalPoints(@PathVariable Long id) {
        Optional<Athlete> athleteOpt = athleteRepository.findById(id);
        if (!athleteOpt.isPresent()) {
            throw new RuntimeException("ERROR_ATHLETE_NOT_FOUND");
        }
        Athlete athlete = athleteOpt.get();
        // Otsime kõik tulemused, mis kuuluvad antud sportlasele
        List<Result> results = resultRepository.findByAthlete(athlete);
        // Liidame kokku punktid
        int totalPoints = results.stream().mapToInt(Result::getScore).sum();
        return totalPoints;
    }

    // Uus endpoint: Kõik sportlased koos nende kogupunktidega
    @GetMapping("athletesWithPoints")
    public List<AthletePointsDTO> getAthletesWithPoints() {
        List<Athlete> athletes = athleteRepository.findAll();
        List<AthletePointsDTO> athletePointsList = new ArrayList<>();

        for (Athlete athlete : athletes) {
            // Otsime iga sportlase tulemused
            List<Result> results = resultRepository.findByAthlete(athlete);
            // Summeerime punktid
            int totalPoints = results.stream().mapToInt(Result::getScore).sum();

            // Loome DTO objekti sportlase andmetega ja tema kogupunktidega
            AthletePointsDTO dto = new AthletePointsDTO(
                    athlete.getId(),
                    athlete.getName(),
                    athlete.getCountry(),
                    athlete.getAge(),
                    totalPoints
            );
            athletePointsList.add(dto);
        }
        return athletePointsList;
    }
}
