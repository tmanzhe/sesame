//models pacakge in springboot serves the purpose of defining the structure of your data and it's connection to the database.
//represents real world entities (user,products,order etc)

package com.example.demo.model;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;

//marks this class as a JPA entity, so basically it gets mapped to a database table
@Entity
//this tells our JPA that this class maps to the user table that we set up in supabase
@Table(name = "users")
//provided by lombok to generate getters and setters automatically
@Getter
@Setter
//uses the springboot security and provides needed user info thats why we implement
public class User implements UserDetails {
    @Id //marks id as the primary key
    @GeneratedValue(strategy = GenerationType.AUTO) //auto generates the id when a new user is created
    private Long id;
    private boolean enabled;
    @Column(name = "verification_code")
    private String verificationCode;
    @Column(name = "verification_expiration")
    private LocalDateTime VerificationCodeExpiresAt;
    @Column(unique = true, nullable = false) //makes sure username and emails are unique and not empty
    private String username;
    @Column(unique=true, nullable = false)
    private String email;
    @Column(nullable = false) //make sure password is not empty
    private String password;

    public User(String username, String email, String password) {
        this.username = username;
        this.email = email;
        this.password = password;
    }

    public User() {
    }

    //returns a list of user's roles/perms
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of();
    }

    //will change later
    @Override
    public boolean isAccountNonExpired(){
        return true;
    }

    @Override
    public boolean isAccountNonLocked(){
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired(){
        return true;
    }

    @Override
    public boolean isEnabled(){
        return enabled;
    }

}
