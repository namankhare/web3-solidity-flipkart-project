import { Web3 } from 'web3'
function delete_cookie(name) {
    document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

function fromNow(date, nowDate = Date.now(), rft = new Intl.RelativeTimeFormat(undefined, { numeric: "auto" })) {
    const SECOND = 1000;
    const MINUTE = 60 * SECOND;
    const HOUR = 60 * MINUTE;
    const DAY = 24 * HOUR;
    const WEEK = 7 * DAY;
    const MONTH = 30 * DAY;
    const YEAR = 365 * DAY;
    const intervals = [
        { ge: YEAR, divisor: YEAR, unit: 'year' },
        { ge: MONTH, divisor: MONTH, unit: 'month' },
        { ge: WEEK, divisor: WEEK, unit: 'week' },
        { ge: DAY, divisor: DAY, unit: 'day' },
        { ge: HOUR, divisor: HOUR, unit: 'hour' },
        { ge: MINUTE, divisor: MINUTE, unit: 'minute' },
        { ge: 30 * SECOND, divisor: SECOND, unit: 'seconds' },
        { ge: 0, divisor: 1, text: 'just now' },
    ];
    const now = typeof nowDate === 'object' ? nowDate.getTime() : new Date(nowDate).getTime();
    const diff = now - (typeof date === 'object' ? date : new Date(date)).getTime();
    const diffAbs = Math.abs(diff);
    for (const interval of intervals) {
        if (diffAbs >= interval.ge) {
            const x = Math.round(Math.abs(diff) / interval.divisor);
            const isFuture = diff < 0;
            return interval.unit ? rft.format(isFuture ? x : -x, interval.unit) : interval.text;
        }
    }
}

const convertToWei = (amount) => {
    return Web3.utils.toWei(amount, "ether");
}
const convertFromWei = (amount) => {
    return Web3.utils.fromWei(amount, "ether");
}

const timestamptoDate = (timestamp) => {
    return new Date(parseInt(timestamp) * 1000).toDateString();
}

function hideMiddleWalletAddress(address) {
    const visibleChars = 4; // Number of characters to keep visible at the beginning and end
    const ellipsis = '...';

    if (address.length <= visibleChars * 2) {
        return address; // Address is too short to hide the middle
    }

    const start = address.slice(0, visibleChars);
    const end = address.slice(-visibleChars);

    return `${start}${ellipsis}${end}`;
}


export { delete_cookie, fromNow, timestamptoDate, convertToWei, convertFromWei, hideMiddleWalletAddress }