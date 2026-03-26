export interface CategoryData {
  title: string;
  slug: string;
  categoryKey: string;
  description: string;
}

export const CATEGORY_MAP: Record<string, CategoryData> = {
  hoodies: {
    title: 'Hoodies',
    slug: 'hoodies',
    categoryKey: 'Hoodie',
    description: 'Cozy and stylish hoodies for every season',
  },
  't-shirts': {
    title: 'T-Shirts',
    slug: 't-shirts',
    categoryKey: 'T-shirts',
    description: 'Classic and trendy t-shirts for everyday wear',
  },
  jackets: {
    title: 'Jackets',
    slug: 'jackets',
    categoryKey: 'Jackets',
    description: 'Warm and fashionable jackets for any weather',
  },
  pajamas: {
    title: 'Pajamas',
    slug: 'pajamas',
    categoryKey: 'Pajamas',
    description: 'Comfortable pajamas for the best sleep',
  },
  'long-sleeve': {
    title: 'Long Sleeves',
    slug: 'long-sleeve',
    categoryKey: 'Long-sleeve',
    description: 'Stylish long-sleeve shirts and sweatshirts',
  },
};

export const CATEGORIES_LIST = Object.values(CATEGORY_MAP);
