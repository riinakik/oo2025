package ee.riina.kontrolltoo2.controller;

import ee.riina.kontrolltoo2.entity.Comment;
import ee.riina.kontrolltoo2.repository.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173/")
public class CommentController {

    @Autowired
    private CommentRepository commentRepository;

    @GetMapping("/comments")
    public Page<Comment> getAllComments(Pageable pageable) {
        return commentRepository.findAll(pageable);
    }

    @GetMapping("/comments/{id}")
    public Comment getOneComment(@PathVariable Long id) {
        return commentRepository.findById(id).orElseThrow();
    }

    @PostMapping("/comments")
    public List<Comment> addComment(@RequestBody Comment comment) {
        commentRepository.save(comment);
        return commentRepository.findAll();
    }
}
