import styles from './TextArea.module.scss';

export type TextAreaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const TextArea = ({className = '', ...props}: TextAreaProps) => {
  return (
    <textarea className={`${className} ${styles.textarea}`} {...props}>
      {props.children}
    </textarea>
  );
};

export default TextArea;
