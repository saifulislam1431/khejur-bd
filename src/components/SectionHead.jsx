import React from 'react';

const SectionHead = ({title, description}) => {
    return (
        <div className='px-2 text-info my-32 text-center overflow-hidden'>
            <h1 className='mb-4 text-3xl font-bold'>{title}</h1>
            <p>{description}</p>
        </div>
    );
};

export default SectionHead;