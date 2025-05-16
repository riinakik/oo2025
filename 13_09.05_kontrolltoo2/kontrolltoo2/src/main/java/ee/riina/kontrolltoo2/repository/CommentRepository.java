package ee.riina.kontrolltoo2.repository;

import ee.riina.kontrolltoo2.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findByPersonId(Long personId);
}
