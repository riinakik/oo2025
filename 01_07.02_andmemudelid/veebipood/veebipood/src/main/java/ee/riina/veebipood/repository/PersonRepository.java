package ee.riina.veebipood.repository;

import ee.riina.veebipood.entity.Person;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PersonRepository extends JpaRepository <Person, Long>{
}
