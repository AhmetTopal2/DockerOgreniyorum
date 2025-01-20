package com.product.model;

import java.util.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "product")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Name is required")
    @Size(min = 3, max = 50, message = "Name must be between 3 and 50 characters")
    private String name;

    @Size(max = 500, message = "Description must be less than 500 characters")
    private String description;

    @NotNull(message = "Price is required")
    private Double price;

    @Size(max = 500, message = "Image URL must be less than 500 characters")
    private String imageUrl;

    @NotBlank(message = "Color is required")
    private String color;

    @NotBlank(message = "Brand is required")
    private String brand;

    @NotBlank(message = "Model is required")
    private String model;

    @NotNull(message = "Inventory is required")
    private Integer inventory;

    private Double discountPrice;

    private Integer discountPercentage;

    private Boolean hasDiscount;

    private Date createdProduct;

    @NotNull(message = "Production Date is required")
    private Date productionDate;

    @ManyToOne
    @JoinColumn(name = "category_id")
    @NotNull(message = "Category is required")
    private Category category;

    @ManyToOne
    @JoinColumn(name = "seller_id")
    @NotNull(message = "Seller is required")
    private Seller seller;
}
