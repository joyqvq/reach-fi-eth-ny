'use client';

import { Card, Title, Text } from '@tremor/react';
import Login from './auth';
import UsersTable from './table';


export const dynamic = 'force-dynamic';

export default async function IndexPage({
  searchParams
}: {
  searchParams: { q: string };
}) {
    return (
      <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Title>Reach</Title>
      <Text>
        Manage your campaigns and reach millions of on-chain users.
      </Text>
      <Login/>
  </main>
    )
}
