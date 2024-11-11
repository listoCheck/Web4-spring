package src.web4spring;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api")
public class UserController {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private JavaMailSender mailSender;

    private static final String SECRET_KEY = "1234567890123456";

    @GetMapping("/register")
    public ResponseEntity<String> registerUser(@RequestParam String username, @RequestParam String password) {
        System.out.println("Получены параметры: login=" + username + ", password=" + password);
        try {
            // Шифруем пароль перед сохранением
            String encryptedPassword = EncryptionUtils.encrypt(password, SECRET_KEY);

            if (userRepository.findByName(username) == null) {
                User user = new User(username, encryptedPassword);
                userRepository.save(user);
                return ResponseEntity.ok("Пользователь успешно зарегистрирован");
            } else {
                return ResponseEntity.status(401).body("Пользователь уже зарегистрирован");
            }
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Ошибка при шифровании пароля");
        }
    }

    @GetMapping("/login")
    public ResponseEntity<String> loginUser(@RequestParam String username, @RequestParam String password) {
        System.out.println("Получены параметры: login=" + username + ", password=" + password);
        User user = userRepository.findByName(username);

        if (user != null) {
            try {
                String decryptedPassword = EncryptionUtils.decrypt(user.getPassword(), SECRET_KEY);
                //sendLoginNotification(username, "artem.amuz@gmail.com");
                if (decryptedPassword.equals(password)) {
                    return ResponseEntity.ok("Пользователь успешно вошел");
                } else {
                    return ResponseEntity.status(401).body("Неверный логин или пароль");
                }
            } catch (Exception e) {
                return ResponseEntity.status(500).body("Ошибка при дешифровании пароля");
            }
        } else {
            return ResponseEntity.status(401).body("Неверный логин или пароль");
        }
    }

    @GetMapping("/checkPoint")
    public ResponseEntity<Boolean> checkPoint(@RequestParam double x, @RequestParam double y, @RequestParam double r) {
        System.out.println("Получены данные: x=" + x + ", y=" + y + ", r=" + r);
        Point point = new Point(x, y, r);
        if (point.isHit()) {
            return ResponseEntity.ok(true);
        } else {
            return ResponseEntity.ok(false);
        }
    }
    private void sendLoginNotification(String username, String targetEmail) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(targetEmail);
        message.setSubject("Уведомление о входе");
        message.setText("Пользователь " + username + " успешно вошел в систему.");

        mailSender.send(message);
        System.out.println("Письмо отправлено на " + targetEmail);
    }
}
