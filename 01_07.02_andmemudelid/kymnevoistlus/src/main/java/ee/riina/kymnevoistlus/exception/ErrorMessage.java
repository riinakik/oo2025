package ee.riina.kymnevoistlus.exception;
import lombok.Data;
import java.util.Date;

@Data

public class ErrorMessage {
    private String message;
    private Date timestamp;
    private int status;
}