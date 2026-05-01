// ---------- मॉडल डेटाबेस (FAR कैटलॉग के अनुसार) ----------
const models = [
    { name: "FRC1216", minDia: 30, maxDia: 160, app: "compact", weightCap: 500, details: "अल्ट्रा कॉम्पैक्ट, प्रेशर बूस्टर" },
    { name: "FRC3025", minDia: 45, maxDia: 250, app: "compact", weightCap: 800, details: "कॉम्पैक्ट, ऑटो लुब्रिकेशन" },
    { name: "FRU3", minDia: 20, maxDia: 165, app: "turning", weightCap: 1500, details: "रियर सिलिंडर, प्रॉक्सिमिटी फीडबैक" },
    { name: "FRU5", minDia: 45, maxDia: 350, app: "turning", weightCap: 2000, details: "बड़ी रेंज, हाइड्रोलिक" },
    { name: "GHS260E", minDia: 10, maxDia: 60, app: "grinding", weightCap: 300, details: "ग्राइंडिंग, कार्बाइड पैड" },
    { name: "GHS1012A", minDia: 10, maxDia: 120, app: "grinding", weightCap: 500, details: "सिलिंड्रिकल ग्राइंडिंग" },
    { name: "KRGU502", minDia: 50, maxDia: 100, app: "crankshaft", weightCap: 1200, details: "क्रैंकशाफ्ट ग्राइंडिंग" },
    { name: "KRGU580", minDia: 50, maxDia: 190, app: "crankshaft", weightCap: 1500, details: "बड़े क्रैंकशाफ्ट के लिए" },
    { name: "KRGU-HEAVY", minDia: 50, maxDia: 300, app: "crankshaft", weightCap: 30000, details: "5000kg तक क्रैंकशाफ्ट – कस्टम" },
    { name: "CS4", minDia: 25, maxDia: 330, app: "coolant", weightCap: 1500, details: "कूलेंट थ्रू आर्म्स" },
    { name: "CS5", minDia: 80, maxDia: 410, app: "coolant", weightCap: 2000, details: "हैवी कूलेंट एप्लिकेशन" },
    { name: "MS2080", minDia: 200, maxDia: 800, app: "heavy", weightCap: 20000, details: "मैन्युअल, 20 टन क्षमता" },
    { name: "MS6012", minDia: 600, maxDia: 1200, app: "heavy", weightCap: 20000, details: "20 टन, बड़े व्यास" },
    { name: "AS460", minDia: 20, maxDia: 60, app: "grinding", weightCap: 400, details: "रिट्रैक्टेबल आर्म" },
    { name: "FRUN3", minDia: 50, maxDia: 165, app: "turning", weightCap: 1000, details: "फुली सील्ड, सेफ्टी वाल्व" }
];

let currentQuoteModel = null;
let currentSearchParams = null;

function recommendModel() {
    let minD = parseFloat(document.getElementById("minDia").value);
    let maxD = parseFloat(document.getElementById("maxDia").value);
    let appSelect = document.getElementById("appType");
    let app = appSelect.options[appSelect.selectedIndex]?.value || appSelect.value;
    let weightKg = parseFloat(document.getElementById("weight").value);
    let resultDiv = document.getElementById("resultArea");

    if (isNaN(minD) || isNaN(maxD)) {
        resultDiv.innerHTML = `<div class="result error">❌ कृपया न्यूनतम और अधिकतम व्यास दोनों भरें।</div>`;
        return;
    }
    if (minD > maxD) {
        resultDiv.innerHTML = `<div class="result error">❌ न्यूनतम व्यास अधिकतम से बड़ा नहीं हो सकता।</div>`;
        return;
    }

    let appMapping = {
        "turning": ["turning", "compact"],
        "grinding": ["grinding"],
        "crankshaft": ["crankshaft"],
        "heavy": ["heavy"],
        "coolant": ["coolant"],
        "compact": ["compact"]
    };
    let validApps = appMapping[app] || [app];

    let matched = models.filter(m => {
        let diaOk = (maxD >= m.minDia - 20) && (minD <= m.maxDia + 20);
        let appOk = validApps.includes(m.app);
        let weightOk = (isNaN(weightKg) || weightKg <= 0) ? true : (weightKg <= m.weightCap);
        return diaOk && appOk && weightOk;
    });

    // Save current search parameters for quote
    currentSearchParams = { minD, maxD, app, weightKg: isNaN(weightKg) ? 0 : weightKg };

    if (matched.length === 0) {
        resultDiv.innerHTML = `<div class="result error">
            😕 आपके इनपुट से मेल खाता कोई मॉडल नहीं मिला।<br><br>
            📞 <strong>कृपया हमसे संपर्क करें:</strong> +91 92050 09857<br>
            📧 sales@2aa.co.in
        </div>`;
        return;
    }

    let html = `<div class="result">
        <strong>✅ सुझाए गए मॉडल (${matched.length}):</strong>
        <table>
            <thead><tr><th>मॉडल</th><th>व्यास रेंज (mm)</th><th>विशेषता</th><th>कार्रवाई</th></tr></thead>
            <tbody>`;
    matched.forEach(m => {
        html += `<tr>
                    <td><b>${m.name}</b></td>
                    <td>${m.minDia} – ${m.maxDia}</td>
                    <td>${m.details}</td>
                    <td><button class="quoteBtn" data-model="${m.name}">📄 Quote लें</button></td>
                  </tr>`;
    });
    html += `</tbody>
        </table>
        <hr>
        <div class="contact-info">
            💡 <strong>कृपया मॉडल के सामने "Quote लें" बटन दबाकर अपनी जानकारी भेजें।</strong><br>
            📞 +91 92050 09857 &nbsp;|&nbsp; 📧 sales@2aa.co.in
        </div>
    </div>`;
    resultDiv.innerHTML = html;

    // Attach event listeners to all quote buttons
    document.querySelectorAll('.quoteBtn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            currentQuoteModel = btn.getAttribute('data-model');
            openQuoteModal();
        });
    });
}

// ---------- Modal Functions ----------
function openQuoteModal() {
    const modal = document.getElementById('quoteModal');
    modal.style.display = 'block';
    // Clear previous status
    document.getElementById('quoteStatus').innerHTML = '';
}

function closeQuoteModal() {
    const modal = document.getElementById('quoteModal');
    modal.style.display = 'none';
    document.getElementById('quoteForm').reset();
}

// Submit quote using Netlify Forms
async function submitQuote(event) {
    event.preventDefault();
    const name = document.getElementById('custName').value.trim();
    const email = document.getElementById('custEmail').value.trim();
    const phone = document.getElementById('custPhone').value.trim();
    const message = document.getElementById('custMessage').value;
    const model = currentQuoteModel || 'Not specified';
    const params = currentSearchParams || {};

    if (!name || !email || !phone) {
        document.getElementById('quoteStatus').innerHTML = '<p style="color:red;">❌ कृपया नाम, ईमेल और मोबाइल नंबर भरें।</p>';
        return;
    }

    // Prepare data for Netlify form
    const formData = new FormData();
    formData.append('form-name', 'quote-request');
    formData.append('name', name);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('message', `Model: ${model}\nMin Diameter: ${params.minD || ''} mm\nMax Diameter: ${params.maxD || ''} mm\nApplication: ${params.app || ''}\nWeight: ${params.weightKg || ''} kg\n\nAdditional: ${message}`);
    formData.append('model', model);
    formData.append('minDia', params.minD || '');
    formData.append('maxDia', params.maxD || '');
    formData.append('app', params.app || '');
    formData.append('weight', params.weightKg || '');

    try {
        const response = await fetch('/', {
            method: 'POST',
            body: formData
        });
        if (response.ok) {
            document.getElementById('quoteStatus').innerHTML = '<p style="color:green;">✅ आपका Quote अनुरोध भेज दिया गया है। हम जल्द ही संपर्क करेंगे।</p>';
            setTimeout(() => {
                closeQuoteModal();
            }, 2000);
        } else {
            throw new Error('Network error');
        }
    } catch (error) {
        document.getElementById('quoteStatus').innerHTML = '<p style="color:red;">❌ कुछ गलत हो गया। कृपया बाद में प्रयास करें या सीधे हमें फोन करें।</p>';
    }
}

// Modal close handlers
window.onload = () => {
    const modal = document.getElementById('quoteModal');
    const closeSpan = document.querySelector('.close');
    if (closeSpan) {
        closeSpan.onclick = closeQuoteModal;
    }
    window.onclick = (event) => {
        if (event.target === modal) {
            closeQuoteModal();
        }
    };
    const quoteForm = document.getElementById('quoteForm');
    if (quoteForm) {
        quoteForm.addEventListener('submit', submitQuote);
    }
};
