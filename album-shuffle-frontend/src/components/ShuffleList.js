import React from 'react';
import { PlaylistCard } from './PlaylistCard';
import { useGetPlaylists } from '../hooks/useGetPlaylists';
import { Button, Box } from '@mui/material';
import { server } from '../hooks/serverName';

const listBoxSx = () => ({
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
});

export const ShuffleList = () => {
    const { data, error, isError, isLoading } = useGetPlaylists();
    if (isLoading) {
        return <p>Loading</p>
    }
    if (isError) {
        return <p>{error.message}</p>
    }

    if (data.error) {
        return <p>{data.error.message}</p>
    }

    const logout = server + "/logout"


    return(
        <>
        <h1>Shuffle List</h1>
        <Button variant="outlined" href={logout}>Logout</Button>
        {data && (
            <Box sx={listBoxSx}>
            {data.items.map(function(val, idx) {
                // handle image url
                let imageUrl;
                if (val.images.length > 1 ) {
                    imageUrl = val.images[1].url;
                } else {
                    imageUrl = "/pic.jpg";
                }

                // handle description
                let description;
                if (val.description.length > 1) {
                    description = val.description;
                } else {
                    description = "No description found for this playlist."
                }

                return <PlaylistCard 
                            key={idx} 
                            playlistName={val.name} 
                            numberOfTracks={val.tracks.total} 
                            playlistImageLink={imageUrl} 
                            playlistId={val.id}
                            playlistDescription={description}/>
            })}
            </Box>
        )}
        </>
    )
}