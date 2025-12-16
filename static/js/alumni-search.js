/**
 * ALUMNI SEARCH AND FILTER FUNCTIONALITY
 * 
 * This script handles the alumni directory search and filtering.
 * It loads alumni data from alumni.yaml and provides real-time
 * search and filtering capabilities.
 * 
 * FEATURES:
 * - Real-time text search (name, company, role)
 * - Filter by batch year
 * - Filter by domain (Software Dev, ML, etc.)
 * - Filter by company type
 * - Responsive grid layout
 * 
 * HOW IT WORKS:
 * 1. Loads alumni data on page load
 * 2. Displays alumni cards in a grid
 * 3. Listens for search/filter changes
 * 4. Filters and re-displays matching alumni
 * 
 * FOR NON-TECHNICAL TEAMS:
 * - To add new filters: Add a new <select> in alumni.html, then add filter logic here
 * - To change card layout: Modify the createAlumniCard() function
 * - To change search fields: Modify the matchesSearch() function
 */

// ============================================================================
// ALUMNI DATA
// Data loaded from window.allAlumni (set by template from YAML files)
// ============================================================================

// Alumni data will be loaded from window.allAlumni when page initializes
let alumniData = [];

// ============================================================================
// STATE MANAGEMENT
// ============================================================================

let currentFilters = {
    search: '',
    batch: '',
    domain: '',
    company: ''
};

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Determine company type based on company name
 */
function getCompanyType(company) {
    const faang = ['Google', 'Meta', 'Amazon', 'Apple', 'Netflix', 'Microsoft'];
    const startups = ['Razorpay', 'CRED', 'Zerodha', 'Meesho', 'Swiggy', 'Zomato'];
    const service = ['TCS', 'Infosys', 'Wipro', 'Cognizant', 'Accenture'];
    const research = ['IIT', 'IISc', 'MIT', 'Stanford', 'CMU'];
    
    if (faang.some(f => company.includes(f))) return 'FAANG';
    if (startups.some(s => company.includes(s))) return 'Startup';
    if (service.some(s => company.includes(s))) return 'Service';
    if (research.some(r => company.includes(r))) return 'Research';
    
    return 'Other';
}

/**
 * Check if an alumni matches the current search query
 */
function matchesSearch(alumni, query) {
    if (!query) return true;
    
    const searchTerms = query.toLowerCase();
    const searchableText = [
        alumni.name,
        alumni.company,
        alumni.current_role,
        alumni.domain,
        alumni.location
    ].join(' ').toLowerCase();
    
    return searchableText.includes(searchTerms);
}

/**
 * Check if an alumni matches all active filters
 */
function matchesFilters(alumni) {
    // Batch filter - match by graduation year
    if (currentFilters.batch && alumni.graduation_year.toString() !== currentFilters.batch) {
        return false;
    }
    
    // Domain filter
    if (currentFilters.domain && alumni.domain !== currentFilters.domain) {
        return false;
    }
    
    // Company type filter
    if (currentFilters.company) {
        const companyType = getCompanyType(alumni.company);
        if (companyType !== currentFilters.company) {
            return false;
        }
    }
    
    // Search filter
    if (!matchesSearch(alumni, currentFilters.search)) {
        return false;
    }
    
    return true;
}

/**
 * Create HTML for a single alumni card
 */
function createAlumniCard(alumni) {
    // Determine if we have a message to show
    const hasMessage = alumni.message && alumni.message.length > 0;
    
    return `
        <div class="card bg-base-200 shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <div class="card-body">
                <!-- Alumni Photo and Basic Info -->
                <div class="flex items-center gap-4 mb-4">
                    <div class="avatar ${alumni.image ? '' : 'placeholder'}">
                        <div class="w-20 h-20 rounded-full ${alumni.image ? '' : 'bg-neutral text-neutral-content'}">
                            ${alumni.image 
                                ? `<img src="${alumni.image}" alt="${alumni.name}" />`
                                : `<span class="text-2xl">${alumni.name.charAt(0)}</span>`
                            }
                        </div>
                    </div>
                    <div>
                        <h3 class="card-title text-lg">${alumni.name}</h3>
                        <p class="text-sm text-gray-500">Batch of ${alumni.batch}</p>
                    </div>
                </div>
                
                <!-- Current Position -->
                <div class="space-y-2">
                    <div class="flex items-start gap-2">
                        <svg class="w-5 h-5 text-primary mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                        </svg>
                        <div>
                            <p class="font-semibold text-sm">${alumni.current_role}</p>
                            <p class="text-sm text-gray-600">${alumni.company}</p>
                        </div>
                    </div>
                    
                    <div class="flex items-center gap-2">
                        <svg class="w-5 h-5 text-secondary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        </svg>
                        <p class="text-sm text-gray-600">${alumni.location}</p>
                    </div>
                    
                    <div class="flex items-center gap-2">
                        <svg class="w-5 h-5 text-accent flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                        </svg>
                        <span class="badge badge-outline badge-sm">${alumni.domain}</span>
                    </div>
                </div>
                
                <!-- Optional Message/Quote -->
                ${hasMessage ? `
                <div class="mt-4 p-3 bg-base-300 rounded-lg">
                    <p class="text-sm italic text-gray-600">"${alumni.message}"</p>
                </div>
                ` : ''}
                
                <!-- Social Links -->
                <div class="card-actions justify-end mt-4">
                    ${alumni.linkedin ? `
                    <a href="${alumni.linkedin}" target="_blank" rel="noopener noreferrer" class="btn btn-ghost btn-sm">
                        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                    </a>
                    ` : ''}
                    ${alumni.github ? `
                    <a href="${alumni.github}" target="_blank" rel="noopener noreferrer" class="btn btn-ghost btn-sm">
                        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd"/>
                        </svg>
                    </a>
                    ` : ''}
                </div>
            </div>
        </div>
    `;
}

/**
 * Display alumni in the grid
 */
function displayAlumni(alumniList) {
    const grid = document.getElementById('alumni-grid');
    const noResults = document.getElementById('no-results');
    const loadingState = document.getElementById('loading-state');
    const resultsCount = document.getElementById('results-count');
    
    // Hide loading state
    if (loadingState) {
        loadingState.classList.add('hidden');
    }
    
    if (alumniList.length === 0) {
        // Show no results message
        grid.classList.add('hidden');
        noResults.classList.remove('hidden');
        resultsCount.textContent = '0';
    } else {
        // Show alumni cards
        grid.classList.remove('hidden');
        noResults.classList.add('hidden');
        
        grid.innerHTML = alumniList.map(alumni => createAlumniCard(alumni)).join('');
        resultsCount.textContent = alumniList.length;
    }
}

/**
 * Filter and display alumni based on current filters
 */
function filterAndDisplay() {
    const filteredAlumni = alumniData.filter(matchesFilters);
    displayAlumni(filteredAlumni);
}

// ============================================================================
// EVENT LISTENERS
// ============================================================================

/**
 * Initialize the page when DOM is loaded
 */
document.addEventListener('DOMContentLoaded', function() {
    // Load alumni data from window.allAlumni (set by template)
    if (window.allAlumni && window.allAlumni.length > 0) {
        alumniData = window.allAlumni;
        console.log(`✅ Loaded ${alumniData.length} alumni from data/alumni/ year files`);
    } else {
        console.error('❌ Alumni data not loaded! window.allAlumni is undefined or empty.');
        console.log('Check that templates/alumni.html is loading YAML files correctly.');
        // Show error message to user
        const loadingState = document.getElementById('loading-state');
        if (loadingState) {
            loadingState.innerHTML = '<div class="text-center py-12"><p class="text-red-500">Failed to load alumni data. Please refresh the page.</p></div>';
        }
        return; // Don't continue if no data
    }
    
    // Search input
    const searchInput = document.getElementById('alumni-search');
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            currentFilters.search = e.target.value;
            filterAndDisplay();
        });
    }
    
    // Batch filter
    const batchFilter = document.getElementById('filter-batch');
    if (batchFilter) {
        batchFilter.addEventListener('change', function(e) {
            currentFilters.batch = e.target.value;
            filterAndDisplay();
        });
    }
    
    // Domain filter
    const domainFilter = document.getElementById('filter-domain');
    if (domainFilter) {
        domainFilter.addEventListener('change', function(e) {
            currentFilters.domain = e.target.value;
            filterAndDisplay();
        });
    }
    
    // Company type filter
    const companyFilter = document.getElementById('filter-company');
    if (companyFilter) {
        companyFilter.addEventListener('change', function(e) {
            currentFilters.company = e.target.value;
            filterAndDisplay();
        });
    }
    
    // Initial display
    displayAlumni(alumniData);
});
