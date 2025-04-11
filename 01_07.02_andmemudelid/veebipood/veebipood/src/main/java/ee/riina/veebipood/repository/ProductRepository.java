package ee.riina.veebipood.repository;

import ee.riina.veebipood.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;  //määrab tagastuse

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
    // Repository tagastab ainult Product, List<product>
    // On juba sisse kirjutatud:
    // .findAll() ----> SELECT * From products
    // . save() -----> INSERT values() INTO products
    // .deleteById() ---> DELETE FROM products WHERE id=
    // .findById() ----> SELECT product FROM products

    //List<Product> find


    List<Product> findByCategory_Id(Long id);
}
