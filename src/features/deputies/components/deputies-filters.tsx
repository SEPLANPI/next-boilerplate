'use client'

import { AsyncFilter } from '@/components/ui/async-filter'
import { getPoliticalParties } from '../api/client/get-political-parties'
import { getTermsOptions } from '../api/client/get-terms-options'
import Image from 'next/image'
import { ImagePlaceholder } from '@/components/ui/image-placeholder'

export function DeputiesFilters() {
  return (
    <>
      <AsyncFilter
        showSearch={false}
        loadOptions={getPoliticalParties}
        searchParamKey="partidos"
        filterId="partidos"
        getOptionLabel={(option) => option.nome}
        getOptionValue={(option) => option.id.toString()}
        renderOption={(option) => (
          <div className="flex items-center space-x-2">
            {option.foto ? (
              <Image
                className="size-8 rounded"
                src={option.foto}
                alt={option.nome}
                width={96}
                height={96}
                quality={100}
              />
            ) : (
              <ImagePlaceholder className="size-8" iconClassName="size-4" />
            )}
            <div className="flex flex-col items-start text-xs">
              <span className="font-semibold">{option.sigla}</span>
              <span>{option.nome}</span>
            </div>
          </div>
        )}
      >
        Partidos
      </AsyncFilter>
      <AsyncFilter
        showSearch={false}
        loadOptions={getTermsOptions}
        searchParamKey="mandatos"
        filterFn={(option, search) =>
          option.data_fim.includes(search) ||
          option.data_inicio.includes(search)
        }
        filterId="mandatos"
        getOptionLabel={(option) =>
          option.data_inicio.split('-')[0] +
          ' - ' +
          option.data_fim.split('-')[0]
        }
        getOptionValue={(option) => option.id.toString()}
      >
        Mandatos
      </AsyncFilter>
    </>
  )
}
