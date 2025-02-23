package ee.riina.kymnevoistlus.dto;

public class AthletePointsDTO {
    private Long id;
    private String name;
    private String country;
    private int age;
    private int totalPoints;

    public AthletePointsDTO(Long id, String name, String country, int age, int totalPoints) {
        this.id = id;
        this.name = name;
        this.country = country;
        this.age = age;
        this.totalPoints = totalPoints;
    }

    // Getterid ja setterid

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getCountry() {
        return country;
    }

    public int getAge() {
        return age;
    }

    public int getTotalPoints() {
        return totalPoints;
    }
}