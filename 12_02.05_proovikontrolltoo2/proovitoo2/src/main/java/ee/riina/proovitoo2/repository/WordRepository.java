package ee.riina.proovitoo2.repository;

import ee.riina.proovitoo2.entity.Word;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WordRepository extends JpaRepository<Word, Long> {
}
