package com.tujuhsembilan.webStore.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.tujuhsembilan.webStore.model.Orders;

@Repository
public interface OrderRepository extends JpaRepository<Orders, Integer> {

    
}
