package com.example.demo.auth.repository;

import com.example.demo.auth.model.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends CrudRepository<User, Long> {

    Optional<User> findByEmail (String email);
    Optional<User> findByVerificationCode(String verificationCode);



}
