import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Theme } from '../../types';
import './ThemeToggle.css';

const ThemeToggle = () => {
	const [theme, setTheme] = useState<Theme>(Theme.DARK);
	const toggleTheme = () => {
		const newTheme = theme === Theme.DARK ? Theme.LIGHT : Theme.DARK;
		setTheme(newTheme);
		document.documentElement.setAttribute('data-theme', newTheme);
		localStorage.setItem('theme', newTheme);
	};

	useEffect(() => {
		// Check for saved theme preference
		const savedTheme = localStorage.getItem('theme') as Theme | null;
		if (savedTheme) {
			setTheme(savedTheme);
			document.documentElement.setAttribute('data-theme', savedTheme);
		}
	}, []);

	return (
		<button className="theme-toggle" onClick={toggleTheme}>
			{theme === Theme.LIGHT ? <Moon size={20} /> : <Sun size={20} />}
		</button>
	);
};

export default ThemeToggle;
