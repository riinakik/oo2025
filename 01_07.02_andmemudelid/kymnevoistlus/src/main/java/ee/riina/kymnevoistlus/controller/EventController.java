package ee.riina.kymnevoistlus.controller;

import ee.riina.kymnevoistlus.entity.Event;
import ee.riina.kymnevoistlus.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:5173/")
@RestController
public class EventController {

    @Autowired
    private EventRepository eventRepository;

    // GET - Küsi kõik alad
    @GetMapping("events")
    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }

    // POST - Lisa uus ala
    @PostMapping("events")
    public Event addEvent(@RequestBody Event event) {
        Optional<Event> duplicateEvent = eventRepository.findByName(event.getName());

        // Kontroll, et uut üritust ei saadetaks ID-ga
        if (event.getId() != null) {
            throw new RuntimeException("ERROR_CANNOT_ADD_WITH_ID");
        }

        // Ürituse nimi peab olema esitatud
        if (event.getName() == null || event.getName().trim().isEmpty()) {
            throw new RuntimeException("ERROR_MISSING_REQUIRED_FIELD: Event name is missing");
        }

        // Üritust ei saa topelt lisada
        if (duplicateEvent.isPresent()) {
            throw new RuntimeException("ERROR_DUPLICATE_EVENT");
        }
        return eventRepository.save(event);
    }
}
