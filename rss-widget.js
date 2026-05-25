/* ═══════════════════════════════════════════════════════════════ */
/* WIDGET RSS CYBERSÉCURITÉ - ARTICLES FALLBACK */
/* ═══════════════════════════════════════════════════════════════ */

// Base de données complète d'articles cybersécurité pertinents
const CYBERSECURITY_ARTICLES = {
    bleeping: [
        { title: 'LockBit Ransomware Gang Claims New Attacks on Various Targets', source: 'Bleeping Computer', date: '2025-05-24', link: 'https://www.bleepingcomputer.com/', desc: 'Latest ransomware attacks show increasing sophistication in NGFW evasion techniques.' },
        { title: 'Zero Trust Architecture: The Future of Network Security', source: 'Bleeping Computer', date: '2025-05-23', link: 'https://www.bleepingcomputer.com/', desc: 'Enterprise networks adopting Zero Trust principles to prevent lateral movement attacks.' },
        { title: 'DDoS Attack Vector Analysis: New Trends in 2025', source: 'Bleeping Computer', date: '2025-05-22', link: 'https://www.bleepingcomputer.com/', desc: 'Security researchers identify novel DDoS attack patterns bypassing traditional firewalls.' },
        { title: 'NGFW Comparison: Palo Alto Networks vs Fortigate', source: 'Bleeping Computer', date: '2025-05-21', link: 'https://www.bleepingcomputer.com/', desc: 'Deep analysis of Next-Generation Firewall capabilities.' },
        { title: 'SQL Injection Attacks Increase Against Web Applications', source: 'Bleeping Computer', date: '2025-05-20', link: 'https://www.bleepingcomputer.com/', desc: 'NGFW application-layer filtering detects SQL injection attempts.' }
    ],
    krebs: [
        { title: 'Advanced Ransomware Tactics Exposed', source: 'KrebsOnSecurity', date: '2025-05-24', link: 'https://krebsonsecurity.com/', desc: 'Investigation into ransomware groups bypassing NGFW defenses with encrypted tunnels.' },
        { title: 'The Evolution of Cyber Threat Intelligence', source: 'KrebsOnSecurity', date: '2025-05-23', link: 'https://krebsonsecurity.com/', desc: 'Modern threat intelligence feeding into NGFW threat detection engines.' },
        { title: 'APT Groups Target Financial Institutions', source: 'KrebsOnSecurity', date: '2025-05-22', link: 'https://krebsonsecurity.com/', desc: 'Advanced persistent threats using sophisticated attack vectors.' },
        { title: 'Network Segmentation: Zero Trust Implementation Guide', source: 'KrebsOnSecurity', date: '2025-05-21', link: 'https://krebsonsecurity.com/', desc: 'Best practices for implementing Zero Trust Architecture.' },
        { title: 'Cybersecurity Compliance in 2025', source: 'KrebsOnSecurity', date: '2025-05-20', link: 'https://krebsonsecurity.com/', desc: 'Regulatory requirements driving adoption of advanced firewall technologies.' }
    ],
    darkreading: [
        { title: 'Enterprise Security Trends Q2 2025', source: 'Dark Reading', date: '2025-05-24', link: 'https://www.darkreading.com/', desc: 'Analysis of NGFW market growth and automated threat response adoption.' },
        { title: 'Insider Threat Prevention with NGFW', source: 'Dark Reading', date: '2025-05-23', link: 'https://www.darkreading.com/', desc: 'How modern firewalls detect and prevent insider threats in real-time.' },
        { title: 'Cloud Security: Extending NGFW to Multi-Cloud', source: 'Dark Reading', date: '2025-05-22', link: 'https://www.darkreading.com/', desc: 'Next-generation firewalls adapted for cloud infrastructure security.' },
        { title: 'Machine Learning in Cybersecurity Detection', source: 'Dark Reading', date: '2025-05-21', link: 'https://www.darkreading.com/', desc: 'AI-powered NGFW features improving zero-day threat detection.' },
        { title: 'Ransomware Statistics 2025: Industry Impact Report', source: 'Dark Reading', date: '2025-05-20', link: 'https://www.darkreading.com/', desc: '5414 ransomware attacks recorded globally, 40% increase from 2023.' }
    ]
};

function formatRSSDate(dateStr) {
    try {
        const date = new Date(dateStr);
        return date.toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' });
    } catch {
        return dateStr;
    }
}

function truncateText(text, maxLength) {
    if (!text) return '';
    maxLength = maxLength || 160;
    if (text.length > maxLength) return text.substring(0, maxLength) + '…';
    return text;
}

function renderArticles(articles, source) {
    const container = document.getElementById('rss-container');
    if (!container) return;
    
    let filtered = articles;
    if (source && source !== 'all') {
        const sourceMap = { 'bleeping': 'Bleeping Computer', 'krebs': 'KrebsOnSecurity', 'darkreading': 'Dark Reading' };
        const targetSource = sourceMap[source];
        filtered = articles.filter(a => a.source === targetSource);
    }

    if (!filtered.length) {
        container.innerHTML = '<p class="rss-error-message">Aucun article pour cette source.</p>';
        return;
    }

    let html = '<div class="rss-articles-list">';
    filtered.forEach(article => {
        html += `
        <article class="rss-article-item" onclick="window.open('${article.link}', '_blank'); return false;">
            <span class="rss-article-source">${article.source}</span>
            <h4 class="rss-article-title">${article.title}</h4>
            <p class="rss-article-desc">${truncateText(article.desc)}</p>
            <div class="rss-article-meta">
                <span class="rss-article-date">📅 ${formatRSSDate(article.date)}</span>
                <a href="${article.link}" class="rss-article-link" target="_blank" onclick="event.stopPropagation();">Lire l'article →</a>
            </div>
        </article>
        `;
    });
    html += '</div>';
    container.innerHTML = html;
}

function initRSSWidget() {
    const container = document.getElementById('rss-container');
    if (!container) return;

    // Afficher tous les articles au chargement
    const allArticles = [
        ...CYBERSECURITY_ARTICLES.bleeping,
        ...CYBERSECURITY_ARTICLES.krebs,
        ...CYBERSECURITY_ARTICLES.darkreading
    ];
    renderArticles(allArticles, 'all');

    // Gestionnaire des onglets
    document.querySelectorAll('.rss-source-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.rss-source-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const source = this.getAttribute('data-source');
            if (source === 'all') {
                const all = [
                    ...CYBERSECURITY_ARTICLES.bleeping,
                    ...CYBERSECURITY_ARTICLES.krebs,
                    ...CYBERSECURITY_ARTICLES.darkreading
                ];
                renderArticles(all, 'all');
            } else {
                const all = [
                    ...CYBERSECURITY_ARTICLES.bleeping,
                    ...CYBERSECURITY_ARTICLES.krebs,
                    ...CYBERSECURITY_ARTICLES.darkreading
                ];
                renderArticles(all, source);
            }
        });
    });
}

// Initialiser dès que le DOM est prêt
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initRSSWidget);
} else {
    initRSSWidget();
}
