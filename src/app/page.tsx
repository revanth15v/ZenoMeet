'use client'

import { Button } from "@/components/ui/button";
import Link from "next/link";


export default function Home() {

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-emerald-50">
      <div className="text-center space-y-6">
        <h1 className="text-6xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
          ZenoMeet
        </h1>
        <p className="text-xl text-slate-600 max-w-md mx-auto">
          Experience the future of professional meetings and collaboration
        </p>
        <div className="space-x-4">
          <Link href="/dashboard">
            <Button className="bg-gradient-to-r cursor-pointer from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white px-8 py-3 text-lg">
              Get Started
            </Button>
          </Link>
          <Button variant="outline" className="px-8 py-3 text-lg">
            Learn More
          </Button>
        </div>
      </div>
    </div>
  );
};

