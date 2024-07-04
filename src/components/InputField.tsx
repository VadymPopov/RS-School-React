import { Component, InputHTMLAttributes } from 'react';

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

interface InputFieldState {
  value: string;
}

class InputField extends Component<InputFieldProps, InputFieldState> {
  constructor(props: InputFieldProps) {
    super(props);
    this.state = { value: '' };
  }

  handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
    this.setState({ value: event.target.value });
  }

  render() {
    const { label, ...props } = this.props;
    const { value } = this.state;
    return (
      <div>
        <label>{label}</label>
        <input {...props} onChange={this.handleChange} value={value} />
      </div>
    );
  }
}

export default InputField;
