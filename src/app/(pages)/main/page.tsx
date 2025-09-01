'use client';

import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import TopBar from '@/components/TopBar';
// import { Input } from '@/components/ui/input';
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
import { GoalInputProps } from '@/types';
import useRoadmap from '@/hooks/useRoadmap';
import useSaveInputs from '@/hooks/useSaveInputs';
import useSaveResponse from '@/hooks/useSaveResponse';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

async function handleSubmit(
  e: React.FormEvent,
  data: GoalInputProps,
  setResultPage: (value: boolean) => void,
  setAiResponse: (value: string) => void,
  saveInputs: (
    session: any,
    input: GoalInputProps
  ) => Promise<{ success: boolean; prompt_id: number; data: any }>,
  generateRoadmap: (session: any, input: GoalInputProps) => Promise<{ roadmap: string }>,
  saveResponse: (
    session: any,
    message: string,
    prompt_id: number
  ) => Promise<{ success: boolean; data: any }>
) {
  e.preventDefault();
  const supabase = createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session) throw new Error('User not authenticated');
  const response = await saveInputs(session, data);
  const promptId = response.prompt_id;
  if (!promptId) throw new Error('Prompt failed to save');
  console.log('User prompt saved:', response);
  try {
    const roadmapResponse = await generateRoadmap(session, data);
    if (!roadmapResponse) throw new Error('Failed to generate roadmap');
    const message = roadmapResponse?.roadmap;
    console.log(message);
    setAiResponse(message);
    const postResponse = await saveResponse(session, message, promptId);
    const result = await postResponse?.data;
    console.log('AI response saved', result);
    setResultPage(true);
  } catch (error) {
    console.error('Failed to get response:', error);
  }
  console.log('Submitted!');
}

export default function Page() {
  const [user, setUser] = useState<UserResponse['data']['user'] | null>(null);
  const router = useRouter();
  const [resultPage, setResultPage] = useState<boolean>(false);
  const [aiResponse, setAiResponse] = useState<string>('');
  const [mode, setMode] = useState<string>('light');
  const [goalType, setGoalType] = useState<string>('career');
  const goalTypeCSS = `border w-[100px] py-[2px] rounded-md ${mode === 'light' ? 'border-neutral-600 shadow-sm' : ''}`;
  const skillLvLCSS = `h-[22px] w-[90px] rounded-lg border ${mode === 'light' ? 'border-black' : 'border-white'} shadow`;
  const [selectedLVL, setSelectedLVL] = useState<string>('');
  const levels = [
    {
      name: '0-1',
      label: goalType === 'skill' ? 'Beginner' : goalType === 'career' ? '0 - 1 Years' : 'Zero',
    },
    {
      name: '1-3',
      label:
        goalType === 'skill' ? 'Intermediate' : goalType === 'career' ? '1 - 3 Years' : 'Familiar',
    },
    {
      name: '3+',
      label: goalType === 'skill' ? 'Advanced' : goalType === 'career' ? '3+ Years' : 'Proficient',
    },
  ];
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [open, setOpen] = useState(false);
  const [learningStyles, setLearningStyles] = useState<Record<string, boolean>>({
    'Hands-on projects': false,
    'Structured tutorials': false,
    'Reading/writing': false,
    Videos: false,
    'Peer/Community learning + growth': false,
    'Guided Coaching/AI tutors': false,
  });
  const [endResult, setEndResult] = useState<string>('');
  const [startPoint, setStartPoint] = useState<string>('');
  const [commitTime, setCommitTime] = useState<string>('');
  const [limitations, setLimitations] = useState<string>('');
  const { saveError, success, saveInputs } = useSaveInputs();
  const { error, loading, roadmap, generateRoadmap } = useRoadmap();
  const { saveResError, resSuccess, saveResponse } = useSaveResponse();

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
      {!resultPage && (
        <div>
          <h1 className='mt-[80px] flex flex-wrap justify-center text-center text-[45px] font-bold leading-tight'>
            <span>
              Your Ultimate Path from&nbsp;
              <span className='whitespace-nowrap'>
                <b>0</b>&nbsp;to&nbsp;<b>100</b>
              </span>
            </span>
          </h1>
          <div className='mt-[80px] flex w-full flex-col items-center justify-center'>
            <h3 className='text-[17px]'>Which type of goal do you want to achieve?</h3>
            <div
              className={`mt-[15px] flex space-x-1 rounded-lg border p-1 ${mode === 'light' ? 'border-black bg-white/20 shadow-sm' : 'border-gray-300 bg-gray-800/30'}`}
            >
              <button
                className={`${goalTypeCSS} ${goalType === 'life' ? (mode === 'light' ? 'bg-white/70' : 'border-white bg-gray-800/90') : 'border-gray-400'}`}
                onClick={() => setGoalType('life')}
              >
                Life
              </button>
              <button
                className={`${goalTypeCSS} ${goalType === 'career' ? (mode === 'light' ? 'bg-white/70' : 'border-white bg-gray-800/90') : 'border-gray-400'}`}
                onClick={() => setGoalType('career')}
              >
                Career
              </button>
              <button
                className={`${goalTypeCSS} ${goalType === 'skill' ? (mode === 'light' ? 'bg-white/70' : 'bg-gray-800/90') : 'border-gray-400'}`}
                onClick={() => setGoalType('skill')}
              >
                Skill
              </button>
            </div>
            <form
              className='mb-[50px] mt-[50px] flex flex-col justify-center max-md:w-[600px] max-sm:w-[500px] max-sml:w-[400px] max-bxs:w-[370px] max-xs:w-[350px]'
              onSubmit={(e) =>
                handleSubmit(
                  e,
                  {
                    goalType,
                    endResult,
                    selectedLVL,
                    startPoint,
                    commitTime,
                    date,
                    learningStyles,
                    limitations,
                  } as GoalInputProps,
                  setResultPage,
                  setAiResponse,
                  saveInputs,
                  generateRoadmap,
                  saveResponse
                )
              }
            >
              <h2 className='mb-2'>
                {`What's your goal, and what would success look like? (`}
                <span className='italic'>
                  Be specific: include measurable outcomes, context, and why it matters.
                </span>
                {`)`}
              </h2>
              <Textarea
                className={`shadow-m w-full ${mode === 'light' ? 'border-black' : 'border-white'} max-h-[150px]`}
                placeholder='Enter desired outcome'
                onChange={(e) => setEndResult(e.target.value)}
              />
              <h2 className='mb-2 mt-8'>Where are you now in relation to this goal?</h2>
              <div className='mb-3 mt-3 flex space-x-2 text-[12px]'>
                {levels.map(({ name, label }) => (
                  <button
                    key={name}
                    className={`${skillLvLCSS} ${name === selectedLVL ? `${mode === 'light' ? 'bg-white/70' : 'bg-gray-800/90'}` : ''}`}
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
                className={`shadow-m w-full ${mode === 'light' ? 'border-black' : 'border-white'} max-h-[150px]`}
                placeholder='Enter current skills, experiences, & relevent circumstances'
                onChange={(e) => setStartPoint(e.target.value)}
              />
              <h2 className='mb-2 mt-8'>
                How much time can you commit weekly towards working on this goal?
              </h2>
              <Select onValueChange={(value) => setCommitTime(value)}>
                <SelectTrigger
                  className={`h-[33px] w-[150px] select-none ${mode === 'light' ? 'border-black' : 'border-white'}`}
                >
                  <SelectValue placeholder='Hours' className='select-none' />
                </SelectTrigger>
                <SelectContent className='bg-white/95'>
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
                  <PopoverContent className='w-auto overflow-hidden bg-white/95 p-0' align='start'>
                    <Calendar
                      mode='single'
                      selected={date}
                      captionLayout='dropdown'
                      onSelect={(date) => {
                        setDate(date);
                        setOpen(false);
                      }}
                      startMonth={new Date()}
                      endMonth={new Date(2070, 11)}
                    />
                  </PopoverContent>
                </Popover>
                <h2 className='mb-2 mt-8'>
                  {' '}
                  {`How do you make the best progress? (`}
                  <span className='italic'>Select any</span>
                  {`)`}
                </h2>
                <div className='mt-2 grid grid-cols-3 gap-4'>
                  <LearningCheckboxes styles={learningStyles} setStyles={setLearningStyles} />
                </div>
              </div>
              <h2 className='mb-2 mt-8'>
                {`What limitations or resources should we consider? (`}
                <span className='italic'>Budget, location, tools, people access, etc.</span>
                {`)`}
              </h2>
              <Textarea
                className={`shadow-m w-full ${mode === 'light' ? 'border-black' : 'border-white'} max-h-[150px]`}
                placeholder='Enter desired outcome'
                onChange={(e) => setLimitations(e.target.value)}
              />
              <button
                className={`p mt-12 rounded-lg px-4 py-2 ${mode === 'light' ? 'border-black' : ''} ${loading ? 'bg-gray-400/50' : 'bg-blue-400/50'}`}
                type='submit'
                disabled={loading}
              >
                {loading ? 'Generating...' : 'Get Roadmap'}
              </button>
            </form>
            {saveError && (
              <Alert variant='default'>
                <AlertTitle>Failed to save goal</AlertTitle>
                <AlertDescription>Please try again later</AlertDescription>
              </Alert>
            )}
            {success && (
              <Alert variant='default'>
                <AlertTitle>Goal Registered</AlertTitle>
                <AlertDescription>Cooking up a success gameplan for you...</AlertDescription>
              </Alert>
            )}
          </div>
        </div>
      )}
      {resultPage && (
        <div>
          {error && (
            <Alert variant='default'>
              <AlertTitle>Failed to generate</AlertTitle>
              <AlertDescription>Please try again later</AlertDescription>
            </Alert>
          )}
          {roadmap && (
            <div>
              <h1 className='mb-[100px] mt-[80px] flex flex-wrap justify-center text-center text-[45px] font-bold leading-tight'>
                Your Winning Strategy:
              </h1>
              <div
                className={`prose mx-[150px] max-w-none whitespace-pre-line ${
                  mode === 'light' ? '' : 'prose-invert'
                } [&_li]:my-1 [&_p]:my-2`}
              >
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    a: (props) => (
                      <a
                        {...props}
                        className='text-blue-600 underline'
                        target='_blank'
                        rel='noopener noreferrer'
                      />
                    ),
                  }}
                >
                  {aiResponse}
                </ReactMarkdown>
              </div>
            </div>
          )}
          {saveResError && (
            <Alert variant='default'>
              <AlertTitle>Failed to Save</AlertTitle>
              <AlertDescription>Roadmap failed to save, please try again later</AlertDescription>
            </Alert>
          )}
          {resSuccess && (
            <Alert variant='default'>
              <AlertTitle>Roadmap Saved</AlertTitle>
              <AlertDescription>Woohoo! Now you&apos;ve got a reference point</AlertDescription>
            </Alert>
          )}
        </div>
      )}
    </div>
  );
}
