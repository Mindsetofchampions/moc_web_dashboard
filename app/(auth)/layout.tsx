import Image from "next/image";
export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
        <div className="h-screen flex flex-col items-center justify-center">
                <div className="absolute inset-0 z-0">
                  <Image 
                    src="/carbon-fiber.png"
                    alt="Carbon Fiber Background"
                    fill
                    className="object-cover opacity-50"
                  />
                </div>
            {children}
        </div>
    </main>
  );
}
