export function get(name) {
    var matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function set(name, value) {
    let date = new Date(new Date().getTime() + 60 * 100000);
    document.cookie = `${name}=${value}; path=/; expires=` + date.toUTCString();
}