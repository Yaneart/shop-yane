import { useState } from 'react';
import { StarRating } from '../../star-rating';
import toast from 'react-hot-toast';

interface ReviewFormProps {
  onSubmit: (review: { name: string; rating: number; text: string }) => void;
}

export function ReviewForm({ onSubmit }: ReviewFormProps) {
  const [name, setName] = useState('');
  const [rating, setRating] = useState(0);
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !rating || !text.trim()) {
      toast.error('Заполните все поля и поставьте оценку');
      return;
    }

    onSubmit({ name: name.trim(), rating, text: text.trim() });
    setName('');
    setRating(0);
    setText('');
    toast.success('Отзыв добавлен!');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="border-border rounded-2xl border p-5 sm:p-6"
    >
      <h3 className="text-text mb-4 text-lg font-semibold">Оставить отзыв</h3>

      <div className="flex flex-col gap-4">
        <div>
          <label className="text-text-secondary mb-1 block text-sm">Имя</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ваше имя"
            className="border-border bg-bg text-text placeholder:text-text-tertiary focus:border-accent w-full rounded-lg border px-4 py-2.5 text-sm transition-colors outline-none"
          />
        </div>

        <div>
          <label className="text-text-secondary mb-1 block text-sm">
            Оценка
          </label>
          <StarRating value={rating} onChange={setRating} />
        </div>

        <div>
          <label className="text-text-secondary mb-1 block text-sm">
            Отзыв
          </label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Поделитесь впечатлениями..."
            rows={3}
            className="border-border bg-bg text-text placeholder:text-text-tertiary focus:border-accent w-full resize-none rounded-lg border px-4 py-2.5 text-sm transition-colors outline-none"
          />
        </div>

        <button
          type="submit"
          className="bg-accent text-accent-text hover:bg-accent-hover btn-press w-full rounded-full py-2.5 text-sm font-medium transition-colors sm:w-auto sm:px-8"
        >
          Отправить
        </button>
      </div>
    </form>
  );
}
