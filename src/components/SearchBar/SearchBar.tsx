import css from './SearchBar.module.css';
import toast, { Toaster } from 'react-hot-toast';

interface SearchBarProps {
  onSearch: (searchInput: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const handleSubmit = (formData: FormData) => {
    const searchInput = formData.get('text') as string;
    if (searchInput.trim() === '') {
      toast('Please enter something', { position: 'top-right', icon: '✍️' });
      return;
    }
    onSearch(searchInput);
  };

  return (
    <header>
      <Toaster />
      <form className={css.form} action={handleSubmit}>
        <input
          className={css.input}
          type="text"
          name="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
        <button className={css.btn} type="submit">
          Search
        </button>
      </form>
    </header>
  );
}
