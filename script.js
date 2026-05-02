// ---------- मॉडल डेटाबेस (FAR कैटलॉग के अनुसार) ----------
const models = [
    // Compact / FRC Series
    { name: "FRC1216", minDia: 30, maxDia: 160, app: "turning", weightCap: 500, details: "अल्ट्रा कॉम्पैक्ट, प्रेशर बूस्टर" },
    { name: "FRC3025", minDia: 45, maxDia: 250, app: "turning", weightCap: 800, details: "कॉम्पैक्ट, ऑटो लुब्रिकेशन" },
    // FRU Series
    { name: "FRU3", minDia: 20, maxDia: 165, app: "turning", weightCap: 1500, details: "रियर सिलिंडर, प्रॉक्सिमिटी फीडबैक" },
    { name: "FRU5", minDia: 45, maxDia: 350, app: "turning", weightCap: 2000, details: "बड़ी रेंज, हाइड्रोलिक" },
    // Grinding Series
    { name: "GHS260E", minDia: 10, maxDia: 60, app: "grinding", weightCap: 300, details: "ग्राइंडिंग, कार्बाइड पैड" },
    { name: "GHS1012A", minDia: 10, maxDia: 120, app: "grinding", weightCap: 500, details: "सिलिंड्रिकल ग्राइंडिंग" },
    // Crankshaft Grinding Series
    { name: "KRGU502", minDia: 50, maxDia: 100, app: "crankshaft", weightCap: 1200, details: "क्रैंकशाफ्ट ग्राइंडिंग" },
    { name: "KRGU580", minDia: 50, maxDia: 190, app: "crankshaft", weightCap: 1500, details: "बड़े क्रैंकशाफ्ट के लिए" },
    { name: "KRGU-HEAVY", minDia: 50, maxDia: 300, app: "crankshaft", weightCap: 30000, details: "5000kg तक क्रैंकशाफ्ट के लिए कस्टम समाधान" },
    // Coolant Series
    { name: "CS4", minDia: 25, maxDia: 330, app: "coolant", weightCap: 1500, details: "कूलेंट थ्रू आर्म्स, रियर सिलिंडर" },
    { name: "CS5", minDia: 80, maxDia: 410, app: "coolant", weightCap: 2000, details: "हैवी कूलेंट एप्लिकेशन" },
    // Heavy Duty Manual
    { name: "MS2080", minDia: 200, maxDia: 800, app: "heavy", weightCap: 20000, details: "मैन्युअल, 20 टन क्षमता, बहुत भारी कंपोनेंट्स के लिए" },
    { name: "MS6012", minDia: 600, maxDia: 1200, app: "heavy", weightCap: 20000, details: "20 टन क्षमता, बहुत बड़े व्यास के लिए" },
    // AS Series (Grinding)
    { name: "AS460", minDia: 20, maxDia: 60, app: "grinding", weightCap: 400, details: "रिट्रैक्टेबल आर्म, वर्टिकल लोडिंग" },
    // FRUN Series (Sealed)
    { name: "FRUN3", minDia: 50, maxDia: 165, app: "turning", weightCap: 1000, details: "फुली सील्ड, सेफ्टी वाल्व, कूलेंट और धूल से सुरक्षित" }
];

// ये फंक्शन सर्च करेगा
function recommendModel() {
    // इनपुट वैल्यू लेना
    let minDia = parseFloat(document.getElementById("minDia").value);
    let maxDia = parseFloat(document.getElementById("maxDia").value);
    let appSelect = document.getElementById("appType");
    let appType = appSelect.options[appSelect.selectedIndex]?.value || appSelect.value;
    let weight = parseFloat(document.getElementById("weight").value);
    let resultDiv = document.getElementById("resultArea");

    // पहले: गलत इनपुट चेक करें
    if (isNaN(minDia) || isNaN(maxDia)) {
        resultDiv.innerHTML = `<div class="result error">❌ कृपया न्यूनतम और अधिकतम व्यास दोनों भरें।</div>`;
        return;
    }
    if (minDia > maxDia) {
        resultDiv.innerHTML = `<div class="result error">❌ न्यूनतम व्यास अधिकतम व्यास से बड़ा नहीं हो सकता।</div>`;
        return;
    }

    // एप्लिकेशन मैपिंग: यूजर के सेलेक्टेड ऑप्शन को हमारी केटेगरी से मैच करवाना
    let appMapping = {
        "turning": ["turning", "compact"],
        "grinding": ["grinding"],
        "crankshaft": ["crankshaft"],
        "heavy": ["heavy"],
        "coolant": ["coolant"],
        "compact": ["compact"]
    };
    let targetApps = appMapping[appType] || [appType];

    // अब मॉडल्स को फ़िल्टर करें
    let matchedModels = models.filter(model => {
        // 1. व्यास की रेंज मैच करें (20mm ऊपर-नीचे की छूट)
        let diaOverlap = (maxDia >= model.minDia - 20) && (minDia <= model.maxDia + 20);
        // 2. एप्लिकेशन मैच करें
        let appMatch = targetApps.includes(model.app);
        // 3. वजन मैच करें (अगर यूजर ने वजन डाला है तभी)
        let weightOk = (isNaN(weight) || weight === 0) ? true : (weight <= model.weightCap);
        
        return diaOverlap && appMatch && weightOk;
    });

    // कोई मॉडल नहीं मिला तो...
    if (matchedModels.length === 0) {
        resultDiv.innerHTML = `<div class="result error">
            😕 आपके इनपुट से मेल खाता कोई मॉडल नहीं मिला।<br><br>
            💡 <strong>सुझाव:</strong> कृपया हमसे सीधे संपर्क करें – हम आपके लिए कस्टम समाधान देंगे।<br><br>
            📞 <strong>फोन / व्हाट्सएप:</strong> +91 92050 09857<br>
            📧 <strong>ईमेल:</strong> sales@2aa.co.in
        </div>`;
        return;
    }

    // अब रिजल्ट टेबल बनाएँ और दिखाएँ
    let html = `<div class="result">
        <strong>✅ आपके लिए ${matchedModels.length} सुझाए गए मॉडल:</strong>
        <table>
            <thead>
                <tr><th>मॉडल नाम</th><th>व्यास रेंज (mm)</th><th>अधिकतम वजन क्षमता (kg)</th><th>विशेषता</th></tr>
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
        <div class="contact-info">
            💡 <strong>कृपया ऊपर दिए गए किसी एक मॉडल के बारे में अधिक जानकारी के लिए हमसे संपर्क करें:</strong><br>
            📞 <strong>+91 92050 09857</strong> (फोन / WhatsApp)<br>
            📧 <strong>sales@2aa.co.in</strong>
        </div>
    </div>`;
    
    resultDiv.innerHTML = html;
}
