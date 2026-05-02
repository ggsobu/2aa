// ---------- मॉडल डेटाबेस ----------
const models = [
    { name: "FRC1216", minDia: 30, maxDia: 160, app: "turning", weightCap: 500, details: "अल्ट्रा कॉम्पैक्ट, प्रेशर बूस्टर" },
    { name: "FRC3025", minDia: 45, maxDia: 250, app: "turning", weightCap: 800, details: "कॉम्पैक्ट, ऑटो लुब्रिकेशन" },
    { name: "FRU3", minDia: 20, maxDia: 165, app: "turning", weightCap: 1500, details: "रियर सिलिंडर, प्रॉक्सिमिटी फीडबैक" },
    { name: "FRU5", minDia: 45, maxDia: 350, app: "turning", weightCap: 2000, details: "बड़ी रेंज, हाइड्रोलिक" },
    { name: "GHS260E", minDia: 10, maxDia: 60, app: "grinding", weightCap: 300, details: "ग्राइंडिंग, कार्बाइड पैड" },
    { name: "GHS1012A", minDia: 10, maxDia: 120, app: "grinding", weightCap: 500, details: "सिलिंड्रिकल ग्राइंडिंग" },
    { name: "KRGU502", minDia: 50, maxDia: 100, app: "crankshaft", weightCap: 1200, details: "क्रैंकशाफ्ट ग्राइंडिंग" },
    { name: "KRGU580", minDia: 50, maxDia: 190, app: "crankshaft", weightCap: 1500, details: "बड़े क्रैंकशाफ्ट के लिए" },
    { name: "KRGU-HEAVY", minDia: 50, maxDia: 300, app: "crankshaft", weightCap: 30000, details: "5000kg तक क्रैंकशाफ्ट के लिए कस्टम समाधान" },
    { name: "CS4", minDia: 25, maxDia: 330, app: "coolant", weightCap: 1500, details: "कूलेंट थ्रू आर्म्स" },
    { name: "CS5", minDia: 80, maxDia: 410, app: "coolant", weightCap: 2000, details: "हैवी कूलेंट एप्लिकेशन" },
    { name: "MS2080", minDia: 200, maxDia: 800, app: "heavy", weightCap: 20000, details: "मैन्युअल, 20 टन क्षमता" },
    { name: "MS6012", minDia: 600, maxDia: 1200, app: "heavy", weightCap: 20000, details: "20 टन, बड़े व्यास" },
    { name: "AS460", minDia: 20, maxDia: 60, app: "grinding", weightCap: 400, details: "रिट्रैक्टेबल आर्म" },
    { name: "FRUN3", minDia: 50, maxDia: 165, app: "turning", weightCap: 1000, details: "फुली सील्ड, सेफ्टी वाल्व" }
];

function recommendModel() {
    let minDia = parseFloat(document.getElementById("minDia").value);
    let maxDia = parseFloat(document.getElementById("maxDia").value);
    let appSelect = document.getElementById("appType");
    let appType = appSelect.options[appSelect.selectedIndex]?.value || appSelect.value;
    let weight = parseFloat(document.getElementById("weight").value);
    let resultDiv = document.getElementById("resultArea");

    if (isNaN(minDia) || isNaN(maxDia)) {
        resultDiv.innerHTML = `<div class="result error">❌ कृपया न्यूनतम और अधिकतम व्यास दोनों भरें।</div>`;
        return;
    }
    if (minDia > maxDia) {
        resultDiv.innerHTML = `<div class="result error">❌ न्यूनतम व्यास अधिकतम व्यास से बड़ा नहीं हो सकता।</div>`;
        return;
    }

    // एप्लिकेशन मैपिंग
    let appMapping = {
        "turning": ["turning", "compact"],
        "grinding": ["grinding"],
        "crankshaft": ["crankshaft"],
        "heavy": ["heavy"],
        "coolant": ["coolant"],
        "compact": ["compact"]
    };
    let targetApps = appMapping[appType] || [appType];

    // मॉडल फिल्टर – सिर्फ व्यास और एप्लिकेशन देखें, वजन नहीं
    let matchedModels = models.filter(model => {
        let diaOverlap = (maxDia >= model.minDia - 20) && (minDia <= model.maxDia + 20);
        let appMatch = targetApps.includes(model.app);
        return diaOverlap && appMatch;
    });

    // अगर वजन ज्यादा है तो चेतावनी दें
    let weightWarning = "";
    if (!isNaN(weight) && weight > 0) {
        let heavyModels = matchedModels.filter(m => weight <= m.weightCap);
        if (heavyModels.length === 0 && matchedModels.length > 0) {
            weightWarning = `<div class="error" style="margin-bottom:15px;">⚠️ आपका वजन (${weight} kg) नीचे दिखाए गए मॉडलों की क्षमता से अधिक है – कृपया हैवी ड्यूटी के लिए हमसे संपर्क करें।</div>`;
        }
    }

    if (matchedModels.length === 0) {
        resultDiv.innerHTML = `<div class="result error">
            😕 आपके इनपुट से मेल खाता कोई मॉडल नहीं मिला।<br><br>
            📞 <strong>कृपया हमसे संपर्क करें:</strong> +91 92050 09857
        </div>`;
        return;
    }

    // रिजल्ट टेबल
    let html = weightWarning + `<div class="result">
        <strong>✅ आपके लिए ${matchedModels.length} सुझाए गए मॉडल:</strong>
        <table>
            <thead>
                <tr><th>मॉडल</th><th>व्यास रेंज (mm)</th><th>क्षमता (kg)</th><th>विशेषता</th></tr>
            </thead>
            <tbody>`;
    matchedModels.forEach(m => {
        html += `<tr>
                    <td><b>${m.name}</b></td>
                    <td>${m.minDia} – ${m.maxDia}</td>
                    <td>${m.weightCap} kg</td>
                    <td>${m.details}</td>
                 </tr>`;
    });
    html += `</tbody>
        </table>
        <hr>
        📞 <strong>क्वोटेशन के लिए:</strong> +91 92050 09857
    </div>`;
    resultDiv.innerHTML = html;
}
