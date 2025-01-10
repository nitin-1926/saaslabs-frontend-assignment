import { ChevronLeft, ChevronRight } from 'lucide-react';
import Button from '../Button/Button';
import './Pagination.css';

interface PaginationProps {
	currentPage: number;
	totalPages: number;
	handlePrevPage: () => void;
	handleNextPage: () => void;
	handlePageClick: (page: number) => void;
}

const Pagination = (props: PaginationProps) => {
	const { currentPage, totalPages, handlePrevPage, handleNextPage, handlePageClick } = props;

	// Calculate which page numbers to display
	const getPageNumbers = () => {
		const pageNumbers = [];
		const maxVisiblePages = 5;
		const halfVisible = Math.floor(maxVisiblePages / 2);

		// Calculate start and end pages for pagination display
		let startPage = Math.max(currentPage - halfVisible, 1);
		const endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);

		// Adjust start page if we're near the end
		if (endPage - startPage + 1 < maxVisiblePages) {
			startPage = Math.max(endPage - maxVisiblePages + 1, 1);
		}

		// Add first page and ellipsis if needed
		if (startPage > 1) {
			pageNumbers.push(1);
			if (startPage > 2) {
				pageNumbers.push('...');
			}
		}

		// Add visible page numbers
		for (let i = startPage; i <= endPage; i++) {
			pageNumbers.push(i);
		}

		// Add last page and ellipsis if needed
		if (endPage < totalPages) {
			if (endPage < totalPages - 1) {
				pageNumbers.push('...');
			}
			pageNumbers.push(totalPages);
		}

		return pageNumbers;
	};

	return (
		<div className="pagination">
			<Button onClick={handlePrevPage} disabled={currentPage === 1}>
				<ChevronLeft size={20} />
				Previous
			</Button>

			<div className="page-numbers">
				{getPageNumbers().map((page, index) =>
					typeof page === 'number' ? (
						<Button
							key={index}
							className={`page-number ${currentPage === page ? 'active' : ''}`}
							onClick={() => handlePageClick(page)}
						>
							{page}
						</Button>
					) : (
						<span key={index} className="page-dots">
							{page}
						</span>
					),
				)}
			</div>

			<Button onClick={handleNextPage} disabled={currentPage === totalPages}>
				Next
				<ChevronRight size={20} />
			</Button>
		</div>
	);
};

export default Pagination;
