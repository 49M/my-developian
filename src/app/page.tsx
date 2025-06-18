'use client';

import { useEffect, useState } from 'react';
// import { UsersInTable } from '@/utils/UsersInTable';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import TopBar from '@/components/TopBar';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ChevronDownIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import LearningCheckboxes from '@/components/LearningCheckboxes';
import { UserResponse } from '@supabase/supabase-js';

async function handleSubmit() {
  const userMessage = [
    {
      role: 'system',
      content: 'respond concisely (under 20 words) and start your message with "Hello world!"',
    },
    { role: 'user', content: 'Introduce yourself' },
  ];
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: userMessage }),
    });
    if (!response.ok) throw new Error('No response from API.');
    const { messages: aiMessage } = await response.json();
    console.log(aiMessage);
  } catch (error) {
    console.error('Failed to get response:', error);
  }
  console.log('Submitted!');
}

export default function Page() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();
  const [mode, setMode] = useState<string>('light');
  const [goalType, setGoalType] = useState<string>('Career');
  const goalTypeCSS = `border w-[100px] py-[2px] rounded-md ${mode === 'light' ? 'border-neutral-600 shadow-sm' : ''}`;
  const skillLvLCSS = `h-[22px] w-[90px] rounded-lg border ${mode === 'light' ? 'border-black' : 'border-white'} shadow`;
  const [selectedLVL, setSelectedLVL] = useState<string>('');
  const levels = [
    {
      name: 'lvl 1',
      label: goalType === 'Skill' ? 'Beginner' : goalType === 'Career' ? '0 - 1 Years' : 'Zero',
    },
    {
      name: 'lvl 2',
      label:
        goalType === 'Skill' ? 'Intermediate' : goalType === 'Career' ? '1 - 3 Years' : 'Familiar',
    },
    {
      name: 'lvl 3',
      label: goalType === 'Skill' ? 'Advanced' : goalType === 'Career' ? '3+ Years' : 'Proficient',
    },
  ];
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [open, setOpen] = useState(false);
  const [learningStyles, setLearningStyles] = useState<Record<string, boolean>>({
    'Hands-on projects': false,
    'Step-by-step tutorials': false,
    'Articles & documentation': false,
    'Video walkthroughs': false,
    'Building with others/community': false,
    'AI Tutors': false,
  });

  useEffect(() => {
    (async () => {
      const supabase = createClient();
      const { data, error }: UserResponse = await supabase.auth.getUser();
      if (error || !data?.user) {
        router.push('/login');
      } else {
        setUser(data.user);
        const { data: existingUser } = await supabase
          .from('users')
          .select('id')
          .eq('id', data.user.id)
          .limit(1);

        if (!existingUser || existingUser.length === 0) {
          const { error: insertError } = await supabase.from('users').insert([
            {
              id: data.user.id,
              email: data.user.email,
              username: data.user.user_metadata?.username || null,
            },
          ]);
          if (insertError) {
            console.error('Insert error:', insertError);
          }
        }
      }
    })();
  }, [router]);

  return (
    <div
      className={`${mode === 'light' ? 'bg-custom-light text-black' : 'bg-custom-dark text-white'} min-h-screen w-full bg-cover bg-center bg-no-repeat font-manrope`}
    >
      <TopBar
        name={
          user?.user_metadata.username.charAt(0).toUpperCase() +
            user?.user_metadata.username.slice(1) || 'Guest'
        }
        mode={mode}
        changeMode={setMode}
      />
      <h1 className='mt-[80px] flex justify-center text-[45px] font-bold'>
        Your Ultimate Path from&nbsp;<b>0</b>&nbsp;to&nbsp;<b>100</b>
      </h1>
      <div className='mt-[80px] flex w-full flex-col items-center justify-center'>
        <h3 className='font-medium'>What type of milestone do you want to achieve?</h3>
        <div
          className={`mt-[15px] flex space-x-1 rounded-lg border p-1 ${mode === 'light' ? 'border-black bg-white/20 shadow-sm' : 'border-gray-300 bg-gray-800/30'}`}
        >
          <button
            className={`${goalTypeCSS} ${goalType === 'Life' ? (mode === 'light' ? 'bg-white/70' : 'border-white bg-gray-800/90') : 'border-gray-400'}`}
            onClick={() => setGoalType('Life')}
          >
            Life
          </button>
          <button
            className={`${goalTypeCSS} ${goalType === 'Career' ? (mode === 'light' ? 'bg-white/70' : 'border-white bg-gray-800/90') : 'border-gray-400'}`}
            onClick={() => setGoalType('Career')}
          >
            Career
          </button>
          <button
            className={`${goalTypeCSS} ${goalType === 'Skill' ? (mode === 'light' ? 'bg-white/70' : 'bg-gray-800/90') : 'border-gray-400'}`}
            onClick={() => setGoalType('Skill')}
          >
            Skill
          </button>
        </div>
        <form className='mb-[50px] mt-[50px] justify-center' onSubmit={() => handleSubmit()}>
          <h2 className='mb-2'>What end-result do you hope to achieve? (be specific)</h2>
          <Textarea
            className={`shadow-m w-[600px] ${mode === 'light' ? 'border-black' : 'border-white'} max-h-[150px]`}
            placeholder='Enter desired outcome'
          />
          <h2 className='mb-2 mt-8'>What does succeeding with this goal look like for you?</h2>
          <Input
            className={`shadow-m w-[600px] ${mode === 'light' ? 'border-black' : 'border-white'}`}
            placeholder='Enter your success criteria'
          />
          <h2 className='mb-2 mt-8'>
            What is your starting point (current level of experience) in relation to this goal?
          </h2>
          <div className='mb-3 mt-3 flex space-x-2 text-[12px]'>
            {levels.map(({ name, label }) => (
              <button
                key={name}
                className={`${skillLvLCSS} ${name === selectedLVL ? `${mode === 'light' ? 'bg-blue-300/70' : 'bg-blue-500/70'}` : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedLVL(name);
                }}
              >
                {label}
              </button>
            ))}
          </div>
          <Textarea
            className={`shadow-m w-[600px] ${mode === 'light' ? 'border-black' : 'border-white'} max-h-[150px]`}
            placeholder='Enter current skills & relevent experience'
          />
          <h2 className='mb-2 mt-8'>How much time can you commit per week?</h2>
          <Select>
            <SelectTrigger
              className={`h-[33px] w-[150px] ${mode === 'light' ? 'border-black' : 'border-white'}`}
            >
              <SelectValue placeholder='Hours' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='< 1 hr'>&lt;&nbsp;1 hr</SelectItem>
              <SelectItem value='1 - 5 hrs'>1 - 5 hrs</SelectItem>
              <SelectItem value='5 - 10 hrs'>5 - 10 hrs</SelectItem>
              <SelectItem value='10 - 15 hrs'>10 - 15 hrs</SelectItem>
              <SelectItem value='15 - 20 hrs'>15 - 20 hrs</SelectItem>
              <SelectItem value='20 - 30 hrs'>20 - 30 hrs</SelectItem>
              <SelectItem value='30 - 40 hrs'>30 - 40 hrs</SelectItem>
              <SelectItem value='40 - 60 hrs'>40 - 60 hrs</SelectItem>
              <SelectItem value='60+ hrs'>60+ hrs</SelectItem>
            </SelectContent>
          </Select>
          <h2 className='mb-2 mt-8'>When would you like to achieve this by?</h2>
          <div className='flex flex-col'>
            <Label htmlFor='date' className='mb-[3px] px-1 text-[13px]'>
              Select Date
            </Label>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant='outline'
                  id='date'
                  className={`w-48 justify-between bg-transparent font-normal ${mode === 'light' ? 'border-black' : ''}`}
                >
                  {date ? date.toLocaleDateString() : 'Select date'}
                  <ChevronDownIcon />
                </Button>
              </PopoverTrigger>
              <PopoverContent className='w-auto overflow-hidden p-0' align='start'>
                <Calendar
                  mode='single'
                  selected={date}
                  captionLayout='dropdown'
                  onSelect={(date) => {
                    setDate(date);
                    setOpen(false);
                  }}
                />
              </PopoverContent>
            </Popover>
            <h2 className='mb-2 mt-8'>How do you prefer to learn?</h2>
            <div className='mt-2 grid grid-cols-3 gap-4'>
              <LearningCheckboxes styles={learningStyles} setStyles={setLearningStyles} />
            </div>
          </div>
          <button
            className={`p mt-12 rounded-lg bg-blue-400/50 px-4 py-1 ${mode === 'light' ? 'border-black' : ''}`}
            type='submit'
          >
            Get Roadmap
          </button>
        </form>
        <button className='mb-[50px] bg-pink-200' onClick={handleSubmit}>
          get results
        </button>
      </div>
      <h1 className='text-xl font-bold'></h1>
    </div>
  );
}
