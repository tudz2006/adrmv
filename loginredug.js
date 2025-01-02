function login(str) {
    try {
        if (!str || str.length === 0) {
            console.error('Vui lòng nhập dữ liệu');
            return;
        }


        let parseLocalStorage = checkVaildLocalStorage(str);

        if (!parseLocalStorage) {
            const findData = findLocalStorage(str);
            if (!findData) {
                console.error('Dữ liệu không hợp lệ [1]');
                return;
            }
            parseLocalStorage = checkVaildLocalStorage(findData);

            if (!parseLocalStorage) {
                console.error('Dữ liệu không hợp lệ [2]');
                return;
            }
        }
        setLocalStorage(parseLocalStorage);


    } catch (error) {
        console.error('Đã xảy ra lỗi:', error);
    }
}

function setLocalStorage(data) {
    try {
        localStorage.clear();
        Object.entries(data).forEach(([key, value]) => {
            localStorage.setItem(key, value);
        });
        location.reload();
    } catch (error) {
        console.error('Lỗi khi thiết lập localStorage:', error);
    }
}

function findLocalStorage(str) {
    if (!str.includes('|')) return false;

    const splitStr = str.split('|');
    let start = splitStr.findIndex(data => data.includes('{"'));
    let end = splitStr.findIndex(data => data.includes('"}'));

    if (start === -1 || end === -1) return false;

    return splitStr.slice(start, end + 1).join('');
}

function checkVaildLocalStorage(str) {
    try {
        if (str.includes('userFloatInfo')) {
            const base = str.split(',"userFloatInfo"')[0];
            const session = str.split(',"session_id"')[1];
            return JSON.parse(`${base},"session_id"${session}`);
        }
        return JSON.parse(str);
    } catch (error) {
        console.warn('Lỗi khi kiểm tra JSON, thử phương pháp 2:', error);
        return checkVaildLocalStorageMethod2(str);
    }
}

function checkVaildLocalStorageMethod2(str) {
    try {
        if (str.includes('userFloatInfo')) {
            const removablePart = str.split(',"userFloatInfo"')[1].split('}}"')[0];
            const cleanedStr = str.replace(`,"userFloatInfo"${removablePart}}}"`, '');
            return JSON.parse(cleanedStr);
        }
        return JSON.parse(str);
    } catch (error) {
        console.error('Lỗi khi phân tích JSON:', error);
        return false;
    }
}

function promptLocalStorageInput() {
    const userInput = prompt('Vui lòng nhập localstorage:');
    if (userInput !== null) {
        login(userInput);
    }
}
promptLocalStorageInput()
