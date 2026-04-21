import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Job Analyzer - Analyse d\'offres d\'emploi en temps réel',
  description: 'Analysez les offres d\'emploi en temps réel avec des insights détaillés et des graphiques KPI',
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#FF6B35',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <meta charSet="utf-8" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='75' font-size='75' fill='%23FF6B35'>📊</text></svg>" />
      </head>
      <body className="bg-gray-50 text-gray-900 min-h-screen flex flex-col">
        <main className="flex-1">
          {children}
        </main>
        <footer className="bg-gray-900 text-white text-center py-6 mt-12">
          <p className="text-sm">
            © 2025 Job Analyzer. <a href="https://github.com/tedgarrigue/KPI.github.io" className="text-brand-orange hover:underline">GitHub</a>
          </p>
        </footer>
      </body>
    </html>
  );
}
