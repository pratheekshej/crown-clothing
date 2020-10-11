import React from 'react';
import './form-input.styles.scss';

const FormInput = ({ handleChange, handleBlur, label, error, ...otherProps }) => {
    return (
        <div className={`group ${error ? 'error' : ''}`}>
            <input className="form-input" onChange={handleChange} {...otherProps} onBlur={handleBlur} required="required" />
            {
                label ? (
                    <div className={`form-input-label ${otherProps.value.length > 0 ? 'shrink' : ''}`}>
                        {label}
                    </div>
                ) : null
            }
            {
                (error) ? (
                    <div className="error-bubble"> {error} </div>
                ) : null
            }
        </div>
    );
}

export default FormInput;