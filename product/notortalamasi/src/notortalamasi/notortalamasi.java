package notortalamasi;

import java.util.Scanner;

public class notortalamasi {

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.println("Not ortalaması uygulamasına hoşgeldiniz");
        
        int vize = 0;
        int final1 = 0;

        try {
            System.out.print("Vize Notunuzu Giriniz: ");
            vize = scanner.nextInt();
        } catch (Exception ex) {
            System.out.println("Geçersiz bir giriş yaptınız. Lütfen bir sayı girin.");
            scanner.next(); // Hatalı girişi temizlemek için
            return;
        }

        try {
            System.out.print("Final Notunuzu Giriniz: ");
            final1 = scanner.nextInt();
        } catch (Exception ex) {
            System.out.println("Geçersiz bir giriş yaptınız. Lütfen bir sayı girin.");
            scanner.next(); // Hatalı girişi temizlemek için
            return;
        }

        double ortalama = vize * 0.4 + final1 * 0.6;
        System.out.println("Not ortalamanız: " + ortalama);
        
        scanner.close();
    }
}
