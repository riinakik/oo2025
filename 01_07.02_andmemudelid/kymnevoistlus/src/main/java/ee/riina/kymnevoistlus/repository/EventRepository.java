package ee.riina.kymnevoistlus.repository;

import java.util.Optional;
import ee.riina.kymnevoistlus.entity.Event;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EventRepository extends JpaRepository<Event, Long> {
    Optional<Event> findByName(String name);
}
