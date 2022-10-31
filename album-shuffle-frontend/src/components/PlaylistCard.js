import React, { useEffect, useState } from 'react';
import { useGetShuffleMutation } from '../hooks/useGetShuffleMutation';
import { Card, CardMedia, CardContent, CardActions, Button, Box, Typography } from '@mui/material';

const cardSx = () => ({
    maxWidth: 345,
    margin: 10,
});

const cardContentSx = () => ({
    transitionProperty: "box-shadow",
    transitionDuration: "0.5s",
});

const shuffledCardContentSx = () => ({
    boxShadow: '0 0 40px #b5f7c3 inset',
    transitionProperty: "box-shadow",
    transitionDuration: ".7s",
});

export const PlaylistCard = ({ playlistName, numberOfTracks, playlistImageLink, playlistId, playlistDescription }) => {
    const pid = playlistId;
    const shufflePlaylist = useGetShuffleMutation();
    const altText = "Album art for " + playlistName
    const [shuffled, setShuffled] = useState(false);

    useEffect(() => {
        if (shufflePlaylist.status === "success") {
            setShuffled(true);
            console.log(shuffled);
            setTimeout(function() {
                setShuffled(false);
            }, 3000, shuffled);
        }
    }, [shufflePlaylist.status]);

    return (
        <>
            <Card sx={cardSx}>
                <CardMedia
                    component="img"
                    alt={altText}
                    image={playlistImageLink}
                    sx={{minHeight:300}}
                />
                <Box sx={shuffled ? shuffledCardContentSx : cardContentSx}>

                <CardContent sx={{minHeight: 160}}>
                    <Typography gutterBottom variant="h5" component="div">
                        {playlistName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {playlistDescription}
                    </Typography>
                    <Typography sx={{marginY: 2}}>
                        {numberOfTracks} tracks
                    </Typography>
                    {shuffled && (<Typography sx={{color: "green"}}>
                        Playlist Shuffled!
                    </Typography>)}
                </CardContent>
                <CardActions sx={{justifyContent: 'center'}}>
                    <Button 
                        size="small" 
                        variant={shuffled ? "contained" : "outlined"}
                        disabled={shuffled}
                        onClick={(e) => {
                            shufflePlaylist.mutate({
                                id: pid,
                            });
                        }}
                    >
                        Shuffle
                    </Button>
                </CardActions>
                </Box>

            </Card>
        </>
    )
}