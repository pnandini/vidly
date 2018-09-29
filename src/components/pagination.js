import React from 'react';
import _ from 'lodash';


export default function Pagination(props){
    const {itemsCount,pageSize,currentPage,onPageChange} = props;
    const numberOfPages = Math.ceil(itemsCount/pageSize);
    if (numberOfPages === 1) return null;
    const pages = _.range(1,numberOfPages+1);
    return (
        <nav>
            <ul className="pagination">
                {pages.map(page => (<li key={page} className={page === currentPage?'page-item active':'page-item'}><a onClick={()=>onPageChange(page)} className="page-link">{page}</a></li>))}
            </ul>
        </nav>
    );
}
