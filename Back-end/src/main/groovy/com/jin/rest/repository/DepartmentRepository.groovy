package com.jin.rest.repository

import com.jin.rest.entity.Department
import org.springframework.data.jpa.repository.JpaRepository;

interface DepartmentRepository extends JpaRepository<Department, Integer> {

}