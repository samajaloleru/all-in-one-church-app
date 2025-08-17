import Head from 'next/head';
import { useEffect, useState } from 'react';
import Footer from '../../components/Footer';
import MagicBento from '@/components/MagicBento';

export default function Bible() {


  return (
    <div className="h-screen flex flex-col">
      <div>
        Bible Page Content
      </div>
      <Footer />
    </div>
  );
}