// MOCK DATA
const TOURNAMENTS = [
    { id: 1, name: "BLAST Premier Fall Final", game: "CS2", image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=600", prizePool: "$1,000,000", status: "Upcoming", region: "Europe", dates: "Sep 20–25", teamsCount: 16, organizer: "BLAST" },
    { id: 2, name: "The International 2026", game: "Dota 2", image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=600", prizePool: "$2,500,000", status: "Live", region: "Asia", dates: "Oct 10–20", teamsCount: 20, organizer: "Valve" },
    { id: 3, name: "VALORANT Champions", game: "Valorant", image: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=600", prizePool: "$1,000,000", status: "Upcoming", region: "North America", dates: "Dec 01–12", teamsCount: 16, organizer: "Riot Games" },
    { id: 4, name: "IEM Chengdu 2026", game: "CS2", image: "https://images.unsplash.com/photo-1560253023-3ec5d502959f?q=80&w=600", prizePool: "$500,000", status: "Finished", region: "Asia", dates: "Aug 05–10", teamsCount: 16, organizer: "ESL" },
    { id: 5, name: "Worlds Championship", game: "League of Legends", image: "https://images.unsplash.com/photo-1511882150382-421056c89033?q=80&w=600", prizePool: "$2,225,000", status: "Upcoming", region: "Europe", dates: "Nov 01–15", teamsCount: 22, organizer: "Riot Games" }
];

const GAMES = [
    { name: "Counter-Strike 2", logo: "CS2", image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=600", count: 12 },
    { name: "Dota 2", logo: "DOTA", image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=600", count: 8 },
    { name: "League of Legends", logo: "LOL", image: "https://images.unsplash.com/photo-1511882150382-421056c89033?q=80&w=600", count: 15 },
    { name: "Valorant", logo: "VAL", image: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=600", count: 10 }
];

const NEWS = [
    { id: 1, title: "CS2 Patch Updates Roster Balances", category: "CS2", date: "Sep 14, 2026", image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=600" },
    { id: 2, title: "The International Group Stage Revealed", category: "DOTA 2", date: "Sep 12, 2026", image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=600" }
];

// STATE MANAGEMENT
let state = {
    currentPage: 'home',
    selectedTournamentId: null,
    filters: { game: 'All', status: 'All', prize: 'Any', region: 'Worldwide' },
    searchQuery: ''
};

// ROUTER & VIEW RENDERER
function navigateTo(page, id = null) {
    state.currentPage = page;
    state.selectedTournamentId = id;
    
    // Update Active Nav Link
    document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
    const activeNav = document.getElementById(`nav-${page}`);
    if(activeNav) activeNav.classList.add('active');

    window.scrollTo({ top: 0, behavior: 'smooth' });
    render();
}

function render() {
    const app = document.getElementById('app-view');
    switch(state.currentPage) {
        case 'home': app.innerHTML = renderHome(); break;
        case 'tournaments': app.innerHTML = renderTournaments(); break;
        case 'details': app.innerHTML = renderTournamentDetails(state.selectedTournamentId); break;
        case 'games': app.innerHTML = renderGames(); break;
        case 'news': app.innerHTML = renderNews(); break;
        case 'howitworks': app.innerHTML = renderHowItWorks(); break;
        default: app.innerHTML = renderHome();
    }
}

// VIEWS
function renderHome() {
    return `
        <!-- HERO -->
        <section class="hero-section">
            <div class="hero-content">
                <h1 class="hero-title">THE WORLD OF ESPORTS</h1>
                <p class="hero-subtitle">DISCOVER. COMPETE. WIN.</p>
                <p class="hero-desc">Find esports tournaments, follow teams and discover the biggest prize pools in one place.</p>
                <div class="hero-buttons">
                    <button class="btn btn-primary" onclick="navigateTo('tournaments')">EXPLORE TOURNAMENTS</button>
                    <button class="btn btn-secondary" onclick="navigateTo('howitworks')">HOW IT WORKS</button>
                </div>
            </div>
        </section>

        <!-- LIVE NOW -->
        <div class="section-container">
            <div class="section-header">
                <h2 class="section-title">LIVE NOW</h2>
            </div>
            <div class="live-card">
                <div>
                    <span class="live-badge">LIVE</span>
                    <span style="margin-left: 10px; color: var(--text-muted);">CS2 • SEMIFINAL</span>
                </div>
                <div style="font-family: var(--font-heading); font-size: 1.5rem;">
                    NAVI <span style="color: var(--accent-cyan);">1 : 0</span> G2
                </div>
                <button class="btn btn-secondary" onclick="navigateTo('details', 1)">WATCH MATCH</button>
            </div>
        </div>

        <!-- FEATURED TOURNAMENTS -->
        <div class="section-container">
            <div class="section-header">
                <h2 class="section-title">FEATURED TOURNAMENTS</h2>
            </div>
            <div class="grid-cards">
                ${TOURNAMENTS.slice(0, 3).map(t => renderTournamentCard(t)).join('')}
            </div>
        </div>

        <!-- HOW IT WORKS TIMELINE -->
        <div class="section-container">
            <div class="section-header">
                <h2 class="section-title">HOW TOURNAMENTS WORK</h2>
            </div>
            <div class="timeline">
                <div class="timeline-card">
                    <div class="timeline-num">01</div>
                    <h3>QUALIFICATION</h3>
                    <p style="color: var(--text-muted); font-size:0.9rem; margin-top:5px;">Teams compete globally to secure a spot in the main event.</p>
                </div>
                <div class="timeline-card">
                    <div class="timeline-num">02</div>
                    <h3>GROUP STAGE</h3>
                    <p style="color: var(--text-muted); font-size:0.9rem; margin-top:5px;">Qualified teams play round-robin format for points.</p>
                </div>
                <div class="timeline-card">
                    <div class="timeline-num">03</div>
                    <h3>PLAYOFFS</h3>
                    <p style="color: var(--text-muted); font-size:0.9rem; margin-top:5px;">Knockout bracket phase with high stakes single/double elimination.</p>
                </div>
                <div class="timeline-card">
                    <div class="timeline-num">04</div>
                    <h3>GRAND FINAL</h3>
                    <p style="color: var(--text-muted); font-size:0.9rem; margin-top:5px;">The top 2 teams battle for the champion title and major prize pool.</p>
                </div>
            </div>
        </div>
    `;
}

function renderTournaments() {
    const filtered = TOURNAMENTS.filter(t => {
        const matchesGame = state.filters.game === 'All' || t.game === state.filters.game;
        const matchesStatus = state.filters.status === 'All' || t.status === state.filters.status;
        const matchesSearch = t.name.toLowerCase().includes(state.searchQuery.toLowerCase());
        return matchesGame && matchesStatus && matchesSearch;
    });

    return `
        <div class="section-container">
            <div class="section-header">
                <h1 class="hero-title" style="font-size:2.5rem;">ESPORTS TOURNAMENTS</h1>
                <p style="color: var(--text-muted);">Discover upcoming, live and completed tournaments worldwide.</p>
            </div>

            <!-- FILTER BAR -->
            <div class="filter-bar">
                <div class="filter-group">
                    <label>GAME</label>
                    <select onchange="updateFilter('game', this.value)">
                        <option value="All">All Games</option>
                        <option value="CS2">CS2</option>
                        <option value="Dota 2">Dota 2</option>
                        <option value="Valorant">Valorant</option>
                        <option value="League of Legends">League of Legends</option>
                    </select>
                </div>
                <div class="filter-group">
                    <label>STATUS</label>
                    <select onchange="updateFilter('status', this.value)">
                        <option value="All">All Statuses</option>
                        <option value="Upcoming">Upcoming</option>
                        <option value="Live">Live</option>
                        <option value="Finished">Finished</option>
                    </select>
                </div>
            </div>

            <!-- GRID -->
            <div class="grid-cards">
                ${filtered.length ? filtered.map(t => renderTournamentCard(t)).join('') : '<p>No tournaments found matching filters.</p>'}
            </div>
        </div>
    `;
}

function renderTournamentDetails(id) {
    const t = TOURNAMENTS.find(item => item.id === id) || TOURNAMENTS[0];
    return `
        <div class="section-container">
            <button class="btn btn-secondary" onclick="navigateTo('tournaments')" style="margin-bottom:20px;">&larr; BACK TO TOURNAMENTS</button>
            <div class="tournament-card" style="padding: 30px;">
                <span class="card-game">${t.game}</span>
                <h1 class="hero-title" style="font-size: 2.8rem; text-align: left;">${t.name}</h1>
                <div class="card-prize" style="font-size: 2rem;">PRIZE POOL: ${t.prizePool}</div>
                <p>Location: ${t.region} | Organizer: ${t.organizer} | Teams: ${t.teamsCount}</p>
                
                <h3 style="margin-top:30px; font-family: var(--font-heading);">PLAYOFF BRACKET</h3>
                <div class="bracket-container">
                    <div class="bracket-column">
                        <div class="bracket-match">Quarter-Final: NAVI vs G2</div>
                        <div class="bracket-match">Quarter-Final: Vitality vs Liquid</div>
                    </div>
                    <div class="bracket-column">
                        <div class="bracket-match" style="border-color: var(--accent-cyan);">Grand Final: TBD vs TBD</div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function renderGames() {
    return `
        <div class="section-container">
            <div class="section-header">
                <h1 class="hero-title" style="font-size: 2.5rem;">ESPORTS GAMES</h1>
            </div>
            <div class="grid-cards">
                ${GAMES.map(g => `
                    <div class="tournament-card">
                        <div class="card-img-wrap"><img src="${g.image}" alt="${g.name}"></div>
                        <div class="card-body">
                            <h3>${g.name}</h3>
                            <p style="color:var(--text-muted); margin: 10px 0;">Active Tournaments: ${g.count}</p>
                            <button class="btn btn-primary" onclick="navigateTo('tournaments')">EXPLORE</button>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function renderNews() {
    return `
        <div class="section-container">
            <div class="section-header">
                <h1 class="hero-title" style="font-size:2.5rem;">LATEST ESPORTS NEWS</h1>
            </div>
            <div class="grid-cards">
                ${NEWS.map(n => `
                    <div class="tournament-card">
                        <div class="card-img-wrap"><img src="${n.image}"></div>
                        <div class="card-body">
                            <span class="card-game">${n.category}</span>
                            <h3>${n.title}</h3>
                            <p style="color:var(--text-muted); font-size:0.85rem; margin-top:5px;">${n.date}</p>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function renderHowItWorks() {
    return `
        <div class="section-container">
            <h1 class="hero-title">ESPORTS, SIMPLIFIED.</h1>
            <p style="color:var(--text-muted); max-width: 700px; margin-bottom: 40px;">
                ESPORTS HUB simplifies tournament tracking, statistics, and game events into one seamless cyber platform.
            </p>
        </div>
    `;
}

// HELPER COMPONENTS
function renderTournamentCard(t) {
    return `
        <div class="tournament-card">
            <div class="card-img-wrap">
                <img src="${t.image}" alt="${t.name}">
                <span class="card-status">${t.status}</span>
            </div>
            <div class="card-body">
                <span class="card-game">${t.game}</span>
                <h3 class="card-title">${t.name}</h3>
                <div class="card-meta">
                    <span><i class="fa-regular fa-calendar"></i> ${t.dates}</span>
                    <span><i class="fa-solid fa-location-dot"></i> ${t.region}</span>
                </div>
                <div class="card-prize">${t.prizePool}</div>
                <button class="btn btn-primary" onclick="navigateTo('details', ${t.id})">VIEW DETAILS</button>
            </div>
        </div>
    `;
}

// HANDLERS
function updateFilter(key, val) {
    state.filters[key] = val;
    render();
}

function handleGlobalSearch(val) {
    state.searchQuery = val;
    if(state.currentPage !== 'tournaments') {
        navigateTo('tournaments');
    } else {
        render();
    }
}

// INITIAL RENDER
document.addEventListener('DOMContentLoaded', () => {
    render();
});
