'use client'


import { Button } from '@/components/ui/button';
import { authClient } from '@/lib/auth-client'
import { useTRPC } from '@/trpc/client';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import React from 'react'

export const HomeView = () => {

  return (
    <div >
     Home view
    </div>
  )
}


