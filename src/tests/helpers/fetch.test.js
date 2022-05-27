import { fetchWithoutToken, fetchWithToken } from "../../helpers/fetch"

describe('Tests on fetch helper', () => {

    let token = '';

    test('FetchWithoutToken should return proper information', async() => {

        const resp = await fetchWithoutToken('auth', {email: 'email@email.com', password: '122345'}, 'POST');
        const body = await resp.json();
        
        token = body.token;
        
        expect(resp instanceof Response).toBe(true);
        expect(body.ok).toBe(true);

    });

    test('FetchWithToken should return proper information', async() => {

        localStorage.setItem('token', token);

        const resp = await fetchWithToken('events/6271ef96e06f32bf9134e212', {}, 'DELETE');
        const body = await resp.json();

        expect(body.msg).toBe('Event does not exist');

    })
})
