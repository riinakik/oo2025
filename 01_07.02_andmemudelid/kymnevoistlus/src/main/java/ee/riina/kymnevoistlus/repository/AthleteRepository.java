package ee.riina.kymnevoistlus.repository;

import ee.riina.kymnevoistlus.entity.Athlete;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AthleteRepository extends JpaRepository<Athlete, Long> {
}
