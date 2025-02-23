package ee.riina.kymnevoistlus.repository;

import ee.riina.kymnevoistlus.entity.Athlete;
import ee.riina.kymnevoistlus.entity.Result;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface ResultRepository  extends JpaRepository<Result, Long> {
    List<Result> findByAthlete(Athlete athlete);
}


