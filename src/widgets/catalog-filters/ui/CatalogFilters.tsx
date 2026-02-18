import { ChevronDown, SlidersHorizontal } from 'lucide-react';
import { useDispatch, useSelector } from '@app/store';
import {
  selectFilters,
  toggleCategory,
  setPriceMin,
  setPriceMax,
  toggleSize,
  resetFilters,
} from '@features/catalo-filter';
import clsx from 'clsx';

const CATEGORIES = ['T-shirts', 'Hoodie', 'Jackets', 'Pajamas', 'Long-sleeve'];
const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

export function CatalogFilters() {
  const dispatch = useDispatch();
  const { categories, priceMin, priceMax, sizes } = useSelector(selectFilters);

  const hasActiveFilters =
    categories.length > 0 ||
    sizes.length > 0 ||
    priceMin !== null ||
    priceMax !== null;

  return (
    <aside className="hidden w-64 shrink-0 lg:block">
      <div className="border-border sticky top-24 rounded-2xl border p-5">
        <div className="flex items-center justify-between">
          <span className="text-text text-lg font-bold">Filters</span>
          <SlidersHorizontal size={20} className="text-text-tertiary" />
        </div>

        <hr className="border-border my-5" />

        <div>
          <button className="flex w-full items-center justify-between">
            <span className="text-text font-medium">Category</span>
            <ChevronDown size={18} className="text-text-tertiary" />
          </button>
          <ul className="mt-3 flex flex-col gap-2 pb-5">
            {CATEGORIES.map((category) => (
              <li key={category}>
                <label className="flex cursor-pointer items-center gap-2">
                  <input
                    type="checkbox"
                    checked={categories.includes(category)}
                    onChange={() => dispatch(toggleCategory(category))}
                    className="accent-accent h-4 w-4 rounded"
                  />
                  <span className="text-text-secondary hover:text-text text-sm transition-colors">
                    {category}
                  </span>
                </label>
              </li>
            ))}
          </ul>
        </div>

        <hr className="border-border" />

        <div className="pt-5">
          <button className="flex w-full items-center justify-between">
            <span className="text-text font-medium">Price</span>
            <ChevronDown size={18} className="text-text-tertiary" />
          </button>
          <div className="mt-3 flex items-center gap-2">
            <input
              type="number"
              placeholder="Min"
              value={priceMin ?? ''}
              onChange={(e) =>
                dispatch(
                  setPriceMin(
                    e.target.value ? Number(e.target.value) : null,
                  ),
                )
              }
              className="border-border text-text placeholder:text-text-tertiary w-full rounded-lg border bg-transparent px-3 py-2 text-sm outline-none"
            />
            <span className="text-text-tertiary">—</span>
            <input
              type="number"
              placeholder="Max"
              value={priceMax ?? ''}
              onChange={(e) =>
                dispatch(
                  setPriceMax(
                    e.target.value ? Number(e.target.value) : null,
                  ),
                )
              }
              className="border-border text-text placeholder:text-text-tertiary w-full rounded-lg border bg-transparent px-3 py-2 text-sm outline-none"
            />
          </div>
        </div>

        <hr className="border-border my-5" />

        <div>
          <button className="flex w-full items-center justify-between">
            <span className="text-text font-medium">Size</span>
            <ChevronDown size={18} className="text-text-tertiary" />
          </button>
          <div className="mt-3 flex flex-wrap gap-2">
            {SIZES.map((size) => (
              <button
                key={size}
                onClick={() => dispatch(toggleSize(size))}
                className={clsx(
                  'rounded-lg border px-3 py-1.5 text-sm transition-colors',
                  sizes.includes(size)
                    ? 'bg-accent text-accent-text border-accent'
                    : 'border-border text-text-secondary hover:border-accent hover:text-text',
                )}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <hr className="border-border my-5" />

        <button
          onClick={() => dispatch(resetFilters())}
          disabled={!hasActiveFilters}
          className={clsx(
            'w-full rounded-full py-2.5 text-sm font-medium transition-colors',
            hasActiveFilters
              ? 'bg-accent text-accent-text hover:bg-accent-hover'
              : 'bg-border text-text-tertiary cursor-not-allowed',
          )}
        >
          Reset Filters
        </button>
      </div>
    </aside>
  );
}
