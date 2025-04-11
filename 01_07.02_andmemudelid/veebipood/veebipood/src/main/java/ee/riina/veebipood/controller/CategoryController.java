package ee.riina.veebipood.controller;

import ee.riina.veebipood.entity.Category;
import ee.riina.veebipood.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin (origins = "http://localhost:5173/")
@RestController
public class CategoryController {

    @Autowired
    CategoryRepository categoryRepository;

    @GetMapping("categories")
    public List<Category> getCategories() {
        return categoryRepository.findAll();
    }

    @PostMapping("categories")
    public List<Category> addCategory(@RequestBody Category category) {
        if (category.getId() != null){
            throw  new RuntimeException("ERROR_CANNOT_ADD_WITH_ID");
        }
        categoryRepository.save(category);
        return categoryRepository.findAll();
    }

    @DeleteMapping("categories/{id}")
    public List<Category> deleteCategory(@PathVariable Long id) {
        categoryRepository.deleteById(id);
        return categoryRepository.findAll();
    }

}
