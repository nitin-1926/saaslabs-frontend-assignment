import { useEffect, useState } from 'react';
import { API_URL, PROJECTS_PER_PAGE } from '../../constants';
import { Project } from '../../types';
import Pagination from '../Pagination/Pagination';
import './ProjectTable.css';
import Table from './Table';

const columnData = [
	{ label: 'S.No.', key: 's.no' },
	{ label: 'Title', key: 'title' },
	{ label: 'Creator', key: 'by' },
	{ label: 'Funded', key: 'percentage.funded' },
	{ label: 'Pledged', key: 'amt.pledged' },
	{ label: 'Backers', key: 'num.backers' },
	{ label: 'Location', key: 'location' },
];

const ProjectTable = () => {
	const [projects, setProjects] = useState<Project[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [currentPage, setCurrentPage] = useState(1);

	const totalPages = Math.ceil(projects.length / PROJECTS_PER_PAGE);

	const handlePrevPage = () => {
		setCurrentPage(prev => Math.max(prev - 1, 1));
	};

	const handleNextPage = () => {
		setCurrentPage(prev => Math.min(prev + 1, totalPages));
	};

	const handlePageClick = (page: number) => {
		setCurrentPage(page);
	};

	const indexOfLastProject = currentPage * PROJECTS_PER_PAGE;
	const indexOfFirstProject = indexOfLastProject - PROJECTS_PER_PAGE;

	const fetchProjects = async () => {
		try {
			const response = await fetch(API_URL);
			if (!response.ok) {
				throw new Error('Failed to fetch projects');
			}
			const data = await response.json();
			setProjects(data);
			setLoading(false);
		} catch (err) {
			console.error(err);
			setError('Failed to load projects. Please try again later.');
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchProjects();
	}, []);

	if (loading) {
		return (
			<div className="loading-container">
				<div className="loading-spinner"></div>
				<p>Loading projects...</p>
			</div>
		);
	}

	if (error) {
		return <div className="error-message">{error}</div>;
	}

	return (
		<>
			<Table columnData={columnData}>
				{projects.slice(indexOfFirstProject, indexOfLastProject).map(project => (
					<tr key={project['s.no']}>
						<td>{project['s.no']}</td>
						<td>
							<div className="project-title">
								<strong>{project.title}</strong>
								<span className="project-blurb">{project.blurb}</span>
							</div>
						</td>
						<td>{project.by}</td>
						<td>
							<span>{project['percentage.funded']}%</span>
						</td>
						<td>${project['amt.pledged'].toLocaleString()}</td>
						<td>{parseInt(project['num.backers']).toLocaleString()}</td>
						<td>{`${project.location}, ${project.state}`}</td>
					</tr>
				))}
			</Table>
			<Pagination
				currentPage={currentPage}
				totalPages={totalPages}
				handlePrevPage={handlePrevPage}
				handleNextPage={handleNextPage}
				handlePageClick={handlePageClick}
			/>
		</>
	);
};

export default ProjectTable;
