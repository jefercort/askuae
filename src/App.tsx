import { useQuery } from '@tanstack/react-query';
import { fetchDataProvider } from './services/api'
import { useMemo, useRef, useState } from 'react';
import type { Category } from './types/service';

function App() {

  const [selectedCategory, setSelectedCategory] = useState<Category | undefined>();
  const [searchTerm, setSearchTerm] = useState<string>('');

  const searcherFocus = useRef<HTMLInputElement>(null);
  
  const { data: dataList, isPending, isError } = useQuery({
    queryKey: ['providers', selectedCategory],
    queryFn: () => fetchDataProvider(selectedCategory),
  });

  // No esta bien hecho ya que estoy modificando directamente los datos de tanstack
  // dataList.sort((a, b) => (b.rating - a.rating));

  const filteredAndSortedDataList = useMemo(() => {
    if (!dataList) return [];

    const filterByName = dataList.filter((n) => n.name.toLowerCase().includes(searchTerm.toLowerCase()));

    return [...filterByName].sort((a, b) => (b.rating - a.rating))
  }, [dataList, searchTerm]);

  if (isPending) return <p>Esta cargando la lista de datos?...</p>
  if (isError) return <p>Ocurrio un error al traer los datos...</p>

  return (
    <>
      <section>
        <div>
          <label
            style={{ marginRight: '20px' }}
          >
            Busqueda
          </label>
          <input
            ref={searcherFocus}
            style={{ width: '75px' }}
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
          <button
            style={{ margin: '10px' }}
            onClick={() => {
              setSearchTerm('')
              searcherFocus.current?.focus()
            }}
          >
            X
          </button>
        </div>
      </section>
      <section id='resultList'>
        <div>
          <label
            htmlFor='category-select'
            style={{ marginRight: '20px' }}
          >
            Selector de categoria
          </label>
          <select
            value={selectedCategory || ''}
            onChange={(event) => {
              const value = event.target.value;
              setSelectedCategory(value === '' ? undefined : (value as Category))
            }}
          >
            <option value={''}>Todas las categorías</option>
            <optgroup label="Trámites y Negocios">
              <option value={'visas_immigration'}>Visados e Inmigración</option>
              <option value={'business_setup'}>Apertura de Empresas</option>
              <option value={'legal'}>Legal y Traducciones</option>
              <option value={'accounting_tax'}>Contabilidad e Impuestos</option>
              <option value={'real_estate'}>Bienes Raíces e Inmobiliaria</option>
            </optgroup>

            <optgroup label="Salud y Bienestar">
              <option value={'health'}>Salud y Medicina</option>
              <option value={'beauty'}>Belleza y Estética</option>
              <option value={'fitness'}>Fitness y Deportes</option>
              <option value={'care'}>Cuidado de Niños y Niñeras</option>
              <option value={'pets'}>Mascotas y Veterinaria</option>
            </optgroup>
            <optgroup label="Hogar y Servicios">
              <option value={'gastronomy'}>Gastronomía y Catering</option>
              <option value={'home_services'}>Mantenimiento del Hogar</option>
              <option value={'cleaning'}>Limpieza y Desinfección</option>
              <option value={'transport_logistics'}>Transporte y Mudanzas</option>
            </optgroup>
            <optgroup label="Tecnología y Creatividad">
              <option value={'tech'}>Tecnología y Software</option>
              <option value={'marketing_media'}>Marketing y Redes Sociales</option>
              <option value={'events_photography'}>Fotografía y Eventos</option>
              <option value={'education'}>Educación y Clases</option>
            </optgroup>
            <optgroup label="Otros">
              <option value={'other'}>Otros Servicios</option>
            </optgroup>
          </select>
          <ul>
            {filteredAndSortedDataList?.map((prov) => (
              <li key={prov.id}>
                {prov.name} - {prov.category} - {prov.rating}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}

export default App
