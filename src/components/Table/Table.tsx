import { memo } from 'react';

interface TableProps {
	columnData: {
		label: string;
		key: string;
	}[];
	children: React.ReactNode;
}

const Table = memo((props: TableProps) => {
	const { columnData, children } = props;
	return (
		<div className="table-container">
			<table>
				<thead>
					<tr>
						{columnData.map(column => (
							<th key={column.key}>{column.label}</th>
						))}
					</tr>
				</thead>
				<tbody>{children}</tbody>
			</table>
		</div>
	);
});

export default Table;
