package ee.riina.test.entity;

import jakarta.persistence.*;
import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "reversed")

public class WordsReversed {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String word;

    // Konstruktor ilma ID-ta (kasulik andmebaasi salvestamiseks)
    public WordsReversed(String word) {
        this.word = word;
    }
}

