# 🌿 MODECO - Il Marketplace ecologico

Benvenuti nel repository di MODECO, il vostro punto di riferimento per esplorare articoli e approfondimenti sulla moda sostenibile, pratiche eco-friendly e consigli per uno stile di vita più consapevole, in armonia con il pianeta.



## 📚 Descrizione

MODECO è un'applicazione web divisa in tre parti principali: il frontend, il backend, e il CMS (Content Management System). Ogni sezione è progettata per funzionare insieme armoniosamente per fornire sia agli utenti che agli amministratori un'esperienza fluida e interattiva.



## 🖥️ Frontend

Il frontend di MODECO è costruito con React e offre una interfaccia utente pulita e moderna. Gli utenti possono:

🛍️ - Esplorare e acquistare gli articoli suddivisi in 4 categorie, con relative pagina dedicata alla singola categoria.

🔍 - Filtrare gli articoli in base a categoria, tipo, per prodotti in saldo, per brand o parola chiave e ordinarli per prezzo crescente/descrescente.

🧾 - Visualizzare tutti i dettagli del prodotto (compresi i certificati di produzione associati) nella sua pagina dedicata.

🛒 - Interagire con il carrello per modificare articoli e quantità.

💰 - Procedere e concludere, nella pagina di checkout, l'intera esperienza di acquisto simulato con la compilazione delle informazini di spedizione e pagamento.

🗞️ - Leggere articoli filtrati per tag e cercando parole chiave.

🔖 - Navigare la pagina dedicata ai certificati di produzione sostenibile.

📝 - Aggiornare le informazioni di profilo o visualizzare stato e storico di tutti i suoi ordini nella pagina dedicata.



## ⚙️ Backend

Il backend gestisce tutte le operazioni di dati, inclusa l'autenticazione degli utenti, la gestione dei post e la loro memorizzazione. È costruito per essere robusto e sicuro, assicurando che tutte le interazioni con il database siano efficienti e sicure.



## 📝 CMS

Il CMS permette agli amministratori di:

👕 - Creare, aggiornare o cancellare prodotti, associargli Brand e certificati di produzione e applicare sconti.

💎 - Creare, aggiornare o cancellare Brand partner.

🔖 - Creare, aggiornare o cancellare Certificati di produzione da associare ai prodotti.

📰 - Creare, aggiornare o cancellare articoli del Blog.

🚛 - Aggiornare Ordini arrivati dal Frontend per confermarli o cancellarli, simulando anche la gestione dell'inventario.

Tutti questi contenuti sono organizzati in tabelle (componente globale) che permettono all'utente di visualizzare tutti i contenuti e di poterli filtrare per quelle che sono le loro caratteristiche.

📊 - Nel CMS è presente, inoltre, una sezione dedicata alle statistiche che permette di visualizzare incassi e numero di ordini filtrandoli per periodi temporali specifici.

A differenza del Frontend, il CMS ha tutte le rotte delle pagine protette in modo che siano accessibili solo ad utenti loggati.



## 🚀 Come iniziare

Per iniziare a utilizzare MODECO, segui questi passi:
1. Clona il repository.
2. cd backend && npm -i.
3. cd frontend && npm -i.
4. cd cms && npm -i.
5. Nella cartella backend creare e popolare il file .env clonando il .env.dist.
6. Avvia il server backend - node server.js.
7. Avvia l'applicazione frontend - npm run dev.
8. Avvia l'applicazione cms - npm run dev.
9. Navigare il cms sulla porta :5174 ed utilizzarlo per popolare il database di contenuti
10. Navigare il frontend per esplorare contenuti, sezioni e testarne le varie funzionalità



## 🛠 Tecnologie Utilizzate

Stack MERN
Frontend e CMS: React, TailwindCSS, Material Tailwind e Heroicons
Backend: Node.js, Express
Database: MongoDB


---
Grazie per aver scelto MODECO per il tuo viaggio verso uno stile di vita più sostenibile! 🌍💚
