import React from 'react';
import { useLoaderData } from 'react-router-dom';

const BoardDetails = () => {
    const boardData = useLoaderData()
    // console.log('databoard', boardData)
    const { boardName, workspace, userName } = boardData;
    return (
        <div>
            <div className='flex lg:flex-row flex-col justify-between gap-5 px-10 py-5 bg-[#e9f2ff]'>
                <h1 className='text-2xl font-bold text-gray-800'>Your Board: {boardName}</h1>
                <p className='text-2xl font-bold text-gray-800'>Workspace: {workspace}</p>
                <p className='text-2xl font-bold text-gray-800'>Created by: {userName}</p>
            </div>
        </div>
    );
};

export default BoardDetails;