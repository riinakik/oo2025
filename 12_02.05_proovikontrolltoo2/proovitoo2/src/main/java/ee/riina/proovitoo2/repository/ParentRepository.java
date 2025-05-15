package ee.riina.proovitoo2.repository;

import ee.riina.proovitoo2.entity.Parent;
import ee.riina.proovitoo2.entity.Word;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ParentRepository extends JpaRepository<Parent, Long>  {
}
