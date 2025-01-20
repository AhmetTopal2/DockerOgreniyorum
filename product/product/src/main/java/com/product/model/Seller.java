package com.product.model;

import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "seller")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@JsonIgnoreProperties({"products"})
public class Seller {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "İsim zorunludur")
    @Size(min = 3, max = 50, message = "İsim 3-50 karakter arasında olmalıdır")
    private String name;

    @NotBlank(message = "Soyisim zorunludur")
    @Size(min = 2, max = 50, message = "Soyisim 2-50 karakter arasında olmalıdır")
    private String surname;

    @NotBlank(message = "E-posta zorunludur")
    @Email(message = "Geçerli bir e-posta adresi giriniz")
    private String email;

    @NotBlank(message = "Telefon numarası zorunludur")
    @Size(min = 10, max = 15, message = "Geçerli bir telefon numarası giriniz")
    private String phone;

    @Size(max = 1000, message = "Biyografi en fazla 1000 karakter olabilir")
    private String bio;

    @NotBlank(message = "Adres zorunludur")
    @Size(max = 500, message = "Adres en fazla 500 karakter olabilir")
    private String address;

    @NotNull(message = "Aktiflik durumu zorunludur")
    private Boolean isActive;

    private Date createdDate;

    private Date updatedDate;

    @OneToMany(mappedBy = "seller", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Product> products;
} 