// app/layout.tsx
import "@rainbow-me/rainbowkit/styles.css";
import { ContextProvider } from "@/context";
import "@/app/globals.css";

export const metadata = {
  title: "Decentralized Voting App",
  description: "A decentralized voting platform.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ContextProvider>{children}</ContextProvider>
      </body>
    </html>
  );
}
