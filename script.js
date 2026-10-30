// script.js

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('docForm');
    const resultOutput = document.getElementById('resultOutput');
    const loadingIndicator = document.getElementById('loadingIndicator');
    const generateButton = document.getElementById('generateButton');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // 1. UI-Status aktualisieren
        resultOutput.textContent = '';
        loadingIndicator.classList.remove('hidden');
        generateButton.disabled = true;
        generateButton.textContent = 'KI arbeitet...';

        // 2. Daten sammeln
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        // 3. API-Aufruf (Muss mit deiner Python-Backend-URL übereinstimmen)
        const API_URL = 'http://127.0.0.1:8000/generate_doc'; 

        try {
            // FÜR DEMOZWECKE: Simuliere eine 3-Sekunden-Ladezeit und gib eine Testantwort aus
            // Du musst diesen Abschnitt durch den echten fetch-Aufruf ersetzen, wenn das Backend läuft!
            await new Promise(resolve => setTimeout(resolve, 3000)); 
            
            // --- HIER WÜRDE DEIN ECHTER API CALL SEIN ---
            /*
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            const result = await response.json();
            */
            
            // Simulierte KI-Antwort für die Demo
            const simulatedResult = {
                success: true,
                document_text: `--- Generierter ${data.document_type} für ${data.industry} ---\n\n` + 
                                `**Executive Summary:** Das Unternehmen startet mit einem klaren Fokus auf die Skalierung des ${data.industry}-Marktes, indem es die einzigartigen Features ${data.key_features} nutzt.\n\n` +
                                `**Finanzen:** Basierend auf Ihren Zielen ist in Jahr 3 ein Break-Even mit einem projizierten Umsatz von 1.1 Millionen Euro realistisch, vorausgesetzt, die Kundenakquisitionskosten (CAC) bleiben unter 500 €.\n\n` +
                                `**WICHTIG:** Dieser Plan basiert auf der simulierten KI. Verbinden Sie ihn jetzt mit Ihrem Python-Backend!`
            };
            
            // 4. Ergebnisse anzeigen
            if (simulatedResult.success) {
                resultOutput.innerHTML = simulatedResult.document_text.replace(/\n/g, '<br>'); // Zeilenumbrüche für HTML
            } else {
                resultOutput.textContent = `Fehler bei der Generierung: ${simulatedResult.error}`;
            }

        } catch (error) {
            resultOutput.textContent = `Verbindungsfehler zur KI-Engine: ${error}. Überprüfen Sie das Python-Backend und die API-URL.`;
        } finally {
            // 5. UI zurücksetzen
            loadingIndicator.classList.add('hidden');
            generateButton.disabled = false;
            generateButton.textContent = 'GENERIEREN';
        }
    });
});