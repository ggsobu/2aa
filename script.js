// ---------- मॉडल डेटाबेस (अपडेटेड) ----------
const models = [
    // कॉम्पैक्ट / टर्निंग
    { name: "FRC1216", minDia: 30, maxDia: 160, app: "compact", weightCap: 500, details: "अल्ट्रा कॉम्पैक्ट, प्रेशर बूस्टर" },
    { name: "FRC3025", minDia: 45, maxDia: 250, app: "compact", weightCap: 800, details: "कॉम्पैक्ट, ऑटो लुब्रिकेशन" },
    { name: "FRU3", minDia: 20, maxDia: 165, app: "turning", weightCap: 1500, details: "रियर सिलिंडर, प्रॉक्सिमिटी फीडबैक" },
    { name: "FRU5", minDia: 45, maxDia: 350, app: "turning", weightCap: 2000, details: "बड़ी रेंज, हाइड्रोलिक" },
    
    // ग्राइंडिंग
    { name: "GHS260E", minDia: 10, maxDia: 60, app: "grinding", weightCap: 300, details: "ग्राइंडिंग, कार्बाइड पैड" },
    { name: "GHS1012A", minDia: 10, maxDia: 120, app: "grinding", weightCap: 500, details: "सिलिंड्रिकल ग्राइंडिंग" },
    { name: "AS460", minDia: 20, maxDia: 60, app: "grinding", weightCap: 400, details: "रिट्रैक्टेबल आर्म" },
    
    // क्रैंकशाफ्ट ग्राइंडिंग
    { name: "KRGU502", minDia: 50, maxDia: 100, app: "crankshaft", weightCap: 1200, details: "क्रैंकशाफ्ट ग्राइंडिंग, एक्सेंट्रिक थ्रो" },
    { name: "KRGU580", minDia: 50, maxDia: 190, app: "crankshaft", weightCap: 1500, details: "बड़े क्रैंकशाफ्ट के लिए" },
    
    // हैवी ड्यूटी क्रैंकशाफ्ट (नया कस्टम मॉडल)
    { name: "KRGU-HEAVY (कस्टम)", minDia: 50, maxDia: 300, app: "crankshaft", weightCap: 30000, details: "⚠️ 5000 kg तक क्रैंकशाफ्ट ग्राइंडिंग – कस्टम समाधान, हमसे संपर्क करें" },
    
    // कूलेंट फ्लश
    { name: "CS4", minDia: 25, maxDia: 330, app: "coolant", weightCap: 1500, details: "कूलेंट थ्रू आर्म्स" },
    { name: "CS5", minDia: 80, maxDia: 410, app: "coolant", weightCap: 2000, details: "हैवी कूलेंट एप्लिकेशन" },
    
    // हैवी ड्यूटी मैन्युअल
    { name: "MS2080", minDia: 200, maxDia: 800, app: "heavy", weightCap: 20000, details: "मैन्युअल, 20 टन क्षमता" },
    { name: "MS6012", minDia: 600, maxDia: 1200, app: "heavy", weightCap: 20000, details: "20 टन, बड़े व्यास" },
    
    { name: "FRUN3", minDia: 50, maxDia: 165, app: "turning", weightCap: 1000, details: "फुली सील्ड, सेफ्टी वाल्व" }
];

function recommendModel() {
    let minD = parseFloat(document.getElementById("minDia").value);
    let maxD = parseFloat(document.getElementById("maxDia").value);
    let appSelect = document.getElementById("appType");
    let app = appSelect.options[appSelect.selectedIndex]?.value || appSelect.value;
    let weightKg = parseFloat(document.getElementById("weight").value);
    let resultDiv = document.getElementById("resultArea");

    // वैलिडेशन
    if (isNaN(minD) || isNaN(maxD)) {
        resultDiv.innerHTML = `<div class="result error">❌ कृपया न्यूनतम और अधिकतम व्यास दोनों भरें।</div>`;
        return;
    }
    
    if (minD > maxD) {
        resultDiv.innerHTML = `<div class="result error">❌ न्यूनतम व्यास अधिकतम से बड़ा नहीं हो सकता।</div>`;
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
    
    let validApps = appMapping[app] || [app];

    // पहले सख्त मिलान (व्यास + एप्लिकेशन + वजन)
    let matched = models.filter(m => {
        let diaOk = (maxD >= m.minDia - 20) && (minD <= m.maxDia + 20);
        let appOk = validApps.includes(m.app);
        let weightOk = (isNaN(weightKg) || weightKg <= 0) ? true : (weightKg <= m.weightCap);
        return diaOk && appOk && weightOk;
    });

    // अगर सख्त मिलान में कुछ नहीं मिला, तो वजन की शर्त हटाकर देखें
    if (matched.length === 0 && !isNaN(weightKg) && weightKg > 0) {
        matched = models.filter(m => {
            let diaOk = (maxD >= m.minDia - 20) && (minD <= m.maxDia + 20);
            let appOk = validApps.includes(m.app);
            return diaOk && appOk;
        });
        
        if (matched.length > 0) {
            // वजन ज़्यादा होने पर चेतावनी दें
            resultDiv.innerHTML = `<div class="result error">
                ⚠️ <strong>ध्यान दें:</strong> आपका वजन (${weightKg} kg) नीचे दिखाए गए मॉडलों की क्षमता से अधिक है।<br>
                फिर भी, व्यास के हिसाब से ये मॉडल उपयुक्त हो सकते हैं। कृपया हमसे संपर्क करके विशेष समाधान लें।
            </div>`;
            // और मॉडल दिखाएँ
        } else {
            // कोई मॉडल नहीं मिला तो कस्टम संपर्क दिखाएँ
            resultDiv.innerHTML = `<div class="result error">
                😕 आपके इनपुट से मेल खाता कोई मॉडल नहीं मिला।<br><br>
                ✅ <strong>हम आपके लिए कस्टम समाधान दे सकते हैं।</strong><br><br>
                📞 <strong>कृपया हमसे संपर्क करें:</strong> +91 92050 09857<br>
                📧 sales@2aa.co.in
            </div>`;
            return;
        }
    }

    if (matched.length === 0) {
        resultDiv.innerHTML = `<div class="result error">
            😕 आपके इनपुट से मेल खाता कोई मॉडल नहीं मिला।<br><br>
            📞 <strong>कृपया हमसे संपर्क करें:</strong> +91 92050 09857<br>
            📧 sales@2aa.co.in
        </div>`;
        return;
    }

    // रिजल्ट टेबल दिखाएँ
    let html = `<div class="result">
        <strong>✅ सुझाए गए मॉडल (${matched.length}):</strong>
        <table>
            <thead><tr><th>मॉडल</th><th>व्यास रेंज (mm)</th><th>विशेषता</th></tr></thead>
            <tbody>`;
    matched.forEach(m => {
        html += `<tr>
                    <td><b>${m.name}</b></td>
                    <td>${m.minDia} – ${m.maxDia}</td>
                    <td>${m.details}</td>
                 </tr>`;
    });
    html += `</tbody>
        </table>
        <hr>
        <div class="contact-info">
            💡 <strong>अधिक जानकारी या कस्टम समाधान के लिए:</strong><br>
            📞 <strong>+91 92050 09857</strong> (फोन / WhatsApp)<br>
            📧 <strong>sales@2aa.co.in</strong>
        </div>
    </div>`;
    resultDiv.innerHTML = html;
}
