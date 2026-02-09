/**
 * ALUMNI SEARCH AND FILTER FUNCTIONALITY
 * 
 * This script handles the alumni directory search and filtering.
 * Alumni cards are pre-rendered by Zola (SSR), this script only
 * shows/hides them based on filters.
 * 
 * FEATURES:
 * - Real-time text search (name, company, role, location)
 * - Filter by graduation year
 * - Filter by domain
 * - Filter by company type (FAANG, Startup, etc.)
 * - Clear filters button
 * - Active filter badges
 * - Results count
 * 
 * FOR MAINTAINERS:
 * - All HTML is in templates/alumni.html
 * - This script ONLY filters - no rendering
 * - Data attributes on cards control filtering
 * - To add filters: Add data-attribute to template, add filter logic here
 */

// ============================================================================
// DOM ELEMENTS
// ============================================================================

const searchInput = document.getElementById('alumni-search');
const batchFilter = document.getElementById('filter-batch');
const domainFilter = document.getElementById('filter-domain');
const companyTypeFilter = document.getElementById('filter-company-type');
const clearFiltersBtn = document.getElementById('clear-filters');
const resultsCount = document.getElementById('results-count');
const activeFiltersDiv = document.getElementById('active-filters');
const noResultsDiv = document.getElementById('no-results');
const alumniCards = document.querySelectorAll('.alumni-card');

// ============================================================================
// STATE
// ============================================================================

let currentFilters = {
    search: '',
    batch: '',
    domain: '',
    companyType: ''
};

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Determine company type from company name
 */
function getCompanyType(company) {
    const companyLower = company.toLowerCase();
    
    const faang = ['google', 'meta', 'facebook', 'amazon', 'apple', 'netflix', 'microsoft'];
    const startups = ['razorpay', 'cred', 'zerodha', 'meesho', 'swiggy', 'zomato', 'gitlab', 'openai'];
    const service = ['tcs', 'infosys', 'wipro', 'cognizant', 'accenture', 'capgemini'];
    const research = ['mit', 'stanford', 'cmu', 'iisc', 'iit'];
    
    if (faang.some(f => companyLower.includes(f))) return 'FAANG';
    if (startups.some(s => companyLower.includes(s))) return 'Startup';
    if (service.some(s => companyLower.includes(s))) return 'Service';
    if (research.some(r => companyLower.includes(r))) return 'Research';
    
    return 'Other';
}

/**
 * Check if a card matches all current filters
 */
function matchesFilters(card) {
    const cardData = {
        name: card.dataset.name || '',
        batch: card.dataset.batch || '',
        domain: card.dataset.domain || '',
        company: card.dataset.company || '',
        role: card.dataset.role || '',
        location: card.dataset.location || ''
    };
    
    // Search filter - check name, company, role, location
    if (currentFilters.search) {
        const searchLower = currentFilters.search.toLowerCase();
        const searchable = `${cardData.name} ${cardData.company} ${cardData.role} ${cardData.location}`.toLowerCase();
        if (!searchable.includes(searchLower)) {
            return false;
        }
    }
    
    // Batch filter
    if (currentFilters.batch && cardData.batch !== currentFilters.batch) {
        return false;
    }
    
    // Domain filter
    if (currentFilters.domain && cardData.domain !== currentFilters.domain) {
        return false;
    }
    
    // Company type filter
    if (currentFilters.companyType) {
        const cardCompanyType = getCompanyType(cardData.company);
        if (cardCompanyType !== currentFilters.companyType) {
            return false;
        }
    }
    
    return true;
}

/**
 * Update the display of alumni cards based on current filters
 */
function updateDisplay() {
    let visibleCount = 0;
    
    alumniCards.forEach(card => {
        if (matchesFilters(card)) {
            card.style.display = '';
            visibleCount++;
        } else {
            card.style.display = 'none';
        }
    });
    
    // Update results count
    resultsCount.textContent = visibleCount;
    
    // Show/hide no results message
    if (visibleCount === 0) {
        noResultsDiv.style.display = '';
    } else {
        noResultsDiv.style.display = 'none';
    }
    
    // Update active filters badges
    updateActiveFilters();
    
    // Show/hide clear filters button
    const hasActiveFilters = currentFilters.search || currentFilters.batch || 
                             currentFilters.domain || currentFilters.companyType;
    clearFiltersBtn.style.display = hasActiveFilters ? '' : 'none';
}

/**
 * Update active filter badges
 */
function updateActiveFilters() {
    activeFiltersDiv.innerHTML = '';
    
    const addBadge = (label, value, filterKey) => {
        const badge = document.createElement('div');
        badge.className = 'badge badge-primary gap-2';
        badge.innerHTML = `
            <span>${label}: ${value}</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 cursor-pointer hover:text-error" fill="none" viewBox="0 0 24 24" stroke="currentColor" onclick="removeFilter('${filterKey}')">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
        `;
        activeFiltersDiv.appendChild(badge);
    };
    
    if (currentFilters.search) {
        addBadge('Search', `"${currentFilters.search}"`, 'search');
    }
    if (currentFilters.batch) {
        addBadge('Year', currentFilters.batch, 'batch');
    }
    if (currentFilters.domain) {
        addBadge('Domain', currentFilters.domain, 'domain');
    }
    if (currentFilters.companyType) {
        addBadge('Company Type', currentFilters.companyType, 'companyType');
    }
}

/**
 * Remove a specific filter
 */
function removeFilter(filterKey) {
    currentFilters[filterKey] = '';
    
    // Update UI controls
    switch(filterKey) {
        case 'search':
            searchInput.value = '';
            break;
        case 'batch':
            batchFilter.value = '';
            break;
        case 'domain':
            domainFilter.value = '';
            break;
        case 'companyType':
            companyTypeFilter.value = '';
            break;
    }
    
    updateDisplay();
}

/**
 * Clear all filters
 */
function clearAllFilters() {
    currentFilters = {
        search: '',
        batch: '',
        domain: '',
        companyType: ''
    };
    
    searchInput.value = '';
    batchFilter.value = '';
    domainFilter.value = '';
    companyTypeFilter.value = '';
    
    updateDisplay();
}

// ============================================================================
// EVENT LISTENERS
// ============================================================================

// Search input
searchInput.addEventListener('input', (e) => {
    currentFilters.search = e.target.value;
    updateDisplay();
});

// Batch filter
batchFilter.addEventListener('change', (e) => {
    currentFilters.batch = e.target.value;
    updateDisplay();
});

// Domain filter
domainFilter.addEventListener('change', (e) => {
    currentFilters.domain = e.target.value;
    updateDisplay();
});

// Company type filter
companyTypeFilter.addEventListener('change', (e) => {
    currentFilters.companyType = e.target.value;
    updateDisplay();
});

// Clear filters button
clearFiltersBtn.addEventListener('click', clearAllFilters);

// Make removeFilter available globally for badge click handler
window.removeFilter = removeFilter;

// ============================================================================
// INITIALIZATION
// ============================================================================

// Initial display update (shows all cards)
updateDisplay();

console.log(`Alumni search initialized: ${alumniCards.length} alumni loaded`);
