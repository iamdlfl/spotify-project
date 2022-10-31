import { server } from './serverName';
import { useQuery } from 'react-query';

export function useGetPlaylists() {
    async function getPlaylists() {
        const res = await fetch(
            `${server}/api/playlists`
        );
        if (res.status >= 400) throw new Error(`${res.status}: ${res.statusText}`);

        return res.json();
    }
    return useQuery("playlists", getPlaylists);
}
