'use client';

import React, { useState, useEffect } from 'react';
import {
  ArrowUpRight,
  Target,
  Brain,
  Play,
  ArrowRight,
  Check,
  Sparkles,
  TrendingUp,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const MyDevelopianLanding: React.FC = () => {
  // const [scrollY, setScrollY] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [typingText, setTypingText] = useState('');
  const fullText = 'I want to become a software engineer at a top tech company';
  const router = useRouter();

  useEffect(() => {
    // const handleScroll = () =>
    //   // setScrollY(window.scrollY);
    //   window.addEventListener('scroll', handleScroll);

    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % 4);
    }, 2500);

    const typingInterval = setInterval(() => {
      setTypingText((prev) => {
        if (prev.length < fullText.length) {
          return fullText.slice(0, prev.length + 1);
        }
        return prev;
      });
    }, 100);

    return () => {
      // window.removeEventListener('scroll', handleScroll);
      clearInterval(stepInterval);
      clearInterval(typingInterval);
    };
  }, []);

  const testimonials = [
    {
      name: 'Zoe Chen',
      role: 'CS Student → Google APM',
      quote: 'Got my dream PM role 6 months after graduation. The roadmap was insanely specific.',
      company: 'Google',
    },
    {
      name: 'Marcus Johnson',
      role: 'Bootcamp → Staff Engineer',
      quote:
        'Leveled up faster than anyone in my cohort. MyDevelopian knew exactly what skills to prioritize.',
      company: 'Stripe',
    },
    {
      name: 'Aria Patel',
      role: 'Dropout → YC Founder',
      quote: "Built my startup roadmap here. Now we're YC W24. Coincidence? I think not.",
      company: 'YC',
    },
  ];

  return (
    <div className='relative min-h-screen bg-slate-50 text-slate-900'>
      <nav className='fixed top-0 z-50 w-full border-b border-slate-200/60 bg-slate-50/95 backdrop-blur-lg'>
        <div className='mx-auto max-w-6xl px-6 py-4'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-1 text-xl font-bold'>
              <div className='flex items-center justify-center'>
                <Image
                  src='/modern_crown_logo.png'
                  alt='MyDevelopian Logo'
                  width={38}
                  height={38}
                />
              </div>
              MyDevelopian
            </div>
            <div className='hidden items-center gap-8 text-sm font-medium md:flex'>
              <a href='#how' className='text-slate-600 transition-colors hover:text-blue-600'>
                How it works
              </a>
              <a href='#examples' className='text-slate-600 transition-colors hover:text-blue-600'>
                Examples
              </a>
              <a href='#proof' className='text-slate-600 transition-colors hover:text-blue-600'>
                Success stories
              </a>
            </div>
            <button
              onClick={() => router.push('/login')}
              className='rounded-lg bg-slate-900 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-slate-800'
            >
              Try for free
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className='px-6 pb-20 pt-32 text-center'>
        <div className='mx-auto max-w-5xl'>
          <div className='mb-8 inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-700'>
            <Sparkles className='h-4 w-4' />
            Powered by advanced AI
          </div>

          <h1 className='mb-8 text-6xl font-bold leading-tight md:text-7xl'>
            Stop overthinking.
            <br />
            Start{' '}
            <span className='bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
              achieving.
            </span>
          </h1>

          <p className='mx-auto mb-12 max-w-2xl text-xl leading-relaxed text-slate-600'>
            Turn any goal into a personalized step-by-step roadmap. AI that actually understands
            your situation and creates plans that work.
          </p>

          <div className='mb-16 flex flex-col items-center justify-center gap-4 sm:flex-row'>
            <button
              onClick={() => router.push('/login')}
              className='group flex items-center gap-2 rounded-xl bg-blue-600 px-8 py-3 font-semibold text-white transition-all duration-200 hover:scale-105 hover:bg-blue-700'
            >
              Create my roadmap
              <ArrowUpRight className='h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5' />
            </button>
            <button className='group flex items-center gap-2 font-medium text-slate-600 hover:text-slate-900'>
              <Play className='h-4 w-4' />
              Watch how it works
            </button>
          </div>

          {/* Interactive demo preview */}
          <div className='mx-auto max-w-2xl'>
            <div className='rounded-2xl border border-slate-200 bg-white p-6 shadow-xl'>
              <div className='mb-6 text-left'>
                <div className='mb-2 text-sm text-slate-500'>Tell us your goal:</div>
                <div className='rounded-lg bg-slate-50 p-4 font-mono text-sm'>
                  {typingText}
                  <span className='animate-pulse'>|</span>
                </div>
              </div>

              <div className='space-y-3'>
                <div className='mb-3 text-sm text-slate-500'>AI-generated roadmap:</div>
                {[
                  {
                    task: 'Master data structures & algorithms',
                    weeks: 'Week 1-8',
                    status: currentStep >= 0 ? 'active' : 'pending',
                  },
                  {
                    task: 'Build 3 full-stack projects',
                    weeks: 'Week 6-14',
                    status: currentStep >= 1 ? 'active' : 'pending',
                  },
                  {
                    task: 'Practice system design basics',
                    weeks: 'Week 10-16',
                    status: currentStep >= 2 ? 'active' : 'pending',
                  },
                  {
                    task: 'Apply to target companies',
                    weeks: 'Week 16-20',
                    status: currentStep >= 3 ? 'active' : 'pending',
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className={`flex items-center justify-between rounded-lg border p-3 transition-all duration-300 ${
                      item.status === 'active'
                        ? 'border-blue-200 bg-blue-50'
                        : 'border-slate-200 bg-slate-50'
                    }`}
                  >
                    <div className='flex items-center gap-3'>
                      {item.status === 'active' ? (
                        <div className='h-2 w-2 animate-pulse rounded-full bg-blue-500' />
                      ) : (
                        <div className='h-2 w-2 rounded-full bg-slate-300' />
                      )}
                      <span
                        className={`text-sm font-medium ${item.status === 'active' ? 'text-slate-900' : 'text-slate-600'}`}
                      >
                        {item.task}
                      </span>
                    </div>
                    <span className='text-xs text-slate-500'>{item.weeks}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className='bg-white px-6 py-16'>
        <div className='mx-auto max-w-4xl'>
          <div className='grid grid-cols-2 gap-8 text-center md:grid-cols-4'>
            {[
              { value: '52K', label: 'goals achieved', suffix: '+' },
              { value: '94', label: 'success rate', suffix: '%' },
              { value: '2.4', label: 'faster progress', suffix: 'x' },
              { value: '180', label: 'countries', suffix: '+' },
            ].map((stat, i) => (
              <div key={i}>
                <div className='mb-1 text-3xl font-bold text-slate-900'>
                  {stat.value}
                  <span className='text-blue-600'>{stat.suffix}</span>
                </div>
                <div className='text-sm font-medium text-slate-600'>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id='how' className='px-6 py-24'>
        <div className='mx-auto max-w-5xl'>
          <div className='mb-20 text-center'>
            <h2 className='mb-6 text-5xl font-bold'>How it actually works</h2>
            <p className='text-xl text-slate-600'>No fluff. Just results.</p>
          </div>

          <div className='space-y-20'>
            {[
              {
                step: '01',
                title: 'Describe your goal',
                description:
                  'Just type what you want to achieve. Career pivot, skill development, life change—anything goes.',
                details: [
                  'Guided Goal Setting',
                  'Natural language input',
                  'AI understands context',
                ],
              },
              {
                step: '02',
                title: 'AI builds your roadmap',
                description:
                  'Our AI analyzes your goal and creates a personalized, step-by-step plan with realistic timelines.',
                details: [
                  'Considers your background',
                  'Adapts to your schedule',
                  'Includes specific resources',
                ],
              },
              {
                step: '03',
                title: 'Execute and evolve',
                description:
                  'Follow your roadmap, track progress, and watch it adapt as you grow and learn.',
                details: ['Real-time adjustments', 'Progress tracking', 'Milestone celebrations'],
              },
            ].map((item, i) => (
              <div key={i} className='grid items-center gap-12 md:grid-cols-2'>
                <div className={`${i % 2 === 0 ? 'md:order-1' : 'md:order-2'} space-y-6`}>
                  <div className='flex items-center gap-4'>
                    <div className='flex h-12 w-12 items-center justify-center rounded-xl bg-slate-900 font-bold text-white'>
                      {item.step}
                    </div>
                    <h3 className='text-3xl font-bold'>{item.title}</h3>
                  </div>
                  <p className='text-lg leading-relaxed text-slate-600'>{item.description}</p>
                  <div className='space-y-2'>
                    {item.details.map((detail, j) => (
                      <div key={j} className='flex items-center gap-2'>
                        <Check className='h-4 w-4 text-green-500' />
                        <span className='text-sm text-slate-600'>{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className={`${i % 2 === 0 ? 'md:order-2' : 'md:order-1'}`}>
                  <div className='flex aspect-square items-center justify-center rounded-2xl bg-slate-100'>
                    <div className='text-sm text-slate-400'>Demo visualization</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className='bg-white px-6 py-24'>
        <div className='mx-auto max-w-6xl'>
          <div className='mb-16 text-center'>
            <h2 className='mb-6 text-5xl font-bold'>Built different</h2>
            <p className='text-xl text-slate-600'>AI that gets it. Roadmaps that work.</p>
          </div>

          <div className='grid gap-8 md:grid-cols-3'>
            {[
              {
                icon: <Brain className='h-6 w-6' />,
                title: 'Context-aware AI',
                description:
                  'Understands your situation, constraints, and learning style. Not just generic advice.',
                color: 'bg-blue-50 text-blue-600',
              },
              {
                icon: <Target className='h-6 w-6' />,
                title: 'Adaptive planning',
                description:
                  'Your roadmap evolves as you progress. Life changes? Your plan changes with it.',
                color: 'bg-purple-50 text-purple-600',
              },
              {
                icon: <TrendingUp className='h-6 w-6' />,
                title: 'Progress intelligence',
                description:
                  'Smart insights that keep you motivated and on track. No more abandoned goals.',
                color: 'bg-emerald-50 text-emerald-600',
              },
            ].map((feature, i) => (
              <div
                key={i}
                className='rounded-2xl bg-slate-50 p-8 text-center transition-all duration-300 hover:bg-white hover:shadow-lg'
              >
                <div
                  className={`h-14 w-14 ${feature.color} mx-auto mb-6 flex items-center justify-center rounded-xl`}
                >
                  {feature.icon}
                </div>
                <h3 className='mb-4 text-xl font-bold'>{feature.title}</h3>
                <p className='leading-relaxed text-slate-600'>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social proof */}
      <section id='proof' className='px-6 py-24'>
        <div className='mx-auto max-w-6xl'>
          <div className='mb-16 text-center'>
            <h2 className='mb-6 text-5xl font-bold'>Success stories</h2>
            <p className='text-xl text-slate-600'>Real people. Real results. Real fast.</p>
          </div>

          <div className='grid gap-8 md:grid-cols-3'>
            {testimonials.map((testimonial, i) => (
              <div key={i} className='rounded-2xl border border-slate-100 bg-white p-8 shadow-lg'>
                <div className='mb-6'>
                  <p className='text-lg italic leading-relaxed text-slate-700'>
                    {`"${testimonial.quote}"`}
                  </p>
                </div>
                <div className='flex items-center justify-between'>
                  <div>
                    <div className='font-bold text-slate-900'>{testimonial.name}</div>
                    <div className='text-sm text-slate-600'>{testimonial.role}</div>
                  </div>
                  <div className='text-2xl font-bold text-slate-300'>{testimonial.company}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className='bg-slate-900 px-6 py-32 text-center text-white'>
        <div className='mx-auto max-w-4xl'>
          <h2 className='mb-8 text-6xl font-bold leading-tight'>Ready to level up?</h2>

          <p className='mx-auto mb-12 max-w-2xl text-xl text-slate-300'>
            Stop planning someday. Start building today. Your future self will thank you.
          </p>

          <div className='flex flex-col items-center justify-center gap-6 sm:flex-row'>
            <button
              onClick={() => router.push('/login')}
              className='flex items-center gap-2 rounded-xl bg-blue-600 px-10 py-4 text-lg font-bold text-white transition-all duration-200 hover:scale-105 hover:bg-blue-700'
            >
              Get started free
              <ArrowRight className='h-5 w-5' />
            </button>
            <div className='text-slate-400'>2-minute setup</div>
          </div>
        </div>
      </section>

      <footer className='border-t border-slate-800 bg-slate-900 px-6 py-12 text-white'>
        <div className='mx-auto max-w-6xl'>
          <div className='flex flex-col items-center justify-between gap-8 md:flex-row'>
            <div className='flex items-center gap-2 text-xl font-bold'>
              <div className='flex items-center justify-center'>
                <Image
                  src='/modern_crown_logo.png'
                  alt='MyDevelopian Logo'
                  width={38}
                  height={38}
                />
              </div>
              MyDevelopian
            </div>

            <div className='flex gap-8 text-sm text-slate-400'>
              <a href='#' className='transition-colors hover:text-white'>
                Privacy
              </a>
              <a href='#' className='transition-colors hover:text-white'>
                Terms
              </a>
              <a href='#' className='transition-colors hover:text-white'>
                Help
              </a>
            </div>

            <div className='text-sm text-slate-500'>© 2025 MyDevelopian</div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MyDevelopianLanding;
