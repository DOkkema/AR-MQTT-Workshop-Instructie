import { WorkshopStep } from '../types';

export const WORKSHOP_STEPS: WorkshopStep[] = [
  {
    key: 'doel',
    stepNumber: 'Overzicht',
    title: 'Wat ga je maken? (Het Einddoel & Demo Simulator)',
    subtitle: 'Ontdek de 4 stappen van de workshop en ervaar hieronder direct wat jouw eindapplicatie straks kan!',
    usedMarker: 'Virtuele demo (alle markers)',
    estimatedMinutes: 8,
    whatYouWillBuild:
      'Je krijgt een helder vogelvlucht-overzicht van de workshop: van je eerste HTML-bestand tot een Augmented Reality app die live praat met een Raspberry Pi. Speel met de interactieve simulator hieronder om het eindresultaat alvast te testen!',
    whyThisMatters:
      'Als je vooraf precies ziet waar je naartoe werkt, begrijp je tijdens het bouwen direct waarom elke tussenstap nodig is.',
    sections: [
      {
        title: 'De 4 pijlers van deze workshop',
        description:
          'Tijdens deze workshop doorloop je vier heldere fases om van nul tot een complete Augmented Reality IoT-oplossing te komen (zie ook het overzichtsschema hieronder):',
        image: {
          src: '/images/VSCode1.png',
          alt: 'Overzichtsschema van de 4 fases van de workshop',
          caption: 'De 4 pijlers: 1. Ontwikkelen in VS Code, 2. Testen via Live Server, 3. Publiceren op GitHub, 4. Gebruiken met MQTT Broker en barcodes.',
          badge: 'Workshop Overzicht',
        },
        substeps: [
          '1. Ontwikkelen in Visual Studio Code: Je schrijft HTML met de A-Frame bibliotheek. Je startbestand is AR1.html en in de map js/ staat mqttws31.min.js.',
          '2. Testen via Live Server: Een handige extensie in VS Code waarmee jouw webpagina automatisch vernieuwt zodra je opslaat.',
          '3. Publiceren op GitHub Pages: Je zet je werk gratis online met HTTPS, zodat de camera van je smartphone toegang krijgt tot de AR-webpagina.',
          '4. Gebruiken via MQTT & Barcodes: Je koppelt je app aan de MQTT-broker (op school wss://192.168.1.46/mqtt) en legt geprinte 3x3 barcodes op tafel!',
        ],
        callout: {
          type: 'info',
          title: '🎮 Test het einddoel in de simulator hieronder!',
          text: 'Voordat we een letter code aanraken: klik hieronder op GROEN of ROOD om de LEDs op de Sense HAT te besturen, en schuif met de temperatuur-slider om te zien hoe het 3D-blok van groen naar geel en rood kleurt!',
        },
      },
    ],
    checkCriteria: [
      'Je hebt de interactieve simulator hieronder uitgeprobeerd',
      'Je begrijpt de 4 fases: Ontwikkelen → Testen → Publiceren → Gebruiken',
      'Je weet dat je toewerkt naar een interactieve AR-app met MQTT communicatie',
    ],
    quiz: [
      {
        question: 'Welke 4 fases doorloop je tijdens deze workshop?',
        options: [
          'Ontwikkelen (VS Code) → Testen (Live Server) → Publiceren (GitHub) → Gebruiken (MQTT & Barcodes)',
          'Kopen → Slopen → Opnieuw kopen → Weggooien',
          'Alleen maar theorie lezen zonder zelf code aan te passen',
          'Een native app voor de App Store programmeren in Swift',
        ],
        correctIndex: 0,
        explanation:
          'Klopt precies! We ontwikkelen in VS Code, testen lokaal met Live Server, publiceren via GitHub Pages en besturen echte IoT hardware via MQTT.',
      },
    ],
    hints: [
      {
        title: 'Benieuwd naar de code?',
        content:
          'Via de knop "Bestanden" bovenin kun je op elk moment zowel het beginbestand AR1.html bekijken als na stap 6 de mastercode webar01.html!',
      },
    ],
  },
  {
    key: 'vscode',
    stepNumber: 'VS Code',
    title: 'Visual Studio Code: Jouw Digitale Werkplaats',
    subtitle: 'Open je eerste editor, ontdek de interface, installeer Live Server en leer de Gouden Regel',
    usedMarker: 'Nog geen marker nodig',
    estimatedMinutes: 10,
    whatYouWillBuild:
      'Je maakt kennis met Visual Studio Code. Je leert hoe de mappenstructuur werkt (AR1.html en map js/ met mqttws31.min.js) en installeert de onmisbare Live Server extensie.',
    whyThisMatters:
      'VS Code is dé industriestandaard voor ontwikkelaars wereldwijd. Als je de basisonderdelen kent, werk je sneller en voorkom je 90% van de beginnersfouten.',
    sections: [
      {
        title: 'Wat is HTML en hoe zit een pagina in elkaar?',
        description:
          'HTML is de taal waarin webpagina\'s zijn geschreven. Een browser (Chrome, Safari, Edge) leest die taal en toont er een pagina mee. Je schrijft HTML in een gewoon tekstbestand met de extensie .html.\n\nEen HTML-pagina bestaat uit tags: woorden tussen < >-haken, zoals <a-box color="rood"></a-box>.',
        callout: {
          type: 'info',
          title: 'Handige vergelijkingen om te onthouden',
          text: '<!-- commentaar --> = Post-it briefje naast de tekst (de browser negeert dit, speciaal voor jou als uitleg!)\n<script> = De "hersenen" van de pagina (JavaScript: als dit gebeurt, doe dan dat)\n<style> = De "kleding" van de pagina (CSS: knoppen, kleuren, posities)\nid="naam" = Een "huisnummer" (een unieke naam zodat het script precies dit ene onderdeel kan vinden)',
        },
      },
      {
        title: 'Live Server installeren in VS Code',
        description:
          'Live Server zorgt ervoor dat je browser automatisch ververst zodra je op Ctrl+S (opslaan) drukt. Dit hoef je maar één keer te installeren:\n\n1. Klik aan de linkerkant op het icoon met de vier blokjes (Extensions, of druk op Ctrl+Shift+X).\n2. Typ in de zoekbalk: live server.\n3. Klik bij het resultaat van Ritwick Dey op de blauwe knop Install (zie de rode cirkels op het screenshot hieronder).',
        image: {
          src: '/images/VSCode2.png',
          alt: 'Live Server installeren via de Extensions marktplaats in VS Code',
          caption: 'Zoek naar "live server" in het Extensions paneel links en installeer de extensie van Ritwick Dey.',
          badge: 'VS Code Extensies',
        },
      },
      {
        title: 'Live Server starten via rechtsklikken',
        description:
          'Zodra Live Server is geïnstalleerd, start je hem bij elke werksessie zo op:\n\n1. Open je workshopmap via File → Open Folder... (zorg dat zowel AR1.html als de map js/ erin staan).\n2. Rechtsklik in het bestandenlijstje links op AR1.html.\n3. Klik in het contextmenu op "Open with Live Server" (Alt+L Alt+O), zoals rood omcirkeld in de afbeelding.\n4. Er opent nu direct een browsertabblad met jouw live pagina!',
        image: {
          src: '/images/VSCode3.png',
          alt: 'Rechtsklikken op AR1.html en Open with Live Server kiezen',
          caption: 'Rechtsklik op AR1.html → Open with Live Server. Onderin de statusbalk zie je nu Port: 5500 verschijnen.',
          badge: 'Live Server Starten',
        },
        callout: {
          type: 'gouden-regel',
          title: '💡 Gouden regel van de workshop',
          text: 'Verander per keer één klein ding, druk op Ctrl+S (opslaan), en kijk direct wat er in de browser gebeurt. Werkt het niet? Dan weet je exact welke regel code het deed!',
        },
      },
    ],
    checkCriteria: [
      'Je hebt de workshopmap geopend in VS Code via File → Open Folder...',
      'Je ziet in de Explorer zowel AR1.html als de submap js/ met mqttws31.min.js staan',
      'Je hebt de Live Server extensie van Ritwick Dey geïnstalleerd',
      'Je kunt Live Server starten via rechtsklik op AR1.html → "Open with Live Server"',
    ],
    quiz: [
      {
        question: 'Waarom moet je in VS Code de hele map openen (File → Open Folder...) in plaats van alleen het losse bestand AR1.html?',
        options: [
          'Omdat VS Code en Live Server dan ook direct de submap js/ met mqttws31.min.js kunnen vinden',
          'Omdat de computer anders vastloopt',
          'Omdat HTML-bestanden alleen in mappen kunnen worden opgeslagen',
          'Dat maakt helemaal niets uit',
        ],
        correctIndex: 0,
        explanation:
          'Uitstekend! Door de hele workshopmap te openen, blijven de relatieve paden (zoals js/mqttws31.min.js) perfect kloppen wanneer Live Server start.',
      },
      {
        question: 'Wat is de snelste manier om je wijzigingen in Live Server direct in de browser te zien?',
        options: [
          'Je computer opnieuw opstarten',
          'Gewoon Ctrl + S (opslaan) indrukken in VS Code: Live Server vernieuwt automatisch!',
          'Elke keer VS Code afsluiten en opnieuw openen',
          'Een nieuwe extensie installeren',
        ],
        correctIndex: 1,
        explanation:
          'Precies! Zodra je bestand opslaat (Ctrl+S op Windows of Cmd+S op Mac), ververst Live Server de browser razendsnel voor je.',
      },
    ],
    hints: [
      {
        title: 'Zie je de vier blokjes (Extensions) niet?',
        content:
          'Kijk aan de uiterste linkerkant van je VS Code scherm in de verticale balk (Activity Bar). Je kunt ook de sneltoets Ctrl + Shift + X gebruiken!',
      },
      {
        title: 'Geen "Open with Live Server" in het rechtsklikmenu?',
        content:
          'Controleer of de installatie van Live Server klaar is (de knop "Install" verandert in een tandwieltje). Herstart eventueel VS Code een keertje.',
      },
    ],
  },
  {
    key: 'github',
    stepNumber: 'GitHub Pages',
    title: 'Stappenblad: Je AR-webpagina op je telefoon',
    subtitle: 'Publiceer je code gratis via GitHub Pages zodat je smartphone camera werkt!',
    usedMarker: 'Marker 1 om te testen',
    estimatedMinutes: 10,
    whatYouWillBuild:
      'Een gratis openbare webpagina via GitHub Pages (met https://), zodat jouw smartphone toegang krijgt tot de camera en jouw 3D-projecties kan bekijken.',
    whyThisMatters:
      'Moderne mobiele browsers (iOS Safari & Android Chrome) blokkeren de camera op onbeveiligde websites. GitHub Pages geeft je gratis een beveiligd HTTPS-adres!',
    sections: [
      {
        title: 'Stap 1 & 2 — Account en Repository maken',
        description:
          '1. Ga naar https://github.com/signup en maak een gratis account aan (bevestig je mail!).\n2. Klik rechtsboven op het plusje (+) → "New repository".\n3. Vul in: Repository name: webar-workshop.\n4. Zichtbaarheid: kies "Public" (belangrijk: bij Private werkt gratis Pages niet!).\n5. Vink "Add a README file" aan en klik op "Create repository".',
      },
      {
        title: 'Stap 3 — Bestanden uploaden (inclusief map js)',
        description:
          'Klik in je repository op "Add file" → "Upload files".\nSleep AR1.html én de map js (met mqttws31.min.js) naar het uploadvak.\nKlik onderaan op de groene knop "Commit changes".',
        callout: {
          type: 'warning',
          title: 'Belangrijk: De js map mag niet ontbreken!',
          text: 'Zonder js/mqttws31.min.js lijkt de pagina straks wel te openen, maar blijft de MQTT-status eindeloos op "Verbinden..." hangen!',
        },
      },
      {
        title: 'Stap 4A — Naar Settings gaan in GitHub',
        description:
          'Ga naar je gemaakte repository "webar-workshop". Klik rechtsboven in de balk op het tabblad Settings (zoals in de rode cirkel op het screenshot):',
        image: {
          src: '/images/Github1.png',
          alt: 'Klik op het Settings tabblad in je GitHub repository',
          caption: 'Klik rechtsboven op het tandwieltje "Settings" om de instellingen van je project te openen.',
          badge: 'GitHub Instellingen',
        },
      },
      {
        title: 'Stap 4B — GitHub Pages activeren',
        description:
          'Volg de instellingen precies zoals rood omcirkeld in de onderstaande afbeelding:\n1. Klik in het linkermenu op "Pages".\n2. Bij Build and deployment kies je Source: "Deploy from a branch".\n3. Bij Branch selecteer je "main" en map "/ (root)".\n4. Klik op de knop "Save".\n5. Wacht 1 à 2 minuten: bovenin verschijnt jouw live URL!',
        image: {
          src: '/images/Github2.png',
          alt: 'GitHub Pages activeren met branch main en root map',
          caption: 'Kies Source: Deploy from a branch, Branch: main, Folder: / (root) en klik op Save.',
          badge: 'GitHub Pages Publicatie',
        },
      },
      {
        title: 'Stap 5 — Openen op je smartphone',
        description:
          'Open op je smartphone de URL met jouw bestandsnaam erachter:\nhttps://<jouw-gebruikersnaam>.github.io/webar-workshop/AR1.html\n\n1. De browser vraagt: "Mag deze website uw camera gebruiken?". Tik op TOESTAAN!\n2. Houd Barcode-marker 1 voor de camera op 10-20 cm afstand met voldoende licht.\n3. Je ziet de oranje kubus zweven boven het papier!',
      },
    ],
    checkCriteria: [
      'Je hebt een publieke GitHub repository met AR1.html en js/mqttws31.min.js',
      'GitHub Pages is geactiveerd op de main branch in Settings → Pages',
      'Je hebt de link op je telefoon geopend en cameratoegang toegestaan',
      'Je ziet de kubus op marker 1 zweven op je telefoonscherm',
    ],
    quiz: [
      {
        question: 'Waarom moet de GitHub repository ingesteld staan op "Public"?',
        options: [
          'Omdat GitHub Pages alleen gratis beschikbaar is voor publieke repositories',
          'Omdat VS Code anders de bestanden niet kan opslaan',
          'Omdat de camera van je telefoon anders in zwart-wit opneemt',
          'Omdat de Raspberry Pi anders geen stroom krijgt',
        ],
        correctIndex: 0,
        explanation:
          'Helemaal juist! Bij een gratis GitHub-account werkt GitHub Pages uitsluitend als de repository op Public staat.',
      },
      {
        question: 'Wat is de meest voorkomende reden dat de camera op een smartphone niet start?',
        options: [
          'De batterij van de telefoon is minder dan 50%',
          'Er is geen toestemming verleend voor de camera toen de browser erom vroeg',
          'Er zit geen internetkabel in de smartphone',
          'A-Frame werkt niet op smartphones',
        ],
        correctIndex: 1,
        explanation:
          'Exact. Als je per ongeluk op "Weigeren" of "Blokkeren" tikt, moet je via het slotje in de adresbalk van je browser de cameratoegang handmatig weer op "Toestaan" zetten.',
      },
    ],
    hints: [
      {
        title: 'Krijg je een 404 melding op GitHub Pages?',
        content:
          'Let goed op hoofdletters! Als je bestand AR1.html heet, moet de URL ook exact eindigen op /AR1.html (met hoofdletters AR!). Daarnaast duurt het de eerste keer 1 tot 3 minuten voor GitHub de pagina gebouwd heeft.',
      },
      {
        title: 'Zie je oude aanpassingen na het uploaden van een nieuwe versie?',
        content:
          'Je mobiele browser bewaart de oude pagina in zijn cachegeheugen. Trek de pagina omlaag om hard te verversen, of zet "?v=2" achteraan je URL in de adresbalk!',
      },
    ],
  },
  {
    key: 'opdracht1',
    stepNumber: 'Opdracht 1',
    title: 'Projectie: je eerste 3D-object',
    subtitle: 'Pas de kleur, positie en afmetingen aan en voeg een 3D bol toe op marker 1',
    usedMarker: 'Marker 1 (Barcode 1)',
    estimatedMinutes: 15,
    whatYouWillBuild:
      'In deze allereerste opdracht concentreer je je 100% op dat ene zwevende blokje op Marker 1! Je verandert de kleur van de kubus, verplaatst hem in 3D (X, Y, Z) en voegt een tweede vorm (<a-sphere>) toe zodat er twee verschillende vormen boven marker 1 zweven.',
    whyThisMatters:
      'A-Frame maakt 3D op het web net zo eenvoudig als gewone HTML. Door te experimenteren met coördinaten en attributen snap je direct hoe 3D virtuele ruimtes werken.',
    sections: [
      {
        title: '1. Kies een nieuwe kleur voor je kubus',
        description:
          'Open AR1.html in VS Code en start Live Server. Zoek in de code de regel met:\ncolor="#ff6600"\n\nDat is de kleurcode van de huidige oranje kubus (een hexcode: # gevolgd door zes tekens voor rood, groen en blauw).\nVervang deze waarde door een andere hexcode (bijvoorbeeld via W3Schools HTML Colors) of typ gewoon een Engelse kleurnaam zoals:\ncolor="hotpink" of color="lime" of color="deepskyblue"\n\nSla op met Ctrl+S en kijk in je browser: de kubus heeft direct jouw nieuwe kleur!',
      },
      {
        title: '2. Begrijp de 3D-positie (X, Y, Z)',
        description:
          'Zoek de regel met:\nposition="-0.4 0.4 0"\n\nDit zijn drie getallen: X, Y en Z:\n• X = links (−) / rechts (+)\n• Y = hoogte: 0 = op de marker, 0.5 = een halve meter erboven\n• Z = naar je toe (+) / van je af (−)\n\nProbeer eens:\nposition="0 1 0" — de kubus zweeft nu een stuk hoger midden boven de marker.\nMaak X eens -1 — de kubus staat nu links naast de marker.',
        callout: {
          type: 'info',
          title: '3D Coördinaten ezelsbruggetje',
          text: 'Denk aan X als een schuifknop naar links en rechts, Y als een lift omhoog en omlaag, en Z als een stap naar voren of naar achteren!',
        },
      },
      {
        title: '3. Voeg een tweede vorm toe (<a-sphere>)',
        description:
          'Kopieer de hele regel die begint met <a-box en eindigt met </a-box>. Plak die er direct onder.\nVerander in de nieuwe regel:\n• a-box → a-sphere (een 3D bol)\n• position="0.4 0.4 0" (zodat hij rechts van het midden staat)\n• kies een andere kleur, bijv. color="cyan"',
        codeBlock: {
          targetLocation: 'In <a-marker type="barcode" value="1"> direct onder de <a-box>',
          code: `<a-marker type="barcode" value="1" emitevents="true">
  <!-- Kubus: links van het midden, zwevend boven de marker -->
  <a-box position="-0.4 0.4 0" color="#ff6600" depth="0.5" height="0.5" width="0.5"></a-box>
  
  <!-- [OPDRACHT 1] Tweede vorm: een bol rechts van het midden -->
  <a-sphere position="0.4 0.4 0" radius="0.3" color="#00ffff"></a-sphere>
</a-marker>`,
        },
      },
      {
        title: '4. Verander de grootte en probeer andere vormen',
        description:
          'Bij een kubus bepaal je de maat met width, height en depth. Bij een bol gebruik je radius.\nMaak de bol eens twee keer zo groot (bijvoorbeeld radius="0.6"). Wat gebeurt er?\n\nJe mag helemaal losgaan met jouw eigen keuzes:\n• Vormen: naast <a-box> en <a-sphere> bestaan er ook <a-cylinder> (cilinder), <a-torus> (donut) en <a-cone> (kegel).\n• Positie en grootte: vrij om mee te spelen!\n\nMinimale eis: twee verschillende vormen in twee verschillende kleuren op marker 1.',
      },
    ],
    checkCriteria: [
      'Op marker 1 zie jij ten minste twee 3D-objecten zweven',
      'Je hebt zelf de kleuren en vormen gekozen',
      'De 3D-objecten blijven netjes op de marker "geplakt" wanneer je de print beweegt',
    ],
    quiz: [
      {
        question: 'Als je een object hoger boven de marker wilt laten zweven, welke as pas je dan aan?',
        options: [
          'De X-as (eerste getal in position="X Y Z")',
          'De Y-as (tweede getal in position="X Y Z")',
          'De Z-as (derde getal in position="X Y Z")',
          'De color attribuut',
        ],
        correctIndex: 1,
        explanation:
          'Juist! In A-Frame stelt de Y-as de verticale hoogte voor: 0 is plat op het papier, en hogere getallen laten het object omhoog zweven.',
      },
      {
        question: 'Welk attribuut gebruik je om de afmeting van een <a-sphere> (bol) aan te passen?',
        options: [
          'width en height',
          'radius (straal)',
          'depth',
          'scale_box',
        ],
        correctIndex: 1,
        explanation:
          'Goed onthouden! Een bol heeft geen hoeken, dus gebruikt A-Frame het wiskundige begrip "radius" (de straal van het middelpunt naar de buitenkant).',
      },
    ],
    hints: [
      {
        title: 'Staan de kubus en de bol dwars door elkaar heen?',
        content:
          'Zorg dat hun X-coördinaten verschillen: geef het ene object bijvoorbeeld position="-0.4 0.4 0" (links) en het andere position="0.4 0.4 0" (rechts).',
      },
      {
        title: 'Vergeet de sluit-tag niet',
        content:
          'Elke <a-sphere ...> moet ook worden afgesloten met </a-sphere>, net zoals een <a-box> afsluit met </a-box>.',
      },
    ],
  },
  {
    key: 'opdracht2',
    stepNumber: 'Opdracht 2',
    title: 'Interactie: knoppen die je 3D-object veranderen',
    subtitle: 'Bouw 2D-knoppen op je scherm en koppel ze met JavaScript aan een kubus op marker 2',
    usedMarker: 'Marker 2 (Barcode 2)',
    estimatedMinutes: 20,
    whatYouWillBuild:
      'Onderin je scherm verschijnen twee knoppen (GROEN en ROOD). Zodra je op een knop klikt of tikt, verandert het 3D-object op marker 2 direct van kleur.',
    whyThisMatters:
      'Hier leer je de heilige drie-eenheid van webontwikkeling: HTML voor de elementen (knoppen), CSS voor het uiterlijk (positie en styling) en JavaScript voor de actie (reageren op een klik met event listeners).',
    sections: [
      {
        title: '2A — Knoppen stylen op het scherm (CSS)',
        description:
          'Zoek in het <style>-blok het einde van je CSS (de sluit-tag </style>). Plak deze CSS-code vlak ervóór:',
        codeBlock: {
          targetLocation: 'In <style>, vlak vóór </style>',
          code: `    /* [OPDRACHT 2] Knoppenbalk onderaan het scherm */
    #controls {
      position: fixed;          /* vast op het scherm, ook als je beweegt */
      bottom: 20px;             /* 20 pixels vanaf de onderkant */
      left: 50%;
      transform: translateX(-50%);  /* horizontaal centreren */
      display: flex;
      gap: 12px;                /* ruimte tussen de knoppen */
      z-index: 1000;            /* zorg dat knoppen bovenop het camerabeeld liggen */
    }
    .btn {
      color: white;
      border: none;
      padding: 12px 20px;
      font-size: 15px;
      font-weight: bold;
      border-radius: 25px;
      cursor: pointer;
      box-shadow: 0 4px 6px rgba(0,0,0,0.3);
    }
    .btn:active { transform: scale(0.95); }
    #btn-groen { background: #00aa00; }
    #btn-rood  { background: #cc0000; }`,
        },
      },
      {
        title: '2B — Knoppen in de pagina zetten (HTML)',
        description:
          'Zoek in <body> de regel die begint met <a-scene. Plak deze HTML vlak ervóór (boven de scene):',
        codeBlock: {
          targetLocation: 'In <body>, vlak vóór <a-scene ...>',
          code: `  <!-- [OPDRACHT 2] Knoppenbalk -->
  <div id="controls">
    <button id="btn-groen" class="btn">GROEN</button>
    <button id="btn-rood"  class="btn">ROOD</button>
  </div>`,
        },
        callout: {
          type: 'info',
          title: 'Tussentijdse controle',
          text: 'Sla op met Ctrl+S. Je ziet nu twee knoppen onderin je scherm! Ze doen nog niets — dat gaan we nu koppelen met JavaScript.',
        },
      },
      {
        title: '2C — Een object op marker 2 toevoegen (AR-scene)',
        description:
          'Zoek het blok van marker 1 (dat begint met <a-marker type="barcode" value="1") en ga op de sluit-tag (</a-marker>) staan. Plak dit blok vlak erna:',
        codeBlock: {
          targetLocation: 'In <a-scene>, direct na de afsluitende </a-marker> van marker 1',
          code: `    <!-- [OPDRACHT 2] Marker 2: object dat van kleur verandert -->
    <a-marker type="barcode" value="2" emitevents="true">
      <a-box id="stap2-kubus" position="0 0.5 0" color="#808080"
             width="0.6" height="0.6" depth="0.6"></a-box>
    </a-marker>`,
        },
        callout: {
          type: 'tip',
          title: 'Het huisnummer: id="stap2-kubus"',
          text: 'De id="stap2-kubus" is de unieke naam waarmee het script dit object straks kan vinden. Houd marker 2 voor je camera om te testen: je ziet een grijze kubus zweven.',
        },
      },
      {
        title: '2D — Knoppen koppelen aan het object (JavaScript)',
        description:
          'Zoek onderin het bestand de sluit-tag </a-scene>. Plak dit script vlak erna (vóór </body>):',
        codeBlock: {
          targetLocation: 'Direct na </a-scene>, vóór </body>',
          code: `  <!-- [OPDRACHT 2] Script: knoppen veranderen de kleur -->
  <script>
    // Haal de knoppen en het 3D-object op via hun id (hun 'huisnummer')
    const stap2Kubus = document.getElementById("stap2-kubus");
    const btnGroen   = document.getElementById("btn-groen");
    const btnRood    = document.getElementById("btn-rood");

    // ALS op de GROEN-knop wordt geklikt, DAN... (de kleur veranderen)
    btnGroen.addEventListener("click", function() {
      stap2Kubus.setAttribute("color", "#00ff00");
    });

    btnRood.addEventListener("click", function() {
      stap2Kubus.setAttribute("color", "#ff0000");
    });
  </script>`,
        },
      },
    ],
    checkCriteria: [
      'Onderin het scherm zijn twee knoppen zichtbaar (GROEN en ROOD)',
      'Op marker 2 verschijnt een grijze kubus',
      'Wanneer je op GROEN klikt, kleurt de kubus groen (#00ff00)',
      'Wanneer je op ROOD klikt, kleurt de kubus rood (#ff0000)',
      'Het werkt zowel op de laptop als op je smartphone via GitHub Pages',
    ],
    quiz: [
      {
        question: 'Wat doet de functie addEventListener("click", ...)?',
        options: [
          'Het telt hoeveel keer de pagina herladen is',
          'Het luistert naar een klik op dat specifieke element en voert dan de opgegeven functie uit',
          'Het verwijdert de knop van het scherm',
          'Het stuurt direct een e-mail naar de docent',
        ],
        correctIndex: 1,
        explanation:
          'Juist! Een Event Listener is als een wachter die continu wacht tot een bepaalde actie (zoals een "click") plaatsvindt en dan direct in actie komt.',
      },
      {
        question: 'Waarom gebruiken we setAttribute("color", "#00ff00") op stap2Kubus?',
        options: [
          'Om de HTML-eigenschap "color" van het 3D-object aan te passen naar groen',
          'Om de tekst van de knop groen te maken',
          'Om een nieuwe marker toe te voegen',
          'Om de Live Server opnieuw op te starten',
        ],
        correctIndex: 0,
        explanation:
          'Helemaal correct! In A-Frame heeft een 3D-object eigenschappen zoals "color", "position" of "rotation". Met setAttribute pas je die eigenschappen live aan.',
      },
    ],
    hints: [
      {
        title: 'Krijg je de fout "Cannot read properties of null" in de console (F12)?',
        content:
          'Dit betekent meestal dat document.getElementById("stap2-kubus") het element niet kan vinden. Controleer of de id in je HTML (<a-box id="stap2-kubus">) exact hetzelfde gespeld is als in je JavaScript!',
      },
    ],
  },
  {
    key: 'opdracht3',
    stepNumber: 'Opdracht 3',
    title: 'MQTT verbinden: live data op je scherm',
    subtitle: 'Verbind je applicatie met een centrale broker en ontvang live sensorgegevens',
    usedMarker: 'Geen marker nodig — dit gebeurt op het scherm zelf',
    estimatedMinutes: 25,
    whatYouWillBuild:
      'Bovenin je scherm verschijnt een statusbalk ("MQTT: Verbonden") en linksboven een sensordata-paneel. Je verbindt met een MQTT broker en abonneert je op een topic.',
    whyThisMatters:
      'MQTT is het wereldwijde standaardprotocol voor het Internet of Things (IoT). Het is extreem snel, lichtgewicht en zorgt dat apparaten wereldwijd live met elkaar kunnen communiceren.',
    sections: [
      {
        title: 'Wat is MQTT precies?',
        description:
          'MQTT is een systeem waarmee apparaten berichten uitwisselen via een centrale server (de broker).\nEen bericht wordt altijd gestuurd naar een topic (onderwerp).\n\n📻 Denk aan een radiozender:\n• Iedereen die op het juiste kanaal luistert (subscribe), hoort direct alles wat op dat kanaal wordt uitgezonden.\n• Een apparaat dat iets meldt, noem je de zender (publish).\n• Jouw Raspberry Pi gaat straks sensordata uitzenden; jouw webapp luistert mee!\n\nWe gebruiken eerst een publieke testbroker (bijv. broker.emqx.io); op school kan later de broker van de lokale NUC.',
      },
      {
        title: '3A — Statusbalk en paneel toevoegen (CSS & HTML)',
        description:
          'Plak eerst de CSS in <style> en daarna de HTML in <body> boven je knoppen:',
        codeBlock: {
          targetLocation: 'In <style>, vlak vóór </style>',
          code: `    /* [OPDRACHT 3] Statusbalk: MQTT verbindingsstatus */
    #status-bar {
      position: fixed;
      top: 10px;
      left: 50%;
      transform: translateX(-50%);
      background: rgba(0, 0, 0, 0.8);
      color: #00ffcc;
      padding: 8px 16px;
      border-radius: 20px;
      font-size: 14px;
      font-weight: bold;
      z-index: 1000;
    }
    /* [OPDRACHT 3] Paneel: actuele waarde uit het topic */
    #sensor-panel {
      position: fixed;
      top: 50px;
      left: 10px;
      background: rgba(0, 0, 0, 0.75);
      color: white;
      padding: 12px;
      border-radius: 8px;
      font-size: 13px;
      z-index: 1000;
      border-left: 4px solid #00ffcc;
      max-width: 60vw;
    }
    #sensor-panel .topic-naam   { font-weight: bold; color: #00ffcc; font-size: 12px; word-break: break-all; }
    #sensor-panel .sensor-waarde { font-size: 20px; font-weight: bold; }`,
        },
      },
      {
        title: '3B — De HTML toevoegen in <body>',
        description:
          'Plak deze twee divs in <body>, vlak vóór de regel met <div id="controls"> (dus boven je knoppen):',
        codeBlock: {
          targetLocation: 'In <body>, direct boven <div id="controls">',
          code: `  <!-- [OPDRACHT 3] Statusbalk en sensordata-paneel -->
  <div id="status-bar">MQTT: Verbinden...</div>
  <div id="sensor-panel">
    <span class="topic-naam" id="topic-naam">-</span><br>
    Waarde: <span class="sensor-waarde" id="sensor-waarde">-</span>
  </div>`,
        },
      },
      {
        title: '3C — De MQTT-verbinding programmeren (JavaScript)',
        description:
          'Plak dit codeblok helemaal vooraan in je <script>-blok — dus direct na de regel <script>, vóór de regel met const stap2Kubus = ... :',
        codeBlock: {
          targetLocation: 'In <script>, helemaal bovenaan direct na <script>',
          code: `    // ============================================================
    // [OPDRACHT 3] MQTT INSTELLINGEN — pas hier je eigen waarden aan!
    // ============================================================
    const DEFAULT_MQTT_URL  = "wss://broker.emqx.io:8084/mqtt"; // de broker (vraag je docent)
    const DEFAULT_GROEPS_ID = "AR1";                            // jouw groepsnaam

    const GROEPS_ID    = DEFAULT_GROEPS_ID;
    const MQTT_URL     = localStorage.getItem("mqtt_url")         || DEFAULT_MQTT_URL;
    const TOPIC_SENSOR = localStorage.getItem("mqtt_topic_sensor") || ("workshop/" + GROEPS_ID + "/sensorData");

    // De onderdelen van het scherm die we nodig hebben
    const statusBar    = document.getElementById("status-bar");
    const topicNaam    = document.getElementById("topic-naam");
    const sensorWaarde = document.getElementById("sensor-waarde");

    // Toon meteen de naam van het topic in de titel van het paneel
    topicNaam.innerText = TOPIC_SENSOR;

    // Maak de MQTT-verbinding
    const clientId = "WebClient_" + GROEPS_ID + "_" + Math.random().toString(16).substr(2, 8);
    const client = new Paho.MQTT.Client(MQTT_URL, clientId);

    // Welke functies draaien bij welke gebeurtenis?
    client.onConnectionLost = onConnectionLost;   // verbinding weggevallen
    client.onMessageArrived = onMessageArrived;   // nieuw bericht binnen

    // Start de verbinding
    client.connect({
      onSuccess: onConnect,        // gelukt -> deze functie draait
      onFailure: onConnectFailure  // mislukt -> deze functie draait
    });

    // --- Wat gebeurt er als de verbinding LUKT? ---
    function onConnect() {
      statusBar.innerText = "MQTT: Verbonden (" + GROEPS_ID + ")";
      statusBar.style.color = "#00ffcc";
      client.subscribe(TOPIC_SENSOR);   // abonneer: vanaf nu horen we alles op dit topic
      console.log("Geabonneerd op topic: " + TOPIC_SENSOR);
    }

    // --- Wat gebeurt er als de verbinding MISLUKT? ---
    function onConnectFailure(responseObject) {
      console.error("MQTT fout: " + responseObject.errorMessage);
      statusBar.innerText = "MQTT: Verbinding mislukt";
      statusBar.style.color = "#ff3333";
    }

    // --- Wat gebeurt er als de verbinding WEGVALT? ---
    function onConnectionLost(responseObject) {
      if (responseObject.errorCode !== 0) {
        statusBar.innerText = "MQTT: Verbinding verloren";
        statusBar.style.color = "#ff9900";
        setTimeout(function() {   // na 3 seconden automatisch opnieuw proberen
          statusBar.innerText = "MQTT: Opnieuw verbinden...";
          client.connect({ onSuccess: onConnect, onFailure: onConnectFailure });
        }, 3000);
      }
    }

    // --- Wat gebeurt er bij elk NIEUW BERICHT op het topic? ---
    function onMessageArrived(message) {
      const payload = message.payloadString;   // de ontvangen tekst (bijv. "21.5")
      sensorWaarde.innerText = payload;         // toon hem direct in het paneel
      console.log("Nieuwe data op [" + message.destinationName + "]: " + payload);
    }`,
        },
      },
    ],
    checkCriteria: [
      'De statusbalk toont in het groen "MQTT: Verbonden (AR1)"',
      'Het paneel linksboven toont de topicnaam (bijv. workshop/AR1/sensorData)',
      'Als je met MQTTBox een bericht (bijv. 21.5) naar jouw topic stuurt, verandert de waarde direct in het schermpaneel',
    ],
    quiz: [
      {
        question: 'Wat is het verschil tussen "publish" en "subscribe" in MQTT?',
        options: [
          'Publish is zenden (bericht versturen), subscribe is ontvangen (luisteren naar een topic)',
          'Publish is gratis, subscribe kost geld',
          'Publish werkt alleen op de Raspberry Pi, subscribe alleen op de telefoon',
          'Er is geen enkel verschil',
        ],
        correctIndex: 0,
        explanation:
          'Uitstekend! Net als een krantenabonnement: wie "subscribed" ontvangt het nieuws, en de uitgever "published" het nieuws naar de abonnees.',
      },
    ],
    hints: [
      {
        title: 'Blijft de status op "MQTT: Verbinden..." staan?',
        content:
          'Controleer of js/mqttws31.min.js goed geladen wordt. Open de console met F12. Als er staat "Paho is not defined", ontbreekt het bestand in je js-map of klopt het pad in de script-tag niet.',
      },
    ],
  },
  {
    key: 'opdracht4',
    stepNumber: 'Opdracht 4',
    title: 'Projectie van MQTT-waardes: data in de echte wereld',
    subtitle: 'Projecteer een 3D-blok met live meetwaarden zwevend boven marker 4',
    usedMarker: 'Marker 4 (Barcode 4)',
    estimatedMinutes: 20,
    whatYouWillBuild:
      'Op marker 4 projecteer je een 3D kubus met daarop de live MQTT-waarde (bijv. de temperatuur van de Pi). Zodra er een nieuw bericht binnenkomt, verandert de 3D-tekst op het blok mee!',
    whyThisMatters:
      'Dit is de essentie van Augmented Reality in de industrie: data niet langer op een scherm bekijken, maar direct geprojecteerd op de fysieke machine of sensor in de echte wereld.',
    sections: [
      {
        title: '4A — Blok met 3D-tekst op marker 4 (AR-scene)',
        description:
          'Plak dit marker-blok vlak ná het sluit-tag </a-marker> van marker 2 (net zoals je eerder hebt gedaan):',
        codeBlock: {
          targetLocation: 'In <a-scene>, direct na de </a-marker> van marker 2',
          code: `    <!-- [OPDRACHT 4/5] Marker 4: blok met live MQTT-waarde -->
    <a-marker type="barcode" value="4" emitevents="true">
      <a-box id="stap4-blok" position="0 0.5 0" color="#00ff00"
             width="1" height="1" depth="1"></a-box>
      <a-text id="stap4-tekst" value="-" position="0 0.51 0"
              align="center" color="#000000" scale="0.8 0.8 0.8" side="double"></a-text>
    </a-marker>`,
        },
        callout: {
          type: 'info',
          title: '🔍 Waarom position="0 0.51 0" bij de tekst?',
          text: 'Het blok heeft een diepte van 1, dus de voorkant ligt op z=0.50. De tekst ligt een héél klein beetje vóór het blok (0.51 i.p.v. 0.50), anders verdwijnt de tekst ín het blok! side="double" zorgt dat hij van twee kanten leesbaar is.',
        },
      },
      {
        title: '4B — De ontvangen waarde op het 3D-blok tonen (JavaScript)',
        description:
          'Stap 1: Voeg helemaal bovenaan je script (boven const DEFAULT_MQTT_URL ...) deze twee regels toe om de HTML-elementen op te halen:',
        codeBlock: {
          targetLocation: 'In <script>, helemaal bovenaan',
          code: `    // [OPDRACHT 4] het blok en de tekst op marker 4 ophalen
    const stap4Blok  = document.getElementById("stap4-blok");
    const stap4Tekst = document.getElementById("stap4-tekst");`,
        },
      },
      {
        title: '4C — De tekst bijwerken in onMessageArrived',
        description:
          'Zoek in je <script>-blok de functie onMessageArrived uit opdracht 3. Voeg als eerste regel binnen de functie toe (direct na de openingsaccolade {):',
        codeBlock: {
          targetLocation: 'Binnen function onMessageArrived(message) { als eerste regel',
          code: `    function onMessageArrived(message) {
      const payload = message.payloadString;   // de ontvangen tekst (bijv. "21.5")

      // [OPDRACHT 4] zet de ontvangen waarde ook in de 3D-tekst op marker 4
      stap4Tekst.setAttribute("value", payload);

      sensorWaarde.innerText = payload;         // toon hem in het paneel
      console.log("Nieuwe data op [" + message.destinationName + "]: " + payload);
    }`,
        },
      },
      {
        title: '4D — Node-RED op de Raspberry Pi (of inject-node)',
        description:
          'Zorg dat je Raspberry Pi een Node-RED flow heeft die sensordata periodiek naar jouw topic (bijv. workshop/AR1/sensorData) verstuurt.',
      },
    ],
    checkCriteria: [
      'Houd marker 4 voor de camera → je ziet een 3D-blok met tekst erop zweven',
      'Wanneer er een nieuwe MQTT-waarde binnenkomt, verandert de tekst op het blok direct mee',
      'De projectie blijft strak op de locatie van marker 4 "geplakt"',
    ],
    quiz: [
      {
        question: 'Waarom staat de tekst op positie Z = 0.51 terwijl het blok een diepte van 1 heeft (helft = 0.50)?',
        options: [
          'Omdat 0.51 net 1 centimeter vóór het blok ligt, zodat de letters niet verdwijnen in het 3D-blok ("z-fighting")',
          'Omdat A-Frame geen ronde getallen accepteert',
          'Omdat de camera anders niet kan scherpstellen',
          'Omdat 0.51 het IP-adres van de broker is',
        ],
        correctIndex: 0,
        explanation:
          'Briljant! In 3D graphics heet dit "z-fighting": als twee vlakken precies op dezelfde positie liggen, gaan ze knipperen. 0.51 lost dit perfect op!',
      },
    ],
    hints: [
      {
        title: 'Zie je een minteken "-" op het blok?',
        content:
          'Dat is de beginwaarde die in value="-" staat. Zodra je een getal stuurt naar het topic, verschijnt jouw waarde!',
      },
    ],
  },
  {
    key: 'opdracht5',
    stepNumber: 'Opdracht 5',
    title: 'Dynamische visualisatie: kleur volgt de waarde',
    subtitle: 'Laat het 3D-blok automatisch groen, geel of rood kleuren op basis van grenswaarden',
    usedMarker: 'Nog steeds Marker 4',
    estimatedMinutes: 20,
    whatYouWillBuild:
      'Het 3D-blok krijgt een dynamische kleur: onder 22°C kleurt het groen (alles prima), tussen 22°C en 27°C geel (opletten) en boven 27°C fel rood (alarm!).',
    whyThisMatters:
      'In dashboards en AR visualisaties wil een gebruiker in één oogopslag de status zien zonder getallen te hoeven lezen. Conditionele logica (if / else) is het fundament van programmeren.',
    sections: [
      {
        title: '5A — De functie pasKleurAan (JavaScript)',
        description:
          'Plak deze functie in je <script>-blok, vlak ná de afsluitende accolade } van onMessageArrived:',
        codeBlock: {
          targetLocation: 'In <script>, direct ná de afsluitende } van onMessageArrived',
          code: `    // ============================================================
    // [OPDRACHT 5] De kleur van het blok volgt de waarde
    // PAS HIERONDER JE EIGEN DREMPELS AAN!
    // ============================================================
    const GRENS_GROEN = 22;   // onder deze waarde: groen ("alles prima")
    const GRENS_ROOD  = 27;   // boven deze waarde: rood ("alarm!") — ertussen: geel

    function pasKleurAan(waardeAlsTekst) {
      const waarde = parseFloat(waardeAlsTekst);  // tekst -> getal, zodat we kunnen vergelijken
      if (isNaN(waarde)) {                        // geen getal? dan niks doen
        return;
      }
      if (waarde < GRENS_GROEN) {
        stap4Blok.setAttribute("color", "#00ff00");   // groen
      } else if (waarde > GRENS_ROOD) {
        stap4Blok.setAttribute("color", "#ff0000");   // rood
      } else {
        stap4Blok.setAttribute("color", "#ffff00");   // geel
      }
    }`,
        },
      },
      {
        title: '5B — De functie aanroepen bij elk nieuw bericht',
        description:
          'Zoek weer je functie onMessageArrived. Voeg als laatste regel binnen de functie toe (vóór de afsluitende }):',
        codeBlock: {
          targetLocation: 'In function onMessageArrived vóór de afsluitende }',
          code: `    function onMessageArrived(message) {
      const payload = message.payloadString;

      // [OPDRACHT 4] zet de ontvangen waarde ook in de 3D-tekst op marker 4
      stap4Tekst.setAttribute("value", payload);

      sensorWaarde.innerText = payload;
      console.log("Nieuwe data op [" + message.destinationName + "]: " + payload);

      // [OPDRACHT 5] pas de kleur van het blok aan
      pasKleurAan(payload);
    }`,
        },
      },
    ],
    checkCriteria: [
      'Het blok kleurt groen bij een waarde onder jouw GRENS_GROEN',
      'Het blok kleurt geel tussen de twee grenzen in',
      'Het blok kleurt rood bij een waarde boven jouw GRENS_ROOD',
      'Niet-numerieke waarden zoals "hallo" laten de app niet crashen dankzij isNaN',
    ],
    quiz: [
      {
        question: 'Waarom kunnen we niet direct if (waardeAlsTekst < 22) vergelijken zonder parseFloat?',
        options: [
          'Omdat tekst alfabetisch wordt vergeleken: "3" is als tekst groter dan "22"!',
          'Omdat JavaScript geen getallen kent',
          'Omdat HTML geen leestekens toestaat',
          'Omdat A-Frame dat verbiedt',
        ],
        correctIndex: 0,
        explanation:
          'Heel scherp opgemerkt! In computertaal is de tekst "3" alfabetisch later dan "22", waardoor vergelijkingen compleet misgaan als je de tekst niet eerst omzet met parseFloat().',
      },
    ],
    hints: [
      {
        title: 'Verandert de kleur niet mee?',
        content:
          'Controleer of je in onMessageArrived de regel pasKleurAan(payload); hebt toegevoegd.',
      },
    ],
  },
  {
    key: 'opdracht6',
    stepNumber: 'Opdracht 6',
    title: 'MQTT sturen: jouw knoppen besturen de Raspberry Pi',
    subtitle: 'Stuur vanuit jouw webpagina berichten terug naar de Sense HAT 64 RGB LEDs',
    usedMarker: 'De knoppen van opdracht 2 + Node-RED op de Pi',
    estimatedMinutes: 25,
    whatYouWillBuild:
      'De knoppen GROEN en ROOD gaan nu een MQTT-bericht terugsturen naar het topic workshop/<groep>/led. De Raspberry Pi met Sense HAT vangt dit op en kleurt alle 64 LEDs op het hardware-bordje!',
    whyThisMatters:
      'Nu maak je een volwaardige tweeweg IoT-architectuur: jouw interface stuurt fysieke actuatoren in de echte wereld aan.',
    sections: [
      {
        title: 'Afspraak over het berichtformaat: "R,G,B"',
        description:
          'De tekst van het bericht is "R,G,B" — drie getallen van 0 t/m 255 voor rood, groen en blauw:\n• "0,255,0" = alle LEDs groen\n• "255,0,0" = alle LEDs rood',
      },
      {
        title: '6A — Versturen vanuit de webapp (JavaScript)',
        description:
          'Plak dit codeblok in je <script>, ná de functie pasKleurAan uit opdracht 5:',
        codeBlock: {
          targetLocation: 'In <script>, direct ná functie pasKleurAan',
          code: `    // ============================================================
    // [OPDRACHT 6] Een bericht sturen naar de Raspberry Pi
    // ============================================================
    const TOPIC_LED = localStorage.getItem("mqtt_topic_led") || ("workshop/" + GROEPS_ID + "/led");

    function stuurNaarPi(kleurAlsRGB) {
      if (!client.isConnected()) {          // alleen versturen als we echt verbonden zijn
        alert("Geen MQTT-verbinding! Verbind eerst met de broker.");
        return;
      }
      const bericht = new Paho.MQTT.Message(kleurAlsRGB);  // het bericht zelf, bijv. "0,255,0"
      bericht.destinationName = TOPIC_LED;                // op welk topic het moet
      client.send(bericht);
      console.log("Verzonden naar " + TOPIC_LED + ": " + kleurAlsRGB);
    }`,
        },
      },
      {
        title: '6B — Koppel stuurNaarPi aan jouw knoppen',
        description:
          'Voeg aan beide addEventListener click functies van opdracht 2 één regel toe:',
        codeBlock: {
          targetLocation: 'Binnen de bestaande addEventListener click handlers van opdracht 2',
          code: `    btnGroen.addEventListener("click", function() {
      stap2Kubus.setAttribute("color", "#00ff00");
      stuurNaarPi("0,255,0");   // [OPDRACHT 6] ook naar de Pi sturen (groen)
    });

    btnRood.addEventListener("click", function() {
      stap2Kubus.setAttribute("color", "#ff0000");
      stuurNaarPi("255,0,0");   // [OPDRACHT 6] ook naar de Pi sturen (rood)
    });`,
        },
      },
      {
        title: '6C — Ontvangen op de Raspberry Pi (Node-RED function-node)',
        description: 'In een function-node op de Pi haal je de "R,G,B"-string zo uit elkaar:',
        codeBlock: {
          language: 'javascript',
          targetLocation: 'Node-RED function-node op de Raspberry Pi',
          code: `const [r, g, b] = msg.payload.split(",").map(Number);
msg.payload = new Array(64).fill([r, g, b]);
return msg;`,
        },
      },
    ],
    checkCriteria: [
      'Wanneer je op GROEN drukt, kleurt zowel het 3D-object groen als de 64 LEDs op de Sense HAT',
      'Wanneer je op ROOD drukt, kleurt zowel het 3D-object rood als de 64 LEDs op de Sense HAT',
    ],
    quiz: [
      {
        question: 'Wat betekent het bericht "0,255,0" in het RGB-kleurensysteem?',
        options: [
          'Rood=0, Groen=255 (maximaal), Blauw=0: dus 100% puur groen licht',
          'Alle lampjes uit',
          'Rood en groen gemengd tot paars',
          'Een willekeurige knipperstand',
        ],
        correctIndex: 0,
        explanation:
          'Exact! RGB staat voor Red, Green, Blue. "0,255,0" is 100% puur groen.',
      },
    ],
    hints: [
      {
        title: 'Reageren de LEDs op de Pi niet?',
        content:
          'Test eerst met MQTTBox door handmatig "0,255,0" te sturen naar workshop/<jouw-groep>/led.',
      },
    ],
  },
  {
    key: 'opdracht7',
    stepNumber: 'Opdracht 7',
    title: 'Slotopdracht: jouw eigen originele AR-applicatie',
    subtitle: 'Combineer alles wat je geleerd hebt, ga all-out en roep de hulp van AI in!',
    usedMarker: 'Kies zelf één of meerdere markers (1 t/m 5)',
    estimatedMinutes: 30,
    whatYouWillBuild:
      'Een unieke, zelfbedachte WebAR + IoT toepassing die niemand anders in de klas heeft. Je mag meerdere markers combineren, animaties toevoegen, 3D gltf-modellen laden, geluiden afspelen of extra sensordata visualiseren!',
    whyThisMatters:
      'Nu je de basis van HTML, CSS, JavaScript, A-Frame, AR.js en MQTT beheerst, ben je een volwaardige maker. Je mag in deze stap ook AI in VS Code inschakelen om jouw wildste ideeën werkelijkheid te maken!',
    sections: [
      {
        title: 'Ideeën om op onderzoek uit te gaan',
        description:
          '• Animaties: Laat A-Frame objecten soepel ronddraaien:\n<a-box animation="property: rotation; to: 0 360 0; loop: true; dur: 3000"></a-box>\n\n• Meerdere markers tegelijk: Wat als je marker 1 en marker 4 tegelijk in beeld houdt?\n\n• Echte 3D-modellen: A-Frame kan met <a-gltf-model src="model.gltf"> kant-en-klare 3D-modellen laden.\n\n• Geluid: Voeg geluidseffecten toe met <a-sound src="alarm.mp3"></a-sound>.\n\n• Meer sensordata: De Sense HAT heeft sensoren voor luchtvochtigheid (humidity), luchtdruk en gyro.',
      },
      {
        title: '🤖 Roep de hulp in van AI in VS Code!',
        description:
          'In deze slotopdracht mag je AI als jouw slimme programmeermaatje gebruiken. Gebruik onze ingebouwde AI Prompt Generator hieronder om in één klik ijzersterke prompts te kopiëren voor GitHub Copilot, Gemini of ChatGPT in je browservenster!',
      },
    ],
    checkCriteria: [
      'Jouw app doet iets origineels wat niemand anders in de klas heeft',
      'MQTT werkt in twee richtingen (zenden én ontvangen)',
      'Je kunt aan de docent en medestudenten uitleggen hoe je het gemaakt hebt',
      'Je hebt jouw stickervel compleet gevuld en de meesterbadge verdiend!',
    ],
    quiz: [
      {
        question: 'Welk A-Frame attribuut gebruik je om een 3D-kubus soepel 360 graden te laten ronddraaien?',
        options: [
          'animation="property: rotation; to: 0 360 0; loop: true; dur: 4000"',
          'spin="fast"',
          'rotate-degree="360"',
          'turn_cube="yes"',
        ],
        correctIndex: 0,
        explanation:
          'Geweldig! Het ingebouwde animatiesysteem van A-Frame is enorm krachtig.',
      },
    ],
    hints: [
      {
        title: 'Vergeet niet je stickervel te bekijken!',
        content:
          'Zodra je deze slotopdracht afrondt, is jouw stickervel 100% vol met alle felbegeerde technologie-stickers!',
      },
    ],
  },
];
