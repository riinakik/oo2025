package ee.riina.proovitoo.repository;

import java.util.Optional;
import ee.riina.proovitoo.entity.MyNumber;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MyNumberRepository extends JpaRepository<MyNumber, Long> {
    Optional<MyNumber> findByArv(int arv);
}
