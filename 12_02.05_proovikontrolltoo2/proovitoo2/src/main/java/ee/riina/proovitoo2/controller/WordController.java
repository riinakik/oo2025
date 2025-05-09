package ee.riina.proovitoo2.controller;

import ee.riina.proovitoo2.entity.Word;
import ee.riina.proovitoo2.repository.WordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173/")
@RestController
public class WordController {

    @Autowired
    WordRepository wordRepository;

    // GET http://localhost:8080/words   TÖÖTAB
    @GetMapping("/words")
    public List<Word> getWords() {
        return wordRepository.findAll();
    }

    // POST ühe sõna lisamiseks
    @PostMapping("/word")
    public List<Word> addOneWord(@RequestBody Word word) {
        wordRepository.save(word);
        return wordRepository.findAll();
    }

    // POST massiivi lisamiseks
    @PostMapping("/words")
    public ResponseEntity<?> addWords(@RequestBody List<Word> words) {
        wordRepository.saveAll(words);
        return ResponseEntity.ok("Words saved successfully");
    }


    // DELETE ühe sõna kustutamiseks typeID järgi    TÖÖTAB
    @DeleteMapping("/words/{typeID}")
    public List<Word> deleteWord(@PathVariable Long typeID) {
        wordRepository.deleteById(typeID);
        return wordRepository.findAll();
    }

    // PUT – terve objekti muutmine
    @PutMapping("/words")
    public List<Word> editWord(@RequestBody Word word) {
        wordRepository.save(word);
        return wordRepository.findAll();
    }

    // GET ühe sõna toomiseks typeID järgi     TÖÖTAB
    @GetMapping("/words/{typeID}")
    public Word getWord(@PathVariable Long typeID) {
        return wordRepository.findById(typeID).orElseThrow();
    }

    // PATCH – ühe välja muutmine
    // Näide: http://localhost:8080/words?typeID=5&field=type&value=NewValue
    @PatchMapping("/words")
    public List<Word> editWordField(@RequestParam Long typeID, @RequestParam String field, @RequestParam String value) {
        if (typeID == null) {
            throw new RuntimeException("ERROR_CANNOT_EDIT_WITHOUT_TYPEID");
        }

        Word word = wordRepository.findById(typeID).orElseThrow();

        switch (field) {
            case "type" -> word.setType(value);
            case "description" -> word.setDescription(value);
            default -> throw new RuntimeException("ERROR_UNKNOWN_FIELD");
        }

        wordRepository.save(word);
        return wordRepository.findAll();
    }
}
