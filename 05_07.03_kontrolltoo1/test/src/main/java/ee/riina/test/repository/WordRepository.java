package ee.riina.test.repository;


import java.util.Optional;
import ee.riina.test.entity.Word;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WordRepository extends JpaRepository<Word, Long> {
    Optional<Word> findByWord(String word);
}
