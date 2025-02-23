package ee.riina.kymnevoistlus.repository;

import ee.riina.kymnevoistlus.entity.Athlete;
import ee.riina.kymnevoistlus.entity.Event;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AthleteRepository extends JpaRepository<Athlete, Long> {
    Optional<Athlete> findByName(String name);
}
