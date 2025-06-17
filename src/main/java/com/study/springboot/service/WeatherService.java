package com.study.springboot.service;

import com.study.springboot.dto.WeatherDTO;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.client.RestClientException;

@Service
public class WeatherService {

    private static final Logger logger = LoggerFactory.getLogger(WeatherService.class);

    @Value("${weather.api.key}")
    private String apiKey;

    @Value("${weather.api.url}")
    private String apiUrl;

    public WeatherDTO getWeather(String city) {
        RestTemplate restTemplate = new RestTemplate();
        String url = apiUrl + "?q=" + city + "&appid=" + apiKey + "&units=metric&lang=kr";

        try {
            // API 호출
            ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);
            if (response.getStatusCode().is2xxSuccessful()) {
                JSONObject jsonObject = new JSONObject(response.getBody());

                // JSON 데이터에서 필요한 정보 추출
                JSONObject main = jsonObject.getJSONObject("main");
                JSONObject weather = jsonObject.getJSONArray("weather").getJSONObject(0);
                JSONObject wind = jsonObject.getJSONObject("wind");

                double temperature = main.getDouble("temp");
                int humidity = main.getInt("humidity");
                String description = weather.getString("description");
                double windSpeed = wind.getDouble("speed");

                logger.info("Successfully fetched weather data for city: {}", city);
                return new WeatherDTO(city, temperature, description, humidity, windSpeed);
            } else {
                logger.error("Failed to fetch weather data for city: {}. Status code: {}", city, response.getStatusCode());
                return null;
            }
        } catch (RestClientException e) {
            logger.error("Error while fetching weather data for city: {}. Exception: {}", city, e.getMessage());
            return null;
        } catch (Exception e) {
            logger.error("Unexpected error while processing weather data for city: {}. Exception: {}", city, e.getMessage());
            return null;
        }
    }
}
