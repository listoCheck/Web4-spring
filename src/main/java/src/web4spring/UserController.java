package src.web4spring;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api")
public class UserController {
    @Autowired
    private UserRepository userRepository;

    @GetMapping("/register")
    public ResponseEntity<String> registerUser(@RequestParam String username, @RequestParam String password) {
        System.out.println("Получены параметры: login=" + username + ", password=" + password);
        if (userRepository.findByName(username) == null) {
            User user = new User(username, password);
            userRepository.save(user);
            return ResponseEntity.ok("Пользователь успешно зарегистрирован");
        }else{
            return ResponseEntity.status(401).body("Уже регнут");
        }
    }
    @GetMapping("/login")
    public ResponseEntity<String> loginUser(@RequestParam String username, @RequestParam String password) {
        System.out.println("Получены параметры: login=" + username + ", password=" + password);
        User user = userRepository.findByName(username);
        if (user != null && user.getPassword().equals(password)) {
            return ResponseEntity.ok("Пользователь успешно вошел");
        } else {
            return ResponseEntity.status(401).body("Неверный логин или пароль");
        }
    }
    @GetMapping("/checkPoint")
    public ResponseEntity<Boolean> checkPoint(@RequestParam double x, @RequestParam double y, @RequestParam double r) {
        System.out.println("Получены данные: x=" + x + ", y=" + y + ", r=" + r);
        Point point = new Point(x, y, r);
        if (point.isHit()){
            return ResponseEntity.ok(true);
        }else{
            return ResponseEntity.ok(false);
        }
    }

}

