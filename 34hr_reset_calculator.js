// 34hr Reset Calculator

const nowBtn = document.getElementById("nowBtn");
const calcBtn = document.getElementById("calcBtn");
const timeZoneSelect = document.getElementById("timeZone");

const displayOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZoneName: "short"
};

function getSelectedTimeZone() {
    if (timeZoneSelect.value === "device") {
        return Intl.DateTimeFormat().resolvedOptions().timeZone;
    }

    return timeZoneSelect.value;
}

function getTimeZoneOffsetMinutes(date, timeZone) {
    const parts = new Intl.DateTimeFormat("en-US", {
        timeZone,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hourCycle: "h23"
    }).formatToParts(date);

    const values = {};
    for (const part of parts) {
        if (part.type !== "literal") {
            values[part.type] = Number(part.value);
        }
    }

    // Compare the wall-clock representation in the selected zone with UTC.
    const zonedAsUTC = Date.UTC(
        values.year,
        values.month - 1,
        values.day,
        values.hour,
        values.minute,
        values.second
    );

    return (zonedAsUTC - date.getTime()) / 60000;
}

function parseDateTimeLocal(value, timeZone) {
    if (!value) {
        return null;
    }

    const [datePart, timePart] = value.split("T");
    const [year, month, day] = datePart.split("-").map(Number);
    const [hour, minute] = timePart.split(":").map(Number);

    // Start with the entered wall-clock time treated as UTC, then adjust it
    // by the selected zone's actual offset. Rechecking handles DST changes.
    let candidate = new Date(Date.UTC(year, month - 1, day, hour, minute, 0));

    for (let i = 0; i < 3; i++) {
        const offsetMinutes = getTimeZoneOffsetMinutes(candidate, timeZone);
        candidate = new Date(
            Date.UTC(year, month - 1, day, hour, minute, 0) - offsetMinutes * 60000
        );
    }

    return candidate;
}

function formatDate(date, timeZone) {
    return new Intl.DateTimeFormat("en-US", {
        ...displayOptions,
        timeZone
    }).format(date);
}

function calculateReset(start) {
    const timeZone = getSelectedTimeZone();
    const resetEnd = new Date(start.getTime() + 34 * 60 * 60 * 1000);

    const startTime = document.getElementById("startTime");
    const result = document.getElementById("result");

    startTime.textContent = formatDate(start, timeZone);
    result.textContent = formatDate(resetEnd, timeZone);
}

nowBtn.addEventListener("click", function () {
    // "Now" is already an exact instant; only the display time zone changes.
    const start = new Date();
    calculateReset(start);
});

calcBtn.addEventListener("click", function () {
    const timeZone = getSelectedTimeZone();
    const start = parseDateTimeLocal(
        document.getElementById("start").value,
        timeZone
    );

    if (!start || Number.isNaN(start.getTime())) {
        return;
    }

    calculateReset(start);
});
