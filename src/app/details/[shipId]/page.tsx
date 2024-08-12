'use client';
import React from 'react';
import Home from '../../page';
import ShipDetails from '../../../components/ShipDetails';

export default function Details({ params }: { params: { shipId: string } }) {
  return (
    <Home>
      <ShipDetails shipId={params.shipId} />
    </Home>
  );
}
