package ee.riina.veebipood.entity;

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
public class Person { //ERROR: syntax error at or near "user"
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; //int
    private String firstName;
    private String lastName;
    private String email;
    private String password;
}