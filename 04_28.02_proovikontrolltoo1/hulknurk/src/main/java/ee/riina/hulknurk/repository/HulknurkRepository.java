package ee.riina.hulknurk.repository;

import ee.riina.hulknurk.entity.Hulknurk;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

@Repository
public interface HulknurkRepository extends JpaRepository<Hulknurk, Long> {
    Optional<Hulknurk> findByXAndY(int x, int y);
}
