import React from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Product from '../components/Product'; // doğru klasörden import et

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function SearchResults() {
  const query = useQuery();
  const q = query.get('q')?.toLowerCase() || '';

  const { product } = useSelector((store) => store.product); // Redux'tan ürünleri çekiyoruz

  const filtered = product.filter(item =>
    item.title.toLowerCase().includes(q)
  );

  return (
    <div className="flex-row" style={{ flexWrap: 'wrap', marginTop: '25px', padding: '1rem' }}>
      <h2 style={{ width: '100%' }}>"{q}" için arama sonuçları</h2>
      {filtered.length > 0 ? (
        filtered.map(item => <Product key={item.id} product={item} />)
      ) : (
        <p style={{ fontSize: '18px', color: '#999' }}>Sonuç bulunamadı.</p>
      )}
    </div>
  );
}

export default SearchResults;
