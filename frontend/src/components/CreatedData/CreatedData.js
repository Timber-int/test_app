import React from 'react';

const CreatedData = ({createdAt}) => {

    const options = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};

    const data = new Date(createdAt);

    return <>{data.toLocaleDateString("en-US", options)}</>
};

export {CreatedData};
