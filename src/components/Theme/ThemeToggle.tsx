import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Theme } from '../../types';
import './ThemeToggle.css';

const ThemeToggle = () => {
	const [theme, setTheme] = useState<Theme>(Theme.DARK);

	// Toggle between light and dark themes
	const toggleTheme = () => {
		const newTheme = theme === Theme.DARK ? Theme.LIGHT : Theme.DARK;
		setTheme(newTheme);
		document.documentElement.setAttribute('data-theme', newTheme);
		localStorage.setItem('theme', newTheme);
	};

	useEffect(() => {
		// Load saved theme from localStorage or use dark as default
		const savedTheme = localStorage.getItem('theme') as Theme | null;
		const themeToUse = savedTheme || Theme.DARK;
		setTheme(themeToUse);
		document.documentElement.setAttribute('data-theme', themeToUse);
	}, []);

	return (
		<button className="theme-toggle" onClick={toggleTheme}>
			{theme === Theme.LIGHT ? <Moon size={20} /> : <Sun size={20} />}
		</button>
	);
};

export default ThemeToggle;
