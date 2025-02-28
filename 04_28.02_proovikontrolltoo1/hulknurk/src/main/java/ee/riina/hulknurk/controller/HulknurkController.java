package ee.riina.hulknurk.controller;

import ee.riina.hulknurk.entity.Hulknurk;
import ee.riina.hulknurk.repository.HulknurkRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController


public class HulknurkController {

    @Autowired
    private HulknurkRepository hulknurkRepository;

    // Kuvab kõik objektid andmebaasist
    @GetMapping("hulknurk")
    public List<Hulknurk> getNumbers() {
        return hulknurkRepository.findAll();
    }

    // Lisab uue objekti andmebaasi
    @PostMapping("hulknurk")
    public List<Hulknurk> addNumber(@RequestBody Hulknurk hulknurk) {
        Optional<Hulknurk> duplicateNumber = hulknurkRepository.findByXAndY(hulknurk.getX(), hulknurk.getY());

        if (duplicateNumber.isEmpty()) {
            hulknurkRepository.save(hulknurk);
        }

        return hulknurkRepository.findAll();
    }

    // Kujundi ümbermõõdu arvutamine
    @GetMapping("/perimeter")
    public String getPerimeter() {
        List<Hulknurk> points = hulknurkRepository.findAll();

        if (points.size() < 3) {
            return "Viga: Kujundi ümbermõõdu arvutamiseks on vaja vähemalt 3 koordinaati.";
        }

        double perimeter = 0.0;

        for (int i = 0; i < points.size(); i++) {
            Hulknurk p1 = points.get(i);
            Hulknurk p2 = points.get((i + 1) % points.size()); // Viimane punkt ühendatakse esimesega

            double distance = Math.sqrt(Math.pow(p2.getX() - p1.getX(), 2) + Math.pow(p2.getY() - p1.getY(), 2));
            perimeter += distance;
        }

        return "Kujundi ümbermõõt: " + perimeter;
    }

    // 1. Kõikide x väärtuste muutmine
    @PutMapping("/update-x/{amount}")
    public List<Hulknurk> updateXCoordinates(@PathVariable int amount) {
        List<Hulknurk> hulknurgad = hulknurkRepository.findAll();

        for (Hulknurk hulknurk : hulknurgad) {
            hulknurk.setX(hulknurk.getX() + amount); // Muudame X väärtust
        }

        hulknurkRepository.saveAll(hulknurgad); // Save

        return hulknurkRepository.findAll(); // Tagasta uuendatud andmed
    }

    // 2. Kõikide y väärtuste muutmine
    @PutMapping("/update-y/{amount}")
    public List<Hulknurk> updateYCoordinates(@PathVariable int amount) {
        List<Hulknurk> hulknurgad = hulknurkRepository.findAll();

        for (Hulknurk hulknurk : hulknurgad) {
            hulknurk.setY(hulknurk.getY() + amount); // Muudame Y väärtust
        }

        hulknurkRepository.saveAll(hulknurgad); // Salvesta

        return hulknurkRepository.findAll(); // Tagastame uuendatud andmed
    }


}
