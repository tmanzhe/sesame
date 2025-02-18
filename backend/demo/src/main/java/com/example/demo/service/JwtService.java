package com.example.demo.service;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Value;
import io.jsonwebtoken.Claims;

import javax.crypto.SecretKey;

@Service
public class JwtService {

    @Value("${security.jwt.secret-key}") // Injects secret key from application properties
    private String secretKey;

    @Value("${security.jwt.expiration-time}") // Injects token expiration time from properties
    private long jwtExpiration;

    // Extracts the username (subject) from a given JWT token
    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    // Generic method to extract any claim from the token using a function
    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver){
        final Claims claims = extractAllClaims(token); // Calls helper method to parse token claims
        return claimsResolver.apply(claims); // Applies the given function to extract a specific claim
    }

    // Generates a JWT token with default (empty) claims for the given user
    public String generateToken (UserDetails userDetails){
        return generateToken(new HashMap<>(), userDetails);
    }

    // Generates a JWT token with additional claims and user information
    public String generateToken(Map<String, Object> extraClaims, UserDetails userDetails) {
        return buildToken(extraClaims, userDetails, jwtExpiration);
    }

    // Returns the configured JWT expiration time
    public long getJwtExpirationTime(){
        return jwtExpiration;
    }

    // Builds a JWT token with claims, subject, issued time, expiration, and signing key
    private String buildToken(
            Map<String, Object> extraClaims,
            UserDetails userDetails,
            long expiration) {
        return Jwts
                .builder()
                .claims(extraClaims) // Adds extra claims to the token
                .subject(userDetails.getUsername()) // Sets the subject (username)
                .issuedAt(new Date(System.currentTimeMillis())) // Sets issue time to now
                .expiration(new Date(System.currentTimeMillis() + expiration)) // Sets expiration time
                .signWith(getSignInKey()) // Signs the token using HMAC SHA-256
                .compact(); // Generates the final JWT token string
    }

    // Validates a token by checking if it matches the user's username and is not expired
    public boolean isTokenValid(String token, UserDetails userDetails){
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }

    // Checks if the token's expiration time has passed
    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    // Extracts the expiration date from the token
    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    private Claims extractAllClaims(String token) {
        // Extract claims after signature verification
        return Jwts
                .parser()
                .verifyWith(getSignInKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    private SecretKey getSignInKey() {
        byte[] keyBytes = Decoders.BASE64.decode(secretKey); // Decodes the base64 key
        return Keys.hmacShaKeyFor(keyBytes); // ✅ Returns a SecretKey (compatible with verifyWith)
    }
}