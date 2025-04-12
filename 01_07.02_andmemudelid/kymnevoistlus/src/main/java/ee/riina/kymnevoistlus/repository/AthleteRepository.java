package ee.riina.kymnevoistlus.repository;

import ee.riina.kymnevoistlus.entity.Athlete;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface AthleteRepository extends JpaRepository<Athlete, Long> {
    Optional<Athlete> findByName(String name);

    Page<Athlete> findByCountry(String country, Pageable pageable);
    // ← See on uus lisatav rida:

    @Query("SELECT DISTINCT a.country FROM Athlete a")
    List<String> findDistinctCountries();


}
