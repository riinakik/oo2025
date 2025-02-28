package ee.riina.proovitoo.controller;

import ee.riina.proovitoo.entity.MyNumber;
import ee.riina.proovitoo.repository.MyNumberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
public class MyNumberController {

    @Autowired
    private MyNumberRepository myNumberRepository;

    // Kuvab kõik objektid andmebaasist
    @GetMapping("numbers")
    public List<MyNumber> getNumbers() {
        return myNumberRepository.findAll();
    }

    // Lisab uue objekti andmebaasi
    @PostMapping("numbers")
    public List<MyNumber> addNumber(@RequestBody MyNumber myNumber) {
        Optional<MyNumber> duplicateNumber = myNumberRepository.findByArv(myNumber.getArv());

        if (duplicateNumber.isEmpty()) {
            myNumberRepository.save(myNumber);
        }

        return myNumberRepository.findAll();
    }

    // Kõigi numbrite summa
    @GetMapping("/sum")
    public int getSum() {
        return myNumberRepository.findAll().stream()
                .mapToInt(MyNumber::getArv)
                .sum();
    }

    // Aritmeetiline keskmine
    @GetMapping("/average")
    public double getAverage() {
        return myNumberRepository.findAll().stream()
                .mapToInt(MyNumber::getArv)
                .average()
                .orElse(0.0);
    }

    // Suurim number
    @GetMapping("/max")
    public int getMax() {
        return myNumberRepository.findAll().stream()
                .mapToInt(MyNumber::getArv)
                .max()
                .orElse(0);
    }

    // libisev keskmine
    @GetMapping("/moving-average")
    public List<Double> getMovingAverage() {
        List<Integer> numbers = myNumberRepository.findAll().stream()
                .map(MyNumber::getArv)
                .toList();

        List<Double> movingAverages = new ArrayList<>();

        for (int i = 0; i < numbers.size() - 2; i++) {
            double average = (numbers.get(i) + numbers.get(i + 1) + numbers.get(i + 2)) / 3.0;
            movingAverages.add(average);
        }

        return movingAverages;
    }


}
