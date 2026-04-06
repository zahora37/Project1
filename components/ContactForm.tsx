'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'

type FormData = {
  name: string
  email: string
  phone: string
  service: string
  address: string
  message: string
}

const services = [
  'Lawn Mowing',
  'Landscape Design',
  'Tree Trimming',
  'Irrigation System',
  'Seasonal Cleanup',
  'Hardscaping',
  'Other / Not Sure',
]

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>()

  const onSubmit = async (data: FormData) => {
    setSubmitting(true)
    // In production: send to your email service (Formspree, Resend, etc.)
    // For now we simulate a short delay and show success
    console.log('Lead captured:', data)
    await new Promise((r) => setTimeout(r, 1000))
    setSubmitted(true)
    setSubmitting(false)
    reset()
  }

  return (
    <section id="contact" className="py-20 bg-green-700">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">
          Get Your Free Estimate
        </h2>
        <p className="text-green-100 text-center mb-10 text-lg">
          Fill out the form below and we&apos;ll get back to you within one business day.
        </p>

        {submitted ? (
          <div className="bg-white rounded-2xl p-10 text-center">
            <div className="text-5xl mb-4">🎉</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Thanks! We&apos;ll be in touch soon.</h3>
            <p className="text-gray-500">
              We typically respond within a few hours during business hours. We look forward to helping with your yard!
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="mt-6 btn-primary"
            >
              Submit Another Request
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white rounded-2xl p-6 sm:p-8 space-y-5 shadow-xl"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  {...register('name', { required: 'Name is required' })}
                  type="text"
                  placeholder="John Smith"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  {...register('phone', { required: 'Phone is required' })}
                  type="tel"
                  placeholder="(555) 123-4567"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                {...register('email', {
                  required: 'Email is required',
                  pattern: { value: /^\S+@\S+\.\S+$/, message: 'Enter a valid email' },
                })}
                type="email"
                placeholder="john@example.com"
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>

            {/* Service */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Service Needed <span className="text-red-500">*</span>
              </label>
              <select
                {...register('service', { required: 'Please select a service' })}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
              >
                <option value="">Select a service...</option>
                {services.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
              {errors.service && <p className="text-red-500 text-xs mt-1">{errors.service.message}</p>}
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Property Address
              </label>
              <input
                {...register('address')}
                type="text"
                placeholder="123 Main St, Your City, State"
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Additional Details
              </label>
              <textarea
                {...register('message')}
                rows={4}
                placeholder="Tell us more about your project, yard size, any specific goals..."
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full btn-primary py-3 text-base disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {submitting ? 'Sending...' : 'Request Free Estimate'}
            </button>

            <p className="text-xs text-gray-400 text-center">
              No spam, ever. We&apos;ll only contact you about your estimate.
            </p>
          </form>
        )}
      </div>
    </section>
  )
}
