package ee.riina.veebipood.controller;

import ee.riina.veebipood.entity.Product;
import ee.riina.veebipood.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin (origins = "http://localhost:5173/")
@RestController
public class ProductController {

    @Autowired
    ProductRepository productRepository;
    //http://localhost:8080/products

    @GetMapping("products")
    public List<Product> getProducts() {
        return productRepository.findAll();
    }

    @PostMapping("products")
    public List<Product> addProduct(@RequestBody Product product) {
        if (product.getId() != null){
          throw  new RuntimeException("ERROR_CANNOT_ADD_WITH_ID");
        }
        if (product.getPrice() <= 0){
            throw  new RuntimeException("ERROR_PRICE_MUST_BE_POSITIVE");
        }
        productRepository.save(product);
        return productRepository.findAll();
    }

    //DELETE localhost:8080/products/1 jne
    @DeleteMapping("products/{id}")
    public List<Product> deleteProduct(@PathVariable Long id) {
        productRepository.deleteById(id);
        return productRepository.findAll();
    }

    @PutMapping("products")
    public List<Product> editProduct(@RequestBody Product product) {
        if (product.getId() == null){
            throw  new RuntimeException("ERROR_CANNOT_EDIT_WITHOUT_ID");
        }
        if (product.getPrice() <= 0){
            throw  new RuntimeException("ERROR_PRICE_MUST_BE_POSITIVE");
        }
        productRepository.save(product);
        return productRepository.findAll();
    }

    @GetMapping("products/{id}")
    public Product getProduct(@PathVariable Long id) {
        return productRepository.findById(id).orElseThrow();
    }

    @PatchMapping("products") // PATCH localhost:8080/products/id=4&field=name&value=aura
    public List<Product> editProductValue(@RequestParam Long id, String field, String value) {
        if (id == null){
            throw  new RuntimeException("ERROR_CANNOT_EDIT_WITHOUT_ID");
        }
        Product product = productRepository.findById(id).orElseThrow();
        switch (field) {
            case "name" -> product.setName(value);
            case "price" -> {
                if (Double.parseDouble(value) <= 0) {
                    throw new RuntimeException("ERROR_PRICE_MUST_BE_POSITIVE");
                }
                product.setPrice(Double.parseDouble(value));
            }
            case "image" -> product.setImage(value);
            case "active" -> product.setActive(Boolean.parseBoolean(value));
        }


        productRepository.save(product);
        return productRepository.findAll();
    }


}

//kui on 1 on ilusam kasutada @PathVariable
//kui on 2 või enam parameetrit peaks kasutama RequestParam

// 1xx informatiivsed, meie ei kasuta
// 2xx edukad, 200 201(created, lisatud)
// 3xx suunamine, meie ei kasuta
// 4xx päringu tegija veaga front-end viga. client error
// 400 üldine viga, 401, 403 audentimisega, 402 maksetega
// 404 api endpoint vale, 405 method not allowed, mapping valesti
// 415 sisu tüüp vale
// 5xx back end viga