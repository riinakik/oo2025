package ee.riina.proovitoo2.controller;

import ee.riina.proovitoo2.entity.Word;
import ee.riina.proovitoo2.repository.WordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173/")
@RestController
public class WordController {

    @Autowired
    WordRepository wordRepository;

    // GET http://localhost:8080/words
    @GetMapping("/words")
    public List<Word> getWords() {
        return wordRepository.findAll();
    }

    @PostMapping("/word")
    public List<Word> addOneWord(@RequestBody Word word) {
        wordRepository.save(word);
        return wordRepository.findAll();
    }


    //@PostMapping("/words")
    //public List<Word> addWords(@RequestBody List<Word> words) {
      //  wordRepository.saveAll(words);
       // return wordRepository.findAll();
   // }




    // DELETE http://localhost:8080/words/1
    @DeleteMapping("words/{id}")
    public List<Word> deleteWord(@PathVariable Long id) {
        wordRepository.deleteById(id);
        return wordRepository.findAll();
    }

    // PUT http://localhost:8080/words
    @PutMapping("words")
    public List<Word> editWord(@RequestBody Word word) {
        wordRepository.save(word);
        return wordRepository.findAll();
    }

    // GET http://localhost:8080/words/1
    @GetMapping("words/{id}")
    public Word getWord(@PathVariable Long id) {
        return wordRepository.findById(id).orElseThrow();
    }

    // PATCH http://localhost:8080/words?id=1&field=type&value=newValue
    @PatchMapping("words")
    public List<Word> editWordField(@RequestParam Long id, @RequestParam String field, @RequestParam String value) {
        if (id == null) {
            throw new RuntimeException("ERROR_CANNOT_EDIT_WITHOUT_ID");
        }

        Word word = wordRepository.findById(id).orElseThrow();

        switch (field) {
            case "type" -> word.setType(value);
            case "description" -> word.setDescription(value);
            default -> throw new RuntimeException("ERROR_UNKNOWN_FIELD");
        }

        wordRepository.save(word);
        return wordRepository.findAll();
    }
}
