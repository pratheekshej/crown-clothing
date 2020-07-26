import React from 'react';
import './form-input.styles.scss';

const FormInput = ({ handleChange, label, ...otherProps }) => {
    return (
        <div className="group">
            <input className="form-input" onChange={handleChange} {...otherProps} />
            {
                label ?
                (
                    <div className={`form-input-label ${otherProps.value.length > 0 ? 'shrink' : ''}`}>
                        {label}
                    </div>
                ) :
                null
            }
        </div>
    );
}

export default FormInput;