package ee.riina.kymnevoistlus.controller;

import java.util.Map;

public class DecathlonScoring {

    // IAAF koefitsiendid kümnevõistluse alade jaoks
    private static final Map<String, double[]> SCORE_PARAMETERS = Map.of(
            "100m", new double[]{25.4347, 18, 1.81},
            "400m", new double[]{1.53775, 82, 1.81},
            "1500m", new double[]{0.03768, 480, 1.85},
            "110m hurdles", new double[]{5.74352, 28.5, 1.92},
            "long jump", new double[]{0.14354, 220, 1.4},
            "high jump", new double[]{0.8465, 75, 1.42},
            "pole vault", new double[]{0.2797, 100, 1.35},
            "shot put", new double[]{51.39, 1.5, 1.05},
            "discus throw", new double[]{12.91, 4, 1.1},
            "javelin throw", new double[]{10.14, 7, 1.08}
    );

    // Punktiarvestuse meetod (STAATILINE)
    public static int calculateScore(String eventName, double result) {
        if (!SCORE_PARAMETERS.containsKey(eventName)) {
            return 0; // Tundmatu ala
        }

        double[] params = SCORE_PARAMETERS.get(eventName);
        double A = params[0];
        double B = params[1];
        double C = params[2];

        // Jooksualad (100m, 400m, 110m tõkkejooks, 1500m)
        if (eventName.contains("m") && !eventName.contains("jump")) {
            return (int) (A * Math.pow(B - result, C));
        }
        // Hüpped ja visked
        else {
            return (int) (A * Math.pow(result - B, C));
        }
    }
}
