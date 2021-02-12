package com.jin.rest.controller

import com.jin.rest.entity.Department
import com.jin.rest.repository.DepartmentRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController

@CrossOrigin(origins = "http://localhost:8080")
@RestController
class DepartmentController {
    @Autowired
    DepartmentRepository departmentRepository;

    @GetMapping("departments")
    List<Department> departments() { return departmentRepository.findAll(); }

    @GetMapping("department/{id}")
    Department department(@PathVariable("id") int id) { return departmentRepository.findById(id).get(); }

    @PostMapping("department")
    boolean insert(@RequestBody Department department) { departmentRepository.save(department); return true; }

    @PutMapping("department")
    boolean update(@RequestBody Department department) { departmentRepository.save(department); return true; }

    @DeleteMapping("department/{id}")
    boolean delete(@PathVariable("id") int id) { departmentRepository.deleteById(id); return true; }
}