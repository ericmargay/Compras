import "./globals.css";

export const metadata = {
  title: "Cosas que estoy vendiendo",
  description: "Tecnología cuidada, con pagos flexibles entre personas de confianza."
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
