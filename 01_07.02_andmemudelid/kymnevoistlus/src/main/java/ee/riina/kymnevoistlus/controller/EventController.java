package ee.riina.kymnevoistlus.controller;

import ee.riina.kymnevoistlus.entity.Event;
import ee.riina.kymnevoistlus.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

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
        return eventRepository.save(event);
    }
}
