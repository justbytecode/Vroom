'use server'

import { Resend } from 'resend'

const resendApiKey = process.env.RESEND_API_KEY

if (!resendApiKey) {
  throw new Error('RESEND_API_KEY is not set in the environment variables')
}

const resend = new Resend(resendApiKey)

export async function submitForm(formData: { name: string; email: string; type: string,message:string }) {
  const recipientEmail = process.env.RECIPIENT_EMAIL
  if (!recipientEmail) {
    throw new Error('RECIPIENT_EMAIL is not set in the environment variables')
  }
  try {
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: recipientEmail,
      subject: 'New Form Submission',
      html: `
        <h1>New Form Submission</h1>
        <p><strong>Name:</strong> ${formData.name}</p>
        <p><strong>Email:</strong> ${formData.email}</p>
        <p><strong>Type:</strong> ${formData.type}</p>
        <p><strong>Message:</strong> ${formData.message}</p>
      `
    })

    return { message: 'Form submitted successfully!' }
  } catch (error) {
    console.error('Form submission failed', error)
    throw new Error('Form submission failed')
  }
}

