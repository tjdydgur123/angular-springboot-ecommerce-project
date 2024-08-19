package com.luv2code.ecommerce.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.luv2code.ecommerce.entity.ProductCategory;

// Both the name of the resource and the path can be customized by using
// @RepositoryRestResource on the repository interface.
// If you remove the @RepositoryRestResource, then the path 
// will be "http://localhost:8080/api/productCategories" by default
@RepositoryRestResource(collectionResourceRel = "productCategory", path = "product-category")
public interface ProductCategoryRepository extends JpaRepository<ProductCategory, Long>{
    
}
