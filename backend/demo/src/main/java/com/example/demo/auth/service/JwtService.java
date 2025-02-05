package com.example.demo.auth.service;

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
                .setClaims(extraClaims) // Adds extra claims to the token
                .setSubject(userDetails.getUsername()) // Sets the subject (username)
                .setIssuedAt(new Date(System.currentTimeMillis())) // Sets issue time to now
                .setExpiration(new Date(System.currentTimeMillis() + expiration)) // Sets expiration time
                .signWith(getSignInKey(), SignatureAlgorithm.HS256) // Signs the token using HMAC SHA-256
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
        return Jwts.parser() // Use parser() instead of parserBuilder()
                .setSigningKey(getSignInKey()) // Use setSigningKey() instead of verifyWith()
                .build() // Build the JwtParser from the JwtParserBuilder
                .parseClaimsJws(token) // Use parseClaimsJws() on the built parser
                .getBody();
    }
    // Converts the base64-encoded secret key into a cryptographic key for signing
    private Key getSignInKey() {
        byte[] keyBytes = Decoders.BASE64.decode(secretKey); // Decodes the base64 key
        return Keys.hmacShaKeyFor(keyBytes); // Converts it into an HMAC key
    }
}

/*
summary:

when a user logs in the system gives the user a digital passport.
this digital passport contains information unique to the user (so only info the users can see)
whenever they make a request to use OUR service, user has to present their passport to prove that they are valid
our system will check if they are valid or not

How Does JWT Work Here?
	1.	User logs in
	•	The system generates a JWT using generateToken().
	•	The JWT contains the username and other details.
	•	It is signed with a secret key so nobody can tamper with it.
	2.	User makes a request
	•	The system extracts the username from the JWT using extractUsername().
	•	It checks if the JWT is valid using isTokenValid().
	•	If valid, the user is allowed to proceed.
	3.	System checks token expiration
	•	Each token has an expiration time (jwtExpiration).
	•	The system checks if the token is still valid using isTokenExpired().
 */