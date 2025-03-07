package ee.riina.test.controller;

import ee.riina.test.entity.Word;
import ee.riina.test.entity.WordsReversed;
import ee.riina.test.repository.WordRepository;
import ee.riina.test.repository.WordsReversedRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
public class WordController {

    @Autowired
    private WordRepository wordRepository;
    @Autowired
    private WordsReversedRepository wordsReversedRepository;



    @GetMapping("words")
    public List<Word> getWords() {
        return wordRepository.findAll();
    }

    @GetMapping("/end-letters")
    public List<Character> getEndLetters() {
        return wordRepository.findAll().stream()
                .map(word -> word.getWord().charAt(word.getWord().length() - 1)) // Võtab viimase tähe
                .collect(Collectors.toList());
    }

    @GetMapping("/lengths")
    public List<Integer> getWordLengths() {
        return wordRepository.findAll().stream()
                .map(word -> word.getWord().length()) // Võtab sõna pikkuse
                .collect(Collectors.toList());
    }

    @GetMapping("/reverse")
    public List<String> getReversedWords() {
        List<WordsReversed> reversedWords = wordRepository.findAll().stream()
                .map(word -> new WordsReversed(new StringBuilder(word.getWord()).reverse().toString()))
                .collect(Collectors.toList());

        wordsReversedRepository.saveAll(reversedWords); // Salvestame pööratud sõnad andmebaasi

        return reversedWords.stream()
                .map(WordsReversed::getWord) // Võtame ainult sõnad, mitte objektid
                .collect(Collectors.toList());
    }

    @GetMapping("/reverse-list")
    public List<String> getReversedWordsFromDatabase() {
        return wordsReversedRepository.findAll().stream()
                .map(WordsReversed::getWord) // Võtab ainult sõnad, mitte objektid
                .collect(Collectors.toList());
    }

    @GetMapping("/end-letter")
    public char getMostCommonEndLetter() {
        return wordRepository.findAll().stream()
                .map(word -> word.getWord().charAt(word.getWord().length() - 1)) // Võtab viimase tähe
                .collect(Collectors.groupingBy(letter -> letter, Collectors.counting())) // Loendab tähti
                .entrySet().stream()
                .max((e1, e2) -> e1.getValue().compareTo(e2.getValue())) // Leiab kõige sagedasema tähe
                .map(Map.Entry::getKey)
                .orElse('?'); // Kui tabel on tühi, tagastab '?'
    }


    @PostMapping("words")
    public List<Word> addWord(@RequestBody Word word) {
        Optional<Word> duplicateWord = wordRepository.findByWord(word.getWord());

        // Kontroll, et ei saadetaks ID-ga
        if (word.getId() != null) {
            throw new RuntimeException("ERROR_CANNOT_ADD_WITH_ID");
        }

        // Sõna ei saa topelt lisada
        if (duplicateWord.isPresent()) {
            throw new RuntimeException("ERROR_DUPLICATE_WORD");
        }

        wordRepository.save(word);
        return wordRepository.findAll();
    }
}
