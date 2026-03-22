import clsx from 'clsx';
import { useState, type ReactNode } from 'react';

export interface TabItem {
  label: string;
  content: ReactNode;
}

interface TabProps {
  tabs: TabItem[];
  defaultIndex?: number;
}

export function Tabs({ tabs, defaultIndex = 0 }: TabProps) {
  const [activeIndex, setActiveIndex] = useState(defaultIndex);
  return (
    <div>
      <div className="border-border flex gap-0 border-b">
        {tabs.map((tab, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            className={clsx(
              'btn-press relative px-5 py-3 text-sm font-medium transition-colors sm:text-base',
              activeIndex === i
                ? 'text-text'
                : 'text-text-tertiary hover:text-text-secondary',
            )}
          >
            {tab.label}
            {activeIndex === i && (
              <span className="bg-accent absolute bottom-0 left-0 h-0.5 w-full" />
            )}
          </button>
        ))}
      </div>
      <div className="py-6">{tabs[activeIndex].content}</div>
    </div>
  );
}
