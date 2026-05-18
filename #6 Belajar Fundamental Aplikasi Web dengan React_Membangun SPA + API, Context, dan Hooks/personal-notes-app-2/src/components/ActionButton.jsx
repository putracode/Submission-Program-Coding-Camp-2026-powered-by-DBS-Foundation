const ActionButton = ({ title, onClickHandler = () => {}, children }) => {
    return (
        <button className="action" type="button" title={title} onClick={onClickHandler}>
            {children}
        </button>
    );
};

export default ActionButton;
