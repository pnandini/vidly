import React from 'react';
export default function Like(props) {
if (props.liked === true){
    return (<i onClick={props.handleLikeChange} className="fa fa-heart" aria-hidden="true"> </i>);
}
    return (<i onClick={props.handleLikeChange} className="fa fa-heart-o" aria-hidden="true">
    </i>
);
}