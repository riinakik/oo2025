package ee.riina.veebipood.controller;

import ee.riina.veebipood.entity.Product;
import ee.riina.veebipood.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

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
        productRepository.save(product);
        return productRepository.findAll();
    }
    }