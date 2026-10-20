# 34-Hour Reset Calculator

A small browser tool that adds 34 elapsed hours to a selected start time and displays when the reset will finish. Built with plain JavaScript and a mobile-friendly Bootstrap interface.

## Features

- Calculate from a manually entered local date and time.
- Use **Start Reset Now** to calculate directly from the current device time.
- Display both the start and finish with weekday, full date and 24-hour time.
- Run entirely in the browser, without an account, server or build step.

## Run locally

Clone or download this repository and open **index.html** in a modern browser. Keep the JavaScript file alongside the HTML file.

For a local web server, run the following inside the repository, then visit http://localhost:8000:

~~~bash
python3 -m http.server 8000
~~~

Python is only needed for this optional server. The calculator itself runs in JavaScript.

## Use

1. Enter the reset start in **Reset Start**, then select **Calculate**.
2. Alternatively, select **Start Reset Now**. This calculates immediately; it does not populate the manual date/time input.
3. Read the **Reset Started** and **34-Hour Reset Complete** cards.

For example, a start at 08:00 on Monday finishes at 18:00 on Tuesday when no local daylight-saving transition occurs.

## How it works

The calculation adds 34 × 60 × 60 × 1,000 milliseconds to the start timestamp. The result is formatted with the browser's local timezone.

| File | Purpose |
| --- | --- |
| [index.html](index.html) | Date input, buttons, result cards and Bootstrap imports |
| [34hr_reset_calculator.js](34hr_reset_calculator.js) | Button handlers, elapsed-time calculation and date formatting |

## Dependencies and behavior

Bootstrap 5.3.8 is loaded from jsDelivr. Internet access is needed to retrieve its styling and bundle unless already cached; the time arithmetic uses no external service.

This is an elapsed-time helper, not an electronic logbook. It does not inspect duty records or determine eligibility for a restart. Dates follow the device timezone, and the current implementation does not validate an empty manual start value or persist results after reload.

## Manual checks

- Compare **Start Reset Now** with a manual entry for the same time.
- Try a start late in the day and one near a month/year boundary.
- Confirm the result is 34 elapsed hours later, including when the device timezone changes its daylight-saving offset.
