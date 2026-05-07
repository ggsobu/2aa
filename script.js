// ---------- एन्हांस्ड मॉडल डेटाबेस (कैटलॉग से एक्स्ट्रा स्पेक्स के साथ) ----------
const models = [
    // FRC Series (Page 7)
    { name: "FRC1216", minDia: 30, maxDia: 160, app: "turning", weightCap: 500, 
      specs: "Cyl bore:40mm | Hyd:G1/8\" | Press:20-70bar | Clamp:3000daN | Acc:0.04mm | Wt:45kg",
      details: "अल्ट्रा कॉम्पैक्ट, प्रेशर बूस्टर" },
    { name: "FRC3025", minDia: 45, maxDia: 250, app: "turning", weightCap: 800,
      specs: "Cyl bore:40mm | Hyd:G1/8\" | Clamp:4500daN | Acc:0.04mm | Wt:73kg",
      details: "कॉम्पैक्ट, ऑटो लुब्रिकेशन" },
    { name: "FRC4532", minDia: 45, maxDia: 320, app: "turning", weightCap: 800,
      specs: "Cyl bore:50mm | Clamp:5500daN | Acc:0.06mm | Wt:148kg", details: "मध्यम आकार" },
    // FRU Series (Page 9)
    { name: "FRU3", minDia: 20, maxDia: 165, app: "turning", weightCap: 1500,
      specs: "Cyl bore:90mm | Press:8-60bar | Clamp:1000daN | Acc:0.04mm | Wt:42kg",
      details: "रियर सिलिंडर, प्रॉक्सिमिटी फीडबैक" },
    { name: "FRU5", minDia: 45, maxDia: 350, app: "turning", weightCap: 2000,
      specs: "Cyl bore:120mm | Clamp:2000daN | Acc:0.06mm | Wt:155kg",
      details: "बड़ी रेंज, हाइड्रोलिक" },
    // Grinding Series (Page 23)
    { name: "GHS260E", minDia: 10, maxDia: 60, app: "grinding", weightCap: 300,
      specs: "Cyl bore:30mm | Press:2-15bar | Clamp:100daN | Acc:0.01mm | Wt:7kg",
      details: "ग्राइंडिंग, कार्बाइड पैड" },
    { name: "GHS1012A", minDia: 10, maxDia: 120, app: "grinding", weightCap: 500,
      specs: "Cyl bore:50mm | Press:2-20bar | Clamp:1000daN | Acc:0.01mm | Wt:27kg",
      details: "सिलिंड्रिकल ग्राइंडिंग" },
    // Crankshaft Grinding Series (Page 22)
    { name: "KRGU502", minDia: 50, maxDia: 100, app: "crankshaft", weightCap: 1200,
      specs: "Cyl bore:50mm | Press:6-30bar | Clamp:196daN/pad | Acc:0.01mm | Wt:39kg",
      details: "क्रैंकशाफ्ट ग्राइंडिंग" },
    { name: "KRGU580", minDia: 50, maxDia: 190, app: "crankshaft", weightCap: 1500,
      specs: "Cyl bore:60mm | Press:6-30bar | Clamp:196daN/pad | Acc:0.01mm | Wt:45kg",
      details: "बड़े क्रैंकशाफ्ट के लिए" },
    { name: "KRGU-HEAVY", minDia: 50, maxDia: 300, app: "crankshaft", weightCap: 30000,
      specs: "कस्टम समाधान | 30 Ton क्षमता", details: "5000kg तक क्रैंकशाफ्ट के लिए कस्टम समाधान" },
    // Coolant Series CS (Page 13)
    { name: "CS4", minDia: 25, maxDia: 330, app: "coolant", weightCap: 1500,
      specs: "Cyl bore:90mm | Clamp:1500daN | Acc:0.05mm | Wt:85kg",
      details: "कूलेंट थ्रू आर्म्स" },
    { name: "CS5", minDia: 80, maxDia: 410, app: "coolant", weightCap: 2000,
      specs: "Cyl bore:100mm | Clamp:2000daN | Acc:0.06mm | Wt:170kg",
      details: "हैवी कूलेंट एप्लिकेशन" },
    // Heavy Duty Manual (Page 14,17)
    { name: "MS2080", minDia: 200, maxDia: 800, app: "heavy", weightCap: 20000,
      specs: "मैन्युअल | 20 Ton क्षमता | 4 quills | बैबिट पैड", details: "मैन्युअल, 20 टन क्षमता" },
    { name: "MS6012", minDia: 600, maxDia: 1200, app: "heavy", weightCap: 20000,
      specs: "मैन्युअल | 20 Ton | बड़े व्यास", details: "20 टन, बड़े व्यास" },
    // AS Series (Page 21)
    { name: "AS460", minDia: 20, maxDia: 60, app: "grinding", weightCap: 400,
      specs: "Cyl bore:40mm | Press:4-25bar | Clamp:200daN | Acc:0.01mm | Wt:35kg",
      details: "रिट्रैक्टेबल आर्म" },
    // FRUN Series (Page 8)
    { name: "FRUN3", minDia: 50, maxDia: 165, app: "turning", weightCap: 1000,
      specs: "Cyl bore:70mm | Press:8-80bar | Clamp:1000daN | Acc:0.04mm | Wt:48kg",
      details: "फुली सील्ड, सेफ्टी वाल्व" }
];

// ---------- रिकमेंडेशन फंक्शन (बेहतर डिटेल्स कॉलम के साथ) ----------
function recommendModel() {
    const machineCompany = document.getElementById('machineCompany') ? document.getElementById('machineCompany').value : '';
const machineModel = document.getElementById('machineModel') ? document.getElementById('machineModel').value : '';
    const minDia = parseFloat(document.getElementById('minDia').value);
    const maxDia = parseFloat(document.getElementById('maxDia').value);
    const appSelect = document.getElementById('appType');
    const app = appSelect.options[appSelect.selectedIndex]?.value || appSelect.value;
    const weight = parseFloat(document.getElementById('weight').value);
    const resultDiv = document.getElementById('resultArea');

    if (isNaN(minDia) || isNaN(maxDia)) {
        resultDiv.innerHTML = `<div class="result error">❌ कृपया न्यूनतम और अधिकतम व्यास भरें।</div>`;
        return;
    }
    if (minDia > maxDia) {
        resultDiv.innerHTML = `<div class="result error">❌ न्यूनतम व्यास अधिकतम से बड़ा नहीं हो सकता।</div>`;
        return;
    }

    const appMapping = {
        turning: ['turning', 'compact'],
        grinding: ['grinding'],
        crankshaft: ['crankshaft'],
        heavy: ['heavy'],
        coolant: ['coolant'],
        compact: ['compact']
    };
    const targetApps = appMapping[app] || [app];

    let matched = models.filter(m => {
        const diaOk = (maxDia >= m.minDia - 20) && (minDia <= m.maxDia + 20);
        const appOk = targetApps.includes(m.app);
        return diaOk && appOk;
    });

    // वजन चेतावनी
    let weightWarning = '';
    if (!isNaN(weight) && weight > 0) {
        const capable = matched.some(m => weight <= m.weightCap);
        if (!capable && matched.length) {
            weightWarning = `<div class="error" style="margin-bottom:15px;">⚠️ आपका वजन (${weight} kg) नीचे दिखाए गए मॉडलों की क्षमता से अधिक है – कृपया हैवी ड्यूटी के लिए हमसे संपर्क करें।</div>`;
        }
    }

    if (matched.length === 0) {
        resultDiv.innerHTML = `<div class="result error">😕 कोई मॉडल नहीं मिला।<br><br>📞 संपर्क करें: +91 92050 09857</div>`;
        return;
    }

    // टेबल बनाएँ – अब 5 कॉलम (मॉडल, व्यास, क्षमता, डिटेल्स, कार्रवाई)
    let html = weightWarning + `<div class="result">
        <strong>✅ आपके लिए ${matched.length} सुझाए गए मॉडल:</strong>
        <table>
            <thead>
                <tr>
                    <th>मॉडल</th>
                    <th>व्यास रेंज (mm)</th>
                    <th>क्षमता (kg)</th>
                    <th>विस्तृत स्पेक्स (Bore/Force/Acc/Weight)</th>
                    <th>कार्रवाई</th>
                </tr>
            </thead>
            <tbody>`;
    matched.forEach(m => {
        html += `<tr>
            <td><b>${m.name}</b></td>
            <td>${m.minDia}–${m.maxDia} mm</td>
            <td>${m.weightCap} kg</td>
            <td>${m.specs || 'मानक डिटेल्स उपलब्ध'}</td>
            <td><button class="quoteBtn" data-model="${m.name}" data-min="${m.minDia}" data-max="${m.maxDia}">📄 Quote लें</button></td>
        </tr>`;
    });
    html += `</tbody>
        </table>
        <hr>
        📞 <strong>क्वोटेशन के लिए:</strong> +91 92050 09857
    </div>`;
    resultDiv.innerHTML = html;

    // क्वोट बटन के लिए इवेंट
    document.querySelectorAll('.quoteBtn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.getElementById('custModel').value = btn.dataset.model;
            const diaRange = `${btn.dataset.min} - ${btn.dataset.max} mm`;
            document.getElementById('custDia').value = diaRange;
            openModal();
        });
    });
}

// मोडल फंक्शंस (पहले जैसे ही)
function openModal() {
    document.getElementById('quoteModal').style.display = 'block';
    document.getElementById('quoteStatus').innerHTML = '';
}
function closeModal() {
    document.getElementById('quoteModal').style.display = 'none';
    document.getElementById('quoteForm').reset();
}
window.onload = () => {
    const modal = document.getElementById('quoteModal');
    const closeSpan = document.querySelector('.close');
    if (closeSpan) closeSpan.onclick = closeModal;
    window.onclick = (e) => { if (e.target === modal) closeModal(); };
};
