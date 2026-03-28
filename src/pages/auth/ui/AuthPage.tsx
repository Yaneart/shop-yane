import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Logo } from '@/shared/ui/Logo';
import { GoogleIcon } from '@/shared/ui/custom-icon/CustomIcons';
import { AUTH_TEXT, AUTH_ERRORS, MIN_PASSWORD_LENGTH } from './constants';

type Mode = 'login' | 'register';

export function AuthPage() {
  const [mode, setMode] = useState<Mode>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const isLogin = mode === 'login';
  const text = AUTH_TEXT[mode];

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      toast.error(AUTH_ERRORS.emptyFields);
      return;
    }

    if (!isLogin && !name.trim()) {
      toast.error(AUTH_ERRORS.emptyName);
      return;
    }

    if (password.length < MIN_PASSWORD_LENGTH) {
      toast.error(AUTH_ERRORS.shortPassword);
      return;
    }

    toast.success(text.successToast);
  }

  function switchMode(next: Mode) {
    setMode(next);
    setShowPassword(false);
    setEmail('');
    setPassword('');
    setName('');
  }

  return (
    <section className="page-fade-in flex min-h-[calc(100vh-160px)] items-center justify-center px-4 py-8">
      <Helmet>
        <title>{text.title} — YaneSHOP</title>
      </Helmet>

      <div className="w-full max-w-md">
        <div className="mb-8 flex flex-col items-center">
          <Link to="/">
            <Logo className="text-text h-10" />
          </Link>
          <h1 className="text-text mt-4 text-2xl font-bold">{text.title}</h1>
          <p className="text-text-tertiary mt-1 text-sm">{text.subtitle}</p>
        </div>

        <div className="border-border mb-6 flex rounded-full border p-1">
          <button
            onClick={() => switchMode('login')}
            className={`flex-1 rounded-full py-2 text-sm font-medium transition-colors ${
              isLogin
                ? 'bg-accent text-accent-text'
                : 'text-text-secondary hover:text-text'
            }`}
          >
            Вход
          </button>
          <button
            onClick={() => switchMode('register')}
            className={`flex-1 rounded-full py-2 text-sm font-medium transition-colors ${
              !isLogin
                ? 'bg-accent text-accent-text'
                : 'text-text-secondary hover:text-text'
            }`}
          >
            Регистрация
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="text-text-secondary mb-1 block text-sm">
                Имя
              </label>
              <div className="border-border focus-within:border-accent flex items-center gap-2 rounded-lg border px-3 transition-colors">
                <User size={18} className="text-text-tertiary shrink-0" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ваше имя"
                  className="text-text placeholder:text-text-tertiary w-full bg-transparent py-2.5 text-sm outline-none"
                />
              </div>
            </div>
          )}

          <div>
            <label className="text-text-secondary mb-1 block text-sm">
              Email
            </label>
            <div className="border-border focus-within:border-accent flex items-center gap-2 rounded-lg border px-3 transition-colors">
              <Mail size={18} className="text-text-tertiary shrink-0" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="text-text placeholder:text-text-tertiary w-full bg-transparent py-2.5 text-sm outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-text-secondary mb-1 block text-sm">
              Пароль
            </label>
            <div className="border-border focus-within:border-accent flex items-center gap-2 rounded-lg border px-3 transition-colors">
              <Lock size={18} className="text-text-tertiary shrink-0" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Минимум 6 символов"
                className="text-text placeholder:text-text-tertiary w-full bg-transparent py-2.5 text-sm outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-text-tertiary hover:text-text shrink-0 transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {isLogin && (
            <div className="text-right">
              <button
                type="button"
                onClick={() => toast('Функция в разработке')}
                className="text-text-tertiary hover:text-accent text-sm transition-colors"
              >
                Забыли пароль?
              </button>
            </div>
          )}

          <button
            type="submit"
            className="bg-accent text-accent-text btn-press w-full rounded-full py-2.5 text-sm font-medium"
          >
            {text.submit}
          </button>
        </form>

        <div className="my-6 flex items-center gap-3">
          <div className="bg-border h-px flex-1" />
          <span className="text-text-tertiary text-xs">или</span>
          <div className="bg-border h-px flex-1" />
        </div>

        <button
          type="button"
          onClick={() => toast('Google Auth в разработке')}
          className="border-border hover:bg-bg-secondary text-text flex w-full items-center justify-center gap-2 rounded-full border py-2.5 text-sm font-medium transition-colors"
        >
          <GoogleIcon />
          Продолжить с Google
        </button>
      </div>
    </section>
  );
}
