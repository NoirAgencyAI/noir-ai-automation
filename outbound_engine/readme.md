# Outbound Engine

## Goal

The Outbound Engine is a Google Apps Script-based system designed to automate personalized email outreach campaigns. It reads lead data from a Google Sheet and sends emails via Gmail, tracking the status of each email. This is ideal for small-scale, targeted outreach without the need for a dedicated email marketing platform.

## How It Works

The system uses a Google Sheet to manage a list of contacts. The sheet should contain at least three columns: `Name`, `Email`, and `Status`.

The core logic is in `main.gs`, a Google Apps Script file. When the `main` function is executed, it:
1.  Reads the spreadsheet specified by the `spreadsheetId` in the configuration.
2.  Iterates through each row, checking the `Status` column.
3.  If a row's status is not 'Sent', it constructs a personalized email using the `Name` column.
4.  It sends the email using Gmail, with the sender name specified in the configuration.
5.  Upon successful sending, it updates the `Status` column to 'Sent'. If it fails, it updates the status to 'Failed'.

## How to Deploy with Google Apps Script

1.  **Create a new Google Apps Script project:**
    *   Go to [script.google.com](https://script.google.com) and create a new project.
    *   Give your project a name (e.g., "Outbound Engine").

2.  **Copy the code:**
    *   Copy the contents of `main.gs` from this repository and paste it into the `Code.gs` file in your Apps Script project.

3.  **Configure the script:**
    *   The `CONFIG` object at the top of the script needs to be updated with your specific settings:
        *   `spreadsheetId`: The ID of your Google Sheet. You can find this in the URL of your sheet (e.g., `https://docs.google.com/spreadsheets/d/YOUR_SPREADSHEET_ID/edit`).
        *   `senderName`: The name you want to appear as the sender in the emails.
        *   `timezone`: Your timezone (e.g., "America/New_York"). This is important for scheduled triggers.

4.  **Set up your Google Sheet:**
    *   Create a new Google Sheet.
    *   Make sure it has the columns `Name`, `Email`, and `Status`.
    *   Populate it with your lead data.

5.  **Grant necessary permissions:**
    *   The first time you run the script, Google will ask for permission to access your Google Sheets and Gmail. You must grant these permissions for the script to work.

6.  **Run the script:**
    *   You can run the script manually by clicking the "Run" button in the Apps Script editor.
    *   You can also set up a trigger to run the script on a schedule (e.g., daily). To do this, go to the "Triggers" section (the clock icon) and create a new trigger for the `main` function.
