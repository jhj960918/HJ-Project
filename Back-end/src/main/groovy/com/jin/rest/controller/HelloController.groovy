package com.jin.rest.controller

import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
@CrossOrigin(origins = "http://localhost:8088")
@RestController
@RequestMapping("/api")
class HelloController {

    @GetMapping("/hello")
    String hello() {
        return "hello hj";
    }
}