package ee.riina.proovitoo2.repository;

import ee.riina.proovitoo2.entity.Word;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface WordRepository extends JpaRepository<Word, Long> {

    List<Word> findByParent_Id(Long id);
}
