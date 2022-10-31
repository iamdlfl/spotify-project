import { server } from './serverName';
import { useMutation } from 'react-query';

export function useGetShuffleMutation() {

    async function getShuffle({ id }) {
        const res = await fetch(
            `${server}/api/shuffle/${id}`
        );

        const jsonRes = await res.json();

        if (res.status >= 400) throw new Error(jsonRes.message);

        return jsonRes;
    }

    return useMutation(getShuffle, {
        onSuccess: () => {
            console.log("Shuffled a playlist!");
        }
    });
}
