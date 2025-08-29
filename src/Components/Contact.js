import React, { useState, useRef } from 'react';

const Contact = ({ data }) => {
   const [formData, setFormData] = useState({
      name: '',
      email: '',
      subject: '',
      message: ''
   });
   const [isSubmitting, setIsSubmitting] = useState(false);
   const [submitStatus, setSubmitStatus] = useState(''); // 'success', 'error', or ''
   const [validationErrors, setValidationErrors] = useState({});
   const lastSubmissionTime = useRef(0);
   const submissionCount = useRef(0);

   // Security: Input sanitization function
   const sanitizeInput = (input, fieldName = '') => {
      if (typeof input !== 'string') return '';
      
      let sanitized = input;
      
      // Remove potential HTML tags
      sanitized = sanitized.replace(/[<>]/g, '');
      
      // Remove javascript: protocol
      sanitized = sanitized.replace(/javascript:/gi, '');
      
      // Remove event handlers
      sanitized = sanitized.replace(/on\w+=/gi, '');
      
      // For message field, preserve spaces and only trim at the end
      if (fieldName === 'message') {
         sanitized = sanitized.substring(0, 2000); // Limit length
      } else {
         // For other fields, trim whitespace
         sanitized = sanitized.trim().substring(0, 1000);
      }
      
      return sanitized;
   };

   // Security: Rate limiting (max 3 submissions per minute)
   const checkRateLimit = () => {
      const now = Date.now();
      const timeDiff = now - lastSubmissionTime.current;
      
      if (timeDiff < 60000) { // Less than 1 minute
         if (submissionCount.current >= 3) {
            return false;
         }
         submissionCount.current++;
      } else {
         submissionCount.current = 1;
         lastSubmissionTime.current = now;
      }
      return true;
   };

   // Security: Enhanced validation
   const validateForm = () => {
      const errors = {};
      
      // Name validation
      if (!formData.name.trim()) {
         errors.name = 'Name is required';
      } else if (formData.name.length < 2 || formData.name.length > 50) {
         errors.name = 'Name must be between 2 and 50 characters';
      } else if (!/^[a-zA-Z\s\-']+$/.test(formData.name)) {
         errors.name = 'Name contains invalid characters';
      }

      // Email validation
      if (!formData.email.trim()) {
         errors.email = 'Email is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
         errors.email = 'Please enter a valid email address';
      } else if (formData.email.length > 100) {
         errors.email = 'Email is too long';
      }

      // Subject validation
      if (formData.subject && formData.subject.length > 100) {
         errors.subject = 'Subject is too long';
      }

      // Message validation
      if (!formData.message.trim()) {
         errors.message = 'Message is required';
      } else if (formData.message.length < 10) {
         errors.message = 'Message must be at least 10 characters';
      } else if (formData.message.length > 2000) {
         errors.message = 'Message is too long (max 2000 characters)';
      }

      setValidationErrors(errors);
      return Object.keys(errors).length === 0;
   };

   const handleInputChange = (e) => {
      const { name, value } = e.target;
      
      // Store the raw input without sanitization to allow normal typing
      setFormData(prev => ({
         ...prev,
         [name]: value
      }));

      // Clear validation error when user starts typing
      if (validationErrors[name]) {
         setValidationErrors(prev => ({
            ...prev,
            [name]: ''
         }));
      }
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      
      // Security: Check rate limiting
      if (!checkRateLimit()) {
         setSubmitStatus('error');
         setValidationErrors({ rateLimit: 'Too many submissions. Please wait a minute.' });
         return;
      }

      // Security: Enhanced validation
      if (!validateForm()) {
         setSubmitStatus('error');
         return;
      }

      setIsSubmitting(true);
      setSubmitStatus('');
      
      try {
         // Security: Sanitize all data before sending
         const sanitizedData = {
            name: sanitizeInput(formData.name),
            email: sanitizeInput(formData.email),
            subject: sanitizeInput(formData.subject) || 'Portfolio Contact Form',
            message: sanitizeInput(formData.message, 'message'),
            timestamp: new Date().toISOString()
         };

         // Submit to Google Apps Script
         const response = await fetch('https://script.google.com/macros/s/AKfycbwyp0sADLO9ypo5u79uVcb225CDl123HWUotSxQWefO5mu_ZJKOYcwDxLmJ3DWc-9zSoA/exec', {
            method: 'POST',
            mode: 'no-cors', // Required for Google Apps Script
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify(sanitizedData)
         });

         // Since we're using no-cors, we can't check response.ok
         // We'll assume success if no error is thrown
         setSubmitStatus('success');
         
         // Reset form
         setFormData({
            name: '',
            email: '',
            subject: '',
            message: ''
         });
         
         // Clear success message after 5 seconds
         setTimeout(() => setSubmitStatus(''), 5000);
         
      } catch (error) {
         console.error('Form submission failed:', error);
         setSubmitStatus('error');
      } finally {
         setIsSubmitting(false);
      }
   }

    return (
      <section id="contact">

         <div className="row section-head">
            <div className="two columns header-col">
               <h1><span>Get In Touch.</span></h1>
            </div>
            <div className="ten columns">
                  <p className="lead">{data?.message}</p>
            </div>
         </div>

         <div className="row">
            <div className="eight columns">


               <form 
                  id="contactForm" 
                  onSubmit={handleSubmit}
               >
					<fieldset>
                  <div>
						   <label htmlFor="contactName">Name <span className="required">*</span></label>
						   <input 
                              type="text" 
                              size="35" 
                              id="contactName" 
                              name="name" 
                              value={formData.name}
                              onChange={handleInputChange}
                              required
                              maxLength="50"
                              pattern="[a-zA-Z\s\-']+"
                              title="Name can only contain letters, spaces, hyphens, and apostrophes"
                           />
                           {validationErrors.name && (
                              <div style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}>
                                 {validationErrors.name}
                              </div>
                           )}
                  </div>
                  <div>
						   <label htmlFor="contactEmail">Email <span className="required">*</span></label>
						   <input 
                              type="email" 
                              size="35" 
                              id="contactEmail" 
                              name="email" 
                              value={formData.email}
                              onChange={handleInputChange}
                              required
                              maxLength="100"
                           />
                           {validationErrors.email && (
                              <div style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}>
                                 {validationErrors.email}
                              </div>
                           )}
                  </div>
                  <div>
						   <label htmlFor="contactSubject">Subject</label>
						   <input 
                              type="text" 
                              size="35" 
                              id="contactSubject" 
                              name="subject"
                              value={formData.subject}
                              onChange={handleInputChange}
                              maxLength="100"
                           />
                           {validationErrors.subject && (
                              <div style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}>
                                 {validationErrors.subject}
                              </div>
                           )}
                  </div>
                  <div>
                     <label htmlFor="contactMessage">Message <span className="required">*</span></label>
                     <textarea 
                        cols="50" 
                        rows="15" 
                        id="contactMessage" 
                        name="message" 
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        maxLength="2000"
                     ></textarea>
                     {validationErrors.message && (
                        <div style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}>
                           {validationErrors.message}
                        </div>
                     )}
                  </div>
                  <div>
                     <button type="submit" className="submit" disabled={isSubmitting}>
                        {isSubmitting ? 'Sending...' : 'Submit'}
                     </button>
                     <span id="image-loader" style={{ display: isSubmitting ? 'inline' : 'none' }}>
                        <img alt="" src="images/loader.gif" />
                     </span>
                  </div>
					</fieldset>
				</form>
               
               {validationErrors.rateLimit && (
                  <div id="message-warning" style={{ color: 'red', marginTop: '10px' }}>
                     {validationErrors.rateLimit}
                  </div>
               )}
               
               {validationErrors.submission && (
                  <div id="message-warning" style={{ color: 'red', marginTop: '10px' }}>
                     {validationErrors.submission}
                  </div>
               )}
               
               {submitStatus === 'error' && (
                  <div id="message-warning" style={{ color: 'red', marginTop: '10px' }}>
                     Failed to send message. Please try again or contact me directly at felirick@gmail.com
                  </div>
               )}
               
               {submitStatus === 'success' && (
                  <div id="message-success" style={{ color: 'green', marginTop: '10px' }}>
                     <i className="fa fa-check"></i> Your message was sent successfully! I'll get back to you soon.
                  </div>
               )}
               

               
               {validationErrors.rateLimit && (
                  <div id="message-warning" style={{ color: 'red', marginTop: '10px' }}>
                     {validationErrors.rateLimit}
                  </div>
               )}
               
               {validationErrors.submission && (
                  <div id="message-warning" style={{ color: 'red', marginTop: '10px' }}>
                     {validationErrors.submission}
                  </div>
               )}
               
               {submitStatus === 'error' && (
                  <div id="message-warning" style={{ color: 'red', marginTop: '10px' }}>
                     Failed to send message. Please try again or contact me directly at felirick@gmail.com
                  </div>
               )}
               
               {submitStatus === 'success' && (
                  <div id="message-success" style={{ color: 'green', marginTop: '10px' }}>
                     <i className="fa fa-check"></i> Your message was sent successfully! I'll get back to you soon.
                  </div>
               )}
           </div>

            <aside className="four columns footer-widgets">
               <div className="widget widget_contact">
					   <h4>Address and Phone</h4>
					   <p className="address">
						   {data?.name}<br />
						   {data?.address.street} <br />
						   {data?.address.city}, {data?.address.state} {data?.address.zip}<br />
						   <span>{data?.phone}</span>
					   </p>
				   </div>
               <div className="widget widget_tweets">
		         </div>
            </aside>
      </div>
   </section>
    );
}

export default Contact;
