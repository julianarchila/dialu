import Image from "next/image";
import Link from "next/link";

import Footer from "@/components/Footer";

import { auth } from "@clerk/nextjs";

export default function Component() {
  const { userId } = auth();

  return (
    <div
      key="1"
      className="flex min-h-screen flex-col bg-white dark:bg-gray-800"
    >
      <header className="flex h-16 items-center justify-between px-4 lg:px-6">
        <Link className="flex items-center justify-center" href="#">
          <svg
            className=" h-6 w-6 text-blue-600 dark:text-blue-400"
            fill="none"
            height="24"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="2" x2="22" y1="12" y2="12" />
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
          </svg>
          <span className="ml-2 text-xl font-semibold text-blue-600 dark:text-blue-400">
            Dialu
          </span>
        </Link>
        <nav className="hidden gap-4 sm:gap-6 lg:flex">
          <Link
            className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-400"
            href="#"
          >
            Características
          </Link>
          <Link
            className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-400"
            href="#"
          >
            Precios
          </Link>
          <Link
            className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-400"
            href="#"
          >
            Acerca de
          </Link>
          <Link
            className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-400"
            href="#"
          >
            Contacto
          </Link>
        </nav>
        <div className="text-sm font-medium text-green-600 hover:underline dark:text-green-400">
          {userId ? (
            <Link href="/dashboard">Dashboard</Link>
          ) : (
            <Link href="/sign-in">Login</Link>
          )}
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full bg-blue-100 py-12 dark:bg-gray-900 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <h1 className="mb-4 text-3xl font-bold tracking-tighter text-blue-600 dark:text-blue-400 sm:text-5xl">
                  Empoderando Negocios Minoristas en América Latina
                </h1>
                <p className="max-w-lg text-zinc-500 dark:text-zinc-400 md:text-xl">
                  Dialu proporciona herramientas robustas para la gestión de
                  inventario, bots de ventas potenciados por IA y seguimiento de
                  envíos en tiempo real.
                </p>
                <Link
                  className="inline-flex h-10 items-center justify-center rounded-md bg-blue-600 px-8 text-sm font-medium text-white shadow transition-colors hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-blue-400 dark:hover:bg-blue-300"
                  href="#"
                >
                  Comenzar
                </Link>
              </div>
              <div>
                <Image
                  alt="Dialu"
                  className="rounded-lg object-cover"
                  height="500"
                  src="/placeholder.svg"
                  style={{
                    aspectRatio: "500/500",
                    objectFit: "cover",
                  }}
                  width="500"
                />
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container space-y-8 px-4 text-center md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter text-blue-600 dark:text-blue-400 sm:text-4xl">
              ¿Por qué elegir Dialu?
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">
              <div className="flex flex-col items-center space-y-4">
                <svg
                  className=" h-16 w-16 text-blue-600 dark:text-blue-400"
                  fill="none"
                  height="24"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
                  <path d="m3.3 7 8.7 5 8.7-5" />
                  <path d="M12 22V12" />
                </svg>
                <h3 className="text-lg font-bold text-blue-600 dark:text-blue-400">
                  Gestión de Inventario
                </h3>
                <p className="text-zinc-500 dark:text-zinc-400">
                  Rastree y gestione fácilmente su inventario en múltiples
                  ubicaciones.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4">
                <svg
                  className=" h-16 w-16 text-blue-600 dark:text-blue-400"
                  fill="none"
                  height="24"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 8V4H8" />
                  <rect height="12" rx="2" width="16" x="4" y="8" />
                  <path d="M2 14h2" />
                  <path d="M20 14h2" />
                  <path d="M15 13v2" />
                  <path d="M9 13v2" />
                </svg>
                <h3 className="text-lg font-bold text-blue-600 dark:text-blue-400">
                  Bots de Ventas IA
                </h3>
                <p className="text-zinc-500 dark:text-zinc-400">
                  Automatice las ventas en WhatsApp y Facebook con chatbots
                  potenciados por IA.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4">
                <svg
                  className=" h-16 w-16 text-blue-600 dark:text-blue-400"
                  fill="none"
                  height="24"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M5 18H3c-.6 0-1-.4-1-1V7c0-.6.4-1 1-1h10c.6 0 1 .4 1 1v11" />
                  <path d="M14 9h4l4 4v4c0 .6-.4 1-1 1h-2" />
                  <circle cx="7" cy="18" r="2" />
                  <path d="M15 18H9" />
                  <circle cx="17" cy="18" r="2" />
                </svg>
                <h3 className="text-lg font-bold text-blue-600 dark:text-blue-400">
                  Seguimiento de Envíos
                </h3>
                <p className="text-zinc-500 dark:text-zinc-400">
                  Rastree sus envíos de productos en tiempo real y mantenga
                  informados a sus clientes.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full bg-blue-100 py-12 dark:bg-gray-900 md:py-24 lg:py-32">
          <div className="container space-y-8 px-4 text-center md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter text-blue-600 dark:text-blue-400 sm:text-4xl">
              Lo que Nuestros Clientes Dicen
            </h2>
            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:gap-12">
              <div className="flex flex-col items-center space-y-4">
                <Image
                  alt="Testimonial"
                  className="rounded-full object-cover"
                  height="100"
                  src="/placeholder.svg"
                  style={{
                    aspectRatio: "100/100",
                    objectFit: "cover",
                  }}
                  width="100"
                />
                <p className="text-zinc-500 dark:text-zinc-400">
                  "Dialu ha transformado cómo gestionamos nuestro inventario. Es
                  un cambio de juego."
                </p>
                <span className="text-sm text-blue-600 dark:text-blue-400">
                  - Juanita, Dueña de Boutique
                </span>
              </div>
              <div className="flex flex-col items-center space-y-4">
                <Image
                  alt="Testimonial"
                  className="rounded-full object-cover"
                  height="100"
                  src="/placeholder.svg"
                  style={{
                    aspectRatio: "100/100",
                    objectFit: "cover",
                  }}
                  width="100"
                />
                <p className="text-zinc-500 dark:text-zinc-400">
                  "Los bots de ventas IA han impulsado nuestras ventas en línea
                  significativamente."
                </p>
                <span className="text-sm text-blue-600 dark:text-blue-400">
                  - Carlos, Minorista en Línea
                </span>
              </div>
              <div className="flex flex-col items-center space-y-4">
                <Image
                  alt="Testimonial"
                  className="rounded-full object-cover"
                  height="100"
                  src="/placeholder.svg"
                  style={{
                    aspectRatio: "100/100",
                    objectFit: "cover",
                  }}
                  width="100"
                />
                <p className="text-zinc-500 dark:text-zinc-400">
                  "Con el seguimiento de envíos de Dialu, siempre sabemos dónde
                  están nuestros productos."
                </p>
                <span className="text-sm text-blue-600 dark:text-blue-400">
                  - Maria, Gerente de Cadena de Suministro
                </span>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container space-y-8 px-4 text-center md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter text-blue-600 dark:text-blue-400 sm:text-4xl">
              ¿Listo para Empoderar su Negocio Minorista?
            </h2>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link
                className="inline-flex h-10 w-full items-center justify-center rounded-md bg-blue-600 px-8 text-sm font-medium text-white shadow transition-colors hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-blue-400 dark:hover:bg-blue-300 sm:w-auto"
                href="#"
              >
                Registrarse
              </Link>
              <Link
                className="inline-flex h-10 w-full items-center justify-center rounded-md border border-blue-600 bg-white px-8 text-sm font-medium text-blue-600 shadow transition-colors hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-blue-400 dark:bg-gray-950 dark:text-blue-400 dark:hover:bg-gray-900 sm:w-auto"
                href="#"
              >
                Solicitar una Demo
              </Link>
            </div>
          </div>
        </section>
        <Footer />
      </main>
    </div>
  );
}
