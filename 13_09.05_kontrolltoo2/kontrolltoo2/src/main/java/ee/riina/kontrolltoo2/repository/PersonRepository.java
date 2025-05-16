package ee.riina.kontrolltoo2.repository;

import ee.riina.kontrolltoo2.entity.Person;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PersonRepository extends JpaRepository<Person, Long> {
}
