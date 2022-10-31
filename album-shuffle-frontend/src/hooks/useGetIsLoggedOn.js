import { server } from './serverName';
import { useQuery } from 'react-query';

export function useGetIsLoggedOn() {
    async function isLoggedOn() {
        const res = await fetch(
            `${server}/logged_in`
        );
        if (res.status >= 400) throw new Error(`${res.status}: ${res.statusText}`);

        return res.json();
    }
    return useQuery("loggedOn", isLoggedOn);
}
