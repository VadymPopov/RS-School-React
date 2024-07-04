import { Component, ButtonHTMLAttributes } from 'react';

interface BtnProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
}

class Button extends Component<BtnProps> {
  render() {
    const { label, ...props } = this.props;
    return (
      <button className="btn" {...props}>
        {label}
      </button>
    );
  }
}

export default Button;
