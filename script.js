// --- INITIALIZATION ---
document.addEventListener("DOMContentLoaded", () => {
    initTheme();
    initPasswordChecker();
    initNavigationHighlighter();
});

// --- THEME MANAGEMENT (DARK BY DEFAULT, TOGGLE TO LIGHT) ---
function initTheme() {
    const toggle = document.getElementById("themeToggle");
    
    // Controleer opgeslagen voorkeur
    if (localStorage.getItem("theme") === "light") {
        document.body.classList.add("light-theme");
        toggle.textContent = "🌙 Dark Mode";
    }

    toggle.addEventListener("click", () => {
        document.body.classList.toggle("light-theme");
        const isLight = document.body.classList.contains("light-theme");
        toggle.textContent = isLight ? "🌙 Dark Mode" : "☀️ Light Mode";
        localStorage.setItem("theme", isLight ? "light" : "dark");
    });
}

// --- PASSWORD STRENGTH CHECKER & LIVE VALIDATION RULES ---
function initPasswordChecker() {
    const input = document.getElementById("passwordInput");
    const bar = document.getElementById("passwordStrengthBar");
    const feedback = document.getElementById("passwordFeedback");
    const toggleBtn = document.getElementById("togglePasswordVisibility");

    // Wachtwoord tonen/verbergen koppeling
    toggleBtn.addEventListener("click", () => {
        const isPass = input.type === "password";
        input.type = isPass ? "text" : "password";
        toggleBtn.textContent = isPass ? "Verberg" : "Toon";
    });

    // Real-time invoer evaluatie
    input.addEventListener("input", () => {
        const val = input.value;
        
        // Regel elementen ophalen
        const ruleLen = document.getElementById("rule-length");
        const ruleUpper = document.getElementById("rule-upper");
        const ruleSpecial = document.getElementById("rule-special");

        if(!val) {
            bar.style.width = "0%";
            feedback.textContent = "";
            resetRules([ruleLen, ruleUpper, ruleSpecial]);
            return;
        }

        // Valideer individuele regels
        const hasLength = val.length >= 12;
        const hasUpper = /[A-Z]/.test(val);
        const hasSpecial = /[^A-Za-z0-9]/.test(val);

        toggleRuleState(ruleLen, hasLength, "✓ Minimaal 12 tekens", "❌ Minimaal 12 tekens");
        toggleRuleState(ruleUpper, hasUpper, "✓ Hoofdletter", "❌ Hoofdletter");
        toggleRuleState(ruleSpecial, hasSpecial, "✓ Speciaal teken", "❌ Speciaal teken");

        // Bereken cumulatieve score
        let score = 0;
        if (hasLength) score += 2;
        if (hasUpper) score += 1;
        if (hasSpecial) score += 1;
        if (val.length >= 16) score += 1; // Bonus voor extra lengte

        const widthPercentage = Math.min((score / 5) * 100, 100);
        bar.style.width = `${widthPercentage}%`;

        if (score <= 2) {
            bar.style.backgroundColor = "var(--error-color)";
            feedback.textContent = "🚨 Onveilig. Verleng je wachtwoord met meer speciale karakters en (hoofd)letters.";
            feedback.style.color = "var(--error-color)";
        } else if (score <= 4) {
            bar.style.backgroundColor = "var(--warning-color)";
            feedback.textContent = "⚡ Redelijk veilig. Probeer extra speciale karakters toe te voegen voor extra veiligheid.";
            feedback.style.color = "var(--warning-color)";
        } else {
            bar.style.backgroundColor = "var(--success-color)";
            feedback.textContent = "🛡 Erg veilig! Dit wachtwoord biedt uitstekende digitale weerstand.";
            feedback.style.color = "var(--success-color)";
        }
    });
}

function toggleRuleState(element, isValid, validText, invalidText) {
    element.textContent = isValid ? validText : invalidText;
    if(isValid) {
        element.classList.remove("invalid");
        element.classList.add("valid");
    } else {
        element.classList.remove("valid");
        element.classList.add("invalid");
    }
}

function resetRules(rules) {
    rules.forEach(r => {
        r.textContent = r.id === "rule-length" ? "❌ Minimaal 12 tekens" : r.id === "rule-upper" ? "❌ Hoofdletter" : "❌ Speciaal teken";
        r.classList.remove("valid", "invalid");
    });
}

// Actieve menu-item highlighter bij klikken
function initNavigationHighlighter() {
    const navItems = document.querySelectorAll(".nav-item");
    navItems.forEach(item => {
        item.addEventListener("click", () => {
            document.querySelector(".nav-item.active").classList.remove("active");
            item.classList.add("active");
        });
    });
}
