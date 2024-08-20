package com.luv2code.ecommerce.dao;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.luv2code.ecommerce.entity.Product;

// Specify path using @CrossOrigin to accept calls or requests from web browser scripts for this origin
// origin is -> protocol + hostname + port
// example...
// Same origin http://localhost:4200 == http://localhost:4200
// different origin http://localhost:4200 != http://localhost:8080
// So since we have different port numbers for frontend and backend, we need to use @CrossOrigin
// to allow the origin
@CrossOrigin("http://localhost:4200")
public interface ProductRepository extends JpaRepository<Product, Long> {

    // behind the scenes, Spring will execute a query similar to this
    // SELECT * FROM product where category_id=?
    // id=? will be from -> @Param("id") Long id
    // Also, Spring Data REST automatically exposes below endpoint
    // http://localhost:8080/api/products/search/findByCategoryId?id=${id}
    Page<Product> findByCategoryId(@Param("id") Long id, Pageable pageable);
}
