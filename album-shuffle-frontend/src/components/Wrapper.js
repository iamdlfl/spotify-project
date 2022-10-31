import React from 'react';
import { Button } from '@mui/material';

import { Navbar } from './Navbar';
import { ShuffleList } from './ShuffleList';
import { Footer } from './Footer';

import { useGetIsLoggedOn } from '../hooks/useGetIsLoggedOn';
import { server } from '../hooks/serverName';

export const Wrapper = () => {
    const { data, error, isError, isLoading } = useGetIsLoggedOn();
    console.log(data);
    if (isLoading) {
        return <p>Loading</p>
    }
    if (isError) {
        return <p>{error.message}</p>
    }
    const loginUrl = server + "/login"

    return (
        <>
            <Navbar />
            {!data.logged_in && (
                <>
                <p>You are not logged in.</p>
                <Button variant="outlined" href={loginUrl}>Login</Button>
                </>
            )}
            {data.logged_in && (
                <ShuffleList />
            )}
            <Footer />
        </>
    )
}
