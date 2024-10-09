package com.hw2;

import com.hw2.Booking;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

@RestController
@RequestMapping("/transform")
public class TransformationController {

    @PostMapping("/booking")
    public ResponseEntity<Booking> transformBooking(@RequestBody String plainText) {
        // Parse the input using regex
        Pattern idPattern = Pattern.compile("Tour id: \"(\\d+)\"");
        Pattern locationPattern = Pattern.compile("Location: \"([^\"]+)\"");
        Pattern personPattern = Pattern.compile("Person: \"([^\"]+)\"");

        Matcher idMatcher = idPattern.matcher(plainText);
        Matcher locationMatcher = locationPattern.matcher(plainText);
        Matcher personMatcher = personPattern.matcher(plainText);

        if (idMatcher.find() && locationMatcher.find() && personMatcher.find()) {
            // Extract values from the plain text
            String id = idMatcher.group(1);
            String location = locationMatcher.group(1);
            String person = personMatcher.group(1);

            // Split the person's name into first name and surname
            String[] personNameParts = person.split(" ");
            Booking.Person personObject = new Booking.Person(personNameParts[0], personNameParts[1]);

            // Create the Booking object and return it as JSON
            Booking booking = new Booking(id, location, personObject);

            return ResponseEntity.ok(booking);
        }

        // Return a 400 Bad Request if parsing fails
        return ResponseEntity.badRequest().build();
    }
}
