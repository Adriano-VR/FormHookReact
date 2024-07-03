
// eslint-disable-next-line react/prop-types
const CampoForm = ({ label, type, onChange }) => {
    return (
        <div>
            <label htmlFor={label}>{label}</label>
            <input type={type} id={label} onChange={onChange} />
        </div>
    );
};

export default CampoForm;
