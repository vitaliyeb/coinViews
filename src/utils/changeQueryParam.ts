


export const changeQueryParam = (key: string, value: string) => {
    const url = new URL(window.location.href);
    url.searchParams.delete(key);
    url.searchParams.append(key, value);
    window.history.pushState(null, '', decodeURIComponent(url.toString()))
    return url;
}