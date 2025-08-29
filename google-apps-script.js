/**
 * Google Apps Script for Portfolio Contact Form
 * 
 * This script handles contact form submissions from your portfolio website
 * and sends emails to felirick@gmail.com
 * 
 * Setup Instructions:
 * 1. Go to https://script.google.com/
 * 2. Create a new project
 * 3. Copy this code into the editor
 * 4. Deploy as a web app
 * 5. Copy the web app URL to your Contact.js component
 */

function doPost(e) {
  try {
    // Parse the incoming JSON data
    const data = JSON.parse(e.postData.contents);
    
    // Extract form data
    const name = data.name || 'Unknown';
    const email = data.email || 'No email provided';
    const subject = data.subject || 'Portfolio Contact Form';
    const message = data.message || 'No message provided';
    const timestamp = data.timestamp || new Date().toISOString();
    
    // Create email body
    const emailBody = `
New message from your portfolio contact form:

Name: ${name}
Email: ${email}
Subject: ${subject}
Message: ${message}

Timestamp: ${timestamp}

---
This message was sent from your portfolio website.
    `;
    
    // Send email to felirick@gmail.com
    GmailApp.sendEmail(
      'felirick@gmail.com',
      `Portfolio Contact: ${subject}`,
      emailBody,
      {
        replyTo: email,
        name: `${name} (Portfolio Contact)`
      }
    );
    
    // Log the submission (optional)
    console.log(`Contact form submitted by ${name} (${email})`);
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({ 
        success: true, 
        message: 'Email sent successfully' 
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Log error
    console.error('Error processing contact form:', error);
    
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({ 
        success: false, 
        error: error.toString() 
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Optional: Function to test the script
 */
function testEmail() {
  const testData = {
    name: 'Test User',
    email: 'test@example.com',
    subject: 'Test Message',
    message: 'This is a test message from the portfolio contact form.',
    timestamp: new Date().toISOString()
  };
  
  // Simulate a POST request
  const mockEvent = {
    postData: {
      contents: JSON.stringify(testData)
    }
  };
  
  const result = doPost(mockEvent);
  console.log('Test result:', result.getContent());
}

/**
 * Optional: Function to view recent form submissions
 * (You can run this in the Apps Script editor to see recent activity)
 */
function viewRecentSubmissions() {
  // This would require setting up a spreadsheet to log submissions
  // For now, just log that this function exists
  console.log('To log submissions, you can extend this script to save to Google Sheets');
}
