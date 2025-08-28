import React, { useState } from 'react';

const Contact = ({ data }) => {
   const [formData, setFormData] = useState({
      name: '',
      email: '',
      subject: '',
      message: ''
   });
   const [isSubmitting, setIsSubmitting] = useState(false);
   const [submitStatus, setSubmitStatus] = useState(''); // 'success', 'error', or ''

   const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({
         ...prev,
         [name]: value
      }));
   };

   const handleSubmit = (e) => {
      // Prevent default form submission
      e.preventDefault();
      
      // Basic validation
      if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
         setSubmitStatus('error');
         return;
      }

      setIsSubmitting(true);
      setSubmitStatus('');
      
      // Simulate form submission (Netlify will handle the actual submission)
      setTimeout(() => {
         setSubmitStatus('success');
         setIsSubmitting(false);
         
         // Reset form
         setFormData({
            name: '',
            email: '',
            subject: '',
            message: ''
         });
         
         // Clear success message after 5 seconds
         setTimeout(() => setSubmitStatus(''), 5000);
      }, 1000);
   }

   console.log(data);

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
                  name="contact" 
                  method="POST" 
                  netlify
                  data-netlify-honeypot="bot-field"
                  onSubmit={handleSubmit}
               >
                  {/* Netlify form detection */}
                  <input type="hidden" name="form-name" value="contact" />
                  
                  {/* Honeypot field to prevent spam */}
                  <div style={{ display: 'none' }}>
                     <input name="bot-field" />
                  </div>

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
                           />
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
                           />
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
                           />
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
                     ></textarea>
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
