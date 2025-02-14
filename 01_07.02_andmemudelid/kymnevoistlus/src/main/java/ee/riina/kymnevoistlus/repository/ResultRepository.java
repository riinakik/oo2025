package ee.riina.kymnevoistlus.repository;

import ee.riina.kymnevoistlus.entity.Result;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ResultRepository  extends JpaRepository<Result, Long> {
}
