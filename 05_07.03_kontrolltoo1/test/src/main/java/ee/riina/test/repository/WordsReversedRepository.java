package ee.riina.test.repository;

import ee.riina.test.entity.WordsReversed;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface WordsReversedRepository extends JpaRepository<WordsReversed, Long> {
    Optional<WordsReversed> findByWord(String word); // Leiab sõna järgi
}
