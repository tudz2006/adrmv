function loginRedfinger() {
    localStorage.clear();
    var currentLocalStorage = prompt('Nhap localstorage json: ')
    
    var parse = null;
    
    if (currentLocalStorage.includes('userFloatInfo')) {
        newLocalStorage = currentLocalStorage.split(',"userFloatInfo"')[0]
        newLocalStorage += ',"session_id"' + currentLocalStorage.split(',"session_id"')[1]
        parse = JSON.parse(newLocalStorage);
    } else {
        parse = JSON.parse(currentLocalStorage);
    }
    
    for(var name in parse) {
        localStorage.setItem(name, parse[name]);
    }
    
    window.location.reload();
}
loginRedfinger()
