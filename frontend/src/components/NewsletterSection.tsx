'use client';

import { useState } from 'react';
import Image from 'next/image';
import Toast from './Toast';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [toast, setToast] = useState<{ show: boolean; message: string; type: 'success' | 'error' }>({
    show: false,
    message: '',
    type: 'success'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    console.log('Submitting email:', email);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/subscribers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
        },
        body: JSON.stringify({
          data: { 
            email,
            subscribed_at: new Date().toISOString()
          }
        }),
      });

      console.log('Response status:', response.status);
      const data = await response.json();
      console.log('Response data:', data);

      if (response.ok) {
        setStatus('success');
        setEmail('');
        setToast({
          show: true,
          message: 'Successfully subscribed to newsletter!',
          type: 'success'
        });
      } else {
        setStatus('error');
        let errorMessage = 'Failed to subscribe. Please try again.';
        
        // Handle specific error cases
        if (response.status === 404) {
          errorMessage = 'Subscription service is temporarily unavailable.';
        } else if (data.error?.message === 'Email already exists') {
          errorMessage = 'This email is already subscribed.';
        }

        setToast({
          show: true,
          message: errorMessage,
          type: 'error'
        });
      }
    } catch (error) {
      console.error('Subscription error:', error);
      setStatus('error');
      setToast({
        show: true,
        message: 'Network error. Please check your connection.',
        type: 'error'
      });
    }
  };

  return (
    <>
      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(prev => ({ ...prev, show: false }))}
        />
      )}
      
      <section className="bg-gradient-to-r from-orange-100 to-purple-100 py-16 overflow-hidden">
        <div className="container mx-auto px-4 max-w-6xl relative">
          <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-8">
            {/* Left side - Text and Form */}
            <div className="flex-1 max-w-xl z-10 w-full">
              <h2 className="text-3xl font-bold text-blue-900 mb-2">Hey, wait...</h2>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Subscribe to our newsletter!</h3>
              <p className="text-gray-600 mb-6">
                You will never miss our blogs, latest articles, etc. Our newsletter 
                is once a week, every Wednesday.
              </p>
              <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                  type="email"
                  placeholder="email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/90 backdrop-blur-sm"
                  required
                />
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  Subscribe
                </button>
              </form>
              {status === 'success' && (
                <p className="mt-2 text-green-600 text-sm">Successfully subscribed! Thank you.</p>
              )}
              {status === 'error' && (
                <p className="mt-2 text-red-600 text-sm">Something went wrong. Please try again.</p>
              )}
            </div>

            {/* Right side - Illustration */}
            <div className="flex-1 max-w-sm relative z-0 md:mb-0 -mb-8">
              <Image
                src="/newsletter-illustration.svg"
                alt="Newsletter subscription"
                width={400}
                height={300}
                priority
                className="w-full h-auto object-contain transform hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
} 