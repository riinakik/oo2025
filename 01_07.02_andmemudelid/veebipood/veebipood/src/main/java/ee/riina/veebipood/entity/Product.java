package ee.riina.veebipood.entity;

// hibernate
// automaatselt tekib andmebaasi tabel, mis on klassi nimega
//fail settings plugins jpa buddy install
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter //encapsulation private
@Entity
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; //int
    private String name;
    private double price;
    private String image;
    private boolean active;
}

