package ee.riina.proovitoo2.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
public class Word {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long typeID;

    private String type;

    //@Lob  // võimaldab väga pikki tekste
    //@Column(length = 5000)
    @Column(length = 1000)
    private String description;
}

