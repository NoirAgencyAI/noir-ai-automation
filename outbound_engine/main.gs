/**
 * @fileoverview Google Apps Script for sending personalized emails to new leads
 * from a Google Sheet.
 */

// Note: Google Apps Script doesn't directly support importing JSON files.
// You'll need to copy the contents of config.json into a separate
// configuration object or file, like `config.gs`.
const CONFIG = {
  "spreadsheetId": "YOUR_SPREADSHEET_ID",
  "senderName": "Your Name",
  "timezone": "America/New_York"
};

/**
 * Main function to run the email automation.
 * This function can be triggered manually or on a schedule.
 */
function main() {
  const sheet = SpreadsheetApp.openById(CONFIG.spreadsheetId).getActiveSheet();
  const dataRange = sheet.getDataRange();
  const values = dataRange.getValues();
  const headers = values[0];

  // Get column indices for 'Email', 'Name', and 'Status'
  const emailIndex = headers.indexOf('Email');
  const nameIndex = headers.indexOf('Name');
  const statusIndex = headers.indexOf('Status');

  if (emailIndex === -1 || nameIndex === -1 || statusIndex === -1) {
    Logger.log("Error: Make sure 'Email', 'Name', and 'Status' columns exist in the sheet.");
    return;
  }

  // Start from the second row to skip headers
  for (let i = 1; i < values.length; i++) {
    const row = values[i];
    const email = row[emailIndex];
    const name = row[nameIndex];
    const status = row[statusIndex];

    if (email && name && status.toLowerCase() !== 'sent') {
      try {
        const subject = `Hello, ${name}!`;
        const body = `Hi ${name},\n\nThis is a test email from the outbound engine.\n\nBest regards,\n${CONFIG.senderName}`;

        GmailApp.sendEmail(email, subject, body, {
          name: CONFIG.senderName
        });

        // Update the status to 'Sent'
        sheet.getRange(i + 1, statusIndex + 1).setValue('Sent');
        Logger.log(`Email sent to ${name} at ${email}`);

      } catch (e) {
        Logger.log(`Failed to send email to ${email}: ${e.message}`);
        // Optionally, update status to 'Failed'
        sheet.getRange(i + 1, statusIndex + 1).setValue('Failed');
      }
    }
  }
}
