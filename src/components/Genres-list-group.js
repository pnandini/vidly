import React from 'react';
import PropTypes from 'prop-types';

const Generes = props => {
    const {allGeners, selected} = props;
    console.log(allGeners);
    if (!allGeners) return null;
    return (
        <div>
            <ul className="list-group">
                {allGeners.map((genre) => {
                    return <button key={genre._id} onClick={() => {
                        props.handleGenereChange(genre)
                    }}
                                   className={genre._id === selected._id ? "list-group-item list-group-item-action active" : "list-group-item list-group-item-action"}>{genre.name}</button>
                })}
            </ul>
        </div>
    );
};

Generes.propTypes = {
    allGeners: PropTypes.array.isRequired,
    selected: PropTypes.object.isRequired
};

export default Generes;
