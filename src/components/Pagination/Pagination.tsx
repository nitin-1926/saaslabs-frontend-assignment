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

	const getPageNumbers = () => {
		const pageNumbers = [];
		const maxVisiblePages = 5;
		const halfVisible = Math.floor(maxVisiblePages / 2);

		let startPage = Math.max(currentPage - halfVisible, 1);
		const endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);

		if (endPage - startPage + 1 < maxVisiblePages) {
			startPage = Math.max(endPage - maxVisiblePages + 1, 1);
		}

		if (startPage > 1) {
			pageNumbers.push(1);
			if (startPage > 2) {
				pageNumbers.push('...');
			}
		}

		for (let i = startPage; i <= endPage; i++) {
			pageNumbers.push(i);
		}

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
