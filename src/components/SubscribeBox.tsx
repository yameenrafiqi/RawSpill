import React, { useState } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';

export const SubscribeBox: React.FC = () => {
  const [email, setEmail] = useState('');
  const [touched, setTouched] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState('');
  const controls = useAnimation();
  const ref = React.useRef(null);
  const inView = useInView(ref, { once: false });

  React.useEffect(() => {
    if (inView) {
      controls.start('visible');
    } else {
      controls.start('hidden');
    }
  }, [inView, controls]);

  const validateEmail = (value: string) => {
    return /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    setError('');
    setSubscribed(true);
    console.log('Email subscribed:', email);
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 40 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.7, ease: 'easeOut' }
        }
      }}
      className="w-full flex justify-center mt-12 mb-8"
    >
      <motion.form
        onSubmit={handleSubscribe}
        className="bg-gradient-to-br from-blue-50 via-white to-blue-100 rounded-2xl shadow-lg px-6 py-8 flex flex-col items-center max-w-md w-full"
        whileHover={{ boxShadow: '0 8px 32px rgba(60, 120, 255, 0.12)' }}
        animate={subscribed ? { background: 'linear-gradient(90deg, #e0f2fe, #bae6fd, #dbeafe)' } : {}}
      >
        <h3 className="text-xl font-semibold text-blue-700 mb-4">Subscribe to Our Newsletter</h3>
        <p className="text-gray-500 mb-6 text-center">Get the latest articles and updates delivered to your inbox.</p>
        <div className="w-full flex flex-col items-center">
          <input
            type="email"
            value={email}
            onChange={e => { setEmail(e.target.value); setTouched(false); setSubscribed(false); setError(''); }}
            onBlur={() => setTouched(true)}
            placeholder="Enter your email"
            className="w-full px-4 py-3 rounded-full border border-blue-200 focus:border-blue-400 focus:outline-none transition-all mb-2 text-gray-700 bg-white shadow-sm"
            disabled={subscribed}
          />
          {error && touched && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-500 text-sm mb-2"
            >
              {error}
            </motion.span>
          )}
          {subscribed && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-green-600 text-sm mb-2"
            >
              Thank you for subscribing!
            </motion.span>
          )}
        </div>
        <motion.button
          type="submit"
          disabled={subscribed}
          whileHover={{ scale: 1.05, boxShadow: '0 4px 16px rgba(37, 99, 235, 0.15)' }}
          className={`mt-2 w-full py-3 rounded-full font-semibold transition-all
            ${subscribed ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 cursor-pointer'}
            text-white shadow-md`}
        >
          Subscribe
        </motion.button>
      </motion.form>
    </motion.div>
  );
};
