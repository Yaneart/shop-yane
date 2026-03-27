import { useState } from 'react';
import { ChevronDown, SlidersHorizontal, X } from 'lucide-react';
import { useDispatch, useSelector } from '@app/store';
import {
  selectFilters,
  toggleCategory,
  setPriceMin,
  setPriceMax,
  toggleSize,
  resetFilters,
} from '@features/catalog-filter';
import clsx from 'clsx';
import { CATEGORIES_LIST } from '@/entities/product';
import { Link } from 'react-router-dom';

const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

function FilterContent() {
  const dispatch = useDispatch();
  const { categories, priceMin, priceMax, sizes } = useSelector(selectFilters);

  const hasActiveFilters =
    categories.length > 0 ||
    sizes.length > 0 ||
    priceMin !== null ||
    priceMax !== null;

  return (
    <>
      <div>
        <button className="flex w-full items-center justify-between">
          <span className="text-text font-medium">Category</span>
          <ChevronDown size={18} className="text-text-tertiary" />
        </button>
        <ul className="mt-3 flex flex-col gap-2 pb-5">
          {CATEGORIES_LIST.map((cat) => (
            <li key={cat.slug} className="flex items-center justify-between">
              <label className="flex cursor-pointer items-center gap-2">
                <input
                  type="checkbox"
                  checked={categories.includes(cat.categoryKey)}
                  onChange={() => dispatch(toggleCategory(cat.categoryKey))}
                  className="accent-accent h-4 w-4 rounded"
                />
                <span className="text-text-secondary hover:text-text text-sm transition-colors">
                  {cat.title}
                </span>
              </label>
              <Link
                to={`/catalog/${cat.slug}`}
                className="text-accent hover:text-accent-hover text-xs transition-colors"
              >
                View all
              </Link>
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
                setPriceMin(e.target.value ? Number(e.target.value) : null),
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
                setPriceMax(e.target.value ? Number(e.target.value) : null),
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
                'btn-press rounded-lg border px-3 py-1.5 text-sm transition-colors',
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
          'btn-press w-full rounded-full py-2.5 text-sm font-medium transition-colors',
          hasActiveFilters
            ? 'bg-accent text-accent-text hover:bg-accent-hover'
            : 'bg-border text-text-tertiary cursor-not-allowed',
        )}
      >
        Reset Filters
      </button>
    </>
  );
}

export function CatalogFilters() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setMobileOpen(true)}
        className="border-border text-text btn-press flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium lg:hidden"
      >
        <SlidersHorizontal size={16} />
        Filters
      </button>

      {mobileOpen && (
        <>
          <div
            className="modal-backdrop fixed inset-0 z-[100] bg-black/50 lg:hidden"
            onClick={() => setMobileOpen(false)}
          />
          <div
            className="bg-bg fixed top-0 left-0 z-[101] flex h-full w-72 flex-col shadow-2xl lg:hidden"
            style={{
              animation: 'menu-slide-in-left 0.25s ease-out forwards',
            }}
          >
            <div className="border-border flex items-center justify-between border-b px-4 py-3">
              <span className="text-text font-bold">Filters</span>
              <button
                onClick={() => setMobileOpen(false)}
                className="btn-icon"
                aria-label="Close filters"
              >
                <X size={24} className="text-text" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-5">
              <FilterContent />
            </div>
          </div>
        </>
      )}

      <aside className="hidden w-64 shrink-0 lg:block">
        <div className="border-border sticky top-24 rounded-2xl border p-5">
          <div className="flex items-center justify-between">
            <span className="text-text text-lg font-bold">Filters</span>
            <SlidersHorizontal size={20} className="text-text-tertiary" />
          </div>

          <hr className="border-border my-5" />

          <FilterContent />
        </div>
      </aside>
    </>
  );
}
