// Astro Trading Application JavaScript

// Sample data provided
const sampleData = {
  "samplePlanetaryData": {
    "sun": {"sign": "Leo", "degree": 18.5, "influence": "Strong", "trading_impact": "Favorable for leadership sectors"},
    "moon": {"sign": "Taurus", "degree": 12.3, "influence": "Moderate", "trading_impact": "Good for stable investments"},
    "mars": {"sign": "Gemini", "degree": 25.8, "influence": "Active", "trading_impact": "Supports technology and communication"},
    "mercury": {"sign": "Cancer", "degree": 8.2, "influence": "Strong", "trading_impact": "Favors financial and banking sectors"},
    "jupiter": {"sign": "Aries", "degree": 14.7, "influence": "Expansive", "trading_impact": "Bullish for growth sectors"},
    "venus": {"sign": "Virgo", "degree": 22.1, "influence": "Practical", "trading_impact": "Good for healthcare and services"},
    "saturn": {"sign": "Aquarius", "degree": 6.9, "influence": "Restrictive", "trading_impact": "Caution in speculative trades"}
  },
  "sectorRecommendations": [
    {"sector": "Information Technology", "strength": "Strong", "reason": "Mercury and Mars favor tech innovation", "score": 85},
    {"sector": "Banking & Finance", "strength": "Strong", "reason": "Mercury in Cancer supports financial growth", "score": 82},
    {"sector": "Healthcare & Pharma", "strength": "Moderate", "reason": "Venus in Virgo supports healing sectors", "score": 75},
    {"sector": "Automotive", "strength": "Moderate", "reason": "Mars in Gemini supports transportation", "score": 72},
    {"sector": "Energy & Power", "strength": "Weak", "reason": "Saturn's influence creates obstacles", "score": 45}
  ],
  "stockRecommendations": [
    {
      "stock": "INFY",
      "name": "Infosys Ltd",
      "sector": "Information Technology", 
      "current_price": 1456.75,
      "entry_price": 1460.00,
      "stop_loss": 1425.50,
      "target_price": 1512.00,
      "direction": "Long",
      "entry_time": "10:15 AM - 10:30 AM",
      "risk_reward": "1:1.8",
      "technical_signals": {
        "vwap": 1448.20,
        "ema_9": 1452.30,
        "ema_21": 1445.80,
        "ema_50": 1438.90,
        "volume_spike": true,
        "atr": 28.75
      }
    },
    {
      "stock": "HDFCBANK",
      "name": "HDFC Bank Ltd",
      "sector": "Banking & Finance",
      "current_price": 1678.90,
      "entry_price": 1682.00,
      "stop_loss": 1645.25,
      "target_price": 1748.50,
      "direction": "Long", 
      "entry_time": "11:45 AM - 12:00 PM",
      "risk_reward": "1:1.8",
      "technical_signals": {
        "vwap": 1665.40,
        "ema_9": 1672.10,
        "ema_21": 1658.75,
        "ema_50": 1642.30,
        "volume_spike": true,
        "atr": 31.50
      }
    },
    {
      "stock": "DRREDDY",
      "name": "Dr Reddys Labs",
      "sector": "Healthcare & Pharma",
      "current_price": 5234.60,
      "entry_price": 5245.00,
      "stop_loss": 5156.80,
      "target_price": 5403.60,
      "direction": "Long",
      "entry_time": "2:30 PM - 2:45 PM", 
      "risk_reward": "1:1.8",
      "technical_signals": {
        "vwap": 5198.75,
        "ema_9": 5225.40,
        "ema_21": 5201.20,
        "ema_50": 5178.90,
        "volume_spike": false,
        "atr": 73.50
      }
    }
  ],
  "tradingSuitability": {
    "overall_rating": "Good",
    "score": 78,
    "best_trading_hours": "10:00 AM - 12:00 PM, 2:00 PM - 3:15 PM",
    "sectors_to_avoid": ["Real Estate", "Metals"],
    "risk_level": "Moderate",
    "recommended_position_size": "2-3% per trade"
  }
};

// Planet icons mapping
const planetIcons = {
  sun: 'fas fa-sun',
  moon: 'fas fa-moon',
  mars: 'fas fa-mars',
  mercury: 'fas fa-atom',
  jupiter: 'fas fa-globe-americas',
  venus: 'fas fa-venus',
  saturn: 'fas fa-ring'
};

// Application state
let currentUserData = {};
let currentSection = 'birth-form-section';

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM loaded, initializing app...');
  initializeApp();
});

function initializeApp() {
  console.log('Initializing app...');
  
  // Get DOM elements
  const birthForm = document.getElementById('birth-form');
  const resetBtn = document.getElementById('reset-btn');
  const navButtons = document.querySelectorAll('.nav-btn');
  
  // Set up form submission
  if (birthForm) {
    birthForm.addEventListener('submit', function(e) {
      console.log('Form submitted!');
      handleFormSubmit(e);
    });
  }
  
  // Set up reset button
  if (resetBtn) {
    resetBtn.addEventListener('click', function(e) {
      console.log('Reset button clicked!');
      resetApplication();
    });
  }
  
  // Set up navigation buttons
  navButtons.forEach(btn => {
    btn.addEventListener('click', function(e) {
      console.log('Nav button clicked:', e.currentTarget.dataset.section);
      const targetSection = e.currentTarget.dataset.section;
      switchSection(targetSection);
      updateNavigation(e.currentTarget);
    });
  });
  
  // Initialize hidden sections
  hideResultsSections();
  
  // Set current date
  const analysisDate = document.getElementById('analysis-date');
  if (analysisDate) {
    analysisDate.textContent = `Analysis for ${formatDate(new Date())}`;
  }
  
  console.log('App initialized successfully');
}

function hideResultsSections() {
  const resultsNav = document.getElementById('results-nav');
  const resetContainer = document.querySelector('.reset-container');
  
  if (resultsNav) {
    resultsNav.style.display = 'none';
  }
  
  if (resetContainer) {
    resetContainer.style.display = 'none';
  }
}

function handleFormSubmit(e) {
  e.preventDefault();
  console.log('Handling form submit...');
  
  // Get form values directly from inputs
  const nameInput = document.getElementById('fullName');
  const dateInput = document.getElementById('birthDate');
  const timeInput = document.getElementById('birthTime');
  const placeInput = document.getElementById('birthPlace');
  
  currentUserData = {
    name: nameInput ? nameInput.value : '',
    birthDate: dateInput ? dateInput.value : '',
    birthTime: timeInput ? timeInput.value : '',
    birthPlace: placeInput ? placeInput.value : ''
  };
  
  console.log('Form data collected:', currentUserData);
  
  // Validate form
  if (!validateForm(currentUserData)) {
    return;
  }
  
  // Start analysis process
  startAnalysis();
}

function validateForm(data) {
  console.log('Validating form data:', data);
  
  if (!data.name || !data.name.trim()) {
    alert('Please enter your full name');
    return false;
  }
  
  if (!data.birthDate) {
    alert('Please select your birth date');
    return false;
  }
  
  if (!data.birthTime) {
    alert('Please select your birth time');
    return false;
  }
  
  if (!data.birthPlace || !data.birthPlace.trim()) {
    alert('Please enter your birth place');
    return false;
  }
  
  console.log('Form validation passed');
  return true;
}

function startAnalysis() {
  console.log('Starting analysis...');
  
  // Show loading section
  switchSection('loading-section');
  
  // Simulate loading process
  const loadingTexts = [
    'Analyzing planetary positions...',
    'Calculating astrological influences...',
    'Evaluating sector strengths...',
    'Scanning technical indicators...',
    'Generating trading recommendations...',
    'Finalizing analysis...'
  ];
  
  let currentTextIndex = 0;
  const loadingTextElement = document.getElementById('loading-text');
  
  const loadingInterval = setInterval(() => {
    if (currentTextIndex < loadingTexts.length) {
      if (loadingTextElement) {
        loadingTextElement.textContent = loadingTexts[currentTextIndex];
      }
      currentTextIndex++;
    } else {
      clearInterval(loadingInterval);
      showResults();
    }
  }, 800);
}

function showResults() {
  console.log('Showing results...');
  
  // Populate all data
  populateUserInfo();
  populateTradingSuitability();
  populatePlanetaryData();
  populateSectorAnalysis();
  populateStockRecommendations();
  
  // Show results navigation and first section
  const resultsNav = document.getElementById('results-nav');
  const resetContainer = document.querySelector('.reset-container');
  
  if (resultsNav) {
    resultsNav.style.display = 'flex';
  }
  
  if (resetContainer) {
    resetContainer.style.display = 'block';
  }
  
  // Activate first nav button
  const firstNavBtn = document.querySelector('.nav-btn');
  if (firstNavBtn) {
    firstNavBtn.classList.add('active');
  }
  
  switchSection('astrological-analysis');
}

function populateUserInfo() {
  const greeting = document.getElementById('user-greeting');
  const firstName = currentUserData.name.split(' ')[0];
  
  if (greeting) {
    greeting.textContent = `Welcome ${firstName}!`;
  }
  
  const analysisDate = document.getElementById('analysis-date');
  if (analysisDate) {
    analysisDate.textContent = `Personal Analysis for ${formatDate(new Date())}`;
  }
}

function populateTradingSuitability() {
  const suitability = sampleData.tradingSuitability;
  
  // Update score circle
  const scoreElement = document.getElementById('suitability-score');
  const statusElement = document.getElementById('suitability-status');
  const circleElement = document.getElementById('suitability-circle');
  
  if (scoreElement) {
    scoreElement.textContent = suitability.score;
  }
  
  if (statusElement) {
    statusElement.textContent = suitability.overall_rating;
    statusElement.className = `status status--${suitability.overall_rating.toLowerCase() === 'good' ? 'success' : 'warning'}`;
  }
  
  // Update circle color based on score
  if (circleElement && scoreElement) {
    const scoreColor = suitability.score >= 75 ? 'var(--color-success)' : 
                      suitability.score >= 50 ? 'var(--color-warning)' : 'var(--color-error)';
    circleElement.style.borderColor = scoreColor;
    scoreElement.style.color = scoreColor;
  }
  
  // Update description and hours
  const descriptionElement = document.getElementById('suitability-description');
  if (descriptionElement) {
    descriptionElement.textContent = 
      `${suitability.overall_rating} conditions for trading today with ${suitability.risk_level.toLowerCase()} risk level`;
  }
  
  const hoursElement = document.getElementById('best-hours');
  if (hoursElement) {
    hoursElement.textContent = suitability.best_trading_hours;
  }
}

function populatePlanetaryData() {
  const planetaryGrid = document.getElementById('planetary-grid');
  const planetaryData = sampleData.samplePlanetaryData;
  
  if (!planetaryGrid) return;
  
  planetaryGrid.innerHTML = '';
  
  Object.entries(planetaryData).forEach(([planet, data]) => {
    const planetElement = document.createElement('div');
    planetElement.className = 'planet-item';
    
    planetElement.innerHTML = `
      <div class="planet-header">
        <div class="planet-name">
          <i class="${planetIcons[planet] || 'fas fa-star'}"></i>
          ${planet.charAt(0).toUpperCase() + planet.slice(1)}
        </div>
        <span class="planet-influence ${data.influence.toLowerCase()}">${data.influence}</span>
      </div>
      <div class="planet-position">${data.sign} ${data.degree.toFixed(1)}°</div>
      <div class="planet-impact">${data.trading_impact}</div>
    `;
    
    planetaryGrid.appendChild(planetElement);
  });
}

function populateSectorAnalysis() {
  const sectorList = document.getElementById('sector-list');
  const sectors = sampleData.sectorRecommendations;
  
  if (!sectorList) return;
  
  sectorList.innerHTML = '';
  
  sectors.forEach(sector => {
    const sectorElement = document.createElement('div');
    sectorElement.className = `sector-item ${sector.strength.toLowerCase()}`;
    
    sectorElement.innerHTML = `
      <div class="sector-strength ${sector.strength.toLowerCase()}">
        <div>${sector.score}</div>
        <small>Score</small>
      </div>
      <div class="sector-info">
        <h4>${sector.sector}</h4>
        <div class="sector-reason">${sector.reason}</div>
      </div>
    `;
    
    sectorList.appendChild(sectorElement);
  });
}

function populateStockRecommendations() {
  const stockContainer = document.getElementById('stock-recommendations');
  const stocks = sampleData.stockRecommendations;
  
  if (!stockContainer) return;
  
  stockContainer.innerHTML = '';
  
  stocks.forEach(stock => {
    const stockElement = document.createElement('div');
    stockElement.className = 'stock-card';
    
    const riskReward = calculateRiskReward(stock.entry_price, stock.stop_loss, stock.target_price);
    
    stockElement.innerHTML = `
      <div class="stock-header">
        <div class="stock-title">
          <div>
            <div class="stock-name">${stock.name}</div>
            <div class="stock-sector">${stock.sector}</div>
          </div>
          <div class="stock-symbol">${stock.stock}</div>
        </div>
      </div>
      <div class="stock-details">
        <div class="price-grid">
          <div class="price-item">
            <div class="price-label">Current</div>
            <div class="price-value">₹${stock.current_price.toFixed(2)}</div>
          </div>
          <div class="price-item">
            <div class="price-label">Entry</div>
            <div class="price-value">₹${stock.entry_price.toFixed(2)}</div>
          </div>
          <div class="price-item">
            <div class="price-label">Stop Loss</div>
            <div class="price-value">₹${stock.stop_loss.toFixed(2)}</div>
          </div>
          <div class="price-item">
            <div class="price-label">Target</div>
            <div class="price-value">₹${stock.target_price.toFixed(2)}</div>
          </div>
        </div>
        
        <div class="trade-info">
          <div class="trade-detail">
            <i class="fas fa-clock"></i>
            <span><strong>Entry Time:</strong> ${stock.entry_time}</span>
          </div>
          <div class="trade-detail">
            <i class="fas fa-chart-line"></i>
            <span><strong>Direction:</strong> ${stock.direction}</span>
          </div>
          <div class="trade-detail">
            <i class="fas fa-balance-scale"></i>
            <span><strong>Risk/Reward:</strong> ${stock.risk_reward}</span>
          </div>
          <div class="trade-detail">
            <i class="fas fa-percentage"></i>
            <span><strong>Potential:</strong> ${riskReward.potentialGain.toFixed(1)}%</span>
          </div>
        </div>
        
        <div class="technical-indicators">
          <h5><i class="fas fa-chart-area"></i> Technical Indicators</h5>
          <div class="indicators-grid">
            <div class="indicator">
              <div class="indicator-label">VWAP</div>
              <div class="indicator-value">₹${stock.technical_signals.vwap.toFixed(2)}</div>
            </div>
            <div class="indicator">
              <div class="indicator-label">EMA 9</div>
              <div class="indicator-value">₹${stock.technical_signals.ema_9.toFixed(2)}</div>
            </div>
            <div class="indicator">
              <div class="indicator-label">EMA 21</div>
              <div class="indicator-value">₹${stock.technical_signals.ema_21.toFixed(2)}</div>
            </div>
            <div class="indicator">
              <div class="indicator-label">EMA 50</div>
              <div class="indicator-value">₹${stock.technical_signals.ema_50.toFixed(2)}</div>
            </div>
            <div class="indicator">
              <div class="indicator-label">ATR</div>
              <div class="indicator-value">${stock.technical_signals.atr.toFixed(2)}</div>
            </div>
            <div class="indicator">
              <div class="indicator-label">Volume</div>
              <div class="indicator-value">${stock.technical_signals.volume_spike ? 'High' : 'Normal'}</div>
            </div>
          </div>
        </div>
      </div>
    `;
    
    stockContainer.appendChild(stockElement);
  });
}

function calculateRiskReward(entry, stopLoss, target) {
  const risk = Math.abs(entry - stopLoss);
  const reward = Math.abs(target - entry);
  const potentialGain = ((target - entry) / entry) * 100;
  const potentialLoss = ((entry - stopLoss) / entry) * 100;
  
  return {
    ratio: (reward / risk).toFixed(1),
    potentialGain: potentialGain,
    potentialLoss: potentialLoss
  };
}

function switchSection(sectionId) {
  console.log('Switching to section:', sectionId);
  
  // Hide all sections
  const sections = document.querySelectorAll('.section');
  sections.forEach(section => {
    section.classList.remove('active');
  });
  
  // Show target section
  const targetSection = document.getElementById(sectionId);
  if (targetSection) {
    targetSection.classList.add('active');
    currentSection = sectionId;
    console.log('Section switched to:', sectionId);
  } else {
    console.error('Section not found:', sectionId);
  }
}

function updateNavigation(activeBtn) {
  const navButtons = document.querySelectorAll('.nav-btn');
  navButtons.forEach(btn => {
    btn.classList.remove('active');
  });
  activeBtn.classList.add('active');
}

function resetApplication() {
  console.log('Resetting application...');
  
  // Clear form data
  const birthForm = document.getElementById('birth-form');
  if (birthForm) {
    birthForm.reset();
  }
  currentUserData = {};
  
  // Hide results sections
  hideResultsSections();
  
  // Reset navigation
  const navButtons = document.querySelectorAll('.nav-btn');
  navButtons.forEach(btn => btn.classList.remove('active'));
  
  // Show birth form section
  switchSection('birth-form-section');
  
  console.log('Application reset complete');
}

function formatDate(date) {
  const options = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    weekday: 'long'
  };
  return date.toLocaleDateString('en-US', options);
}