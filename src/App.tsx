import './App.css';
import ProjectTable from './components/Table/ProjectTable';
import ThemeToggle from './components/Theme/ThemeToggle';

function App() {
	return (
		<div className="container">
			<ThemeToggle />
			<h1>Kickstarter Projects</h1>
			<p className="subtitle">Discover and explore highly-rated crowdfunding projects</p>
			<ProjectTable />
		</div>
	);
}

export default App;
