import { geistMono, geistSans } from "@app/fonts";
import { Providers } from "@app/providers";
import "@app/styles/globals.css";

export { metadata } from "@app/metadata";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
