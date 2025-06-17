package com.study.springboot.dto;

public class WeatherDTO {
    private String city;
    private double temperature; // 온도 (섭씨)
    private String description; // 날씨 상태 (예: 맑음, 비)
    private int humidity; // 습도
    private double windSpeed; // 풍속

    // 기본 생성자
    public WeatherDTO() {}

    // 매개변수 생성자
    public WeatherDTO(String city, double temperature, String description, int humidity, double windSpeed) {
        this.city = city;
        this.temperature = temperature;
        this.description = description;
        this.humidity = humidity;
        this.windSpeed = windSpeed;
    }

    // Getter와 Setter
    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public double getTemperature() {
        return temperature;
    }

    public void setTemperature(double temperature) {
        this.temperature = temperature;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getHumidity() {
        return humidity;
    }

    public void setHumidity(int humidity) {
        this.humidity = humidity;
    }

    public double getWindSpeed() {
        return windSpeed;
    }

    public void setWindSpeed(double windSpeed) {
        this.windSpeed = windSpeed;
    }
}
