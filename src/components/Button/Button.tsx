import './Button.css';

interface ButtonProps {
	children: React.ReactNode;
	className?: string;
	disabled?: boolean;
	onClick: () => void;
}

const Button = (props: ButtonProps) => {
	const { children, disabled = false, className, onClick } = props;
	return (
		<button className={`${className ? className : 'button'}`} onClick={onClick} disabled={disabled}>
			{children}
		</button>
	);
};

export default Button;
