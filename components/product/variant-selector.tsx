'use client';

import clsx from 'clsx';
import { useProduct, useUpdateURL } from 'components/product/product-context';
import { ProductOption, ProductVariant } from 'lib/shopify/types';
import SizeGuide from './size-guide';
import { Ruler } from 'lucide-react';
import { useState } from 'react';

type Combination = {
  id: string;
  availableForSale: boolean;
  [key: string]: string | boolean;
};

export function VariantSelector({
  options,
  variants
}: {
  options: ProductOption[];
  variants: ProductVariant[];
}) {
  const { state, updateOption } = useProduct();
  const updateURL = useUpdateURL();
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const hasNoOptionsOrJustOneOption =
    !options.length || (options.length === 1 && options[0]?.values.length === 1);

  if (hasNoOptionsOrJustOneOption) {
    return null;
  }

  const combinations: Combination[] = variants.map((variant) => ({
    id: variant.id,
    availableForSale: variant.availableForSale,
    ...variant.selectedOptions.reduce(
      (accumulator, option) => ({ ...accumulator, [option.name.toLowerCase()]: option.value }),
      {}
    )
  }));

  return (
    <>
      {options.map((option) => (
        <form key={option.id}>
          <dl className="mb-8 pl-4 pt-1">
            {option.name.toLowerCase() !== 'size' && (
              <dt className="mb-4 text-sm uppercase tracking-wide">{option.name}</dt>
            )}
            <dd className="flex flex-wrap gap-3">
              {option.values.map((value) => {
                const optionNameLowerCase = option.name.toLowerCase();

                // Base option params on current selectedOptions so we can preserve any other param state.
                const optionParams = { ...state, [optionNameLowerCase]: value };

                // Filter out invalid options and check if the option combination is available for sale.
                const filtered = Object.entries(optionParams).filter(([key, value]) =>
                  options.find(
                    (option) => option.name.toLowerCase() === key && option.values.includes(value)
                  )
                );
                const isAvailableForSale = combinations.find((combination) =>
                  filtered.every(
                    ([key, value]) => combination[key] === value && combination.availableForSale
                  )
                );

                // The option is active if it's in the selected options.
                const isActive = state[optionNameLowerCase] === value;

                return (
                  <button
                    formAction={() => {
                      const newState = updateOption(optionNameLowerCase, value);
                      updateURL(newState);
                    }}
                    key={value}
                    aria-disabled={!isAvailableForSale}
                    disabled={!isAvailableForSale}
                    title={`${option.name} ${value}${!isAvailableForSale ? ' (Out of Stock)' : ''}`}
                    className={clsx(
                      'flex min-w-[48px] items-center justify-center rounded-full border bg-neutral-100 px-2 py-1 text-sm dark:border-neutral-800 dark:bg-neutral-900',
                      {
                        'cursor-default ring-2 ring-blue-600': isActive,
                        'ring-1 ring-transparent transition duration-300 ease-in-out hover:ring-blue-600':
                          !isActive && isAvailableForSale,
                        'relative z-10 cursor-not-allowed overflow-hidden bg-neutral-100 text-neutral-500 ring-1 ring-neutral-300 before:absolute before:inset-x-0 before:-z-10 before:h-px before:-rotate-45 before:bg-neutral-300 before:transition-transform dark:bg-neutral-900 dark:text-neutral-400 dark:ring-neutral-700 dark:before:bg-neutral-700':
                          !isAvailableForSale
                      }
                    )}
                  >
                    {value}
                  </button>
                );
              })}
            </dd>
          </dl>
        </form>
      ))}

      {/* Size Guide Button */}
      <div className="mb-6 pl-4 flex flex-col transition-all duration-300 ease-in-out">
        <button
          onClick={() => setIsGuideOpen(true)}
          className="group w-full bg-[#f3f0ea] dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 py-3 rounded-full flex items-center justify-center gap-2 hover:bg-[#eae6de] dark:hover:bg-neutral-700 transition-colors"
        >
          <Ruler size={18} className="text-neutral-500 group-hover:text-blue-500 transition-colors" />
          <span className="font-medium">Size Guide & My Measurements</span>
        </button>
      </div>

      <SizeGuide isOpen={isGuideOpen} onClose={() => setIsGuideOpen(false)} />
    </>
  );
}
