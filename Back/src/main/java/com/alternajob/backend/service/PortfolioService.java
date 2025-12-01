package com.alternajob.backend.service;

import com.alternajob.backend.model.Portfolio;
import com.alternajob.backend.model.User;
import com.alternajob.backend.repository.PortfolioRepository;
import com.alternajob.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PortfolioService {

    private final PortfolioRepository portfolioRepository;
    private final UserRepository userRepository;

    @Transactional(readOnly = true)
    public List<Portfolio> getAllPortfolios() {
        return portfolioRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Portfolio getPortfolioById(Long id) {
        return portfolioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Portfolio not found with id: " + id));
    }

    @Transactional(readOnly = true)
    public List<Portfolio> getPortfoliosByUser(Long userId) {
        if (!userRepository.existsById(userId)) {
            throw new RuntimeException("User not found with id: " + userId);
        }
        return portfolioRepository.findByUserId(userId);
    }

    @Transactional
    public Portfolio createPortfolio(Long userId, Portfolio portfolio) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));

        portfolio.setUser(user);
        return portfolioRepository.save(portfolio);
    }

    @Transactional
    public Portfolio updatePortfolio(Long id, Portfolio portfolioUpdates) {
        Portfolio portfolio = getPortfolioById(id);

        if (portfolioUpdates.getTitre() != null && !portfolioUpdates.getTitre().isEmpty()) {
            portfolio.setTitre(portfolioUpdates.getTitre());
        }

        if (portfolioUpdates.getDescription() != null) {
            portfolio.setDescription(portfolioUpdates.getDescription());
        }

        if (portfolioUpdates.getLien() != null) {
            portfolio.setLien(portfolioUpdates.getLien());
        }

        if (portfolioUpdates.getUser() != null && portfolioUpdates.getUser().getId() != null) {
            Long userId = portfolioUpdates.getUser().getId();
            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));
            portfolio.setUser(user);
        }

        return portfolioRepository.save(portfolio);
    }

    @Transactional
    public void deletePortfolio(Long id) {
        if (!portfolioRepository.existsById(id)) {
            throw new RuntimeException("Portfolio not found with id: " + id);
        }
        portfolioRepository.deleteById(id);
    }
}
