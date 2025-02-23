package ee.riina.veebipood.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


import java.util.Date;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter //encapsulation private
@Entity
@Table(name = "orders")
public class Order { //postgres order
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; //int
    private Date created;

    @ManyToOne
    private Person person;

    @ManyToMany(fetch = FetchType.EAGER)
    private List<Product> products;

    private double totalSum;
}
