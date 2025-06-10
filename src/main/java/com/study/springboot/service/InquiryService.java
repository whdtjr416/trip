package com.study.springboot.service;

import com.study.springboot.model.Inquiry;
import com.study.springboot.repository.InquiryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InquiryService {

    @Autowired
    private InquiryRepository inquiryRepository;

    public List<Inquiry> getAllInquiries() {
        return inquiryRepository.findAll();
    }

    public Inquiry saveInquiry(Inquiry inquiry) {
        return inquiryRepository.save(inquiry);
    }
    public void deleteInquiry(Long id) {
        inquiryRepository.deleteById(id);
    }
}
