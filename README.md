# KPI.github.io
Dashboard - KPI site web 
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard KPI</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #ffffff; /* Blanc */
            color: #ff6600; /* Orange */
            margin: 0;
            padding: 20px;
        }
        .dashboard {
            max-width: 1200px;
            margin: 0 auto;
        }
        .header {
            text-align: center;
            margin-bottom: 30px;
        }
        .kpi-container {
            display: flex;
            flex-wrap: wrap;
            gap: 20px;
        }
        .kpi-card {
            background-color: #fff;
            border: 2px solid #ff6600;
            border-radius: 8px;
            padding: 20px;
            flex: 1 1 300px;
            text-align: center;
        }
        .kpi-card h3 {
            margin: 0 0 10px 0;
            color: #ff6600;
        }
        .kpi-card p {
            font-size: 24px;
            margin: 0;
            color: #333;
        }
    </style>
</head>
<body>
    <div class="dashboard">
        <div class="header">
            <h1>Tableau de Bord KPI</h1>
        </div>
        <div class="kpi-container">
            <div class="kpi-card">
                <h3>Ventes Mensuelles</h3>
                <p>€ 45,000</p>
            </div>
            <div class="kpi-card">
                <h3>Utilisateurs Actifs</h3>
                <p>1,250</p>
            </div>
            <div class="kpi-card">
                <h3>Taux de Conversion</h3>
                <p>3.5%</p>
            </div>
            <div class="kpi-card">
                <h3>Revenus Annuels</h3>
                <p>€ 540,000</p>
            </div>
        </div>
    </div>
</body>
</html>
