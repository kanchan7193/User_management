package com.usermgmt.model;

import javax.persistence.*;

@Entity
@Table(name = "Users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(name = "name")
    private String name;

    @Column(name = "email")
    private String email;

    @Column(name = "password")
    private String password;

    @Column(name = "active")
    private boolean active;

    public User() {

    }
    public User(String name, String email, String password, boolean active) {
            this.name=name;
            this.email=email;
            this.password=password;
            this.active=active;
    }
    public long getId() {
        return id;
    }
    public String getName() {
        return name;
    }
    public void setName(String name){
        this.name=name;
    }
    public String getEmail(){
        return email;
    }
    public void setEmail(String email){
        this.email=email;
    }
    public String getPassword(){
        return password;
    }
    public void setPassword(String password){
        this.password=password;
    }
    public boolean getActive() {
        return active;
    }
    public void setActive(boolean active){
        this.active=active;
    }

    @Override
    public String toString(){
        return "User:"+ name+ ","+ active+ "";
    }

}