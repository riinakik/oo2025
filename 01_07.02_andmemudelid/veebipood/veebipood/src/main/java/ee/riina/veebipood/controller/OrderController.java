package ee.riina.veebipood.controller;

import ee.riina.veebipood.entity.Order;
import ee.riina.veebipood.entity.Product;
import ee.riina.veebipood.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@CrossOrigin(origins = "http://localhost:5173/")
@RestController
public class OrderController {

    @Autowired
    OrderRepository orderRepository;
    //ei tagastaks kõiki tellimusi
    //todo: pean võtma front endist ainult id ja mitte usaldama sealt tulevat hinda

    @GetMapping("orders")
    public List <Order> getOrders() {
        return orderRepository.findAll();
    };

    @PostMapping("orders")
    public List<Order> addOrder(@RequestBody Order order) {
        order.setCreated(new Date());
        double sum = 0;

        for (Product p: order.getProducts()){
          sum = sum + p.getPrice();
        }

        order.setTotalSum(sum);
        orderRepository.save(order);
        return orderRepository.findAll();
    }
}
