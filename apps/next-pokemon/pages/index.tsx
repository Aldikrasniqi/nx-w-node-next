import { useEffect, useState, useCallback } from 'react';
import React from 'react';

import { Pokemon } from '@test/shared-types';


export function Index({
  q,
  pokemon: initialPokemon,
}: {
  q: string;
  pokemon: Pokemon[];
}) {
  const [search, setSearch] = useState(q);
  const [pokemon, setPokemon] = useState<Pokemon[]>(initialPokemon);

  useEffect(() => {
    fetch(`http://localhost:8000/search?q=${(search)}`)
      .then((resp) => resp.json())
      .then((data) => setPokemon(data));
  }, [search]);

  const onSetSearch = useCallback(
    (evt: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(evt.target.value);
    },
    []
  );

  return (
    <div>
      <input value={search} onChange={onSetSearch} />
      <ul>
        {pokemon.map(({ id, name: { english } }) => (
          <li key={id}>{english}</li>
        ))}
      </ul>
    </div>
  );
}

export async function getServerSideProps(context: any) {
  let pokemon = [];
  if (context.query.q) {
    const res = await fetch(
      `http://localhost:8000/search?q=${(context.query.q)}`
    );
    pokemon = await res.json();
  }

  return {
    props: {
      q: context.query.q ?? '',
      pokemon,
    },
  };
}

export default Index;
