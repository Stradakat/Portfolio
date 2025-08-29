# Google Apps Script Setup Guide for Contact Form

This guide will walk you through setting up Google Apps Script to handle your portfolio contact form submissions and send emails to felirick@gmail.com.

## 🚀 **Step-by-Step Setup**

### **Step 1: Access Google Apps Script**
1. Go to [https://script.google.com/](https://script.google.com/)
2. Sign in with your Google account (the one you want to receive emails)
3. Click **"New Project"**

### **Step 2: Create the Script**
1. **Rename the project** to "Portfolio Contact Form"
2. **Replace the default code** with the content from `google-apps-script.js`
3. **Save the project** (Ctrl+S or Cmd+S)

### **Step 3: Deploy as Web App**
1. Click **"Deploy"** → **"New deployment"**
2. Choose **"Web app"** as the type
3. **Configure settings:**
   - **Execute as**: "Me" (your Google account)
   - **Who has access**: "Anyone" (for public access)
4. Click **"Deploy"**
5. **Authorize** the app when prompted
6. **Copy the Web App URL** (you'll need this for the Contact component)

### **Step 4: Update Your Contact Component**
1. **Open** `src/Components/Contact.js`
2. **Replace** `YOUR_SCRIPT_URL` with your actual Google Apps Script web app URL
3. **Save the file**

### **Step 5: Test the Setup**
1. **Build your project**: `npm run build`
2. **Deploy to Netlify**
3. **Test the contact form** on your live site
4. **Check your email** at felirick@gmail.com

## 🔧 **Configuration Details**

### **Google Apps Script Features:**
- ✅ **Free to use** - No monthly costs
- ✅ **Gmail integration** - Emails sent directly to your inbox
- ✅ **Spam protection** - Google's built-in spam filtering
- ✅ **Reliable delivery** - Google's infrastructure
- ✅ **Reply-to functionality** - You can reply directly to sender

### **Email Format:**
```
Subject: Portfolio Contact: [User's Subject]

New message from your portfolio contact form:

Name: [User's Name]
Email: [User's Email]
Subject: [User's Subject]
Message: [User's Message]

Timestamp: [Submission Time]

---
This message was sent from your portfolio website.
```

## 🛠️ **Troubleshooting**

### **Common Issues:**

#### **1. "Script not found" error**
- Ensure the script is deployed as a web app
- Check that the URL is copied correctly
- Verify the deployment is active

#### **2. Authorization errors**
- Make sure you've authorized the script
- Check that you're executing as the correct user
- Re-deploy if authorization issues persist

#### **3. Emails not received**
- Check your spam folder
- Verify the script is running without errors
- Test with the `testEmail()` function in Apps Script

### **Testing Functions:**
1. **In Apps Script editor**, run the `testEmail()` function
2. **Check the logs** for any errors
3. **Verify email delivery** to felirick@gmail.com

## 📱 **Security Considerations**

- **Public access** - Anyone can submit to your form
- **Rate limiting** - Google Apps Script has daily quotas
- **Input validation** - Client-side validation only (consider server-side)
- **Email limits** - Gmail has sending limits

## 🔄 **Maintenance**

### **Monitoring:**
- **Check Apps Script logs** for errors
- **Monitor email delivery** regularly
- **Review form submissions** for spam

### **Updates:**
- **Modify the script** as needed
- **Redeploy** after changes
- **Test thoroughly** before going live

## 📊 **Advanced Features (Optional)**

### **Log Submissions to Google Sheets:**
```javascript
// Add this to your script to log submissions
function logSubmission(data) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  sheet.appendRow([
    new Date(),
    data.name,
    data.email,
    data.subject,
    data.message
  ]);
}
```

### **Add CAPTCHA Protection:**
- Integrate with reCAPTCHA
- Add additional spam protection
- Implement rate limiting

## 🎯 **Benefits of This Solution**

1. **Completely Free** - No monthly costs or API limits
2. **Reliable** - Google's infrastructure
3. **Integrated** - Works with your existing Gmail
4. **Professional** - Clean, modern implementation
5. **Maintainable** - Easy to update and modify
6. **Secure** - No exposed API keys or credentials

## 📞 **Support**

If you encounter issues:
1. **Check Apps Script logs** for error messages
2. **Verify deployment settings** are correct
3. **Test with the provided test functions**
4. **Review Google Apps Script documentation**

---

**Your contact form will now send emails directly to felirick@gmail.com using Google's reliable infrastructure!** 🎉
