import React from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col w-full">
      <header className="flex px-4 lg:px-8 mb-5">
        <Navbar />
      </header>
      <main className="flex-1 px-4 lg:px-8 overflow-y-auto">{children}</main>
      <Footer />
    </div>
  );
}
