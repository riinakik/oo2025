package ee.riina.proovitoo2.entity;

import jakarta.persistence.*;
// import lombok.AllArgsConstructor;
// import lombok.Getter;
// import lombok.NoArgsConstructor;
// import lombok.Setter;

// @NoArgsConstructor
// @AllArgsConstructor
// @Getter
// @Setter
@Entity
public class Word {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long typeID;

    private String type;

    @Column(columnDefinition = "TEXT")
    private String description;

    public Word() {
    }

    public Word(Long typeID, String type, String description) {
        this.typeID = typeID;
        this.type = type;
        this.description = description;
    }

    public Long getTypeID() {
        return typeID;
    }

    public void setTypeID(Long typeID) {
        this.typeID = typeID;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}


