'use client';
import { useCallback, useEffect, useState } from 'react';
import styles from './page.module.css';
import { Pokemon } from '@test/shared-types';

export default function Index() {
  const [search, setSearch] = useState('Bulb');
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);

  useEffect(() => {
    fetch(`http://localhost:8000/search?q=${search}`)
      .then((resp) => resp.json())
      .then(setPokemon);
  }, [search]);

  const onSetSearch = useCallback(
    (evnt: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(evnt.target.value);
    },
    []
  );
  return (
    <div className={styles.page}>
      <input
        type="text"
        value={search}
        onChange={onSetSearch}
        placeholder="Search..."
      />
      <ul>
        {pokemon?.map(({ id, name: { english } }) => (
          <li key={id}>{english}</li>
        ))}
      </ul>
    </div>
  );
}
