import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateCrypto } from './store/slices/cryptoSlice';
import './App.css';

function App() {
  const dispatch = useDispatch();
  const assets = useSelector((state) => state.crypto);

  useEffect(() => {
    const interval = setInterval(() => {
      const id = assets[Math.floor(Math.random() * assets.length)].id;
      dispatch(
        updateCrypto({
          id,
          changes: {
            price: +(Math.random() * 100000).toFixed(2),
            change1h: +(Math.random() * 4 - 2).toFixed(2),
            change24h: +(Math.random() * 4 - 2).toFixed(2),
            volume24h: +(Math.random() * 10000000000).toFixed(0),
          },
        })
      );
    }, 2000);

    return () => clearInterval(interval);
  }, [assets, dispatch]);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Real-Time Crypto Price Tracker</h1>
      <table className="min-w-full text-sm border">
        <thead>
          <tr className="bg-gray-100">
            <th>#</th>
            <th>Logo</th>
            <th>Name</th>
            <th>Symbol</th>
            <th>Price ($)</th>
            <th>1h %</th>
            <th>24h %</th>
            <th>7d %</th>
            <th>Market Cap</th>
            <th>24h Volume</th>
            <th>Circulating Supply</th>
            <th>7D Chart</th>
          </tr>
        </thead>
        <tbody>
  {assets.map((asset, i) => (
    <tr key={asset.id} className="border-t">
      <td>{i + 1}</td>
      <td>
        <img src={asset.logo} alt={`${asset.name} logo`} width="24" />
      </td>
      <td>{asset.name}</td>
      <td>{asset.symbol}</td>
      <td>${asset.price.toLocaleString()}</td>
      <td className={asset.change1h >= 0 ? 'text-green-600' : 'text-red-500'}>
        {asset.change1h >= 0 ? `+${asset.change1h}` : asset.change1h}%
      </td>
      <td className={asset.change24h >= 0 ? 'text-green-600' : 'text-red-500'}>
        {asset.change24h >= 0 ? `+${asset.change24h}` : asset.change24h}%
      </td>
      <td className={asset.change7d >= 0 ? 'text-green-600' : 'text-red-500'}>
        {asset.change7d >= 0 ? `+${asset.change7d}` : asset.change7d}%
      </td>
      <td>${asset.marketCap.toLocaleString()}</td>
      <td>${asset.volume24h.toLocaleString()}</td>
      <td>{asset.supply}</td>
      <td>
        <img src={asset.chart} alt="chart" width="60" />
      </td>
    </tr>
  ))}
</tbody>

      </table>
    </div>
  );
}

export default App;
